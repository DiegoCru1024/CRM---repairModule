using Application.Contracts.RepairRequest.DTOs;
using AutoMapper;
using Domain.Entities;

namespace Application.Mappings;

public class RepairRequestProfile : Profile
{
    public RepairRequestProfile()
    {
        CreateMap<NewRepairRequest, RepairRequest>();
        CreateMap<RepairRequest, GetRepairRequest>()
            .ForMember(dest => dest.Status, opt => opt.MapFrom(src => src.Status.Name));
    }
}