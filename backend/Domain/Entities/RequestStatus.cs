using Domain.Base;

namespace Domain.Entities;

public class RequestStatus: Status
{
    public IEnumerable<RepairRequest>? RepairRequests { get; set; }
    public RequestStatus(Guid id, string name): base(id, name)
    {
        Id = id;
        Name = name;
        RepairRequests = new List<RepairRequest>();
    }
}