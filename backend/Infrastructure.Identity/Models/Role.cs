using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Identity.Models;

public sealed class Role: IdentityRole<Guid>
{
    public ICollection<UserRole>? UserRoles { get; set; }

    public Role(Guid id, string name)
    {
        this.Id = id;
        this.Name = name;
        this.NormalizedName = name.ToUpper();
    }
}