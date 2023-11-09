using Application.Enums;
using Domain.Base;
using Domain.Entities;

namespace Application.Factories.StatusFactory.Implementations;

public class RequestStatusFactory : StatusFactory<RequestStatuses>
{
    protected override Status FactoryMethod(RequestStatuses statusName)
    {
        return statusName switch
        {
            RequestStatuses.Pending => new RequestStatus(Guid.Parse("56626b64-485b-458a-99fb-cdb5b635526e"),
                "Pendiente"),
            RequestStatuses.Notified => new RequestStatus(Guid.Parse("a2a674ed-e4ae-4fbc-bb1f-29b5122e1c88"),
                "Notificado"),
            RequestStatuses.InProgress => new RequestStatus(Guid.Parse("922ff6a9-ad99-4b78-8826-fc2136829e53"),
                "En progreso"),
            RequestStatuses.Solved => new RequestStatus(Guid.Parse("5bf32584-8ba2-467d-b7a1-e354217e6c3b"),
                "Solventado"),
            RequestStatuses.Cancelled => new RequestStatus(Guid.Parse("4f1c8ca2-c62d-444d-b711-0cc386647d83"),
                "Cancelado"),
            _ => throw new ArgumentOutOfRangeException(nameof(statusName), statusName, null)
        };
    }
}