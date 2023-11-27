namespace Application.Services.Interfaces;

public interface IValidationObjectService
{
    void EnsureValid<T>(T obj);
}
