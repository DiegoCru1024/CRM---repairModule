namespace Domain.Entities;

public class Diagnosis
{
    public Guid Id { get; set; }
    public string Description { get; set; }
    public string OfferedService { get; set; }
    public string? Note { get; set; }
    public Guid RepairOrderId { get; set; }
    public RepairOrder RepairOrder { get; set; }
    public IEnumerable<DiagnosisSparePart> DiagnosisSpareParts { get; set; }
}