using Application.Contracts.RepairRequest.DTOs;
using Domain.Entities;

namespace Application.Services.Interfaces;

public interface IRepairRequestService
{
    Task<RepairRequest> CreateRequest(NewRepairRequest model);
    Task<RepairRequest?> GetRequestById(Guid id);
    Task<IEnumerable<RepairRequest>> GetAllRequests();

}