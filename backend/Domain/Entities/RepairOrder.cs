namespace Domain.Entities;

public class RepairOrder
{
    public Guid Id { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime ClosedAt { get; set; }
    public DateTime DeadLine { get; set; }
    public float Discount { get; set; }
    public float SubTotal { get; set; }
    public float Total { get; set; }
    public bool WarrantyEligible { get; set; }
    public Guid? AttendedById { get; set; }
    public Guid StatusId { get; set; }
    public OrderStatus Status { get; set; }
    public Guid RepairRequestId { get; set; }
    public RepairRequest RepairRequest { get; set; }
    public IEnumerable<Diagnosis> Diagnoses { get; set; }
}