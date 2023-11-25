using System.Reflection;
using Application.Services.Implementations;
using Application.Services.Interfaces;
using FluentValidation;
using Microsoft.Extensions.DependencyInjection;

namespace Application;

public static class ApplicationServicesExtension
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services)
    {
        services.AddAutoMapper(Assembly.GetExecutingAssembly());
        services.AddValidatorsFromAssembly(Assembly.GetExecutingAssembly());

        #region Services
        services.AddScoped<IRepairRequestService, RepairRequestService>();
        services.AddScoped<IValidationObjectService, ValidationObjectService>();
        #endregion

        return services;
    }
}