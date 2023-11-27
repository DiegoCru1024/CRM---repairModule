namespace Application.Exceptions;

public class NotFoundException : Exception
{
    public NotFoundException(string entityName, object key) : base($"Entity '{entityName}' ({key}) was not found.")
    {
    }

    public NotFoundException(string entityName, string propertyName, object key) : base($"Entity '{entityName}' with {propertyName} = ({key}) was not found.")
    {
    }
}
