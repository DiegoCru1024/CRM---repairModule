using Application.Enums;
using Domain.Entities;
using Infrastructure.Persistence.Seeds;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Data.Configurations;

public class RequestStatusConfiguration : IEntityTypeConfiguration<RequestStatus>
{
    public void Configure(EntityTypeBuilder<RequestStatus> builder)
    {
        //Table
        builder.ToTable("request_statuses");

        //Primary Key
        builder.HasKey(rs => rs.Id);

        builder.Property(rs => rs.Id)
            .HasDefaultValueSql("gen_random_uuid()")
            .IsRequired();

        builder.Property(rs => rs.Name)
            .HasMaxLength(20)
            .IsRequired();

        builder.HasData(
            DefaultRequestStatuses.Seed()
        );
    }

}