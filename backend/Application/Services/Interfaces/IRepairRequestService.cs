using Application.Contracts.RepairRequest.DTOs;
using Domain.Entities;

namespace Application.Services.Interfaces;

public interface IRepairRequestService
{
    Task<RepairRequest> CreateRequest(NewRepairRequest model);
    Task<GetRepairRequest?> GetRequestById(Guid id);
    Task<IEnumerable<GetRepairRequest>> GetAllRequests();
}