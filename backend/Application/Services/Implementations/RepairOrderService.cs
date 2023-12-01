using Application.Contracts.Diagnosis.DTOs;
using Application.Contracts.RepairOrder.DTOs;
using Application.Contracts.SparePart.DTOs;
using Application.Enums;
using Application.Exceptions;
using Application.Factories.StatusFactory.Implementations;
using Application.Proxies.RepairOrderProxy;
using Application.Repositories;
using Application.Services.Interfaces;
using AutoMapper;

namespace Application.Services.Implementations;

public class RepairOrderService : IRepairOrderService
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;
    private readonly IRetrieveRepairOrder _retrieveRepairOrder;

    public RepairOrderService(IUnitOfWork unitOfWork, IMapper mapper, IRetrieveRepairOrder retrieveRepairOrder)
    {
        _unitOfWork = unitOfWork;
        _mapper = mapper;
        _retrieveRepairOrder = retrieveRepairOrder;
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

    public async Task<IEnumerable<GetRepairOrder>> GetRepairOrdersWithFilters(string? status, string? clientId, DateTime? fromDate, DateTime? toDate, int? limit)
    {
        var orders = await _unitOfWork.RepairOrders.GetWithFilters(status, clientId, fromDate, toDate, limit);
        return _mapper.Map<IEnumerable<GetRepairOrder>>(orders);
    }

    public async Task<GetRepairOrder> DiagnoseOrder(Guid orderId, Guid createdById, List<NewDiagnosis> model)
    {
        var order = await _unitOfWork.RepairOrders.GetByIdAsync(orderId);
        if (order == null)
        {
            throw new NotFoundException(nameof(order), orderId);
        }
        _mapper.Map(model, order.Diagnoses);
        order.AttendedById = createdById;
        order.CalculateTotals();
        order.StatusId = new OrderStatusFactory().CreateStatus(OrderStatuses.InConfirmation).Id;
        order.RepairRequest.StatusId = new RequestStatusFactory().CreateStatus(RequestStatuses.Notified).Id;

        await _unitOfWork.RepairOrders.UpdateAsync(order);
        await UpdateSparePartsStock(model);
        await _unitOfWork.CommitAsync();

        return _mapper.Map<GetRepairOrder>(order);
    }

    public async Task<IEnumerable<GetSparePart>> GetSpareParts()
    {
        var spareParts = await _unitOfWork.SpareParts.GetAllAsync();
        return _mapper.Map<IEnumerable<GetSparePart>>(spareParts);
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
}
