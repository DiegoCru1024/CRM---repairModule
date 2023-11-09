using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Data.Configurations;

public class RepairOrderConfiguration : IEntityTypeConfiguration<RepairOrder>
{
    public void Configure(EntityTypeBuilder<RepairOrder> builder)
    {
        //Table
        builder.ToTable("repair_orders");

        //Primary Key
        builder.HasKey(ro => ro.Id);

        //Properties
        builder.Property(ro => ro.Id)
            .HasDefaultValueSql("gen_random_uuid()")
            .IsRequired();

        builder.Property(ro => ro.CreatedAt)
            .IsRequired();

        builder.Property(ro => ro.ClosedAt);

        builder.Property(ro => ro.DeadLine)
            .IsRequired();

        builder.Property(ro => ro.Discount);

        builder.Property(ro => ro.SubTotal);

        builder.Property(ro => ro.Total);

        builder.Property(ro => ro.WarrantyEligible)
            .IsRequired();

        builder.Property(ro => ro.StatusId)
            .IsRequired();

        builder.Property(ro => ro.AttendedById);

        //Relationships
        builder.HasOne(ro => ro.Status)
            .WithMany(s => s.RepairOrders)
            .HasForeignKey(ro => ro.StatusId)
            .IsRequired();

        builder.HasOne(ro => ro.RepairRequest)
            .WithOne(rr => rr.RepairOrder)
            .HasForeignKey<RepairOrder>(ro=> ro.RepairRequestId)
            .IsRequired();

        builder.HasMany(ro => ro.Diagnoses)
            .WithOne(d => d.RepairOrder)
            .HasForeignKey(d => d.RepairOrderId)
            .IsRequired();

    }
}