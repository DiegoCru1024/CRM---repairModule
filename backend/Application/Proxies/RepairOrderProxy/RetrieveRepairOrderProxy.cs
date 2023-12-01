using Application.Contracts.RepairOrder.DTOs;
using Application.Exceptions;
using Application.Repositories;
using AutoMapper;
using Domain.Entities;

namespace Application.Proxies.RepairOrderProxy;

public class RetrieveRepairOrderProxy : IRetrieveRepairOrder
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;

    public RetrieveRepairOrderProxy(IUnitOfWork unitOfWork, IMapper mapper)
    {
        _unitOfWork = unitOfWork;
        _mapper = mapper;
    }


    public async Task<GetRepairOrder> GetRepairOrder(Guid orderId, bool includeDetails)
    {
        RepairOrder? order;
        if (includeDetails)
        {
            order = await _unitOfWork.RepairOrders.GetWithDetails(orderId);
        }
        else
        {
            order = await _unitOfWork.RepairOrders.GetByIdAsync(orderId);
        }

        if (order == null)
        {
            throw new NotFoundException(nameof(order), orderId);
        }

        return _mapper.Map<GetRepairOrder>(order);
    }
}
