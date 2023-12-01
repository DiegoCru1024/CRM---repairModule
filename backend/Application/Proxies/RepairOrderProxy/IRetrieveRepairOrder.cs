using Application.Contracts.RepairOrder.DTOs;

namespace Application.Proxies.RepairOrderProxy;

public interface IRetrieveRepairOrder
{
    public Task<GetRepairOrder> GetRepairOrder(Guid orderId, bool includeDetails);
}
