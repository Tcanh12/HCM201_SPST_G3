using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AnimalTheoryRoyale.Data;
using AnimalTheoryRoyale.Models;

namespace AnimalTheoryRoyale.Controllers;

[ApiController]
[Route("api/[controller]")]
public class QuestionsController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public QuestionsController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetQuestions()
    {
        var questions = await _context.Questions
            .Include(q => q.Options)
            .Include(q => q.Topic)
            .ToListAsync();
        return Ok(questions);
    }

    [HttpPost]
    public async Task<IActionResult> CreateQuestion([FromBody] Question question)
    {
        _context.Questions.Add(question);
        await _context.SaveChangesAsync();
        return Ok(question);
    }

    [HttpGet("topics")]
    public async Task<IActionResult> GetTopics()
    {
        var topics = await _context.Topics.ToListAsync();
        return Ok(topics);
    }

    [HttpPost("seed")]
    public async Task<IActionResult> SeedSampleData()
    {
        if (await _context.Topics.AnyAsync()) return BadRequest("Data already seeded.");

        var topic1 = new Topic { Name = "Sự ra đời của CNXH khoa học", Description = "Phần 1" };
        var topic2 = new Topic { Name = "Dân chủ XHCN", Description = "Phần 2" };
        
        _context.Topics.AddRange(topic1, topic2);
        await _context.SaveChangesAsync();

        var q1 = new Question
        {
            TopicId = topic1.Id,
            Difficulty = "Easy",
            Content = "Chủ nghĩa xã hội khoa học do ai sáng lập?",
            Explanation = "Chủ nghĩa xã hội khoa học do C. Mác và Ph. Ăngghen sáng lập, là một trong ba bộ phận cấu thành của chủ nghĩa Mác - Lênin.",
            BaseScore = 100,
            PenaltyHP = 10,
            TimeLimit = 15,
            Options = new List<QuestionOption>
            {
                new QuestionOption { Text = "Adam Smith và David Ricardo", IsCorrect = false },
                new QuestionOption { Text = "C. Mác và Ph. Ăngghen", IsCorrect = true },
                new QuestionOption { Text = "V.I. Lênin và Stalin", IsCorrect = false },
                new QuestionOption { Text = "Hêghen và Phoiơbắc", IsCorrect = false }
            }
        };

        var q2 = new Question
        {
            TopicId = topic2.Id,
            Difficulty = "Easy",
            Content = "Bản chất của dân chủ xã hội chủ nghĩa là gì?",
            Explanation = "Dân chủ xã hội chủ nghĩa nhấn mạnh quyền lực thuộc về nhân dân và nhân dân tham gia quản lý nhà nước, xã hội.",
            BaseScore = 100,
            PenaltyHP = 10,
            TimeLimit = 15,
            Options = new List<QuestionOption>
            {
                new QuestionOption { Text = "Quyền lực thuộc về nhân dân", IsCorrect = true },
                new QuestionOption { Text = "Quyền lực thuộc về một cá nhân", IsCorrect = false },
                new QuestionOption { Text = "Quyền lực thuộc về tầng lớp bóc lột", IsCorrect = false },
                new QuestionOption { Text = "Nhân dân không tham gia quản lý xã hội", IsCorrect = false }
            }
        };

        _context.Questions.AddRange(q1, q2);

        // Add Characters
        if (!await _context.Characters.AnyAsync())
        {
            var char1 = new Character { Name = "Voi", AnimalType = "Tanker", MaxHP = 150, MoveSpeed = 60, HitboxSize = 2, InitialAmmo = 10, SkillName = "Lá Chắn Đại Ngàn", SkillCooldown = 30 };
            var char2 = new Character { Name = "Thỏ", AnimalType = "Speedster", MaxHP = 80, MoveSpeed = 130, HitboxSize = 1, InitialAmmo = 8, SkillName = "Bứt Tốc", SkillCooldown = 25 };
            var char3 = new Character { Name = "Cáo", AnimalType = "Strategist", MaxHP = 100, MoveSpeed = 110, HitboxSize = 1, InitialAmmo = 10, SkillName = "Mưu Trí", SkillCooldown = 45 };
            var char4 = new Character { Name = "Rùa", AnimalType = "Defender", MaxHP = 130, MoveSpeed = 65, HitboxSize = 2, InitialAmmo = 8, SkillName = "Mai Rùa Bảo Vệ", SkillCooldown = 35 };
            _context.Characters.AddRange(char1, char2, char3, char4);
        }

        await _context.SaveChangesAsync();
        return Ok("Seeded successfully");
    }
}
