using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly DataContext _context;

    public UsersController(DataContext context)
    {
        _context = context;
    }
    [HttpGet]
    public async Task<ActionResult<IEnumerable<AppUsers>>> GetUsers()
    {
        var users = await _context.Users.ToListAsync();
        if (users == null) return NotFound();
        return Ok(users); 
        
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<AppUsers>> GetUser(int id)
    {
        var user = await _context.Users.FindAsync(id);

        if (user == null) return NotFound();
        
        return Ok(user);
    }
    
}