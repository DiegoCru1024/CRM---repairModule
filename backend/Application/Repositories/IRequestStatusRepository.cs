using Domain.Entities;

namespace Application.Repositories;

public interface IRequestStatusRepository : IGenericRepository<RequestStatus>
{
    public Task<RequestStatus?> GetRequestByName(string name);
}