using Application.Contracts.Diagnosis.DTOs;

namespace Application.Contracts.RepairOrder.DTOs;

public class DiagnoseRepairOrder
{
    public IEnumerable<NewDiagnosis> Diagnoses { get; set; }
    public DateTime DeadLine { get; set; }
}
