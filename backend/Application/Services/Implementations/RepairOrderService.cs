using Application.Contracts.Diagnosis.DTOs;
using Application.Contracts.RepairOrder.DTOs;
using Application.Contracts.SparePart.DTOs;
using Application.Contracts.Status.DTOs;
using Application.Enums;
using Application.Exceptions;
using Application.Factories.StatusFactory.Implementations;
using Application.Proxies.RepairOrderProxy;
using Application.Repositories;
using Application.Services.Interfaces;
using AutoMapper;
using Domain.Entities;

namespace Application.Services.Implementations;

public class RepairOrderService : IRepairOrderService
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;
    private readonly IRetrieveRepairOrder _retrieveRepairOrder;
    private readonly IEmailService _emailService;

    public RepairOrderService(IUnitOfWork unitOfWork, IMapper mapper, IRetrieveRepairOrder retrieveRepairOrder,
        IEmailService emailService)
    {
        _unitOfWork = unitOfWork;
        _mapper = mapper;
        _retrieveRepairOrder = retrieveRepairOrder;
        _emailService = emailService;
    }

    public async Task<GetRepairOrder> GetRepairOrder(Guid orderId, bool includeDetails)
    {
        return await _retrieveRepairOrder.GetRepairOrder(orderId, includeDetails);
    }

    public async Task<IEnumerable<GetRepairOrder>> GetRepairOrders()
    {
        var orders = await _unitOfWork.RepairOrders.GetAllAsync();
        return _mapper.Map<IEnumerable<GetRepairOrder>>(orders);
    }

    public async Task<IEnumerable<GetRepairOrder>> GetRepairOrdersWithFilters(string? status, string? clientId,
        DateTime? fromDate, DateTime? toDate, int? limit)
    {
        var orders = await _unitOfWork.RepairOrders.GetWithFilters(status, clientId, fromDate, toDate, limit);
        return _mapper.Map<IEnumerable<GetRepairOrder>>(orders);
    }

    public async Task<GetRepairOrder> DiagnoseOrder(Guid orderId, Guid createdById, DiagnoseRepairOrder model)
    {
        var order = await _unitOfWork.RepairOrders.GetByIdAsync(orderId);
        if (order == null)
        {
            throw new NotFoundException(nameof(order), orderId);
        }

        _mapper.Map(model, order);
        order.AttendedById = createdById;
        order.StatusId = new OrderStatusFactory().CreateStatus(OrderStatuses.InConfirmation).Id;
        var repairRequest = await _unitOfWork.RepairRequests.GetByIdAsync(order.RepairRequestId);
        if (repairRequest == null)
        {
            throw new NotFoundException(nameof(repairRequest), order.RepairRequestId);
        }

        repairRequest.StatusId = new RequestStatusFactory().CreateStatus(RequestStatuses.Notified).Id;
        order = await CalculateTotals(order);

        await _unitOfWork.RepairOrders.UpdateAsync(order);
        await _unitOfWork.RepairRequests.UpdateAsync(repairRequest);
        await UpdateSparePartsStock(model.Diagnoses);
        var recipients = new List<string> { repairRequest.ContactEmailInfo };

        var content = $"<p>Estimado(a): </p>" +
                      $"<p>Se ha diagnosticado su orden de reparación con código {order.Id}.</p>" +
                      $"<p>El coste total de su reparación será: {order.Total}. Cubriendo los siguientes servicios: </p>" +
                      $"<p>En caso desee proceder o cancelar la reparación, responda a este correo con su respuesta por favor.</p>" +
                      $"<p>Atentamente,</p>" +
                      $"<p>El equipo de Soporte Técnico</p>";

        _emailService.SendEmail(recipients, "Orden de reparación",
            "Su orden de reparación ha sido diagnosticada");
        await _unitOfWork.CommitAsync();

        return _mapper.Map<GetRepairOrder>(order);
    }

    private async Task<RepairOrder> CalculateTotals(RepairOrder order)
    {
        foreach (var diagnosisSparePart in order.Diagnoses.SelectMany(diagnosis => diagnosis.DiagnosisSpareParts))
        {
            var sparePart = await _unitOfWork.SpareParts.GetByIdAsync(diagnosisSparePart.SparePartId);

            if (sparePart == null)
            {
                throw new NotFoundException(nameof(sparePart), diagnosisSparePart.SparePartId);
            }

            order.SubTotal += sparePart.Price * diagnosisSparePart.Quantity;
        }

        var discount = order.SubTotal * order.Discount / 100;
        var igv = (order.SubTotal - discount) * 0.18f;
        order.Total = order.SubTotal + igv;

        return order;
    }

    public async Task<IEnumerable<GetSparePart>> GetSpareParts()
    {
        var spareParts = await _unitOfWork.SpareParts.GetAllAsync();
        return _mapper.Map<IEnumerable<GetSparePart>>(spareParts);
    }

    public async Task<IEnumerable<WeeklyOrder>> OrdersWeeklyReport(DateTime fromDate, DateTime toDate)
    {
        var weeklyReport = new List<WeeklyOrder>();
        for (var currentDate = fromDate; currentDate <= toDate; currentDate = currentDate.AddDays(1))
        {
            var count = await _unitOfWork.RepairOrders.CountAsync(r =>
                r.CreatedAt.Date == currentDate);
            weeklyReport.Add(new WeeklyOrder()
            {
                Name = currentDate.ToString("dd/MM"),
                Quantity = count
            });
        }

        return weeklyReport;
    }

    public async Task<IEnumerable<MonthlyOrderByState>> StatusesMonthlyReport(int year, int month)
    {
        var statuses = await _unitOfWork.OrderStatuses.GetAllAsync();
        var monthlyReport = new List<MonthlyOrderByState>();
        foreach (var status in statuses)
        {
            var count = await _unitOfWork.RepairOrders.CountAsync(r =>
                r.StatusId == status.Id && r.CreatedAt.Year == year && r.CreatedAt.Month == month);
            monthlyReport.Add(new MonthlyOrderByState()
            {
                Name = status.Name,
                Quantity = count
            });
        }

        return monthlyReport;
    }

    public async Task<IEnumerable<GetStatus>> GetOrderStatuses()
    {
        var statuses = await _unitOfWork.OrderStatuses.GetAllAsync();
        return _mapper.Map<IEnumerable<GetStatus>>(statuses);
    }

    private async Task UpdateSparePartsStock(IEnumerable<NewDiagnosis> model)
    {
        foreach (var diagnosisSparePart in model.SelectMany(diagnosis => diagnosis.SparePartAssignments))
        {
            var sparePart = await _unitOfWork.SpareParts.GetByIdAsync(diagnosisSparePart.SparePartId);
            if (sparePart == null)
            {
                throw new NotFoundException(nameof(sparePart), diagnosisSparePart.SparePartId);
            }

            sparePart.Stock -= diagnosisSparePart.Quantity;
            await _unitOfWork.SpareParts.UpdateAsync(sparePart);
        }
    }

    public async Task ResolveConfirmation(Guid id, bool nextStep)
    {
        var repairOder = await _unitOfWork.RepairOrders.GetWithDetails(id);
        if (repairOder == null)
        {
            throw new NotFoundException(nameof(repairOder), id);
        }

        if (repairOder.StatusId != new OrderStatusFactory().CreateStatus(OrderStatuses.InConfirmation).Id)
        {
            throw new AppException("No se puede actualizar una orden de reparación que no esté en confirmación");
        }

        if (nextStep)
        {
            repairOder.StatusId = new OrderStatusFactory().CreateStatus(OrderStatuses.InRepair).Id;
            repairOder.RepairRequest.StatusId = new RequestStatusFactory().CreateStatus(RequestStatuses.InProgress).Id;
        }
        else
        {
            repairOder.StatusId = new OrderStatusFactory().CreateStatus(OrderStatuses.Cancelled).Id;
            repairOder.RepairRequest.StatusId = new RequestStatusFactory().CreateStatus(RequestStatuses.Cancelled).Id;
        }

        await _unitOfWork.RepairOrders.UpdateAsync(repairOder);
        await _unitOfWork.CommitAsync();
    }

    public async Task ToReady(Guid id)
    {
        var repairOder = await _unitOfWork.RepairOrders.GetWithDetails(id);
        if (repairOder == null)
        {
            throw new NotFoundException(nameof(repairOder), id);
        }

        if (repairOder.StatusId != new OrderStatusFactory().CreateStatus(OrderStatuses.InRepair).Id)
        {
            throw new AppException("No se puede actualizar una orden de reparación que no esté en reparación");
        }

        repairOder.StatusId = new OrderStatusFactory().CreateStatus(OrderStatuses.Ready).Id;
        repairOder.RepairRequest.StatusId = new RequestStatusFactory().CreateStatus(RequestStatuses.Solved).Id;

        await _unitOfWork.RepairOrders.UpdateAsync(repairOder);
        await _unitOfWork.CommitAsync();
    }
}
