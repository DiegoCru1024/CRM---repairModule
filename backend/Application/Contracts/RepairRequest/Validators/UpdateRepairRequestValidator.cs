using Application.Contracts.RepairRequest.DTOs;
using FluentValidation;

namespace Application.Contracts.RepairRequest.Validators;

public class UpdateRepairRequestValidator : AbstractValidator<UpdateRepairRequest>
{
    public UpdateRepairRequestValidator()
    {
        RuleFor(x => x.Motive)
            .NotEmpty()
            .WithMessage("El motivo es requerido");

        RuleFor(x => x.Description)
            .NotEmpty()
            .WithMessage("La descripción es requerida");

        RuleFor(x => x.DeviceStatus)
            .NotEmpty()
            .WithMessage("El estado del dispositivo es requerido");

        RuleFor(x => x.ContactEmailInfo)
            .NotEmpty()
            .WithMessage("El email de contacto es requerido")
            .EmailAddress()
            .WithMessage("El email de contacto no es válido");
    }
}