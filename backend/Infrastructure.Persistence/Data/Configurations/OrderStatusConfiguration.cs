using Domain.Entities;
using Infrastructure.Persistence.Data.Seeds;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Data.Configurations;

public class OrderStatusConfiguration : IEntityTypeConfiguration<OrderStatus>
{
    public void Configure(EntityTypeBuilder<OrderStatus> builder)
    {
        //Table
        builder.ToTable("order_statuses");

        //Primary key
        builder.HasKey(os => os.Id);

        //Properties
        builder.Property(os => os.Id)
            .HasDefaultValueSql("gen_random_uuid()")
            .IsRequired();

        builder.Property(os => os.Name)
            .HasMaxLength(50)
            .IsRequired();

        //Seed Data
        builder.HasData(
            DefaultOrderStatuses.Seed()
        );
    }
}