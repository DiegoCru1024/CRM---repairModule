using Application.Services.Interfaces;
using Infrastructure.ExternalServices.SalesModule.Services;
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

        return services;
    }
}
