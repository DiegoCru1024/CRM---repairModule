using Application.Enums;
using Infrastructure.Identity.Models;
using Infrastructure.Identity.Seeds;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Identity.Data.Configurations;

public class RoleConfiguration : IEntityTypeConfiguration<Role>
{
    public void Configure(EntityTypeBuilder<Role> builder)
    {
        builder.ToTable("roles");

        builder.HasKey(role => role.Id);

        builder.Property(u => u.Id)
            .HasDefaultValueSql("gen_random_uuid()")
            .IsRequired();

        builder.HasMany(e => e.UserRoles)
            .WithOne(e => e.Role)
            .HasForeignKey(ur => ur.RoleId)
            .IsRequired();

        builder.HasData(
            DefaultRoles.Seed()
        );
    }
}