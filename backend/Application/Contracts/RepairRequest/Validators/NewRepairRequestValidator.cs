using Application.Contracts.RepairRequest.DTOs;
using Application.Enums;
using FluentValidation;

namespace Application.Contracts.RepairRequest.Validators;

public class NewRepairRequestValidator: AbstractValidator<NewRepairRequest>
{
    public NewRepairRequestValidator()
    {
        RuleFor(x => x.ClientId)
            .NotEmpty()
            .WithMessage("El id del cliente es requerido");

        RuleFor(x => x.OrderId)
            .NotEmpty()
            .WithMessage("El id de la orden es requerido");

        RuleFor(x => x.Description)
            .NotEmpty()
            .WithMessage("La descripción es requerida");

        RuleFor(x => x.DeviceStatus)
            .NotEmpty()
            .WithMessage("El estado del dispositivo es requerido");

        RuleFor(x => x.ContactEmailInfo)
            .NotEmpty()
            .WithMessage("El email de contacto es requerido");
    }
}