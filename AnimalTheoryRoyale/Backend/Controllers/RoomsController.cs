using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AnimalTheoryRoyale.Data;
using AnimalTheoryRoyale.Models;
using AnimalTheoryRoyale.Services;

namespace AnimalTheoryRoyale.Controllers;

[ApiController]
[Route("api/[controller]")]
public class RoomsController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly GameEngine _gameEngine;

    public RoomsController(ApplicationDbContext context, GameEngine gameEngine)
    {
        _context = context;
        _gameEngine = gameEngine;
    }

    [HttpPost("create")]
    public async Task<IActionResult> CreateRoom([FromBody] CreateRoomRequest request)
    {
        // Ensure host exists
        var host = await _context.Users.FindAsync(request.HostId);
        if (host == null)
        {
            host = new User { Username = "Admin_Host", Role = "Admin" };
            _context.Users.Add(host);
            await _context.SaveChangesAsync();
            // Update request.HostId to the newly created user's ID
            request.HostId = host.Id;
        }

        // 1. Generate unique 5-character code
        string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        var random = new Random();
        string roomCode = new string(Enumerable.Repeat(chars, 5).Select(s => s[random.Next(s.Length)]).ToArray());

        var room = new Room
        {
            Code = roomCode,
            HostId = request.HostId,
            MaxPlayers = request.MaxPlayers,
            GameDuration = request.GameDuration,
            Setting = new RoomSetting
            {
                DifficultyMode = request.Difficulty,
                EnableWeapon = request.EnableWeapon,
                SafeZoneMode = "Normal"
            }
        };

        _context.Rooms.Add(room);
        await _context.SaveChangesAsync();

        return Ok(new { RoomId = room.Id, RoomCode = room.Code });
    }

    [HttpPost("{roomCode}/start")]
    public async Task<IActionResult> StartGame(string roomCode)
    {
        var room = await _context.Rooms.FirstOrDefaultAsync(r => r.Code == roomCode);
        if (room == null) return NotFound("Room not found");

        room.Status = "Playing";
        room.StartedAt = DateTime.UtcNow;
        await _context.SaveChangesAsync();

        // Inform GameEngine to activate
        var game = _gameEngine.GetGame(roomCode);
        if (game != null)
        {
            game.Status = "Playing";
            game.StartTime = DateTime.UtcNow;
        }

        return Ok(new { Message = "Game Started" });
    }

    [HttpGet("characters")]
    public async Task<IActionResult> GetCharacters()
    {
        var characters = await _context.Characters.ToListAsync();
        return Ok(characters);
    }
}

public class CreateRoomRequest
{
    public int HostId { get; set; }
    public int MaxPlayers { get; set; }
    public int GameDuration { get; set; }
    public string Difficulty { get; set; } = "Mixed";
    public bool EnableWeapon { get; set; } = true;
}
