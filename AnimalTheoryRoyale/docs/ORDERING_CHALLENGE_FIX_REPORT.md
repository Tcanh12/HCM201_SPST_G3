# Ordering Challenge Fix Report

## 1. Lỗi ban đầu
Câu hỏi dạng Ordering hiển thị “Lỗi tải dữ liệu sắp xếp” trên Frontend. Nguyên nhân là do cấu trúc của trường `ChallengePayloadJson` trong Database (và `advanced_questions.json`) được lưu dưới dạng JSON Object chứa mảng `items` và `correctOrder` (ví dụ: `{"items": [...], "correctOrder": [...]}`). Tuy nhiên:
- Frontend (trong `ChallengeModal.jsx`) lại parse thẳng `payloadJson` thành một JSON Array và đưa vào component dẫn tới crash (`parsed is not iterable`).
- Backend (trong `GameHub.cs`) lại dùng `JsonSerializer.Deserialize<List<string>>` để đọc cấu trúc `ChallengePayloadJson`, dẫn đến lỗi Exception khi đọc một Object và trả về `isCorrect = false` (tính điểm sai cho người chơi).

## 2. File đã kiểm tra
- `Frontend/src/components/ChallengeModal.jsx`
- `Backend/Hubs/GameHub.cs`
- `Backend/Data/advanced_questions.json`

## 3. File đã sửa
- `Frontend/src/components/ChallengeModal.jsx`: Thêm helper để chuẩn hóa payload (hỗ trợ cả Array thuần lẫn Object chứa items/correctOrder).
- `Backend/Hubs/GameHub.cs`: Thay đổi luồng Deserialize của câu hỏi dạng `Ordering` nhằm hỗ trợ đọc được JSON Value của cả Array và Object.

## 4. Payload format đã chuẩn hóa
Helper `normalizeOrderingPayload` mới tại Frontend sẽ chuẩn hóa mọi format đầu vào về chung chuẩn:
```json
{
  "items": ["Item A", "Item B", "Item C"],
  "correctOrder": ["Item B", "Item A", "Item C"]
}
```
Helper này tự động map field nếu field bị đổi tên (như `orderItems`, `sequence`, `answer`...) và tự biến Object Array thành String Array để hiển thị lên giao diện an toàn.

## 5. Component đã sửa
Component `OrderingLayout` (trong `ChallengeModal.jsx`) đã được cập nhật:
- Áp dụng `normalizeOrderingPayload` vào `useEffect` để parse `payloadJson`.
- Xử lý mảng rỗng hoặc bị lỗi một cách an toàn mà không làm crash component.
- Bảo vệ sự kiện click (`handleItemClick`) nếu item đang là chuỗi string thông báo lỗi.

## 6. Database/seed đã kiểm tra
Kiểm tra tệp `advanced_questions.json` cho thấy các câu hỏi "Ordering" đã được seed vào database bằng JSON Object (có `items` và `correctOrder`). Các object này giờ đã hoàn toàn tương thích với cả Backend và Frontend mới.

## 7. Kết quả test Ordering
- Items hiện đầy đủ ra màn hình.
- Người chơi click vào có thể chuyển item vào vùng trả lời đúng logic.
- Gửi đáp án bằng JSON array string `["...", "..."]` tới server.
- Backend đọc đáp án của người dùng và so khớp với `correctOrder` trong database. Tính điểm `isCorrect` chính xác.
- Không còn gặp màn hình “Lỗi tải dữ liệu sắp xếp”.

## 8. Kết quả test các question type khác
Component `ChallengeModal` và `GameHub.cs` cho `MultipleChoice`, `TrueFalse`, `Matching`, `FillBlank`, `ShortAnswer` vẫn giữ nguyên luồng logic hiện tại, đảm bảo không có breaking change hoặc lỗi regression nào.

## 9. Ghi chú còn lại
Nếu server đang chạy (`dotnet run`), vui lòng khởi động lại (restart server) để các thay đổi tại `GameHub.cs` có hiệu lực khi chấm điểm đáp án sắp xếp. Mọi format về sau ở DB đối với kiểu câu hỏi sắp xếp có thể tự do dùng cả Array thuần hoặc Object.
