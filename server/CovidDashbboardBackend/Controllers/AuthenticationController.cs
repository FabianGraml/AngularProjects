using CovidDashbboardBackend.DTOs;
using CovidDashbboardBackend.Models;
using CovidDashbboardBackend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace CovidDashbboardBackend.Controllers;

[Route("api")]
[ApiController]
public class AuthenticationController : ControllerBase
{
    private readonly UserService? userService;
    private readonly AppSettings? appSettings;

    public AuthenticationController(UserService userService, IOptions<AppSettings> appSettings)
    {
        this.userService = userService;
        this.appSettings = appSettings.Value;
    }
    [AllowAnonymous]
    [HttpPost("authenticate")]
    public ActionResult<AuthenticationDTO> Authenticate([FromBody] UserDTO userDTO)
    {
        var user = userService!.Authenticate(userDTO.Email!, userDTO.Password!);
        if (user == null) return Unauthorized();

        string tokenString = CreatTokenString(user);

        return Ok(new AuthenticationDTO
        {
            Id = user.Id,
            Email = user.Email,
            FirstName = user.Firstname,
            LastName = user.Lastname,
            Token = tokenString
        });
    }
    private string CreatTokenString(User user)
    {

        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(appSettings!.Secret!);

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new[] {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.Email!),
                new Claim(ClaimTypes.GivenName, user.Firstname!),
                new Claim(ClaimTypes.Surname, user.Lastname!),
            }),
            Expires = DateTime.UtcNow.AddHours(4),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
        };

        var token = tokenHandler.CreateToken(tokenDescriptor);
        var tokenString = tokenHandler.WriteToken(token);
        return tokenString;
    }
}

