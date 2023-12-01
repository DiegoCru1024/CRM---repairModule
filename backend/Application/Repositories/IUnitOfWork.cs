using Domain.Entities;

namespace Application.Repositories;

public interface IUnitOfWork : IDisposable
{
    IRepairRequestRepository RepairRequests { get; }
    IRequestStatusRepository RequestStatuses { get; }
    IRepairOrderRepository RepairOrders { get; }
    ISparePartRepository SpareParts { get; }
    Task CommitAsync();
}
