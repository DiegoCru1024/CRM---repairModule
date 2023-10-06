using Application.Enums;
using Infrastructure.Identity.Models;

namespace Infrastructure.Identity.Data.Seeds;

public static class DefaultRoles
{
    public static Role[] Seed()
    {
        return (from int item in Enum.GetValues(typeof(Roles)) select (Roles)item into status select new Role(status.ToId(), status.ToString())).ToArray();
    }

}