namespace Application.Contracts.SparePart.DTOs;

public class GetSparePart
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public float Price { get; set; }
    public int Stock { get; set; }
}
