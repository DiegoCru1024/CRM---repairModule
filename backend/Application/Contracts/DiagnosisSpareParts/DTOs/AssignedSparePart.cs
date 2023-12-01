namespace Application.Contracts.DiagnosisSpareParts.DTOs;

public class AssignedSparePart
{
    public Guid SparePartId { get; set; }
    public string SparePartName { get; set; }
    public int Quantity { get; set; }
}
