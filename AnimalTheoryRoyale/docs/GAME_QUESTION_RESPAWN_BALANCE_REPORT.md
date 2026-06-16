# Game Question Respawn Balance Report

## 1. Mục tiêu
Cho câu hỏi respawn lại trong vòng bo sau khi người chơi trả lời, đồng thời làm bo cuối respawn chậm để không spam quá nhanh. Đảm bảo số lượng câu hỏi phù hợp với kích thước bo và không để tình trạng hết câu hỏi hoặc bo cuối bị trống rỗng.

## 2. Logic cũ
- Server sinh ra một lượng câu hỏi cố định rải rác trên bản đồ từ đầu trận.
- Khi bo thu hẹp, nhiều câu hỏi active nằm ngoài bo dẫn tới việc người chơi trong bo không còn câu hỏi để trả lời.
- Cột câu hỏi trả lời xong bị loại bỏ vĩnh viễn (hoặc respawn cố định mà không cân nhắc số lượng trong vòng bo).
- Không có cơ chế nhận diện số zone trong bo dẫn đến vòng lặp cập nhật bị chặn lại khi lượng zone còn active ngoài bo quá lớn.

## 3. Logic mới
- Xác định rõ mức tối đa của số lượng cột Active (`maxZones`) tuỳ thuộc theo kích thước bán kính SafeZone.
- Chỉ đếm những Zone đang Active và nằm **BÊN TRONG** vòng bo. Nếu số lượng này nhỏ hơn `maxZones`, hệ thống sẽ cho phép spawn bù câu hỏi mới.
- Vị trí spawn câu hỏi mới được tính toán bằng hàm `GetRandomPositionInsideSafeZone` có kết hợp margin để chắc chắn spawn nằm trong SafeZone nhưng không sát vách tường bo.
- Các Zone nằm ngoài bo sẽ lập tức bị tắt (`IsActive = false`) và đưa vào cooldown.
- Khi người chơi trả lời xong câu hỏi, thay vì biến mất vĩnh viễn, Zone được đưa vào trạng thái cooldown động (`Cooldown Zones`). Hết thời gian này nó sẽ có thể được kích hoạt lại (với vị trí và câu hỏi mới).
- Thêm Panel Debug cho Host để theo dõi số lượng câu Active, Cooldown, và Time Respawn.

## 4. Quy tắc theo bán kính bo

| SafeZone Radius | Max Active Zones | Cooldown |
|---:|---:|---:|
| > 200 | 15 | 15s |
| > 150 | 10 | 20s |
| > 80 | 6 | 25s |
| > 35 | 4 | 30s |
| <= 35 | 3 | 40s |

## 5. File đã sửa
- `Backend/Models/Realtime/GameState.cs` (Thêm `UsedQuestionIds` để theo dõi pool câu hỏi tránh trùng lặp nếu chưa hết câu)
- `Backend/Services/GameEngine.cs` (Sửa logic vòng lặp `UpdateKnowledgeZones`, thêm `GetMaxActiveZones`, `GetRespawnCooldownSeconds`, sửa random position trong bo)
- `Backend/Hubs/GameHub.cs` (Sửa logic hàm `SubmitAnswer` để gán cooldown linh hoạt tuỳ bán kính bo thay vì cố định 25s)
- `Frontend/src/components/HostDashboard.jsx` (Thêm mục DEBUG: QUESTION SPAWN ở panel phải để theo dõi trực tiếp các thông số của cơ chế này)

## 6. Kết quả test

| Tình huống | Kết quả |
|---|---|
| Đầu game | Có đầy đủ 15 câu rải rác trong bo. |
| Trả lời 1 câu | Cột câu hỏi biến mất và rơi vào trạng thái Cooldown. |
| Respawn sau cooldown | Sau 15-20s, cột câu hỏi được tái kích hoạt với câu hỏi mới tại vị trí an toàn trong bo. |
| Bo nhỏ | SafeZone bán kính giảm dần khiến Max Active Zone hạ xuống theo chuẩn, không xuất hiện dư thừa. |
| Bo cuối | Active Zone duy trì ở mức 3-4 câu, hồi chiêu rất chậm (30-40s) để tránh loạn. Vẫn còn câu hỏi. |
| Trả lời nhiều câu liên tục | Các câu hỏi xoay vòng, lượng Used Questions đếm tới khi max và reset lại nếu chơi cạn kiệt ngân hàng. Lượng zone Active giảm rồi tăng hồi lại qua từng nhịp. Hệ thống tự phục hồi không cần F5. |

## 7. Ghi chú còn lại
Nếu lượng câu hỏi trong ngân hàng dồi dào, Game có thể tiếp tục chơi vòng bo trong nhiều giờ mà không sợ "cạn kiệt nội dung". Tuy nhiên để duy trì nhịp độ eSports, bo nhỏ và cuối trận sẽ ưu tiên combat giữa người chơi với nhau thay vì farm điểm.
