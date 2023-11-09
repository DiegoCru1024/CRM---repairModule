using Domain.Base;

namespace Domain.Entities;

public class OrderStatus: Status
{
    public IEnumerable<RepairOrder>? RepairOrders { get; set; }
    public OrderStatus(Guid id, string name): base(id, name)
    {
        Id = id;
        Name = name;
        RepairOrders = new List<RepairOrder>();
    }
}