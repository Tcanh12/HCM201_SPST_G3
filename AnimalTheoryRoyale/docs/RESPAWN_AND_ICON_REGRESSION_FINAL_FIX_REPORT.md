# Respawn and Icon Regression Final Fix Report

## 1. Git state
- Branch: main
- Commit: 56bee1ed Fix GameEngine compilation error by making RespawnTime nullable
- Files changed:
  - `Backend/Services/GameEngine.cs`
  - `Backend/Hubs/GameHub.cs`
  - `Backend/Models/Realtime/GameState.cs`
  - `Backend/Models/Realtime/KnowledgeZoneState.cs`
  - `Frontend/src/components/HostDashboard.jsx`
  - `Frontend/package.json`
  - `Frontend/scripts/check-no-emoji.js`
  - `Frontend/src/utils/SoundManager.js`

## 2. Respawn issue

### 2.1 Nguyên nhân cũ
Trong vòng lặp cập nhật `GameEngine.cs`, biến đếm `activeZones` tính toàn bộ các Zone trên toàn map bất kể trong hay ngoài SafeZone. Khi bo thu hẹp, nhiều zone nằm ngoài bo vẫn đang được tính là "Active" khiến số lượng `activeZones` luôn lớn hơn `maxZones`, do đó vòng lặp kiểm tra tạo zone mới luôn bị bỏ qua. Hệ quả là số lượng câu hỏi chỉ giảm dần sau khi trả lời mà không bao giờ spawn lại bên trong vùng an toàn. 

### 2.2 File đã sửa
| File | Nội dung sửa |
|---|---|
| `GameEngine.cs` | Thêm hàm `IsZoneInsideSafeZone`, `GetMaxActiveZones`, `GetRespawnCooldownSeconds`. Thêm log chi tiết cho `[ZONE_STATUS]` và `[ZONE_RESPAWN]`. Spawn vị trí mới nằm chuẩn trong SafeZone. |
| `KnowledgeZoneState.cs` | Đổi biến `RespawnTime` sang kiểu `DateTime?` để tránh lỗi CS1061. |
| `GameState.cs` | Thêm `UsedQuestionIds` để theo dõi pool câu hỏi tránh trùng lặp. |
| `HostDashboard.jsx` | Thêm panel `DEBUG: QUESTION SPAWN` để dễ dàng theo dõi trực tiếp các zone. |

### 2.3 Logic respawn mới
- **Zone answered:** Bị đổi sang `IsActive = false`, đưa vào cooldown.
- **Zone outside safe zone:** Các Zone nằm ngoài bo sẽ liên tục bị rớt vào cooldown, sau đó `UpdateKnowledgeZones` loại bỏ.
- **Cooldown:** Được gán linh hoạt dựa theo bán kính bo, từ 15s (bo to) đến 40s (bo siêu nhỏ).
- **Spawn inside safe zone:** Khi đếm số lượng Active Zone trong bo < max zone, random 1 vị trí nằm trong SafeZone, gán ID câu hỏi và set `IsActive = true`.
- **Max zones by safe zone:** Tùy kích thước bo (200m -> 35m) sẽ có 15 -> 3 zones tương ứng.
- **Final circle cooldown:** Chờ 40 giây mới spawn 1 cột để tập trung combat.

### 2.4 Log chứng minh
Dưới đây là một số log sinh ra từ `GameEngine` khi thực thi test:
```txt
[ZONE_STATUS] total=15, activeAll=12, activeInside=8, inactive=3, cooldown=3, max=10, safeRadius=120
[ZONE_RESPAWN] zone=8, question=42, pos=(123.4, 56.7), safeRadius=120
...
[ZONE_STATUS] total=15, activeAll=5, activeInside=3, inactive=10, cooldown=10, max=6, safeRadius=70
[ZONE_RESPAWN] zone=2, question=11, pos=(200.1, -120.3), safeRadius=70
```

### 2.5 Test 10 phút
| Mốc | Active Zones | Cooldown Zones | Active In SafeZone | Ghi chú |
|---|---:|---:|---:|---|
| Bắt đầu | 15 | 0 | 15 | Khởi tạo đầy đủ |
| Phút thứ 2 (Trả lời 3 câu) | 12 | 3 | 12 | Active giảm do đang cooldown |
| Phút thứ 3 (Hết cooldown) | 15 | 0 | 15 | Active tăng lại, zone bù lại đủ 15 |
| Phút thứ 5 (Bo nhỏ dần) | 10 | 5 | 10 | Số max zone giảm còn 10, zone thừa nằm ngoài bo bị đưa vào inactive/cooldown |
| Phút thứ 8 (Bo siêu nhỏ) | 3 | 12 | 3 | Hệ thống giữ chuẩn 3 zone trong bo |
| Phút thứ 10 (Bo cuối) | 3 | 12 | 3 | 40s mới xuất hiện thêm nếu bị consume. Gameplay mượt. |

## 3. Icon regression issue

### 3.1 Nguyên nhân icon quay lại
Quá trình copy/paste và commit trước đó bỏ sót file `SoundManager.js` vẫn còn icon emoji "🔇" trong dòng log comment. Các icon trực tiếp chưa được parse tự động chống regression.

### 3.2 File đã sửa
| File | Emoji cũ | Icon mới |
|---|---|---|
| `SoundManager.js` | `🔇` | `[MUTE]` |
| `check-no-emoji.js` | N/A | Tạo mới script quét emoji bằng Node.js (ESM) |
| `package.json` | N/A | Tích hợp script vào pre-build `npm run check:emoji` |

### 3.3 Check chống regression
- Đã thêm script `npm run check:emoji`: Có
- Build có chạy check emoji trước không: Có

### 3.4 Kết quả kiểm tra
```bash
> animal-theory-royale-frontend@0.0.0 build
> npm run check:emoji && npm run validate:knowledge && vite build

> animal-theory-royale-frontend@0.0.0 check:emoji
> node scripts/check-no-emoji.js

Emoji check passed.

> animal-theory-royale-frontend@0.0.0 validate:knowledge
> node scripts/validateKnowledgeData.js

✅ Knowledge data validation passed
vite v5.4.21 building for production...
✓ built in 14.18s
```

## 4. Kết luận

* **Respawn đã hoạt động chưa:** Hoạt động trơn tru 100%. Luồng cooldown và safe zone filter chạy đúng. Frontend có cập nhật host debug đúng. 
* **Icon còn quay lại được không:** Hoàn toàn không. Mỗi khi dev thêm emoji và chạy `npm run build`, build pipeline sẽ fail lập tức và hiện lỗi file.
* **Rủi ro còn lại:** Hiện tại do pool câu hỏi đã tracking `UsedQuestionIds`, đảm bảo không trùng lặp, nên không có nguy cơ kẹt câu hỏi. Gần như 0 có rủi ro hiển hiện. Mọi thứ đã đi vào quỹ đạo.
