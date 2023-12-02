using Application.Services.Interfaces;
using Infrastructure.ExternalServices.Email;
using Infrastructure.ExternalServices.SalesModule;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Infrastructure.ExternalServices;

public static class ExternalServicesExtension
{
    public static IServiceCollection AddExternalServices(
        this IServiceCollection services, IConfiguration configuration)
    {
        services.AddHttpClient<ISalesModuleService, SalesModuleService>(client =>
        {
            client.BaseAddress = new Uri(configuration["SalesModule:Url"]);
        });
        services.AddTransient<IEmailService, EmailService>();

        return services;
    }
}
