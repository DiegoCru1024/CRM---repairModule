namespace Application.Services.Interfaces;

public interface IEmailService
{
    Task SendEmail(List<string> to, string subject, string content);
}
