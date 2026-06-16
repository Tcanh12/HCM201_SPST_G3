# Game Question Spawn Mechanism Report

## 1. Mục tiêu rà soát

Rà soát cơ chế spawn/respawn câu hỏi trong game VNR202 để tìm nguyên nhân vì sao gần cuối trận không còn câu hỏi/challenge xuất hiện trên bản đồ, khiến người chơi bị rơi vào trạng thái chỉ di chuyển mà không có tương tác.

## 2. Tổng quan luồng hiện tại

- **Nguồn câu hỏi**: Lấy trực tiếp từ database (bảng `Questions`) lúc Host ấn bắt đầu trận, lưu toàn bộ vào cache memory trên Backend (`QuestionPool`).
- **Nơi chọn câu hỏi**: Backend (`GameEngine.cs` và `GameHub.cs`).
- **Nơi spawn challenge**: Backend `GameEngine.cs` quản lý `KnowledgeZones`, broadcast toạ độ qua SignalR cho Frontend `GameScene.jsx` render.
- **Nơi xử lý trả lời**: Backend `GameHub.cs` (hàm `SubmitAnswer`), xử lý logic cộng trừ điểm, combo.
- **Nơi lưu câu hỏi đã dùng**: Memory của Backend, thông qua Dictionary `AnsweredQuestions` (lưu theo format `connectionId_questionId`).

## 3. File đã kiểm tra

| STT | File | Vai trò |
|---|---|---|
| 1 | `Backend/Services/GameEngine.cs` | Chứa logic quản lý vòng bo, khởi tạo Zone, và vòng lặp respawn Zone. |
| 2 | `Backend/Hubs/GameHub.cs` | Xử lý sự kiện ClaimQuestion, SubmitAnswer, lưu lịch sử trả lời của user. |
| 3 | `Backend/Models/Realtime/GameState.cs` | Cấu trúc dữ liệu chứa QuestionPool, AnsweredQuestions, ActiveQuestionIds. |
| 4 | `Frontend/src/game3d/GameScene.jsx` | Lắng nghe `gameState`, render ra `KnowledgeZone` theo tọa độ. |
| 5 | `Frontend/src/game3d/KnowledgeZone.jsx` | Component vẽ UI cột phát sáng cho Challenge Zone. |

## 4. Nguồn câu hỏi hiện tại

| Nguồn | Có dùng không | Ghi chú |
|---|---|---|
| Supabase/database | **CÓ** | Được load lên thông qua Entity Framework (`db.Questions.ToListAsync()`) khi game bắt đầu. |
| advanced_questions.json | KHÔNG | File tĩnh, chỉ dùng cho seed database ban đầu. |
| questions_raw.txt | KHÔNG | File thô. |
| reviewQuestions.js | KHÔNG | Chỉ dùng cho phần Review Theory ở ngoài lobby/dashboard. |
| SeedController.cs | KHÔNG | Dùng để push data vào DB, không tham gia vào gameplay realtime. |

## 5. Cơ chế spawn challenge hiện tại

```txt
Host ấn Bắt đầu Game
↓
Backend kết nối DB, tải TOÀN BỘ câu hỏi vào bộ nhớ (QuestionPool).
↓
Backend tạo sẵn 20 zone ngẫu nhiên, gán cho mỗi zone một câu hỏi KHÔNG TRÙNG NHAU.
↓
Gửi tín hiệu GameStarted và GameStateUpdate (chứa toạ độ zones) xuống Frontend.
↓
Người chơi nhìn thấy các cột tri thức (KnowledgeZone) phát sáng trên bản đồ.
```

## 6. Cơ chế chọn câu hỏi

* **Random hay theo filter**: Ngẫu nhiên. Backend nhặt ngẫu nhiên câu hỏi bằng hàm `PickUnusedQuestion`. Không hề lọc theo Difficulty hay QuestionType.
* **Có tránh trùng không**: Có. Các câu hỏi được gán cho Zone trên map đều là **duy nhất** (không có 2 zone hiện cùng 1 câu hỏi).
* **Tránh trùng với người chơi**: Khi người chơi chạm Zone (`ClaimQuestion`), backend kiểm tra xem người chơi đã trả lời câu này chưa. Nếu trả lời rồi, tự động tráo thành 1 câu ngẫu nhiên khác trong pool mà người chơi chưa gặp.
* **Câu đã dùng lưu ở đâu**: Lưu trong `game.AnsweredQuestions` (memory Backend, mất khi tắt phòng).
* **Khi cạn Pool**: Nếu người chơi đã trả lời HẾT sạch câu hỏi trong Pool, Game sẽ tự động fallback: cho phép trả lời lại câu của Zone đó. 

## 7. Cơ chế sau khi trả lời

* **Challenge bị xóa hay cooldown**: Bị xóa (Inactive) lập tức.
* **Có tạo challenge mới không**: Không tạo mới ngay, mà bắt đầu thời gian chờ **cooldown 25 giây** (xác định bởi `zone.RespawnTime = DateTime.UtcNow.AddSeconds(25)`).
* Dù trả lời **đúng** hay **sai**, zone đều biến mất để nhường chỗ cho zone mới sau 25s.

## 8. Cơ chế respawn hiện tại

| Nội dung                       | Kết quả | Ghi chú |
| ------------------------------ | ------- | --- |
| Có respawn tự động không       | Có | Engine vòng lặp Game Loop cập nhật liên tục mỗi tick. |
| Respawn theo timer không       | Có | Cooldown đúng 25 giây sau khi biến mất. |
| Respawn sau khi trả lời không  | Có | |
| Respawn theo phase/round không | Không trực tiếp | Có phụ thuộc vào bán kính vòng bo (`SafeZone.Radius`). |
| Có giới hạn số lần spawn không | Có | **Giới hạn số Zone ACTIVE cùng lúc trên Map.** Nếu bo lớn (>150m): max 15 zone. Nếu bo hẹp (<150m): max 5 zone. |

## 9. Nguyên nhân có thể làm hết câu hỏi

Dưới đây là bảng phân tích nguyên nhân dựa trên code thực tế:

| Nguyên nhân                                 | Có xảy ra không | Bằng chứng trong code |
| ------------------------------------------- | --------------- | --------------------- |
| Pool câu hỏi bị dùng hết                    | Không           | Code fallback về câu cũ nếu cạn pool, không báo lỗi. |
| Zone bị remove nhưng không respawn          | **CÓ**          | Tại `GameEngine.cs`, nếu `activeZones >= maxZones` thì lệnh respawn bị `continue` (bỏ qua). |
| Filter difficulty/questionType quá hẹp      | Không           | Game hiện không áp dụng filter. Lấy ngẫu nhiên. |
| usedQuestions không reset                   | Không ảnh hưởng | Backend sẽ cho lặp câu nếu hết. |
| Backend trả null nhưng frontend không xử lý | Ít khả năng     | Lỗi này hiếm, trừ khi `QuestionPool` rỗng từ đầu, nhưng HostStartGame đã chặn trường hợp pool rỗng. |
| SignalR event spawn bị mất                  | Không           | Gửi State gộp mỗi giây, không bị rơi event lẻ. |
| Safe zone/phase xóa challenge               | Không xóa       | Bo thu hẹp KHÔNG xóa zone, dẫn đến kẹt zone. |

## 10. Kết luận nguyên nhân chính

**Nguyên nhân cốt lõi khiến cuối game không có câu hỏi là do LỖI KẸT ZONE NGOÀI VÒNG BO (Out-of-zone Lock).**

Chi tiết logic gây lỗi:
1. Khi game bắt đầu (bo to), có tối đa 15 zone xuất hiện rải rác. 
2. Về cuối game, bán kính vòng bo thu hẹp `< 150m`. Lúc này biến `maxZones` giảm xuống thành 5.
3. Tuy nhiên, các zone đã xuất hiện từ đầu game **KHÔNG BỊ XÓA** khi vòng bo thu hẹp. Chúng nằm lại ở ngoài "bo bão" (người chơi ra sẽ mất máu chết). Những zone ngoài bo này vẫn ở trạng thái `IsActive = true`.
4. Vì có quá nhiều zone đang `IsActive = true` nằm ngoài bo, đếm tổng số active zone luôn lớn hơn 5 (`activeZones >= 15 > maxZones`).
5. Vòng lặp Respawn (`UpdateKnowledgeZones`) thấy số zone đang active đã vượt mức cho phép, nên **KHÔNG CHO PHÉP RESPAWN THÊM BẤT KỲ ZONE NÀO**.
6. Kết quả: Vùng an toàn nhỏ xíu ở giữa map không hề có zone nào xuất hiện, còn bên ngoài bo bão thì đầy zone nhưng không ai dám ra ăn. Hệ thống sinh câu hỏi bị "tê liệt".

## 11. Đề xuất hướng sửa

### Phương án A – Hủy Zone khi nằm ngoài bo quá lâu (Khuyến nghị)
Trong GameEngine loop, bổ sung logic kiểm tra khoảng cách từ Zone tới tâm bo (`SafeZone.CenterX/Z`). Nếu `distance > SafeZone.Radius` (tức là Zone nằm ngoài vùng an toàn) thì ép `zone.IsActive = false`. Việc này làm giảm `activeZones`, kích hoạt respawn zone mới nhảy vào trong bo.

### Phương án B – Kéo trực tiếp Zone đang Active vào bo
Trong `UpdateKnowledgeZones`, không chỉ di chuyển zone lúc Respawn, mà quét cả các zone đang Active. Nếu nó rơi ra ngoài vòng bo, tịnh tiến nó trượt dần vào bên trong mép bo.

### Phương án C – Thay đổi cách đếm MaxZones
Đổi logic `int activeZones = game.KnowledgeZones.Values.Count(z => z.IsActive)` thành chỉ đếm những zone **đang active VÀ nằm trong SafeZone**. Khi đó, game vẫn cho phép spawn thêm zone bên trong bo dù bên ngoài bo còn nhiều zone bị bỏ lại.

### Phương án D – Fallback question xử lý rõ ràng hơn
Dù không phải nguyên nhân chính, nhưng code `ClaimQuestion` (dòng 518) đang có đoạn `if (!game.QuestionPool.TryGetValue(chosenQuestionId...)) return;` làm return im lặng. Nên thay bằng cách gửi `AnswerResult` với thông báo lỗi rõ ràng.

## 12. Phương án khuyến nghị

**Nên chọn Phương án A kết hợp với tinh chỉnh Phương án C.**
- Tự hủy zone ngoài bo (hoặc ép Inactive) là logic chuẩn mực nhất của các game Battle Royale.
- Tránh làm nặng Backend (không cần update toạ độ trượt dần của Phương án B).
- Luôn đảm bảo trong bo có tối đa 5 challenge cho người chơi giải trí cuối trận.
- Tránh lag vì chỉ thay đổi trạng thái biến `IsActive` bằng false.

## 13. Checklist cần sửa sau khi được duyệt

* [ ] Sửa `GameEngine.cs` vòng lặp update để hủy zone nằm ngoài SafeZone.
* [ ] Kiểm tra lại biến đếm `maxZones` cho mượt mà.
* [ ] Thêm fallback trả thông báo lỗi thay vì `return` im lặng trong `ClaimQuestion`.
* [ ] Test đủ 10 phút/trận với cơ chế vòng bo thu hẹp.
* [ ] Test xem zone mới có xuất hiện ở vòng bo cuối cùng (bo 10m) hay không.
