namespace Domain.Entities;

public class DiagnosisSparePart
{
    public Guid DiagnosisId { get; set; }
    public Diagnosis Diagnosis { get; set; }
    public Guid SparePartId { get; set; }
    public SparePart SparePart { get; set; }
    public int Quantity { get; set; }
}