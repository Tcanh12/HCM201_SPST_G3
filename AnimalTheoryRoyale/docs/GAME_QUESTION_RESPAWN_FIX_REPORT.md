# Game Question Respawn Fix Report

## 1. Lỗi ban đầu
Cuối game không còn challenge trong vòng bo vì zone ngoài bo vẫn active và chặn respawn.

## 2. Nguyên nhân chính
- Zone ngoài SafeZone vẫn `IsActive=true`.
- `activeZones` đếm toàn bộ zone active, kể cả ngoài bo.
- Khi bo nhỏ, `maxZones` giảm nhưng `activeZones` vẫn lớn do các zone bị bỏ lại ngoài bo.
- Vòng lặp Respawn bị `continue` liên tục nên không tạo zone mới trong bo.

## 3. File đã sửa

| File | Nội dung sửa |
|---|---|
| `Backend/Services/GameEngine.cs` | Thêm helper kiểm tra zone trong bo. Deactivate zone ngoài bo. Sửa cách đếm `activeZones`. Tính lại toạ độ spawn chỉ trong bo. |
| `Backend/Hubs/GameHub.cs` | Bổ sung fallback bắn `ChallengeError` và deactivate zone khi không lấy được Question. |
| `Frontend/src/game3d/GameScene.jsx` | Chỉ render những KnowledgeZone có `isActive` hoặc `IsActive` bằng true. |
| `Frontend/src/pages/GamePage.jsx` | Thêm listener hứng event `ChallengeError` để báo lỗi và không kẹt game. |

## 4. Cơ chế mới

### 4.1 Deactivate zone ngoài bo
Quét toàn bộ zone trong Game Loop. Nếu `zone.IsActive` là true nhưng toạ độ không còn nằm trong `SafeZone` (margin 5f), zone sẽ bị `IsActive = false` và hồi sinh nhanh sau 3 giây.

### 4.2 Chỉ đếm zone active trong SafeZone
Biến `activeZones` giờ đây chỉ đếm các zone thoả mãn ĐỒNG THỜI 2 điều kiện: đang `IsActive = true` VÀ nằm trong `SafeZone`. Điều này giúp hệ thống luôn nhận biết nếu trong bo đang thiếu zone để kích hoạt respawn.

### 4.3 Respawn zone mới trong SafeZone
Sử dụng hàm mới `GetRandomPositionInsideSafeZone` thay vì random ngẫu nhiên toàn map. Hàm mới cũng kiểm tra va chạm với map (`MapObstacles.IsPositionBlocked`) 20 lần trước khi fallback, để đảm bảo zone mới không mọc ở ngoài rìa hoặc bên trong tường mà nằm gọn trong an toàn khu.

### 4.4 Fallback khi question không load được
Nếu `ClaimQuestion` thất bại do rỗng Pool, Backend trả về `ChallengeError` thay vì return im lặng. Client sẽ tự động hiện thông báo lỗi ngắn (3s) dạng TrapMessage mà không làm kẹt gameplay.

## 5. Kết quả test

| Case test | Kết quả |
|---|---|
| Đầu game | ✅ Zone spawn bình thường, lấy đúng tối đa 15 zone do `maxZones` ban đầu là 15. |
| Respawn sau trả lời | ✅ Hoạt động ổn định. |
| Bo < 150m | ✅ Các zone ngoài bo lập tức biến mất (deactivate) và `maxZones` giảm theo từng mức 10, 6, 4, 3 dựa trên bán kính bo. |
| Bo cuối | ✅ Luôn có 3-4 zone mới được nhồi vào khu vực bên trong vòng bo. Game không bị vắng bóng challenge. |
| Question lỗi | ✅ Bắn được `ChallengeError`, hiển thị lỗi nhẹ nhàng trên giao diện. |

## 6. Ghi chú còn lại
Hệ thống spawn đã linh hoạt theo từng vòng bo.
Log debug đã được thêm để theo dõi `activeInside` và `maxZones` nếu cần tra cứu. Đảm bảo chạy mượt và không gây drop FPS.
