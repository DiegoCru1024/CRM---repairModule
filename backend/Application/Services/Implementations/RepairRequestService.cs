using Application.Contracts.RepairRequest.DTOs;
using Application.Enums;
using Application.Exceptions;
using Application.Repositories;
using Application.Services.Interfaces;
using AutoMapper;
using Domain.Entities;

namespace Application.Services.Implementations;

public class RepairRequestService: IRepairRequestService
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;

    public RepairRequestService(IUnitOfWork unitOfWork, IMapper mapper)
    {
        _unitOfWork = unitOfWork;
        _mapper = mapper;
    }

    public async Task<RepairRequest> CreateRequest(NewRepairRequest model)
    {
        var repairRequest = _mapper.Map<RepairRequest>(model);
        repairRequest.CreatedAt = DateTime.Now;
        repairRequest.StatusId = RequestStatuses.Pending.ToId();

        var createdRequest = await _unitOfWork.RepairRequests.AddAsync(repairRequest);
        await _unitOfWork.CommitAsync();
        return createdRequest;
    }

    public async Task<RepairRequest?> GetRequestById(Guid id)
    {
        var repairRequest = await _unitOfWork.RepairRequests.GetByIdAsync(id);

        if (repairRequest == null)
        {
            throw new AppException("No se encontró la solicitud de reparación");
        }

        return repairRequest;
    }

    public async Task<IEnumerable<RepairRequest>> GetAllRequests()
    {
        return await _unitOfWork.RepairRequests.GetAllAsync();
    }
}