using Application.Enums;
using Domain.Entities;

namespace Infrastructure.Persistence.Seeds;

public static class DefaultRequestStatuses
{
    public static RequestStatus[] Seed()
    {
        return (from int item in Enum.GetValues(typeof(RequestStatuses)) select (RequestStatuses)item into status select new RequestStatus(status.ToId(), status.ToString())).ToArray();
    }
}