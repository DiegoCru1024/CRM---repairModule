using Application.Contracts.DiagnosisSpareParts.DTOs;
using AutoMapper;
using Domain.Entities;

namespace Application.Mappings;

public class DiagnosisSparePartProfile : Profile
{
    public DiagnosisSparePartProfile()
    {
        CreateMap<SparePartAssignment, DiagnosisSparePart>();
        CreateMap<DiagnosisSparePart, AssignedSparePart>()
            .ForMember(dest => dest.SparePartName, opt => opt.MapFrom(src => src.SparePart.Name));
    }
}
