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

    [HttpGet("seed")]
    public async Task<IActionResult> SeedSampleData()
    {
        if (await _context.Questions.CountAsync() >= 20) return BadRequest("Data already seeded with enough questions.");

        var topic1 = await _context.Topics.FirstOrDefaultAsync(t => t.Name == "Sự ra đời của CNXH khoa học") ?? new Topic { Name = "Sự ra đời của CNXH khoa học", Description = "Phần 1" };
        var topic2 = await _context.Topics.FirstOrDefaultAsync(t => t.Name == "Dân chủ XHCN") ?? new Topic { Name = "Dân chủ XHCN", Description = "Phần 2" };
        
        if (topic1.Id == 0) _context.Topics.Add(topic1);
        if (topic2.Id == 0) _context.Topics.Add(topic2);
        await _context.SaveChangesAsync();

        var q1 = new Question { TopicId = topic1.Id, Difficulty = "Easy", Content = "Chủ nghĩa xã hội khoa học do ai sáng lập?", Explanation = "Chủ nghĩa xã hội khoa học do C. Mác và Ph. Ăngghen sáng lập.", BaseScore = 100, PenaltyHP = 10, TimeLimit = 15, Options = new List<QuestionOption> { new QuestionOption { Text = "Adam Smith và David Ricardo", IsCorrect = false }, new QuestionOption { Text = "C. Mác và Ph. Ăngghen", IsCorrect = true }, new QuestionOption { Text = "V.I. Lênin và Stalin", IsCorrect = false }, new QuestionOption { Text = "Hêghen và Phoiơbắc", IsCorrect = false } } };
        var q2 = new Question { TopicId = topic2.Id, Difficulty = "Easy", Content = "Bản chất của dân chủ xã hội chủ nghĩa là gì?", Explanation = "Quyền lực thuộc về nhân dân.", BaseScore = 100, PenaltyHP = 10, TimeLimit = 15, Options = new List<QuestionOption> { new QuestionOption { Text = "Quyền lực thuộc về nhân dân", IsCorrect = true }, new QuestionOption { Text = "Quyền lực thuộc về một cá nhân", IsCorrect = false }, new QuestionOption { Text = "Quyền lực thuộc về tầng lớp bóc lột", IsCorrect = false }, new QuestionOption { Text = "Nhân dân không tham gia quản lý xã hội", IsCorrect = false } } };
        var q3 = new Question { TopicId = topic1.Id, Difficulty = "Medium", Content = "Quy luật giá trị yêu cầu gì?", Explanation = "Sản xuất và trao đổi hàng hóa phải dựa trên thời gian lao động xã hội cần thiết.", BaseScore = 150, PenaltyHP = 15, TimeLimit = 15, Options = new List<QuestionOption> { new QuestionOption { Text = "Sản xuất theo thời gian cá biệt", IsCorrect = false }, new QuestionOption { Text = "Dựa trên thời gian lao động XH cần thiết", IsCorrect = true }, new QuestionOption { Text = "Sản xuất tự do", IsCorrect = false }, new QuestionOption { Text = "Do nhà nước quy định", IsCorrect = false } } };
        var q4 = new Question { TopicId = topic1.Id, Difficulty = "Medium", Content = "Tư bản bất biến (c) là gì?", Explanation = "Tồn tại dưới hình thái tư liệu sản xuất.", BaseScore = 150, PenaltyHP = 15, TimeLimit = 15, Options = new List<QuestionOption> { new QuestionOption { Text = "Tư bản mua sức lao động", IsCorrect = false }, new QuestionOption { Text = "Tư bản mua nguyên nhiên vật liệu, máy móc", IsCorrect = true }, new QuestionOption { Text = "Giá trị thặng dư", IsCorrect = false }, new QuestionOption { Text = "Tiền công", IsCorrect = false } } };
        var q5 = new Question { TopicId = topic2.Id, Difficulty = "Hard", Content = "Nhà nước XHCN mang bản chất của giai cấp nào?", Explanation = "Bản chất giai cấp công nhân.", BaseScore = 200, PenaltyHP = 20, TimeLimit = 15, Options = new List<QuestionOption> { new QuestionOption { Text = "Giai cấp nông dân", IsCorrect = false }, new QuestionOption { Text = "Giai cấp tư sản", IsCorrect = false }, new QuestionOption { Text = "Giai cấp công nhân", IsCorrect = true }, new QuestionOption { Text = "Tầng lớp trí thức", IsCorrect = false } } };
        var q6 = new Question { TopicId = topic2.Id, Difficulty = "Hard", Content = "Đặc trưng cơ bản của CNXH là gì?", Explanation = "Giải phóng giai cấp, giải phóng dân tộc, giải phóng con người.", BaseScore = 200, PenaltyHP = 20, TimeLimit = 15, Options = new List<QuestionOption> { new QuestionOption { Text = "Áp bức bóc lột", IsCorrect = false }, new QuestionOption { Text = "Giải phóng con người", IsCorrect = true }, new QuestionOption { Text = "Tập trung quyền lực", IsCorrect = false }, new QuestionOption { Text = "Kinh tế thị trường tư bản", IsCorrect = false } } };
        var q7 = new Question { TopicId = topic1.Id, Difficulty = "Easy", Content = "Giá trị thặng dư (m) là gì?", Explanation = "Là phần giá trị mới dôi ra ngoài giá trị sức lao động.", BaseScore = 100, PenaltyHP = 10, TimeLimit = 15, Options = new List<QuestionOption> { new QuestionOption { Text = "Lợi nhuận thương nghiệp", IsCorrect = false }, new QuestionOption { Text = "Giá trị dôi ra do công nhân tạo ra", IsCorrect = true }, new QuestionOption { Text = "Tiền công", IsCorrect = false }, new QuestionOption { Text = "Khấu hao", IsCorrect = false } } };
        var q8 = new Question { TopicId = topic1.Id, Difficulty = "Medium", Content = "Sản xuất GTTD tuyệt đối là gì?", Explanation = "Kéo dài thời gian lao động ngày.", BaseScore = 150, PenaltyHP = 15, TimeLimit = 15, Options = new List<QuestionOption> { new QuestionOption { Text = "Tăng cường độ", IsCorrect = false }, new QuestionOption { Text = "Kéo dài ngày lao động", IsCorrect = true }, new QuestionOption { Text = "Tăng năng suất", IsCorrect = false }, new QuestionOption { Text = "Giảm lương", IsCorrect = false } } };
        var q9 = new Question { TopicId = topic2.Id, Difficulty = "Easy", Content = "Hệ thống chính trị XHCN gồm gì?", Explanation = "Đảng, Nhà nước, Đoàn thể.", BaseScore = 100, PenaltyHP = 10, TimeLimit = 15, Options = new List<QuestionOption> { new QuestionOption { Text = "Đảng, Nhà nước, Đoàn thể", IsCorrect = true }, new QuestionOption { Text = "Chỉ có Nhà nước", IsCorrect = false }, new QuestionOption { Text = "Tập đoàn kinh tế", IsCorrect = false }, new QuestionOption { Text = "Quân đội", IsCorrect = false } } };
        var q10 = new Question { TopicId = topic2.Id, Difficulty = "Medium", Content = "Liên minh công-nông-trí thức dựa trên cơ sở nào?", Explanation = "Quyền lợi kinh tế và chính trị chung.", BaseScore = 150, PenaltyHP = 15, TimeLimit = 15, Options = new List<QuestionOption> { new QuestionOption { Text = "Quyền lợi kinh tế và chính trị chung", IsCorrect = true }, new QuestionOption { Text = "Ép buộc", IsCorrect = false }, new QuestionOption { Text = "Tôn giáo", IsCorrect = false }, new QuestionOption { Text = "Luật pháp", IsCorrect = false } } };
        var q11 = new Question { TopicId = topic1.Id, Difficulty = "Easy", Content = "Ai phát hiện ra quy luật GTTD?", Explanation = "C. Mác", BaseScore = 100, PenaltyHP = 10, TimeLimit = 15, Options = new List<QuestionOption> { new QuestionOption { Text = "Lênin", IsCorrect = false }, new QuestionOption { Text = "Ăngghen", IsCorrect = false }, new QuestionOption { Text = "C. Mác", IsCorrect = true }, new QuestionOption { Text = "Phoiơbắc", IsCorrect = false } } };
        var q12 = new Question { TopicId = topic1.Id, Difficulty = "Hard", Content = "Tích lũy tư bản là gì?", Explanation = "Biến GTTD thành tư bản phụ thêm.", BaseScore = 200, PenaltyHP = 20, TimeLimit = 15, Options = new List<QuestionOption> { new QuestionOption { Text = "Tiêu dùng GTTD", IsCorrect = false }, new QuestionOption { Text = "Biến GTTD thành tư bản phụ thêm", IsCorrect = true }, new QuestionOption { Text = "Cất trữ", IsCorrect = false }, new QuestionOption { Text = "Trả lương", IsCorrect = false } } };
        var q13 = new Question { TopicId = topic2.Id, Difficulty = "Medium", Content = "Chức năng của Nhà nước XHCN?", Explanation = "Tổ chức và quản lý xã hội.", BaseScore = 150, PenaltyHP = 15, TimeLimit = 15, Options = new List<QuestionOption> { new QuestionOption { Text = "Chỉ trấn áp", IsCorrect = false }, new QuestionOption { Text = "Tổ chức và quản lý xã hội", IsCorrect = true }, new QuestionOption { Text = "Can thiệp quân sự", IsCorrect = false }, new QuestionOption { Text = "Bảo vệ tư bản", IsCorrect = false } } };
        var q14 = new Question { TopicId = topic2.Id, Difficulty = "Hard", Content = "Tôn giáo trong thời kỳ quá độ?", Explanation = "Tồn tại lâu dài.", BaseScore = 200, PenaltyHP = 20, TimeLimit = 15, Options = new List<QuestionOption> { new QuestionOption { Text = "Bị xóa bỏ", IsCorrect = false }, new QuestionOption { Text = "Tồn tại lâu dài", IsCorrect = true }, new QuestionOption { Text = "Trở thành quốc giáo", IsCorrect = false }, new QuestionOption { Text = "Bị cấm", IsCorrect = false } } };
        var q15 = new Question { TopicId = topic1.Id, Difficulty = "Easy", Content = "Hai thuộc tính của hàng hóa?", Explanation = "Giá trị sử dụng và Giá trị.", BaseScore = 100, PenaltyHP = 10, TimeLimit = 15, Options = new List<QuestionOption> { new QuestionOption { Text = "Giá trị sử dụng và Giá trị", IsCorrect = true }, new QuestionOption { Text = "Giá cả và số lượng", IsCorrect = false }, new QuestionOption { Text = "Cung và cầu", IsCorrect = false }, new QuestionOption { Text = "Chất và lượng", IsCorrect = false } } };
        var q16 = new Question { TopicId = topic1.Id, Difficulty = "Medium", Content = "Tư bản khả biến (v) là gì?", Explanation = "Tư bản mua sức lao động.", BaseScore = 150, PenaltyHP = 15, TimeLimit = 15, Options = new List<QuestionOption> { new QuestionOption { Text = "Tiền mua máy móc", IsCorrect = false }, new QuestionOption { Text = "Tiền mua nguyên liệu", IsCorrect = false }, new QuestionOption { Text = "Tư bản mua sức lao động", IsCorrect = true }, new QuestionOption { Text = "Chi phí quảng cáo", IsCorrect = false } } };
        var q17 = new Question { TopicId = topic2.Id, Difficulty = "Easy", Content = "Sứ mệnh của giai cấp công nhân?", Explanation = "Xóa bỏ CNTB, xây dựng CNXH.", BaseScore = 100, PenaltyHP = 10, TimeLimit = 15, Options = new List<QuestionOption> { new QuestionOption { Text = "Thành bóc lột mới", IsCorrect = false }, new QuestionOption { Text = "Xóa bỏ CNTB, xây dựng CNXH", IsCorrect = true }, new QuestionOption { Text = "Bảo vệ tư sản", IsCorrect = false }, new QuestionOption { Text = "Trung lập", IsCorrect = false } } };
        var q18 = new Question { TopicId = topic2.Id, Difficulty = "Medium", Content = "Hình thức dân chủ trực tiếp?", Explanation = "Nhân dân trực tiếp quyết định.", BaseScore = 150, PenaltyHP = 15, TimeLimit = 15, Options = new List<QuestionOption> { new QuestionOption { Text = "Bầu đại biểu", IsCorrect = false }, new QuestionOption { Text = "Trực tiếp quyết định", IsCorrect = true }, new QuestionOption { Text = "Giao cho vua", IsCorrect = false }, new QuestionOption { Text = "Không tham gia", IsCorrect = false } } };
        var q19 = new Question { TopicId = topic1.Id, Difficulty = "Hard", Content = "Lợi nhuận bình quân do đâu?", Explanation = "Cạnh tranh giữa các ngành.", BaseScore = 200, PenaltyHP = 20, TimeLimit = 15, Options = new List<QuestionOption> { new QuestionOption { Text = "Nội bộ ngành", IsCorrect = false }, new QuestionOption { Text = "Giữa các ngành", IsCorrect = true }, new QuestionOption { Text = "Độc quyền", IsCorrect = false }, new QuestionOption { Text = "Chính phủ", IsCorrect = false } } };
        var q20 = new Question { TopicId = topic2.Id, Difficulty = "Medium", Content = "Gia đình trong CNXH?", Explanation = "Sinh sản, giáo dục, kinh tế.", BaseScore = 150, PenaltyHP = 15, TimeLimit = 15, Options = new List<QuestionOption> { new QuestionOption { Text = "Chỉ kinh tế", IsCorrect = false }, new QuestionOption { Text = "Sinh sản, giáo dục, kinh tế", IsCorrect = true }, new QuestionOption { Text = "Tách biệt", IsCorrect = false }, new QuestionOption { Text = "Thay nhà trường", IsCorrect = false } } };

        var qs = await _context.Questions.ToListAsync();
        if (!qs.Any(q => q.Content == q1.Content)) _context.Questions.Add(q1);
        if (!qs.Any(q => q.Content == q2.Content)) _context.Questions.Add(q2);
        if (!qs.Any(q => q.Content == q3.Content)) _context.Questions.Add(q3);
        if (!qs.Any(q => q.Content == q4.Content)) _context.Questions.Add(q4);
        if (!qs.Any(q => q.Content == q5.Content)) _context.Questions.Add(q5);
        if (!qs.Any(q => q.Content == q6.Content)) _context.Questions.Add(q6);
        if (!qs.Any(q => q.Content == q7.Content)) _context.Questions.Add(q7);
        if (!qs.Any(q => q.Content == q8.Content)) _context.Questions.Add(q8);
        if (!qs.Any(q => q.Content == q9.Content)) _context.Questions.Add(q9);
        if (!qs.Any(q => q.Content == q10.Content)) _context.Questions.Add(q10);
        if (!qs.Any(q => q.Content == q11.Content)) _context.Questions.Add(q11);
        if (!qs.Any(q => q.Content == q12.Content)) _context.Questions.Add(q12);
        if (!qs.Any(q => q.Content == q13.Content)) _context.Questions.Add(q13);
        if (!qs.Any(q => q.Content == q14.Content)) _context.Questions.Add(q14);
        if (!qs.Any(q => q.Content == q15.Content)) _context.Questions.Add(q15);
        if (!qs.Any(q => q.Content == q16.Content)) _context.Questions.Add(q16);
        if (!qs.Any(q => q.Content == q17.Content)) _context.Questions.Add(q17);
        if (!qs.Any(q => q.Content == q18.Content)) _context.Questions.Add(q18);
        if (!qs.Any(q => q.Content == q19.Content)) _context.Questions.Add(q19);
        if (!qs.Any(q => q.Content == q20.Content)) _context.Questions.Add(q20);

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
