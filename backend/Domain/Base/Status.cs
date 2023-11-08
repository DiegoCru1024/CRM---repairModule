namespace Domain.Base;

public class Status
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    protected Status(Guid id, string name)
    {
        Id = id;
        Name = name;
    }
}