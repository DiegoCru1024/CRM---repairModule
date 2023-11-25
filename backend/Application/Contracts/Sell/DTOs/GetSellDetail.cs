using System.Text.Json.Serialization;

namespace Application.Contracts.Sell.DTOs;

public class GetSellDetail
{
    [property: JsonPropertyName("id_detalle")]
    public Guid Id { get; set; }

    [property: JsonPropertyName("id_venta")]
    public Guid SellId { get; set; }

    [property: JsonPropertyName("id_producto")]
    public Guid ProductId { get; set; }

    [property: JsonPropertyName("cantidad")]
    public int Quantity { get; set; }

    [property: JsonPropertyName("id_garantia")]
    public int WarrantyId { get; set; }

    [property: JsonPropertyName("tipo")]
    public string Type { get; set; }

    [property: JsonPropertyName("tiempo_garantia")]
    public int WarrantyTime { get; set; }

    [property: JsonPropertyName("coste_total")]
    public float TotalCost { get; set; }
}
