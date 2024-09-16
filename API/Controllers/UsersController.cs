using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class UsersController(DataContext context) : BaseApiController
{
    private readonly DataContext _context = context;

    [AllowAnonymous]
    [HttpGet]
    public async Task<ActionResult<IEnumerable<AppUsers>>> GetUsers()
    {
        var users = await _context.Users.ToListAsync();
        if (users == null) return NotFound();
        return Ok(users); 
        
    }

    [Authorize]
    [HttpGet("{id}")]
    public async Task<ActionResult<AppUsers>> GetUser(int id)
    {
        var user = await _context.Users.FindAsync(id);

        if (user == null) return NotFound();
        
        return Ok(user);
    }
    
}