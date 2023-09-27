namespace Domain.Entities;

public class RequestStatus
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public IEnumerable<RepairRequest>? RepairRequests { get; set; }
    public RequestStatus(Guid id, string name)
    {
        Id = id;
        Name = name;
    }
}