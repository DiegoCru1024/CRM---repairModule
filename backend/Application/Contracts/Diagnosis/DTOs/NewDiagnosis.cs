using Application.Contracts.DiagnosisSpareParts.DTOs;

namespace Application.Contracts.Diagnosis.DTOs;

public class NewDiagnosis
{
    public string Description { get; set; }
    public string OfferedService { get; set; }
    public string? Note { get; set; }
    public List<SparePartAssignment> SparePartAssignments { get; set; }
}
