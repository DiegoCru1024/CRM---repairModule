using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Data.Configurations;

public class SparePartConfiguration : IEntityTypeConfiguration<SparePart>
{
    public void Configure(EntityTypeBuilder<SparePart> builder)
    {
        //Table
        builder.ToTable("spare_parts");
        
        //Primary Key
        builder.HasKey(sp => sp.Id);

        //Properties
        builder.Property(sp => sp.Id)
            .HasDefaultValueSql("gen_random_uuid()")
            .IsRequired();

        builder.Property(sp => sp.Name)
            .HasMaxLength(200)
            .IsRequired();

        builder.Property(sp => sp.Price)
            .IsRequired();

        builder.Property(sp => sp.Stock)
            .IsRequired();

        //Relationships
        builder.HasMany(sp => sp.DiagnosisSpareParts)
            .WithOne(dsp => dsp.SparePart)
            .HasForeignKey(dsp => dsp.SparePartId)
            .IsRequired();
    }
}