using Application.Repositories;
using Domain.Entities;
using Infrastructure.Persistence.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Persistence.Repositories;

public class RequestStatusRepository : GenericRepository<RequestStatus>, IRequestStatusRepository
{
    public RequestStatusRepository(ApplicationContext context) : base(context)
    {
    }

    public async Task<RequestStatus?> GetRequestByName(string name)
    {
        return await DbSet.FirstOrDefaultAsync(x => x.Name == name);
    }
}