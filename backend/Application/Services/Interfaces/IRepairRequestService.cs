using Application.Contracts.RepairRequest.DTOs;
using Application.Contracts.Status;
using Domain.Base;
using Domain.Entities;

namespace Application.Services.Interfaces;

public interface IRepairRequestService
{
    Task<GetRepairRequest> CreateRequest(NewRepairRequest model, Guid createdById);
    Task<GetRepairRequest?> GetRequestById(Guid id);
    Task<IEnumerable<GetRepairRequest>> GetAllRequests();
    Task<RepairRequest> UpdateRequest(Guid id, UpdateRepairRequest model);
    Task<IEnumerable<GetStatus>> GetRequestStatuses();

    Task<IEnumerable<GetRepairRequest>> GetRequestsWithFilters(string? status, string? clientId, DateTime? fromDate,
        DateTime? toDate, int? limit);
}
