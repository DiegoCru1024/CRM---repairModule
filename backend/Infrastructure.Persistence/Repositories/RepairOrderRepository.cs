using Application.Enums;
using Application.Factories.StatusFactory.Implementations;
using Application.Repositories;
using Domain.Entities;
using Infrastructure.Persistence.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Persistence.Repositories;

public class RepairOrderRepository : GenericRepository<RepairOrder>, IRepairOrderRepository
{
    public RepairOrderRepository(ApplicationContext context) : base(context)
    {
    }

    public override async Task<RepairOrder?> GetByIdAsync(Guid id)
    {
        return await DbSet.Include(x => x.Diagnoses)
            .Include(x => x.Status)
            .FirstOrDefaultAsync(x => x.Id == id);
    }

    public override async Task<IEnumerable<RepairOrder>> GetAllAsync()
    {
        return await DbSet.Include(x => x.Status)
            .Include(x => x.RepairRequest)
            .ThenInclude(x => x.Status)
            .ToListAsync();
    }

    public async Task<RepairOrder?> GetWithDetails(Guid orderId)
    {
        return await DbSet.Include(x => x.Diagnoses)
            .ThenInclude(x => x.DiagnosisSpareParts)
            .ThenInclude(x => x.SparePart)
            .Include(x => x.RepairRequest)
            .Include(x => x.Status)
            .FirstOrDefaultAsync(x => x.Id == orderId);
    }

    public async Task<IEnumerable<RepairOrder>> GetWithFilters(string? status = null, string? clientId = null,
        DateTime? fromDate = null, DateTime? toDate = null, int? limit = null)
    {
        var query = DbSet
            .Include(x => x.Status)
            .Include(x => x.RepairRequest)
            .OrderByDescending(x => x.CreatedAt)
            .AsQueryable();

        if (!string.IsNullOrWhiteSpace(status))
        {
            query = query.Where(x => x.Status.Name.ToUpper().Contains(status.ToUpper()));
        }

        if (!string.IsNullOrWhiteSpace(clientId))
        {
            query = query.Where(x => string.Equals(x.RepairRequest.ClientId, clientId, StringComparison.CurrentCultureIgnoreCase));
        }

        if (fromDate != null)
        {
            query = query.Where(x => x.CreatedAt >= fromDate);
        }

        if (toDate != null)
        {
            query = query.Where(x => x.CreatedAt <= toDate);
        }

        if (limit != null)
        {
            query = query.Take((int) limit);
        }

        return await query.ToListAsync();
    }
}
