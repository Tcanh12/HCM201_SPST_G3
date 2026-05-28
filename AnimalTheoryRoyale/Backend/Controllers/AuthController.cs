using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AnimalTheoryRoyale.Data;
using AnimalTheoryRoyale.Models;

namespace AnimalTheoryRoyale.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly IConfiguration _configuration;

    public AuthController(ApplicationDbContext context, IConfiguration configuration)
    {
        _context = context;
        _configuration = configuration;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        // Simple mock authentication for MVP
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == request.Username);
        
        if (user == null)
        {
            // Auto register for demo purposes
            user = new User
            {
                Username = request.Username,
                PasswordHash = "hashed_password", // Placeholder
                Role = request.Username.ToLower() == "admin" ? "Admin" : "Player"
            };
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
        }

        // Return a mock token containing UserId and Username
        // In a real app, you would use JwtSecurityTokenHandler here
        var mockToken = $"mock-jwt-token-{user.Id}-{user.Username}-{user.Role}";

        return Ok(new { Token = mockToken, UserId = user.Id, Username = user.Username, Role = user.Role });
    }
}

public class LoginRequest
{
    public string Username { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
}
