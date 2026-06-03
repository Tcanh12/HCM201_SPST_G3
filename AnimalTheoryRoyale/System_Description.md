# Tổng Quan Hệ Thống: Animal Theory Royale – Vòng Bo Tri Thức 3D

## 1. Giới thiệu chung
- **Tên dự án:** Animal Theory Royale
- **Loại hình:** Ứng dụng EdTech Gamification (Game học tập 3D nhiều người chơi).
- **Mô tả:** Một tựa game kết hợp giữa cơ chế sinh tồn kiểu Battle Royale (né vòng bo) và giáo dục (trả lời câu hỏi trắc nghiệm kiến thức môn Chủ nghĩa xã hội khoa học / Tư tưởng Hồ Chí Minh). 
- **Mục tiêu:** Chuyển hóa việc học lý thuyết khô khan thành môi trường thi đấu sinh tồn hấp dẫn. Người chơi phải kết hợp kỹ năng di chuyển (né tránh, nhặt vật phẩm) và kiến thức học thuật để chiến thắng.

## 2. Kiến trúc tổng thể
Hệ thống tuân theo chuẩn **Clean Architecture** kết hợp mô hình **Server-Authoritative State**. 
Server đóng vai trò quyết định hoàn toàn trạng thái thực (Source of Truth) của trận đấu, giúp chống gian lận và đảm bảo đồng bộ hoàn hảo.
- **Client (Frontend):** Nhận thao tác điều khiển, truyền lên server, sau đó nhận trạng thái toàn cục từ server để render hình ảnh 3D và giao diện.
- **Server (Backend):** Vận hành vòng lặp game (`GameEngine`), xử lý tính toán vật lý cơ bản, quản lý cơ sở dữ liệu câu hỏi, tính điểm và Broadcast dữ liệu.

## 3. Công nghệ sử dụng (Tech Stack)

### 3.1. Frontend (Giao diện & 3D Client)
- **Framework Core:** React 18, Vite.
- **Đồ họa & Dựng hình 3D:** React Three Fiber (R3F), `@react-three/drei`, Three.js.
- **Quản lý State:** Zustand.
- **UI / UX:** Tailwind CSS, Framer Motion (hiệu ứng chuyển động mượt mà), Lucide React (Icons).
- **Real-time Networking:** `@microsoft/signalr` kết hợp `@microsoft/signalr-protocol-msgpack` để tối ưu hóa kích thước gói tin (dữ liệu nhị phân).

### 3.2. Backend (Game Server & API)
- **Framework:** ASP.NET Core 8 Web API.
- **Real-time Engine:** SignalR. Server chạy Background Service `GameEngine` cập nhật trạng thái trò chơi ở tốc độ **10 ticks/giây** kết hợp kỹ thuật *Interpolation* trên client để người chơi thấy nhân vật di chuyển không bị giật lag.
- **Database & ORM:** Entity Framework Core. Sử dụng hệ quản trị CSDL **PostgreSQL** (thông qua Npgsql).
- **Hosting & CI/CD:** Sẵn sàng chạy bằng Docker. Môi trường Production tối ưu cho việc deploy lên Render (Backend), Supabase (Database) và Vercel (Frontend).

## 4. Các tính năng cốt lõi (Core Features)

1. **Hệ thống Quản lý Phòng (Room / Lobby):**
   - Host (Giảng viên/Trưởng nhóm) có thể tạo phòng với các tùy chỉnh độ khó, thời lượng.
   - Người chơi tham gia phòng bằng **Mã phòng** (Room Code).

2. **Hệ thống Nhân vật & Di chuyển:**
   - Người chơi được chọn các nhân vật động vật (Voi, Thỏ, Cáo, Rùa) với thông số sinh tồn riêng biệt.
   - Di chuyển trong không gian 3D hoàn chỉnh bằng phím điều hướng (WASD). Tọa độ X, Y, Z được đồng bộ thời gian thực cho toàn bộ người chơi khác trong phòng.

3. **Cơ chế Tri thức & Sinh tồn (Knowledge Zones & Safe Zone):**
   - **Cột sáng tri thức:** Người chơi phải chạy vào các điểm sáng trên bản đồ để kích hoạt UI câu hỏi.
   - **Hệ thống Điểm / Máu:** Trả lời đúng được cộng điểm, sai bị trừ máu.
   - **Vòng Bo:** Bản đồ tự động thu hẹp theo thời gian để ép người chơi phải di chuyển, tạo nhịp độ hồi hộp cho trận đấu.

4. **Bảng điều khiển Giám sát (Spectator Dashboard):**
   - Màn hình dành riêng cho Host hiển thị **Radar Minimap** theo dõi thời gian thực vị trí của mọi người chơi.
   - Bảng xếp hạng (Leaderboard) được cập nhật tự động.

## 5. Tổ chức thư mục chính
- `Backend/`: Chứa mã nguồn .NET Core. Gồm các thành phần quan trọng như `Hubs/GameHub.cs` (Cổng giao tiếp WebSockets) và `Services/GameEngine.cs` (Vòng lặp tính toán trạng thái game).
- `Frontend/`: Chứa mã nguồn React. `src/pages/` quản lý các màn hình như Login, Lobby, Game, Result.
- `README.md`: Cung cấp kịch bản demo và hướng dẫn deploy chi tiết.
