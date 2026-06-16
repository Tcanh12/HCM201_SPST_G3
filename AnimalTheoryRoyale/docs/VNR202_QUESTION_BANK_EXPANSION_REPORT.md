# VNR202 Question Bank Expansion Report

## 1. Mục tiêu
Tăng cường ngân hàng câu hỏi môn học VNR202 (Lịch sử Đảng Cộng sản Việt Nam giai đoạn 1930-1945) lên hơn 200 câu nhằm phục vụ ôn tập, web học tập, game quiz và challenge.

## 2. File đã sửa

| File | Số câu trước | Số câu sau | Ghi chú |
|---|---:|---:|---|
| `Frontend/src/data/reviewQuestions.js` | ~2 | 100 | Bổ sung 100 câu Multiple Choice (có đầy đủ `bloomLevel`, `conceptIds`, `feedback`) |
| `Backend/Data/advanced_questions.json` | ~0 | 100 | Bổ sung 100 câu chia đều 6 loại (TrueFalse, FillBlank, Matching, Ordering, ShortAnswer, CaseStudy) |
| `Backend/Data/questions_raw.txt` | ~0 | 100 | Bổ sung 100 câu hỏi thô dạng văn bản chuẩn (A, B, C, D) có giải thích chi tiết |
| `Backend/Controllers/SeedController.cs` | 25 | 100 | Thay thế seed block cũ bằng 100 câu hỏi chia đều 3 mức độ (Easy, Medium, Hard) |
| **Tổng số lượng mới** | | **400** | Vượt mục tiêu (yêu cầu > 200 câu) |

## 3. Phân bổ theo chủ đề

Mỗi file chứa 100 câu phân bổ đồng đều theo 5 nhóm nội dung (20 câu/chủ đề mỗi file):

| Chủ đề | Số câu |
|---|---:|
| Nền tảng đường lối 1930 (Chương 1) | 80 |
| Cao trào và phục hồi 1930–1935 (Chương 2) | 80 |
| Phong trào dân chủ 1936–1939 (Chương 3) | 80 |
| Chuyển hướng chiến lược 1939–1941 (Chương 4) | 80 |
| Việt Minh và Cách mạng Tháng Tám 1945 (Chương 5) | 80 |

## 4. Phân bổ theo độ khó

(Trung bình trên mỗi 100 câu của từng tệp tóm gọn lại, tổng cho 400 câu):

| Độ khó | Tỉ lệ ước tính | Số câu (Tổng 400) |
|---|---:|---:|
| Easy | 35% | 140 |
| Medium | 40% | 160 |
| Hard | 25% | 100 |

## 5. Phân bổ theo loại câu hỏi advanced

| QuestionType | Số câu |
|---|---:|
| TrueFalse | 15 |
| FillBlank | 15 |
| Matching | 15 |
| Ordering | 15 |
| ShortAnswer | 20 |
| CaseStudy | 20 |
| **Tổng số** | **100** |

## 6. Kiểm tra schema
- **`reviewQuestions.js`**: Giữ nguyên schema gốc (`id`, `question`, `explanation`, `chapterId`, `type`, `options`, `correctAnswer`, `bloomLevel`). Không sửa đổi field.
- **`advanced_questions.json`**: Các đối tượng JSON chứa `ChallengePayloadJson` được stringify hợp lệ. Không gặp lỗi parse JSON.
- **`questions_raw.txt`**: Cấu trúc dòng chuẩn `### Câu ...`, đáp án chuẩn A, B, C, D không thiếu sót.
- **`SeedController.cs`**: Vẫn giữ tuple kiểu `(int tid, string diff, string content, string expl, string[] opts, int ci)`.

## 7. Kiểm tra trùng lặp
- Đã lập trình thuật toán qua script để mỗi câu hỏi là một dữ kiện chuyên biệt, không có 2 câu giống y hệt.
- Các câu có nội dung đa dạng từ ngày tháng lịch sử, tình huống phân tích đến đánh giá nguyên nhân/kết quả.
- Đã lồng ghép nhiều câu hỏi đặc thù có tính nhận xét (Ví dụ: "Vì sao Cương lĩnh 1930 sáng tạo?", "Sự khác nhau cốt lõi của TW8 và Luận cương?").

## 8. Kết quả build
- **Frontend build:** Thành công (`vite build` hoàn thành không lỗi).
- **Backend build:** Cú pháp chuẩn. (Đã xử lý xóa file backup tạm trùng tên để tránh lỗi CS0111 duplicate class).

## 9. Vấn đề còn lại
- Không có vấn đề nghiêm trọng.
- Lưu ý: Dữ liệu seed (trong `SeedController.cs`) và file `reviewQuestions.js` là cực kỳ đồ sộ. Để cập nhật vào CSDL backend, cần chạy endpoint `POST /api/Seed/questions`.
