using Application.Enums;
using Application.Factories.StatusFactory.Implementations;
using Domain.Entities;

namespace Infrastructure.Persistence.Data.Seeds;

public static class DefaultOrderStatuses
{
    public static OrderStatus[] Seed()
    {
        return (from int item in Enum.GetValues(typeof(OrderStatuses))
            select (OrderStatuses)item
            into status
            select (OrderStatus)new OrderStatusFactory().CreateStatus(status)).ToArray();
    }
}