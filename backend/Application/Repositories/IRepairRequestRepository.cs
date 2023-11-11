using Domain.Entities;

namespace Application.Repositories;

public interface IRepairRequestRepository : IGenericRepository<RepairRequest>
{ Task<IEnumerable<RepairRequest>> GetWithFiltersAsync(string? status, string? clientId);
}