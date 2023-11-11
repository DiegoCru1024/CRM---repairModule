using Application.Repositories;
using Domain.Entities;
using Infrastructure.Persistence.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Persistence.Repositories;

public class RepairRequestRepository : GenericRepository<RepairRequest>, IRepairRequestRepository
{
    public RepairRequestRepository(ApplicationContext context) : base(context)
    {
    }

    public override async Task<RepairRequest> AddAsync(RepairRequest entity)
    {
        var newRequest = await base.AddAsync(entity);
        await DbSet.Entry(newRequest).Reference(x => x.Status).LoadAsync();
        return newRequest;
    }

    public override async Task<RepairRequest?> GetByIdAsync(Guid id)
    {
        return await DbSet.Include(x => x.Status)
            .FirstOrDefaultAsync(x => x.Id == id);
    }

    public override async Task<IEnumerable<RepairRequest>> GetAllAsync()
    {
        return await DbSet.Include(x => x.Status)
            .ToListAsync();
    }

    public async Task<IEnumerable<RepairRequest>> GetWithFiltersAsync(string? status = null, string? clientId = null)
    {
        var query = DbSet
            .Include(x => x.Status)
            .AsQueryable();

        if (!string.IsNullOrWhiteSpace(status))
        {
            query = query.Where(x => x.Status.Name.ToUpper().Contains(status.ToUpper()));
        }

        if (!string.IsNullOrWhiteSpace(clientId))
        {
            query = query.Where(x => x.ClientId.ToUpper() == clientId.ToUpper());
        }

        return await query.ToListAsync();
    }
}
