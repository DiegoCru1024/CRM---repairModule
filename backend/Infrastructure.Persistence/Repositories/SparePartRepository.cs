using Application.Repositories;
using Domain.Entities;
using Infrastructure.Persistence.Data;

namespace Infrastructure.Persistence.Repositories;

public class SparePartRepository : GenericRepository<SparePart>, ISparePartRepository
{
    public SparePartRepository(ApplicationContext context) : base(context)
    {
    }
}
