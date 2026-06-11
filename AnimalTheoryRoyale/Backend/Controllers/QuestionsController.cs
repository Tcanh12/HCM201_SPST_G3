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
    private readonly IWebHostEnvironment _env;

    public QuestionsController(ApplicationDbContext context, IWebHostEnvironment env)
    {
        _context = context;
        _env = env;
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

    /// <summary>
    /// DELETE all questions, options, and topics from the database.
    /// Call this before re-seeding with new data.
    /// </summary>
    [HttpPost("clear")]
    public async Task<IActionResult> ClearAllQuestions()
    {
        var optionCount = await _context.QuestionOptions.CountAsync();
        var questionCount = await _context.Questions.CountAsync();
        var topicCount = await _context.Topics.CountAsync();

        _context.QuestionOptions.RemoveRange(_context.QuestionOptions);
        _context.Questions.RemoveRange(_context.Questions);
        _context.Topics.RemoveRange(_context.Topics);
        await _context.SaveChangesAsync();

        return Ok(new { 
            message = "Đã xoá toàn bộ dữ liệu câu hỏi.", 
            deletedOptions = optionCount, 
            deletedQuestions = questionCount, 
            deletedTopics = topicCount 
        });
    }

    [HttpGet("seed")]
    public async Task<IActionResult> SeedSampleData([FromQuery] string adminSecret)
    {
        if (adminSecret != "HCM201_SECRET" && !_env.IsDevelopment())
        {
            return Unauthorized(new { message = "Invalid admin secret." });
        }

        try
        {
            int newlyAdded = 0;
            int ignoredDuplicates = 0;
            var typeBreakdown = new Dictionary<string, int>();

            var rawPath = Path.Combine(Directory.GetCurrentDirectory(), "Data", "questions_raw.txt");
            if (System.IO.File.Exists(rawPath))
            {
                var lines = await System.IO.File.ReadAllLinesAsync(rawPath);
                var currentTopic = "";
                var currentDifficulty = "Easy";
                var currentContent = "";
                var currentExplanation = "";
                var currentCorrect = "";
                var currentOptions = new List<QuestionOption>();

                Topic? topic1 = await _context.Topics.FirstOrDefaultAsync(t => t.Name == "Sự ra đời của CNXH khoa học");
                if (topic1 == null) { topic1 = new Topic { Name = "Sự ra đời của CNXH khoa học" }; _context.Topics.Add(topic1); }
                await _context.SaveChangesAsync();

                foreach (var line in lines)
                {
                    var l = line.Trim();
                    if (string.IsNullOrEmpty(l)) continue;
                    
                    if (l.StartsWith("### Câu"))
                    {
                        if (!string.IsNullOrEmpty(currentContent) && currentOptions.Count > 0)
                        {
                            bool added = await AddParsedQuestion(currentTopic, currentDifficulty, currentContent, currentExplanation, currentCorrect, currentOptions);
                            if (added) { newlyAdded++; IncrementStat(typeBreakdown, "MultipleChoice"); } else ignoredDuplicates++;
                        }
                        currentOptions = new List<QuestionOption>();
                        currentTopic = ""; currentDifficulty = "Easy"; currentContent = ""; currentExplanation = ""; currentCorrect = "";
                    }
                    else if (l.StartsWith("**Chủ đề:**")) currentTopic = l.Replace("**Chủ đề:**", "").Trim();
                    else if (l.StartsWith("**Độ khó:**")) 
                    {
                        var d = l.Replace("**Độ khó:**", "").Trim();
                        if (d == "Dễ") currentDifficulty = "Easy";
                        else if (d == "Trung bình") currentDifficulty = "Medium";
                        else if (d == "Khó") currentDifficulty = "Hard";
                    }
                    else if (l.StartsWith("**Câu hỏi:**")) currentContent = l.Replace("**Câu hỏi:**", "").Trim();
                    else if (l.StartsWith("**Đáp án đúng:**")) currentCorrect = l.Replace("**Đáp án đúng:**", "").Trim();
                    else if (l.StartsWith("**Giải thích:**")) currentExplanation = l.Replace("**Giải thích:**", "").Trim();
                    else if (l.StartsWith("A.") || l.StartsWith("B.") || l.StartsWith("C.") || l.StartsWith("D."))
                    {
                        var text = l.Substring(2).Trim();
                        currentOptions.Add(new QuestionOption { Text = text, IsCorrect = (l[0].ToString() == currentCorrect) });
                    }
                }
                if (!string.IsNullOrEmpty(currentContent) && currentOptions.Count > 0)
                {
                    bool added = await AddParsedQuestion(currentTopic, currentDifficulty, currentContent, currentExplanation, currentCorrect, currentOptions);
                    if (added) { newlyAdded++; IncrementStat(typeBreakdown, "MultipleChoice"); } else ignoredDuplicates++;
                }
            }

            // --- SEED 70 ADVANCED QUESTIONS FROM JSON ---
            string advancedPath = Path.Combine(Directory.GetCurrentDirectory(), "Data", "advanced_questions.json");
            if (System.IO.File.Exists(advancedPath))
            {
                var jsonStr = await System.IO.File.ReadAllTextAsync(advancedPath);
                var advancedData = System.Text.Json.JsonSerializer.Deserialize<List<AdvancedQuestionDto>>(jsonStr);
                if (advancedData != null)
                {
                    foreach(var aq in advancedData)
                    {
                        bool added = await AddAdvancedQuestion(aq.TopicName, aq.QuestionType, aq.Difficulty, aq.Content, aq.ChallengePayloadJson, aq.Options, aq.Explanation);
                        if (added) { newlyAdded++; IncrementStat(typeBreakdown, aq.QuestionType); } else ignoredDuplicates++;
                    }
                }
            }

            // Add Characters
            if (!await _context.Characters.AnyAsync())
            {
                var char1 = new Character { Name = "Voi", AnimalType = "Tanker", MaxHP = 150, MoveSpeed = 60, HitboxSize = 2, InitialAmmo = 10, SkillName = "Lá Chắn Đại Ngàn", SkillCooldown = 30 };
                var char2 = new Character { Name = "Thỏ", AnimalType = "Speedster", MaxHP = 80, MoveSpeed = 130, HitboxSize = 1, InitialAmmo = 8, SkillName = "Bứt Tốc", SkillCooldown = 25 };
                var char3 = new Character { Name = "Cáo", AnimalType = "Strategist", MaxHP = 100, MoveSpeed = 110, HitboxSize = 1, InitialAmmo = 10, SkillName = "Mưu Trí", SkillCooldown = 45 };
                var char4 = new Character { Name = "Rùa", AnimalType = "Defender", MaxHP = 130, MoveSpeed = 65, HitboxSize = 2, InitialAmmo = 8, SkillName = "Mai Rùa Bảo Vệ", SkillCooldown = 35 };
                _context.Characters.AddRange(char1, char2, char3, char4);
                await _context.SaveChangesAsync();
            }

            int totalCurrent = await _context.Questions.CountAsync();

            return Ok(new {
                message = "Seeding completed.",
                totalCurrentQuestions = totalCurrent,
                newlyAdded = newlyAdded,
                ignoredDuplicates = ignoredDuplicates,
                typeBreakdown = typeBreakdown
            });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { 
                message = "Error seeding data", 
                error = ex.Message, 
                stack = ex.StackTrace,
                inner = ex.InnerException?.Message
            });
        }
    }

    private void IncrementStat(Dictionary<string, int> dict, string key)
    {
        if (dict.ContainsKey(key)) dict[key]++;
        else dict[key] = 1;
    }

    public class AdvancedQuestionDto
    {
        public string TopicName { get; set; } = string.Empty;
        public string QuestionType { get; set; } = string.Empty;
        public string Difficulty { get; set; } = "Medium";
        public string Content { get; set; } = string.Empty;
        public string Explanation { get; set; } = string.Empty;
        public string? ChallengePayloadJson { get; set; }
        public List<QuestionOption> Options { get; set; } = new();
    }

    private async Task<bool> AddParsedQuestion(string topicName, string diff, string content, string explanation, string correctLet, List<QuestionOption> opts)
    {
        var topic = await _context.Topics.FirstOrDefaultAsync(t => t.Name == topicName);
        if (topic == null)
        {
            topic = new Topic { Name = topicName };
            _context.Topics.Add(topic);
            await _context.SaveChangesAsync();
        }

        if (await _context.Questions.AnyAsync(q => q.Content == content)) return false;

        if (opts.Count >= 4)
        {
            if (correctLet == "A") opts[0].IsCorrect = true;
            if (correctLet == "B") opts[1].IsCorrect = true;
            if (correctLet == "C") opts[2].IsCorrect = true;
            if (correctLet == "D") opts[3].IsCorrect = true;
        }

        int score = 100; int penalty = 10;
        if (diff == "Medium") { score = 150; penalty = 15; }
        if (diff == "Hard") { score = 200; penalty = 20; }

        var q = new Question
        {
            TopicId = topic.Id,
            Difficulty = diff,
            Content = content,
            Explanation = explanation,
            BaseScore = score,
            PenaltyHP = penalty,
            TimeLimit = 15,
            Options = opts,
            ChallengePayloadJson = "{}",
            QuestionType = "MultipleChoice"
        };
        _context.Questions.Add(q);
        await _context.SaveChangesAsync();
        return true;
    }

    private async Task<bool> AddAdvancedQuestion(string topicName, string qType, string diff, string content, string payload, List<QuestionOption> opts, string explanation)
    {
        var topic = await _context.Topics.FirstOrDefaultAsync(t => t.Name == topicName);
        if (topic == null)
        {
            topic = new Topic { Name = topicName };
            _context.Topics.Add(topic);
            await _context.SaveChangesAsync();
        }

        if (await _context.Questions.AnyAsync(q => q.Content == content)) return false;

        int score = diff == "Easy" ? 100 : diff == "Medium" ? 150 : 200;
        int penalty = diff == "Easy" ? 10 : diff == "Medium" ? 15 : 20;
        int timeLimit = 20;
        if (qType == "SpeedChallenge") timeLimit = 5;

        var q = new Question
        {
            TopicId = topic.Id,
            Difficulty = diff,
            Content = content,
            Explanation = explanation,
            BaseScore = score,
            PenaltyHP = penalty,
            TimeLimit = timeLimit,
            Options = opts,
            ChallengePayloadJson = string.IsNullOrWhiteSpace(payload) ? "{}" : payload,
            QuestionType = qType
        };
        _context.Questions.Add(q);
        await _context.SaveChangesAsync();
        return true;
    }
}
