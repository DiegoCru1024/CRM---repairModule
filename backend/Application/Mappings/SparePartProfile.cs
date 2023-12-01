using Application.Contracts.DiagnosisSpareParts.DTOs;
using Application.Contracts.SparePart.DTOs;
using AutoMapper;
using Domain.Entities;

namespace Application.Mappings;

public class SparePartProfile : Profile
{
    public SparePartProfile()
    {
        CreateMap<SparePart, GetSparePart>();
    }

}
