using Application.Enums;
using Domain.Base;
using Domain.Entities;

namespace Application.Factories.StatusFactory.Implementations;

public class OrderStatusFactory : StatusFactory<OrderStatuses>
{
    protected override Status FactoryMethod(OrderStatuses statusName)
    {
        return statusName switch
        {
            OrderStatuses.WaitingForDiagnosis => new OrderStatus(Guid.Parse("52ec1a9e-9711-45c4-b824-8ec28b453cb3"),
                "Esperando diagnóstico"),
            OrderStatuses.InConfirmation => new OrderStatus(Guid.Parse("52c7c858-ead7-42a0-9400-15f96e7e920c"),
                "En confirmación"),
            OrderStatuses.InRepair => new OrderStatus(Guid.Parse("986a5551-b1d4-442c-9bf4-5f2ee360f4e2"),
                "En reparación"),
            OrderStatuses.Ready => new OrderStatus(Guid.Parse("474fb0e1-115d-44d4-9ae0-ba6dec7934da"), "Listo"),
            OrderStatuses.Cancelled => new OrderStatus(Guid.Parse("e25ebe6b-be50-4d22-805a-44377b4de8ae"),
                "Cancelado"),
            _ => throw new ArgumentOutOfRangeException(nameof(statusName), statusName, null)
        };
    }
}