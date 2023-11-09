namespace Domain.Entities;

public class SparePart
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public float Price { get; set; }
    public int Stock { get; set; }
    public IEnumerable<DiagnosisSparePart> DiagnosisSpareParts { get; set; }
}