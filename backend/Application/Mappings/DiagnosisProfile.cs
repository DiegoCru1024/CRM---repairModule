using Application.Contracts.Diagnosis.DTOs;
using Application.Contracts.DiagnosisSpareParts.DTOs;
using AutoMapper;
using Domain.Entities;

namespace Application.Mappings;

public class DiagnosisProfile : Profile
{
    public DiagnosisProfile()
    {
        CreateMap<NewDiagnosis, Diagnosis>()
            .ForMember(dest => dest.DiagnosisSpareParts, opt => opt.MapFrom(src => src.SparePartAssignments));

        CreateMap<Diagnosis, GetDiagnosis>()
            .ForMember(dest => dest.AssignedSpareParts, opt => opt.MapFrom(src => src.DiagnosisSpareParts));

    }
}
