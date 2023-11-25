using System.Text.Json.Serialization;

namespace Application.Contracts.Sell.DTOs;

public class GetSell
{
    [property: JsonPropertyName("id_venta")]
    public Guid Id { get; set; }

    [property: JsonPropertyName("dni_cliente")]
    public string ClientDni { get; set; }

    [property: JsonPropertyName("fecha")] public DateTime Date { get; set; }
    [property: JsonPropertyName("monto")] public float Total { get; set; }
}
