using Application.Enums;
using Domain.Base;
using Domain.Entities;

namespace Application.Factories.StatusFactory;

public abstract class StatusFactory<T> where T : Enum
{
    protected abstract Status FactoryMethod(T statusName);
    public Status CreateStatus(T statusName)
    {
        Status status = FactoryMethod(statusName);
        return status;
    }
}