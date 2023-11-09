
namespace Domain.Entities;

public class RepairRequest
{
    public Guid Id { get; set; }
    public string ClientId { get; set; }
    public string PurchaseOrderId { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? ClosedAt { get; set; }
    public string Motive { get; set; }
    public string Description { get; set; }
    public int DeviceStatus { get; set; }
    public string? WarrantyId { get; set; }
    public string ContactEmailInfo { get; set; }
    public Guid CreatedById { get; set; }
    public Guid StatusId { get; set; }
    public RequestStatus Status { get; set; }
    public Guid RepairOrderId { get; set; }
    public RepairOrder RepairOrder { get; set; }
}