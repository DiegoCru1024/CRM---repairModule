using Application.Contracts.Diagnosis.DTOs;
using Application.Contracts.RepairOrder.DTOs;
using Application.Contracts.SparePart.DTOs;

namespace Application.Services.Interfaces;

public interface IRepairOrderService
{
    Task<GetRepairOrder> GetRepairOrder(Guid orderId, bool includeDetails);
    Task<IEnumerable<GetRepairOrder>> GetRepairOrders();
    Task<IEnumerable<GetRepairOrder>> GetRepairOrdersWithFilters(string? status, string? clientId,
        DateTime? fromDate, DateTime? toDate, int? limit);
    Task<GetRepairOrder> DiagnoseOrder(Guid orderId, Guid createdById, List<NewDiagnosis> model);
    Task<IEnumerable<GetSparePart>> GetSpareParts();
}
