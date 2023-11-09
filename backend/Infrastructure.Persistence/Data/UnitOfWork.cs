using Application.Repositories;
using Infrastructure.Persistence.Repositories;

namespace Infrastructure.Persistence.Data;

public class UnitOfWork : IUnitOfWork
{
    private readonly ApplicationContext _context;
    public IRepairRequestRepository RepairRequests { get; }
    public IRequestStatusRepository RequestStatuses { get; }
    public IRepairOrderRepository RepairOrders { get; }

    public UnitOfWork(ApplicationContext context)
    {
        _context = context;
        RepairRequests = new RepairRequestRepository(context);
        RequestStatuses = new RequestStatusRepository(context);
        RepairOrders = new RepairOrderRepository(context);
    }

    public async Task CommitAsync()
    {
        await _context.SaveChangesAsync();
    }

    private bool _disposed;

    private void Dispose(bool disposing)
    {
        if (!_disposed)
        {
            if (disposing)
            {
                _context.Dispose();
            }
        }
        _disposed = true;
    }

    public void Dispose()
    {
        Dispose(true);
        GC.SuppressFinalize(this);
    }
}