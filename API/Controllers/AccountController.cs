using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class AccountController(DataContext _context,ITokenService _tokenService, IMapper mapper) : BaseApiController
{
    //private readonly DataContext _context = context;
    [AllowAnonymous]
    [HttpPost("register")]
    public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
    {
        if (await UserExists(registerDto.UserName)) return BadRequest("Username is taken");
        var user = mapper.Map<AppUser>(registerDto);
        user.UserName = registerDto.UserName.ToLower();

        using var hmac = new System.Security.Cryptography.HMACSHA512();

        // var user = new AppUser
        // {
        //     UserName = registerDto.UserName.ToLower(),  
        //     PasswordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(registerDto.Password)),
        //     PasswordSalt = hmac.Key
        // };

        // _context.Users.Add(user);
        // await _context.SaveChangesAsync();
        // return new UserDto
        // {
        //     UserName = user.UserName,
        //     Token = _tokenService.CreateToken(user)
        // };
        return Ok(user);
    }

    [AllowAnonymous]
    [HttpPost("login")]
    public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
    {
        var user = await _context.Users
            .SingleOrDefaultAsync(x => x.UserName.ToLower() == loginDto.UserName.ToLower());

        if (user == null) return Unauthorized("Invalid username");  

        using var hmac = new System.Security.Cryptography.HMACSHA512(user.PasswordSalt);

        var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(loginDto.Password));

        for (int i = 0; i < computedHash.Length; i++)
        {
            if (computedHash[i] != user.PasswordHash[i]) return Unauthorized("Invalid password");
        }

        return new UserDto
        {
            UserName = user.UserName,
            KnownAs = user.KnownAs,
            Token = _tokenService.CreateToken(user),
            Gender = user.Gender,
            PhotoUrl = user.Photos.FirstOrDefault(x => x.IsMain)?.Url
        };
    }

    private async Task<bool> UserExists(string username)
    {
        return await _context.Users.AnyAsync(x => x.UserName == username.ToLower());
    }
}