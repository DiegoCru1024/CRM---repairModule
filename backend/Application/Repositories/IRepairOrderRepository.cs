using Domain.Entities;

namespace Application.Repositories;

public interface IRepairOrderRepository : IGenericRepository<RepairOrder>
{
    Task<RepairOrder?> GetWithDetails(Guid orderId);

    Task<IEnumerable<RepairOrder>> GetWithFilters(string? status, string? clientId,
        DateTime? fromDate, DateTime? toDate, int? limit);
}
