using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Data.Configurations;

public class DiagnosisConfiguration : IEntityTypeConfiguration<Diagnosis>
{
    public void Configure(EntityTypeBuilder<Diagnosis> builder)
    {
        //Table
        builder.ToTable("diagnoses");

        //Primary Key
        builder.HasKey(d => d.Id);

        //Properties
        builder.Property(d => d.Id)
            .HasDefaultValueSql("gen_random_uuid()")
            .IsRequired();

        builder.Property(d => d.Description)
            .HasMaxLength(500)
            .IsRequired();

        builder.Property(d => d.OfferedService)
            .HasMaxLength(500)
            .IsRequired();

        builder.Property(d => d.Note)
            .HasMaxLength(500);

        //Relationships
        builder.HasOne(d => d.RepairOrder)
            .WithMany(ro => ro.Diagnoses)
            .IsRequired();

        builder.HasMany(d => d.DiagnosisSpareParts)
            .WithOne(dsp => dsp.Diagnosis)
            .HasForeignKey(dsp => dsp.DiagnosisId)
            .IsRequired();
    }
}