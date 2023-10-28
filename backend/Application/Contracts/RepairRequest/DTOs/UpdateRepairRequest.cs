namespace Application.Contracts.RepairRequest.DTOs;

public class UpdateRepairRequest
{
    public string Motive { get; set; }
    public string Description { get; set; }
    public int DeviceStatus { get; set; }
    public string ContactEmailInfo { get; set; }
}