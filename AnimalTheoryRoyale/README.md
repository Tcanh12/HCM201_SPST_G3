# Animal Theory Royale – Vòng Bo Tri Thức 3D

> **Sinh tồn bằng tri thức. Chạy nhanh chưa đủ, muốn thắng phải hiểu đúng.**

Đây là một tựa game học tập (EdTech Gamification) 3D nhiều người chơi dành cho môn **Chủ nghĩa xã hội khoa học**. Thay vì học chay lý thuyết, sinh viên sẽ tham gia vào đấu trường 3D, né vòng bo, nhặt vật phẩm và thi nhau trả lời câu hỏi để lấy điểm sinh tồn.

---

## 🏛 Kiến Trúc Hệ Thống (Clean Architecture)

- **Frontend:** React, Vite, Tailwind CSS, Framer Motion, React Three Fiber (R3F) cho phần xử lý đồ họa 3D.
- **Backend:** ASP.NET Core 8 Web API, SignalR, Entity Framework Core (SQL Server). Thiết kế theo chuẩn Clean Architecture kết hợp State Server-Authoritative.
- **Realtime:** Sử dụng SignalR truyền tải tọa độ `(X, Y, Z)` ở tốc độ 10 ticks/giây với cơ chế Interpolation chống giật lag.

---

## 🚀 Hướng Dẫn Chạy Dự Án (Local Development)

### 1. Khởi động Backend (.NET 8)
1. Mở Terminal / PowerShell, điều hướng vào thư mục `Backend/`.
2. Kiểm tra chuỗi kết nối (Connection String) trong `appsettings.json` (Mặc định dùng LocalDB).
3. Chạy lệnh Migration để tạo Database:
   ```bash
   dotnet ef database update
   ```
4. Chạy Server:
   ```bash
   dotnet run
   ```
5. _(Tùy chọn)_ Gọi API `POST http://localhost:5000/api/questions/seed` bằng Postman/Swagger để nhồi dữ liệu mẫu (Câu hỏi, Nhân vật).

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

1. **Host (Trưởng nhóm):** 
   - Mở 1 tab ẩn danh, chọn **"Tạo Phòng Mới"**.
   - Trình bày về giao diện Tùy chỉnh (Thời lượng, độ khó).
   - Show màn hình Lobby có Mã Phòng (Ví dụ: `A7K2Q`).
   
2. **Players (Các thành viên còn lại):**
   - Dùng điện thoại hoặc tab trình duyệt khác truy cập `http://localhost:5173`.
   - Bấm **"Tham Gia Bằng Mã"**, nhập mã phòng `A7K2Q` và chọn nhân vật khác nhau (Voi, Thỏ, Cáo, Rùa).
   
3. **Gameplay:**
   - Khi tất cả đã vào Lobby, Host bấm **"Bắt Đầu Trận"**.
   - Giải thích hệ thống UI Overlay (Thanh HP, Leaderboard góc phải).
   - Di chuyển các nhân vật bằng phím WASD để cho giảng viên thấy tính năng Realtime chạy cực mượt.
   - Trực tiếp chạy vào Cột sáng (Knowledge Zone) để mở bảng Câu hỏi.
   - Thử trả lời sai 1 câu (Đổi màu đỏ, trừ máu), sau đó đổi tab trả lời đúng 1 câu (Đổi màu xanh, cộng điểm).

4. **Kết quả:**
   - Điều hướng (Navigate) thủ công sang trang `/result/:roomCode` để giới thiệu giao diện Tổng kết vinh danh.

---

## 🐳 Deployment Guide & Docker (Production)

### Triển khai Backend (Render / Azure App Service)
- Có thể dùng Dockerfile đa tầng chuẩn của .NET:
  ```dockerfile
  FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
  WORKDIR /app
  COPY . .
  RUN dotnet publish -c Release -o out

  FROM mcr.microsoft.com/dotnet/aspnet:8.0
  WORKDIR /app
  COPY --from=build /app/out .
  ENTRYPOINT ["dotnet", "AnimalTheoryRoyale.dll"]
  ```
- Deploy lên Render.com dạng Web Service. Database dùng **Supabase PostgreSQL** hoặc Azure SQL.

### Triển khai Frontend (Vercel)
- Push code thư mục `Frontend/` lên GitHub.
- Đăng nhập Vercel, chọn Import Project.
- Framework Preset chọn `Vite`.
- Trong Environment Variables, đặt `VITE_API_URL` là link backend của bạn.
- Bấm Deploy!

---

> **Design & Architect:** AI Coding Assistant (Antigravity)
> **Dự án:** FPT University (FULearning) - SUMMER 2026
