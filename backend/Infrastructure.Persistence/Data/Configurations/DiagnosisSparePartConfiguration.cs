using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Data.Configurations;

public class DiagnosisSparePartConfiguration : IEntityTypeConfiguration<DiagnosisSparePart>
{
    public void Configure(EntityTypeBuilder<DiagnosisSparePart> builder)
    {
        //Table
        builder.ToTable("diagnoses_spare_parts");

        //Primary Key
        builder.HasKey(dsp => new { dsp.DiagnosisId, dsp.SparePartId });
    }
}