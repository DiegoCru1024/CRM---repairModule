using Application.Contracts.Diagnosis.DTOs;
using Application.Contracts.RepairRequest.DTOs;

namespace Application.Contracts.RepairOrder.DTOs;

public class GetRepairOrder
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
    public string Status { get; set; }
    public GetRepairRequest RepairRequest { get; set; }
    public IEnumerable<GetDiagnosis> Diagnoses { get; set; }
}
