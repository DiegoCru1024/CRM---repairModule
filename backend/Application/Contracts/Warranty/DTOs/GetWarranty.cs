using System.Text.Json.Serialization;

namespace Application.Contracts.Warranty.DTOs;

public class GetWarranty
{
    [property: JsonPropertyName("id_garantia")]
    public int Id { get; set; }

    [property: JsonPropertyName("porcentaje")]
    public float Percentage { get; set; }

    [property: JsonPropertyName("precio")]
    public float Price { get; set; }
}
