using EmployeeApi.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly EmployeeDbContext _context;
    private readonly IConfiguration _configuration;

    public AuthController(
        EmployeeDbContext context,
        IConfiguration configuration)
    {
        _context = context;
        _configuration = configuration;
    }

    [HttpPost("login")]
    public IActionResult Login(LoginRequest request)
    {
        var user = _context.Employees.FirstOrDefault(x =>
            x.email == request.email &&
            x.contact == request.contactNbr);

        if (user == null)
            return Unauthorized("Invalid credentials");

        var token = GenerateToken(user);

        return Ok(new
        {
            token,
            userId = user.employeeId,
            name = user.name,
            email = user.email,
            role = user.role
        });
    }

    private string GenerateToken(Employee user)
    {
        var claims = new[]
        {
            new Claim(ClaimTypes.Name, user.name),
            new Claim(ClaimTypes.Email, user.email),
            new Claim(ClaimTypes.Role, user.role),
            new Claim("EmployeeId",
                user.employeeId.ToString())
        };

        var key = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(_configuration["JwtConfig:Key"]));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: _configuration["JwtConfig:Issuer"],
            audience: _configuration["JwtConfig:Audience"],
            claims: claims,
            expires: DateTime.Now.AddHours(1),
            signingCredentials: creds);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}