
namespace Domain.Entities;

public class RepairRequest
{
    // TODO: Create Motive attribute
    public Guid Id { get; set; }
    public string ClientId { get; set; }
    public string OrderId { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? ClosedAt { get; set; }
    public string Motive { get; set; }
    public string Description { get; set; }
    public int DeviceStatus { get; set; }
    public string? WarrantyId { get; set; }
    public string ContactEmailInfo { get; set; }
    public Guid StatusId { get; set; }
    public RequestStatus Status { get; set; }
}