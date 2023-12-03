using Application.Repositories;
using Domain.Entities;
using Infrastructure.Persistence.Data;

namespace Infrastructure.Persistence.Repositories;

public class OrderStatusRepository : GenericRepository<OrderStatus>, IOrderStatusRepository
{
    public OrderStatusRepository(ApplicationContext context) : base(context)
    {
    }
}
