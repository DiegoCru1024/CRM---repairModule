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
    private readonly IValidationService _validationService;

    public RepairRequestService(IUnitOfWork unitOfWork, IMapper mapper, IValidationService validationService)
    {
        _unitOfWork = unitOfWork;
        _mapper = mapper;
        _validationService = validationService;
    }

    public async Task<RepairRequest> CreateRequest(NewRepairRequest model)
    {
        _validationService.EnsureValid(model);
        var repairRequest = _mapper.Map<RepairRequest>(model);
        repairRequest.CreatedAt = DateTime.Now;
        repairRequest.StatusId = RequestStatuses.Pending.ToId();

        var createdRequest = await _unitOfWork.RepairRequests.AddAsync(repairRequest);
        await _unitOfWork.CommitAsync();
        return createdRequest;
    }

    public async Task<GetRepairRequest?> GetRequestById(Guid id)
    {
        var repairRequest = await _unitOfWork.RepairRequests.GetByIdAsync(id);

        if (repairRequest == null)
        {
            throw new AppException("No se encontró la solicitud de reparación");
        }

        return  _mapper.Map<GetRepairRequest>(repairRequest);
    }

    public async Task<IEnumerable<GetRepairRequest>> GetAllRequests()
    {
        var repairRequests = await _unitOfWork.RepairRequests.GetAllAsync();

        return _mapper.Map<IEnumerable<GetRepairRequest>>(repairRequests);
    }
}