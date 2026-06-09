# Animal Theory Royale – Hệ Sinh Thái Học Tập 3D

> **Sinh tồn bằng tri thức. Chạy nhanh chưa đủ, muốn thắng phải hiểu đúng.**

Đây là một hệ sinh thái học tập (EdTech Gamification) đa nền tảng dành cho các môn **Lý luận chính trị (Tư tưởng Hồ Chí Minh, Chủ nghĩa xã hội khoa học)**. Hệ thống kết hợp giữa **Nền tảng học lý thuyết trực quan (Knowledge Campus)** và **Đấu trường sinh tồn 3D nhiều người chơi (Theory Royale)**.

---

## 🏛 Kiến Trúc Hệ Thống (Clean Architecture)

- **Frontend:** React, Vite, Tailwind CSS, Framer Motion. 
  - **Đồ họa 3D:** React Three Fiber (R3F) đã được tối ưu hóa hiệu suất (loại bỏ WebGL dư thừa, tinh chỉnh Canvas) để mượt mà trên cả thiết bị di động.
  - **Kiến trúc UI:** Giao diện tối màu (Premium Dark Theme) chuẩn Glassmorphism, ứng dụng ErrorBoundary, Lazy Loading và Memoization để tăng tính ổn định.
- **Backend:** ASP.NET Core 8 Web API, SignalR, Entity Framework Core.
  - **Cơ sở dữ liệu:** Supabase PostgreSQL.
  - **Vật lý (Physics):** Tích hợp xử lý va chạm trên Server (Server-validated collision detection) để quản lý chính xác vị trí người chơi và hệ thống bẫy (Traps).
- **Realtime:** Sử dụng SignalR truyền tải tọa độ `(X, Y, Z)` ở tốc độ 10 ticks/giây với cơ chế Interpolation chống giật lag.

---

## 🌟 Tính Năng Nổi Bật

### 1. Hệ Sinh Thái Học Tập Trực Quan (Knowledge Campus)
Hệ thống lý thuyết được xây dựng thành một trung tâm tương tác đa chiều, tối ưu hóa cho trải nghiệm học tập hiện đại:
- **Vũ trụ khái niệm (Concept Galaxy):** Bản đồ tư duy 3D vô cực cho phép sinh viên khám phá mối liên hệ giữa các khái niệm. Giao diện "Glassmorphism" sang trọng (Premium Dark Theme) giúp nội dung hiển thị sắc nét, cấu trúc thông tin khoa học, và mang lại trải nghiệm tương tác mượt mà, thân thiện với người dùng.
- **Dòng chảy lịch sử (Timeline):** Cho phép người học theo dõi sự phát triển của học thuyết theo trục sự kiện. Hệ thống sử dụng thuật toán Lazy Loading và Memoization để tải trang tốc độ cao, kết hợp cơ chế dự phòng lỗi (ErrorBoundary) giúp luồng trải nghiệm luôn xuyên suốt.
- **Bộ máy Tracking Điểm Tích Lũy:** Thuật toán theo dõi tiến độ đo lường độ chuyên cần bằng cách tính toán chi tiết % tiến trình hoàn thành bài học. Tiến độ được ghi nhận linh hoạt dựa trên mức độ tương tác thực tế của người dùng qua các bài tập flashcard và tình huống nghiên cứu (case study) ở từng chương.

### 2. Đấu Trường Sinh Tồn 3D (Theory Royale)
Đấu trường 3D tích hợp cơ chế đồng bộ Multiplayer, mang lại một trận chiến tri thức hấp dẫn và công bằng trên đa nền tảng:
- **Đồ họa & Môi trường 3D:** Môi trường hiển thị 3D được tối ưu hóa tối đa, hoạt động ổn định trên cả thiết bị di động. Các trạm kiến thức được đánh dấu bằng các cột sáng "Chương X" nổi bật có chiều không gian, giúp người chơi dễ dàng định hướng trong bản đồ rông lớn.
- **Hệ thống bẫy rập chuẩn Server (Server-Validated Traps):** Người chơi phải linh hoạt di chuyển để né tránh các bẫy cảnh báo sát thương hiện dưới mặt đất. Logic va chạm và trừ máu được tính toán và đồng bộ trực tiếp từ Engine vật lý phía máy chủ (C# Ammo Backend), đảm bảo môi trường công bằng, chống gian lận tuyệt đối giữa tất cả người chơi.
- **Kho tàng Câu hỏi Học thuật:** Trò chơi sở hữu ngân hàng dữ liệu đồ sộ với hơn 75 câu hỏi chuyên sâu về **Tư tưởng Hồ Chí Minh**. Hệ thống kết nối trực tiếp với cơ sở dữ liệu Supabase PostgreSQL qua API để nạp câu hỏi, đảm bảo tính ngẫu nhiên, hạn chế lặp lại và cân bằng chặt chẽ giữa mức độ khó, điểm thưởng sinh tồn.

---

## 🚀 Hướng Dẫn Chạy Dự Án (Local Development)

### 1. Khởi động Backend (.NET 8)
1. Mở Terminal / PowerShell, điều hướng vào thư mục `Backend/`.
2. Kiểm tra chuỗi kết nối tới **Supabase PostgreSQL** trong `appsettings.json`.
3. Chạy lệnh Migration để đồng bộ Database (nếu cần):
   ```bash
   dotnet ef database update
   ```
4. Chạy Server:
   ```bash
   dotnet run
   ```

### 2. Khởi động Frontend (Vite + React)
1. Mở một Terminal khác, điều hướng vào thư mục `Frontend/`.
2. Cài đặt các thư viện:
   ```bash
   npm install
   ```
3. Chạy Development Server:
   ```bash
   npm run dev
   ```
4. Truy cập trình duyệt tại `http://localhost:5173`.

---

## 💡 Kịch Bản Demo (Thuyết Trình Chấm Điểm)

Để có một buổi thuyết trình hoàn hảo trước giảng viên, hãy thực hiện theo kịch bản sau:

1. **Hệ Sinh Thái Lý Thuyết (Knowledge Campus):**
   - Mở giao diện trang chủ, demo **Concept Galaxy** và **Timeline**.
   - Trình bày hệ thống theo dõi tiến độ (Progress Tracking) đã lưu trạng thái hoàn thành môn học một cách thông minh.

2. **Khởi Tạo Phòng Đấu Trường (Host):** 
   - Từ trang chính, điều hướng sang chế độ Đấu Trường, chọn **"Tạo Phòng Mới"**.
   - Show màn hình Lobby có Mã Phòng (Ví dụ: `A7K2Q`).
   
3. **Người Chơi Tham Gia (Players):**
   - Các thành viên dùng điện thoại hoặc tab trình duyệt khác truy cập.
   - Bấm **"Tham Gia Bằng Mã"**, nhập mã phòng `A7K2Q` và chọn nhân vật.
   
4. **Gameplay Sinh Tồn:**
   - Host bấm **"Bắt Đầu Trận"**.
   - Di chuyển qua các trạm ghi "Chương X", né các bẫy (Trap) hiển thị trên mặt đất.
   - Di chuyển mượt mà chứng minh tính năng xử lý va chạm Server-side và Realtime SignalR.
   - Trả lời đúng các câu hỏi lấy điểm sinh tồn, vinh danh thành tích.

5. **Kết quả:**
   - Hệ thống tự động tổng kết và chuyển sang trang hiển thị Bảng xếp hạng, vinh danh người chiến thắng.

---

## 🐳 Deployment Guide (Production)

### Triển khai Backend (Render / Azure App Service)
- Triển khai ứng dụng dạng Web Service trên Render.com.
- Database trỏ về **Supabase PostgreSQL**.

### Triển khai Frontend (Vercel)
- Push code thư mục `Frontend/` lên GitHub.
- Đăng nhập Vercel, import project, chọn `Vite`.
- Trong mục Environment Variables, đặt `VITE_API_URL` trỏ về link backend Render.
- Bấm Deploy để hoàn tất.

---

> **Design & Architect:** AI Coding Assistant (Antigravity)
> **Dự án:** FPT University (FULearning) - SUMMER 2026
