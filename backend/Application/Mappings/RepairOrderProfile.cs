using Application.Contracts.RepairOrder.DTOs;
using AutoMapper;
using Domain.Entities;

namespace Application.Mappings;

public class RepairOrderProfile : Profile
{
    public RepairOrderProfile()
    {
        CreateMap<RepairOrder, GetRepairOrder>()
            .ForMember(dest => dest.Status, opt => opt.MapFrom(src => src.Status.Name))
            .ForMember(dest => dest.Diagnoses, opt => opt.MapFrom(src => src.Diagnoses))
            .ForMember(dest => dest.RepairRequest, opt => opt.MapFrom(src => src.RepairRequest));
    }
}
