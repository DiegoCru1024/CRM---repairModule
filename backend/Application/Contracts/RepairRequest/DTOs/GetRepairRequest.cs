namespace Application.Contracts.RepairRequest.DTOs;

public class GetRepairRequest
{
    public Guid Id { get; set; }
    public string ClientId { get; set; }
    public string PurchaseOrderId { get; set; }
    public string ProductId { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? ClosedAt { get; set; }
    public string Motive { get; set; }
    public string Description { get; set; }
    public int DeviceStatus { get; set; }
    public string? WarrantyId { get; set; }
    public string ContactEmailInfo { get; set; }
    public string Status { get; set; }
}