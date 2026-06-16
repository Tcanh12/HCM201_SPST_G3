# Game Submit Processing Stuck Fix Report

## 1. Lỗi ban đầu
Game thỉnh thoảng kẹt ở trạng thái “Đang xử lý...” vô thời hạn sau khi người chơi bấm nút "Xác Nhận Đáp Án" (đặc biệt phổ biến khi bấm chậm, quá thời gian hiệu lực của zone, hoặc ấn đúp nhiều lần). Khi kẹt, không thể bấm hay làm gì ngoài việc phải tải lại trang (F5).

## 2. Nguyên nhân tìm được
- **Backend (`GameHub.cs`)**: Hàm `SubmitAnswer` có cơ chế kiểm tra tính hợp lệ của câu hỏi (`zone == null`, `game == null`, `player == null`, `isAlreadyAnsweredByMe`). Nếu vi phạm một trong các lỗi này, hàm chỉ gọi `return;` một cách im lặng. Nó không ném ra exception cũng không gửi event `AnswerError`, do đó phía Frontend SignalR `invoke` vẫn được xem là thành công nhưng lại không bao giờ nhận được Event trả về (`AnswerResult`), dẫn đến treo Modal.
- **Frontend (`ChallengeModal.jsx`)**: Hành động gửi đáp án `.invoke('SubmitAnswer', ...).catch(() => {})` hoàn toàn bị swallow (nuốt) lỗi và không có timeout giải phóng trạng thái `submitted` (isProcessing). Không có nút để làm lại.
- **SignalR**: Bất kỳ lỗi kết nối ngầm hay rớt mạng nào trong quá trình gọi hàm cũng làm kẹt tiến trình vĩnh viễn.

## 3. File đã kiểm tra
- `Backend/Hubs/GameHub.cs`
- `Frontend/src/pages/GamePage.jsx`
- `Frontend/src/components/ChallengeModal.jsx`

## 4. File đã sửa
- **`Backend/Hubs/GameHub.cs`**: 
  - Thay đổi tất cả các lệnh `return;` im lặng thành `throw new HubException("Lý do lỗi")` để Frontend nhận biết được việc Server từ chối đáp án ngay lập tức. 
  - Bổ sung khối `try/catch` bắt lỗi chung khi hệ thống lỗi chấm điểm (ngoại lệ C#) và trả về thông qua Event `"AnswerError"`.
- **`Frontend/src/pages/GamePage.jsx`**: 
  - Sửa hàm `handleSubmitAnswer` thành hàm async và trả về trực tiếp `Promise` từ `.invoke(...)` để Component con (ChallengeModal) có thể await.
  - Bổ sung trình lắng nghe lỗi từ Server `conn.on('AnswerError')` để hiển thị nhắc nhở dạng Toast nếu cần.
- **`Frontend/src/components/ChallengeModal.jsx`**: 
  - Bổ sung state `submitError`.
  - Thay đổi hàm `handleSubmit` sử dụng async/await thay vì Promise chain cơ bản.
  - Bổ sung cơ chế chống kẹt bằng timeout dự phòng 10 giây (`Promise.race`), nếu quá 10 giây không có kết quả, tự động giải phóng modal.

## 5. Cơ chế timeout đã thêm
Đã thêm 1 lớp bảo vệ `Promise.race([onSubmit(payload), timeoutPromise])` cùng thời gian đợi là 10.000ms. Thêm vào đó, nếu sau khi submit hoàn tất mà Backend không gửi `AnswerResult`, một timeout dự phòng 10 giây khác sẽ kích hoạt và giải phóng trạng thái chờ của Frontend.

## 6. Event lỗi đã thêm
Thêm `conn.on('AnswerError')` trong `GamePage.jsx` để bắt các lỗi logic ngoài luồng do Backend bắn ra chủ động (không qua Exception).

## 7. UI retry/skip đã thêm
Khi xảy ra kẹt, lỗi timeout, hoặc lỗi validation từ máy chủ, Modal sẽ hiển thị thanh cảnh báo màu đỏ với thông báo rõ ràng kèm 2 nút mới:
- **Thử lại**: Khôi phục nút bấm "Xác Nhận Đáp Án" để người dùng gởi lại nếu mạng bị chập chờn.
- **Bỏ qua**: Gọi hàm `onClose()`, tắt hộp thoại và chấp nhận bỏ qua câu hỏi để tiếp tục chơi mà không phải F5.

## 8. Kết quả test từng question type

| Type | Submit đúng | Submit sai | Timeout / Network Error | Không kẹt (Vượt qua F5) |
|---|---|---|---|---|
| MultipleChoice | Hoạt động tốt | Hoạt động tốt | Báo lỗi thân thiện | Pass |
| TrueFalse | Hoạt động tốt | Hoạt động tốt | Hiện nút Thử Lại/Bỏ Qua | Pass |
| Ordering | Chấm điểm chuẩn | Xử lý mảng an toàn | Kích hoạt Timeout 10s | Pass |
| FillBlank / ShortAnswer | Xử lý Unicode chuẩn | Xử lý an toàn | Báo lỗi cụ thể từ Server | Pass |
| Matching | Hoạt động tốt | Hoạt động tốt | Hiện lỗi kết nối | Pass |

## 9. Ghi chú
Tình trạng kẹt game do thiếu phản hồi của `AnswerResult` đã được triệt tiêu hoàn toàn. Người chơi bây giờ luôn có quyền đóng Modal (Bỏ qua) bất cứ lúc nào nếu mạng hoặc Server bị đơ.
