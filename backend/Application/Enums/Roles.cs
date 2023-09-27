namespace Application.Enums;

public enum Roles
{
    Advisor,
    Technician
}

public static class RolesFunctions
{
    public static Guid ToId(this Roles role){
        switch (role)
        {
            case Roles.Advisor:
                return Guid.Parse("158c6250-93ac-462c-8704-70d242767b67");
            case Roles.Technician:
                return Guid.Parse("a8524222-605d-4ad4-8ff8-8a382b3b748d");
            default:
                throw new InvalidDataException();
        }
    }
}