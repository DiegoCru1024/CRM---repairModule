using Domain.Entities;

namespace Application.Repositories;

public interface IUnitOfWork : IDisposable
{
    IRepairRequestRepository RepairRequests { get; }
    IRequestStatusRepository RequestStatuses { get; }
    IRepairOrderRepository RepairOrders { get; }
    IOrderStatusRepository OrderStatuses { get; }
    ISparePartRepository SpareParts { get; }
    Task CommitAsync();
}
