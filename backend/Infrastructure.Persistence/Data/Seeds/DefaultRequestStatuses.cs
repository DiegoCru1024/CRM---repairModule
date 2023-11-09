using Application.Enums;
using Application.Factories.StatusFactory.Implementations;
using Domain.Entities;

namespace Infrastructure.Persistence.Data.Seeds;

public static class DefaultRequestStatuses
{
    public static RequestStatus[] Seed()
    {
        return (RequestStatus[])(from int item in Enum.GetValues(typeof(RequestStatuses))
            select (RequestStatuses)item
            into status
            select (RequestStatus)new RequestStatusFactory().CreateStatus(status)).ToArray();
    }
}