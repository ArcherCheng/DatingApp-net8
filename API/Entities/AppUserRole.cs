using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Identity;

namespace API.Entities;

public class AppUserRole:IdentityUserRole<int>
{
    public AppUser? User { get; set; } = null;
    public AppRole? Role { get; set; } = null;
    
}