using System.ComponentModel.DataAnnotations;

namespace API.Dtos;

public class LoginDto
{
    [Required]
    public required string Username { get; set; }
    
    [Required]
    public required string Password { get; set; }
}