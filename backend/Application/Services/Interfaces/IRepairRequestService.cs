using Application.Contracts.RepairRequest.DTOs;
using Application.Contracts.Status;
using Domain.Base;
using Domain.Entities;

namespace Application.Services.Interfaces;

public interface IRepairRequestService
{
    Task<RepairRequest> CreateRequest(NewRepairRequest model, Guid CreatedById);
    Task<GetRepairRequest?> GetRequestById(Guid id);
    Task<IEnumerable<GetRepairRequest>> GetAllRequests();
    Task<RepairRequest> UpdateRequest(Guid id, UpdateRepairRequest model);
    Task<IEnumerable<GetStatus>> GetRequestStatuses();
}