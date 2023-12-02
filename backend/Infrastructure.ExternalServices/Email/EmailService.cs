using System.Net;
using System.Net.Mail;
using Application.Services.Interfaces;

namespace Infrastructure.ExternalServices.Email;

public class EmailService : IEmailService
{
    private readonly SmtpClient _smtpClient;

    public EmailService()
    {
        _smtpClient = new SmtpClient()
        {
            Host = "smtp-mail.outlook.com",
            Port = 587,
            EnableSsl = true,
            UseDefaultCredentials = false,
            Credentials = new NetworkCredential("repairmodule.crm@outlook.com", "A@a654321"),
        };
    }

    public void SendEmail(List<string> to, string subject, string content)
    {
        var mailMessage = new MailMessage()
        {
            From = new MailAddress("repairmodule.crm@outlook.com"),
            Subject = subject,
            Body = content,
            IsBodyHtml = true,
        };

        foreach (var email in to)
        {
            mailMessage.To.Add(email);
        }

        _smtpClient.Send(mailMessage);
        _smtpClient.Dispose();
    }
}
