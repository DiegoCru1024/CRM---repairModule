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
}
