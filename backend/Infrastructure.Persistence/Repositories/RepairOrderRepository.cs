using Application.Repositories;
using Domain.Entities;
using Infrastructure.Persistence.Data;

namespace Infrastructure.Persistence.Repositories;

public class RepairOrderRepository : GenericRepository<RepairOrder>, IRepairOrderRepository
{
    public RepairOrderRepository(ApplicationContext context) : base(context)
    {
    }
}