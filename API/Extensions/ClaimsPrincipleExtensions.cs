using System.Security.Claims;

namespace API.Extensions;

public static class ClaimsPrincipleExtensions
{

    public static string GetUserName(this ClaimsPrincipal user) 
    {
        var username = user.FindFirstValue(ClaimTypes.NameIdentifier) ?? throw new Exception("Username not found");
        return username;
    }
    
}