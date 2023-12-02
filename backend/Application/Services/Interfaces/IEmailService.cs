namespace Application.Services.Interfaces;

public interface IEmailService
{
    void SendEmail(List<string> to, string subject, string content);
}
