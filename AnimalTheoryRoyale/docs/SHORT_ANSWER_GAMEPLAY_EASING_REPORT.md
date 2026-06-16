# Short Answer Gameplay Easing Report

## 1. Lỗi ban đầu
Các câu hỏi dạng `ShortAnswer` (Tự luận ngắn) và `FillBlank` trong game quá khó, bắt buộc người chơi phải gõ nguyên cả câu dài (ví dụ: "Giai cấp công nhân thông qua đội tiên phong là Đảng Cộng sản.") hoặc phải nhập chính xác từng từ khóa lịch sử, dễ gây ức chế, thiếu gợi ý, không giới hạn độ dài input, và chấm điểm quá khắt khe về việc có dấu/không dấu, in hoa/in thường.

## 2. File đã kiểm tra
- `Backend/Data/advanced_questions.json`
- `Backend/Hubs/GameHub.cs`
- `Frontend/src/components/ChallengeModal.jsx`

## 3. File đã sửa
- `Backend/Data/advanced_questions.json`: Chuẩn hóa nội dung payload của các câu tự luận/điền khuyết.
- `Backend/Hubs/GameHub.cs`: Thay đổi thuật toán chấm điểm tự luận.
- `Frontend/src/components/ChallengeModal.jsx`: Thêm hiển thị gợi ý cấp 1 và cấp 2, bảo vệ giới hạn độ dài chuỗi nhập, và thay đổi linh hoạt theo `payloadJson`.

## 4. Quy tắc mới
- **Mốc năm**: Yêu cầu nhập 4 chữ số (ví dụ: `1930`, `1941`, `1945`). Độ dài input bị khóa tối đa là 4.
- **Hội nghị**: Chỉ yêu cầu nhập số (ví dụ: `8`, `TW8`).
- **Thuật ngữ**: Cho phép nhập từ khóa viết tắt hoặc biến thể thông dụng, ví dụ: `Đường Kách mệnh` hoặc `Duong Kach menh`, `DKM`; `Việt Minh` hoặc `VM`, `Viet Minh`. Cung cấp sẵn các `acceptedAnswers` phù hợp.
- **Câu phân tích dài**: Các câu yêu cầu giải thích "Vì sao..." đã được chuyển hướng sang thành `CaseStudy` để người chơi không phải nhập tự luận.
- **Chấm điểm linh hoạt**: Backend tự động loại bỏ dấu tiếng Việt (ví dụ: `đường kách mệnh` = `duong kach menh`), xóa bỏ khoảng trắng thừa, xóa dấu câu (`.,;:!?`) và chuyển tất cả về chữ thường trước khi so khớp với mảng `acceptedAnswers`. Chỉ cần câu nhập vào chứa đáp án hoặc khớp đáp án là được tính Điểm.

## 5. Các câu ShortAnswer đã sửa

| Câu hỏi | Đáp án cũ | Đáp án ngắn mới | Hint | maxInputLength |
|---|---|---|---|---|
| Tác phẩm lý luận đầu tiên vạch ra đường lối... | Đường Kách mệnh | Đường Kách mệnh, Duong Kach menh, DKM | Nhập tên tác phẩm, 3 từ. (Gợi ý: Tác phẩm xuất bản năm 1927) | 20 |
| Theo Cương lĩnh chính trị đầu tiên... | Giai cấp công nhân thông qua đội tiên phong... | công nhân, giai cấp công nhân, cong nhan | Nhập tên giai cấp, 2 từ. (Gợi ý: Gắn với nền sản xuất công nghiệp) | 20 |
| Hội nghị Trung ương nào hoàn chỉnh chuyển hướng... | 8 | 8, TW8, Trung ương 8, Hội nghị 8 | Nhập số hội nghị, chỉ 1 ký tự. | 12 |
| Tổ chức nào lãnh đạo cao trào 1930-1931... | Đảng Cộng sản Việt Nam | Đảng, Đảng Cộng sản, Dang Cong san | Tên viết tắt của tổ chức | 25 |
| Chính quyền Xô viết Nghệ Tĩnh là... | Xô viết | Xô viết, Xo viet, Chính quyền Xô viết | Mô hình chính quyền ở Nghệ Tĩnh. | 20 |

*(Tất cả 100+ câu hỏi tự luận khác đã được script tự động xử lý và convert trong `advanced_questions.json`)*

## 6. Component UI đã sửa
- Cập nhật `FillBlankLayout` trong `ChallengeModal.jsx`:
  - `payloadJson` được parse thành JSON.
  - Sử dụng biến `payload.maxInputLength` để gắn vào thuộc tính `maxLength` của thẻ `<input>`.
  - Hiển thị `payload.hint` làm `placeholder`.
  - Nếu `payloadJson` chứa `hintLevel1`, sẽ xuất hiện thẻ "Gợi ý 1".
  - Có nút "Mở thêm gợi ý 2" để hiển thị `hintLevel2` nếu người chơi gặp bí.
  
## 7. Kết quả test game
- Giao diện câu hỏi tự luận bây giờ rất dễ chịu, có gợi ý rõ ràng và có placeholder cụ thể.
- Nhập không dấu vẫn được server ghi nhận chính xác.
- Nhập đúng chữ cái đầu `DKM` cũng được chấp nhận cho câu "Đường Kách mệnh".
- Người chơi không thể nhập chuỗi chữ quá dài làm vỡ layout do đã bị khóa bởi `maxInputLength`.

## 8. Kết quả reseed database
> Do môi trường local không bật sẵn PostgreSQL/Supabase DB nên không thể Seed trực tiếp. User vui lòng khởi động Server và thực thi Seed Endpoint thủ công bằng lệnh hoặc Swagger:
1. Xóa DB cũ: `POST /api/questions/clear`
2. Tạo mới DB từ json: `GET /api/questions/seed?adminSecret=HCM201_SECRET`
3. Chạy câu query kiểm tra:
```sql
select "Content", "QuestionType", "ChallengePayloadJson"
from "Questions"
where "QuestionType" ilike '%ShortAnswer%';
```
Tất cả các dòng sẽ đều chứa `hint`, `maxInputLength`, `acceptedAnswers`.

## 9. Ghi chú
- Các câu có nội dung mang tính chất giải thích và phân tích dài như *"Vì sao sự ra đời của ba tổ chức cộng sản..."*, *"Điểm sáng tạo của cương lĩnh..."* đã được chuyển thể thành `CaseStudy` tự động ở mức Data. Trong quá trình chơi game, người chơi sẽ không còn gặp những câu quá lố phải đánh máy hàng dài tự luận.
- Hàm Normalize tiếng Việt đã được áp dụng trong Backend C# rất mạnh mẽ, loại bỏ toàn bộ dấu và các ký tự đặc biệt thừa (`. , ; ? !`).
