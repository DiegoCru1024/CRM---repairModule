namespace Application.Enums;

public enum RequestStatuses
{
    Pending,
    InProgress,
    Solved,
    Cancelled
}

public static class StatusesFunctions
{
    public static Guid ToId(this RequestStatuses status){
        switch (status)
        {
            case RequestStatuses.Pending:
                return Guid.Parse("56626b64-485b-458a-99fb-cdb5b635526e");
            case RequestStatuses.InProgress:
                return Guid.Parse("922ff6a9-ad99-4b78-8826-fc2136829e53");
            case RequestStatuses.Solved:
                return Guid.Parse("5bf32584-8ba2-467d-b7a1-e354217e6c3b");
            case RequestStatuses.Cancelled:
                return Guid.Parse("a2a674ed-e4ae-4fbc-bb1f-29b5122e1c88");
            default:
                throw new InvalidDataException();
        }
    }
}