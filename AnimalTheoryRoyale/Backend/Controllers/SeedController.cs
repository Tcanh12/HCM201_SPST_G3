using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AnimalTheoryRoyale.Data;
using AnimalTheoryRoyale.Models;

namespace AnimalTheoryRoyale.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SeedController : ControllerBase
{
    private readonly ApplicationDbContext _db;
    public SeedController(ApplicationDbContext db) => _db = db;

    [HttpPost("questions")]
    public async Task<IActionResult> SeedQuestions()
    {

        // Ensure topics
        var topicNames = new[] {
            "Sự ra đời của CNXH khoa học", "Giai cấp công nhân", "Đảng Cộng sản",
            "Thời kỳ quá độ lên CNXH", "Dân chủ XHCN", "Nhà nước XHCN",
            "Cơ cấu xã hội", "Dân tộc và Tôn giáo", "Gia đình trong CNXH", "Liên hệ thực tiễn"
        };
        foreach (var tn in topicNames)
            if (!await _db.Topics.AnyAsync(t => t.Name == tn))
                _db.Topics.Add(new Topic { Name = tn, Description = tn });
        await _db.SaveChangesAsync();
        var topics = await _db.Topics.ToDictionaryAsync(t => t.Name, t => t.Id);
        int T(string n) => topics.First(t => t.Key.Contains(n)).Value;

        var qs = new (int tid, string diff, string content, string expl, string[] opts, int ci)[] {
            (T("ra đời"), "Easy", "Chủ nghĩa xã hội khoa học do ai sáng lập?", "Do C.Mác và Ph.Ăngghen sáng lập.", new[]{"Adam Smith và David Ricardo","C.Mác và Ph.Ăngghen","V.I.Lênin và Stalin","Hêghen và Phoiơbắc"}, 1),
            (T("ra đời"), "Easy", "CNXH khoa học là một trong mấy bộ phận cấu thành của chủ nghĩa Mác-Lênin?", "Gồm 3 bộ phận: triết học, kinh tế chính trị, CNXH khoa học.", new[]{"2","3","4","5"}, 1),
            (T("ra đời"), "Medium", "Điều kiện kinh tế-xã hội quan trọng dẫn tới sự ra đời của CNXH khoa học?", "Nền đại công nghiệp TBCN làm xuất hiện GCCN hiện đại.", new[]{"Phát triển đại công nghiệp TBCN","Chế độ chiếm hữu nô lệ","Tan rã khoa học tự nhiên","Biến mất GCCN"}, 0),
            (T("ra đời"), "Medium", "Tiền đề tư tưởng trực tiếp cho sự ra đời CNXH khoa học?", "CNXH không tưởng phê phán XH tư bản và nêu khát vọng công bằng.", new[]{"CNXH không tưởng","Duy tâm chủ quan","Tự do cổ điển","Thực dụng"}, 0),
            (T("ra đời"), "Hard", "Điểm khác biệt cơ bản giữa CNXH khoa học và CNXH không tưởng?", "CNXH KH dựa trên quy luật phát triển XH và vai trò GCCN.", new[]{"Chỉ nêu ước mơ","Dựa trên quy luật KH và vai trò GCCN","Không quan tâm thực tiễn","Phủ nhận đấu tranh giai cấp"}, 1),
            (T("công nhân"), "Easy", "Giai cấp nào có sứ mệnh xóa bỏ CNTB và xây dựng XH mới?", "GCCN gắn với sản xuất hiện đại, đại diện PTSX tiến bộ.", new[]{"Tư sản","Công nhân","Địa chủ","Quý tộc"}, 1),
            (T("công nhân"), "Easy", "GCCN ra đời và phát triển gắn liền với yếu tố nào?", "GCCN hiện đại ra đời gắn với nền đại công nghiệp.", new[]{"Nền đại công nghiệp","Tự cung tự cấp","Chế độ nô lệ","Kinh tế phong kiến"}, 0),
            (T("công nhân"), "Medium", "Nội dung cơ bản của sứ mệnh lịch sử GCCN?", "Xóa bỏ quan hệ bóc lột, xây dựng CNXH và CNCS.", new[]{"Duy trì bóc lột","Xóa bỏ bóc lột, xây dựng XH mới","Chỉ đấu tranh cá nhân","Không tham gia chính trị"}, 1),
            (T("công nhân"), "Medium", "Vì sao GCCN có tính tổ chức, kỷ luật cao?", "Sản xuất đại công nghiệp tạo lao động tập trung.", new[]{"Lao động phân tán","Gắn với sản xuất đại công nghiệp","Không cần hợp tác","Không chịu tác động PTSX"}, 1),
            (T("công nhân"), "Hard", "Trong thời đại số, cần hiểu GCCN hiện đại thế nào?", "GCCN có biến đổi về trình độ nhưng vẫn gắn sản xuất hiện đại.", new[]{"Chỉ lao động chân tay","Lực lượng gắn sản xuất hiện đại, biến đổi trình độ","Đã hoàn toàn biến mất","Không liên quan sản xuất"}, 1),
            (T("Đảng"), "Easy", "Đảng Cộng sản là đội tiên phong của giai cấp nào?", "Đảng CS là đội tiên phong chính trị của GCCN.", new[]{"Công nhân","Tư sản","Địa chủ","Quý tộc"}, 0),
            (T("Đảng"), "Medium", "Vì sao GCCN cần có chính đảng lãnh đạo?", "Để chuyển từ đấu tranh tự phát sang tự giác.", new[]{"Chuyển từ tự phát sang tự giác","Tách khỏi quần chúng","Chỉ lợi ích trước mắt","Không cần lý luận"}, 0),
            (T("Đảng"), "Medium", "Đảng CS ra đời là sự kết hợp giữa?", "CN Mác-Lênin với phong trào công nhân.", new[]{"CN Mác-Lênin với phong trào CN","CNTB với phong kiến","Cá nhân với tự phát","Kinh tế thị trường với thực dụng"}, 0),
            (T("Đảng"), "Hard", "Vai trò lãnh đạo của Đảng CS thể hiện rõ nhất ở?", "Đề ra đường lối, tổ chức lãnh đạo cách mạng.", new[]{"Đường lối, tổ chức, lãnh đạo CM","Thay thế vai trò nhân dân","Chỉ hoạt động kinh tế","Không gắn quần chúng"}, 0),
            (T("Đảng"), "Medium", "Đảng CS là đội tiên phong của GCCN và?", "Đảng CS đại biểu lợi ích GCCN, nhân dân lao động, dân tộc.", new[]{"Không liên quan GCCN","Tiên phong GCCN và nhân dân lao động","Chỉ lợi ích cá nhân","Không cần lý luận KH"}, 1),
            (T("quá độ"), "Easy", "Thời kỳ quá độ lên CNXH là gì?", "Giai đoạn chuyển biến từ XH cũ sang XHCN.", new[]{"Chuyển biến từ XH cũ sang XHCN","XH đã hoàn thiện","Không còn mâu thuẫn","Chỉ phát triển kinh tế"}, 0),
            (T("quá độ"), "Easy", "Thời kỳ quá độ có đặc điểm gì?", "Lâu dài, phức tạp, đan xen cũ mới.", new[]{"Ngắn, đơn giản","Lâu dài, phức tạp, đan xen","Không cần cải biến","Không có mâu thuẫn"}, 1),
            (T("quá độ"), "Medium", "Vì sao thời kỳ quá độ còn nhiều thành phần kinh tế?", "Yếu tố XH cũ và mới cùng tồn tại.", new[]{"XH đã hoàn thiện","Yếu tố cũ và mới cùng tồn tại","Không cần quản lý KT","Chỉ một hình thức sở hữu"}, 1),
            (T("quá độ"), "Medium", "Đặc trưng quan trọng của XHCN?", "Nhân dân là chủ, quyền lực thuộc về nhân dân.", new[]{"Nhân dân là chủ, quyền lực thuộc nhân dân","Quyền lực nhóm giàu","Không cần văn hóa","Không cần công bằng"}, 0),
            (T("quá độ"), "Hard", "Nhận định phù hợp với xây dựng CNXH?", "Kết hợp phát triển KT với tiến bộ, công bằng XH.", new[]{"Chỉ tăng trưởng KT","Kết hợp KT với công bằng XH và phát triển con người","Không cần văn hóa","Không cần LLSX"}, 1),
            (T("Dân chủ"), "Easy", "Bản chất của dân chủ XHCN?", "Quyền lực thuộc về nhân dân.", new[]{"Quyền lực thuộc nhân dân","Thuộc cá nhân","Thuộc bóc lột","Nhân dân không quản lý"}, 0),
            (T("Dân chủ"), "Easy", "Dân chủ XHCN gắn liền với?", "Quyền làm chủ của nhân dân.", new[]{"Quyền làm chủ nhân dân","Thống trị thiểu số","Loại bỏ pháp luật","Thờ ơ chính trị"}, 0),
            (T("Dân chủ"), "Medium", "Dân chủ XHCN thực hiện thông qua?", "Dân chủ trực tiếp và đại diện.", new[]{"Trực tiếp và đại diện","Chỉ qua mạng XH","Chỉ qua cá nhân","Không cần thiết chế"}, 0),
            (T("Dân chủ"), "Medium", "Dân chủ chính trị thể hiện ở?", "Quyền tham gia quản lý nhà nước, bầu cử, ứng cử.", new[]{"Quyền tham gia quản lý NN và XH","Quyền chọn món ăn","Quyền mua sắm","Quyền dùng MXH giải trí"}, 0),
            (T("Dân chủ"), "Hard", "Cách ra quyết định thể hiện dân chủ tốt nhất?", "Cả lớp thảo luận, biểu quyết, tôn trọng quyết định chung.", new[]{"Một người tự quyết","Không ai nêu ý kiến","Thảo luận, biểu quyết, tôn trọng chung","Chỉ nhóm bạn thân quyết"}, 2),
            (T("Nhà nước"), "Easy", "Nhà nước XHCN là nhà nước của ai?", "Của nhân dân, do nhân dân, vì nhân dân.", new[]{"Của nhân dân, do nhân dân, vì nhân dân","Của riêng tầng lớp giàu","Của cá nhân nắm quyền","Của thế lực bên ngoài"}, 0),
            (T("Nhà nước"), "Medium", "Chức năng quan trọng của NN XHCN?", "Tổ chức, quản lý XH và bảo vệ quyền làm chủ nhân dân.", new[]{"Tổ chức, quản lý XH, bảo vệ quyền ND","Chỉ thu thuế","Không cần pháp luật","Không bảo vệ ND"}, 0),
            (T("Nhà nước"), "Medium", "Pháp luật trong NN XHCN có vai trò?", "Bảo đảm trật tự, kỷ cương, quyền lợi chính đáng ND.", new[]{"Bảo đảm trật tự và quyền lợi ND","Không cần quản lý","Chỉ lợi ích cá nhân","Không liên quan đời sống"}, 0),
            (T("Nhà nước"), "Hard", "Cán bộ dùng quyền lực vì lợi ích cá nhân trái nguyên tắc?", "Trái bản chất NN vì dân và trách nhiệm phục vụ ND.", new[]{"NN vì nhân dân","Quyền lực phục vụ chung","Cán bộ là công bộc","Tất cả các ý trên"}, 3),
            (T("Nhà nước"), "Medium", "NN pháp quyền XHCN quản lý XH bằng?", "Bằng pháp luật, bảo đảm công khai, minh bạch.", new[]{"Pháp luật","Cảm tính cá nhân","Tin đồn XH","Quyền lực tùy tiện"}, 0),
            (T("Cơ cấu"), "Easy", "Liên minh giai cấp ở VN nhấn mạnh liên minh nào?", "Công nhân, nông dân và trí thức.", new[]{"Công nhân, nông dân, trí thức","Tư sản và địa chủ","Quý tộc và thương nhân","Một cá nhân lãnh đạo"}, 0),
            (T("Cơ cấu"), "Medium", "Vì sao cần liên minh công-nông-trí thức?", "Tăng sức mạnh đoàn kết xây dựng XH mới.", new[]{"Tăng đoàn kết xây dựng XH mới","Chia rẽ lực lượng","Loại bỏ tri thức","Chỉ phát triển một nhóm"}, 0),
            (T("Cơ cấu"), "Medium", "Cơ cấu XH thời kỳ quá độ có đặc điểm?", "Đa dạng, biến đổi, đan xen các giai cấp tầng lớp.", new[]{"Đa dạng, biến đổi, đan xen","Hoàn toàn không đổi","Chỉ một tầng lớp","Không liên quan KT"}, 0),
            (T("Cơ cấu"), "Hard", "Sinh viên IT góp phần xây dựng XH tiến bộ bằng?", "Dùng công nghệ giải quyết vấn đề XH, phục vụ cộng đồng.", new[]{"Dùng CN giải quyết vấn đề XH","Gây nhiễu thông tin","Không cần đạo đức nghề nghiệp","Chỉ lợi ích cá nhân"}, 0),
            (T("Cơ cấu"), "Medium", "Trí thức có vai trò gì trong CNXH?", "Phát triển KH, CN, giáo dục và văn hóa.", new[]{"Phát triển KH, CN, giáo dục, văn hóa","Không có vai trò","Chỉ giải trí","Không gắn ND"}, 0),
            (T("Dân tộc"), "Easy", "Nguyên tắc cơ bản giải quyết vấn đề dân tộc?", "Bình đẳng, đoàn kết, tôn trọng, giúp nhau phát triển.", new[]{"Bình đẳng, đoàn kết, tôn trọng","Chia rẽ dân tộc","Ưu tiên tuyệt đối một DT","Không quan tâm văn hóa"}, 0),
            (T("Dân tộc"), "Medium", "Đoàn kết dân tộc có ý nghĩa?", "Ổn định chính trị, phát triển đất nước.", new[]{"Ổn định CT, phát triển đất nước","Suy yếu đoàn kết","Tạo mâu thuẫn","Không ảnh hưởng"}, 0),
            (T("Dân tộc"), "Medium", "Quan điểm phù hợp giải quyết tôn giáo?", "Tôn trọng tự do tín ngưỡng, bảo đảm đúng pháp luật.", new[]{"Tôn trọng tự do, đúng pháp luật","Cấm mọi tín ngưỡng","Lợi dụng chia rẽ","Không phân biệt mê tín"}, 0),
            (T("Dân tộc"), "Hard", "Bài đăng xúc phạm văn hóa dân tộc, xử lý?", "Tôn trọng khác biệt, báo cáo nội dung xấu, lan tỏa đúng đắn.", new[]{"Chia sẻ thêm công kích","Kích động xung đột","Tôn trọng, báo cáo, lan tỏa đúng đắn","Xem bình thường"}, 2),
            (T("Dân tộc"), "Medium", "Cần phân biệt tín ngưỡng với hiện tượng nào?", "Mê tín dị đoan.", new[]{"Mê tín dị đoan","Văn hóa truyền thống","Tự do cá nhân hợp pháp","Sinh hoạt cộng đồng"}, 0),
            (T("Gia đình"), "Easy", "Gia đình được xem là gì trong XH?", "Tế bào của xã hội.", new[]{"Tế bào của XH","Tổ chức không liên quan","Chỉ nơi tiêu dùng","Nhóm không giáo dục"}, 0),
            (T("Gia đình"), "Medium", "Chức năng quan trọng của gia đình?", "Giáo dục, nuôi dưỡng, hình thành nhân cách.", new[]{"Giáo dục, nuôi dưỡng, nhân cách","Tách khỏi XH","Chỉ thu nhập","Không liên quan văn hóa"}, 0),
            (T("Gia đình"), "Medium", "Xây dựng gia đình tiến bộ có ý nghĩa?", "Nền tảng ổn định, phát triển XH.", new[]{"Nền tảng ổn định, phát triển XH","Không liên quan","Giảm vai trò GD","Chỉ ý nghĩa cá nhân"}, 0),
            (T("Gia đình"), "Hard", "Hành vi phù hợp gia đình văn minh?", "Tôn trọng, chia sẻ trách nhiệm, bình đẳng.", new[]{"Tôn trọng, chia sẻ, bình đẳng","Áp đặt một chiều","Phân biệt đối xử","Xem nhẹ đạo đức"}, 0),
            (T("Gia đình"), "Medium", "Bình đẳng trong gia đình có ý nghĩa?", "Tôn trọng, chia sẻ trách nhiệm giữa các thành viên.", new[]{"Tôn trọng, chia sẻ trách nhiệm","Mất vai trò gia đình","Không cần nguyên tắc","Chỉ áp dụng công việc"}, 0),
            (T("thực tiễn"), "Easy", "Học CNXH KH giúp sinh viên điều gì?", "Hiểu cơ sở lý luận về con đường xây dựng XH mới.", new[]{"Hiểu cơ sở lý luận XH mới","Chỉ học thuộc để thi","Tránh vấn đề XH","Không cần liên hệ"}, 0),
            (T("thực tiễn"), "Medium", "Tiếp nhận thông tin CT-XH trên mạng, SV nên?", "Kiểm chứng nguồn, đọc đa chiều, tránh chia sẻ sai.", new[]{"Tin ngay mọi thứ","Kiểm chứng, đọc đa chiều, tránh sai","Chia sẻ nhanh chưa kiểm","Chỉ đọc tiêu đề"}, 1),
            (T("thực tiễn"), "Medium", "Cách học lý luận CT hiệu quả thời đại số?", "Kết hợp hiểu KN, sơ đồ hóa, liên hệ thực tế.", new[]{"Chỉ học thuộc","Hiểu KN, sơ đồ hóa, liên hệ thực tế","Không cần vì có internet","Chỉ xem meme"}, 1),
            (T("thực tiễn"), "Hard", "Vì sao nên game hóa học lý luận CT?", "Tăng tương tác, động lực, ghi nhớ tốt hơn.", new[]{"Thay thế nội dung học thuật","Tăng tương tác, động lực, ghi nhớ","Biến thành trò đùa","Bỏ qua giáo trình"}, 1),
            (T("thực tiễn"), "Hard", "Người chỉ bắn không trả lời, hệ thống nên?", "Giới hạn điểm chiến đấu, tăng điểm từ câu hỏi.", new[]{"Cho thắng nếu bắn nhiều","Giới hạn điểm chiến đấu, tăng điểm câu hỏi","Loại bỏ câu hỏi","Không cần leaderboard"}, 1),
        };

        foreach (var (tid, diff, content, expl, opts, ci) in qs)
        {
            if (await _db.Questions.AnyAsync(q => q.Content == content)) continue;
            var q = new Question { TopicId = tid, Content = content, Explanation = expl, Difficulty = diff,
                BaseScore = diff == "Easy" ? 100 : diff == "Medium" ? 150 : 200,
                PenaltyHP = diff == "Easy" ? 10 : diff == "Medium" ? 15 : 20,
                TimeLimit = diff == "Easy" ? 15 : diff == "Medium" ? 20 : 25 };
            _db.Questions.Add(q);
            await _db.SaveChangesAsync();
            for (int i = 0; i < opts.Length; i++)
                _db.QuestionOptions.Add(new QuestionOption { QuestionId = q.Id, Text = opts[i], IsCorrect = i == ci });
            await _db.SaveChangesAsync();
        }
        return Ok(new { message = $"Done. Total: {await _db.Questions.CountAsync()}" });
    }
}
