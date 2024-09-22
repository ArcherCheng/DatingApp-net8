using System.Security.Claims;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class UsersController(IUserRepository userRepository, IMapper mapper) : BaseApiController
{

    [Authorize]
    [HttpGet]
    public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers()
    {
        // var users = await _context.Users.ToListAsync();
        // if (users == null) return NotFound();
        // return Ok(users); 

        var users = await userRepository.GetMembersAsync();
        return Ok(users);
        
    }

    [Authorize]
    [HttpGet("{username}")]
    public async Task<ActionResult<MemberDto>> GetUser(string username)
    {
        // var user = await _context.Users.FindAsync(id);
        // if (user == null) return NotFound();
        // return Ok(user);
        //var currentUsername = User.GetUsername();
        var user = await userRepository.GetMemberAsync(username);
        if (user == null) return NotFound();
        return Ok(user);
    }

    [HttpPut]
    public async Task<ActionResult> UpdateUser(MemberUpdateDto memberUpdateDto)
    {
        var username = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (username == null) return BadRequest("User not found");
        var user = await userRepository.GetUserByUsernameAsync(username);
        if (user == null) return NotFound();
        mapper.Map(memberUpdateDto, user);
        //userRepository.Update(user);
        if (await userRepository.SaveAllAsync(user)) return NoContent();
        return BadRequest("Failed to update user");
    }
    
}