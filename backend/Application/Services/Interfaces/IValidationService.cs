namespace Application.Services.Interfaces;

public interface IValidationService
{
    void EnsureValid<T>(T obj);
}