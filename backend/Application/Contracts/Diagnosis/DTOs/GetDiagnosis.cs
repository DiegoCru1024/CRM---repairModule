using Application.Contracts.DiagnosisSpareParts.DTOs;
using Application.Contracts.SparePart.DTOs;

namespace Application.Contracts.Diagnosis.DTOs;

public class GetDiagnosis
{
    public Guid Id { get; set; }
    public string Description { get; set; }
    public string OfferedService { get; set; }
    public string? Note { get; set; }
    public IEnumerable<AssignedSparePart> AssignedSpareParts { get; set; }
}
