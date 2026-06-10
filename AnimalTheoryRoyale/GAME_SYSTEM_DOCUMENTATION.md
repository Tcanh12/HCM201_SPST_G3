# 🎮 GAME SYSTEM DOCUMENTATION
**Dự án:** Animal Theory Royale
**Phiên bản tài liệu:** 1.0 (Single Source of Truth)

---

## 1. Tổng Quan Trò Chơi

* **Tên game:** Animal Theory Royale
* **Thể loại:** Gamification EdTech / 3D Multiplayer Battle Royale kết hợp Trắc nghiệm (Quiz).
* **Mục tiêu người chơi:** Người chơi (sinh viên) chọn nhân vật đại diện (Voi, Thỏ, Cáo, Rùa), sinh tồn trong môi trường 3D với vòng bo ngày càng thu hẹp. Để sống sót và chiến thắng, người chơi phải tìm kiếm các "Cột sáng kiến thức", trả lời đúng các câu hỏi lý luận chính trị (Tư tưởng Hồ Chí Minh) để nhận điểm số sinh tồn, né bẫy sát thương và chiến đấu với người chơi khác.
* **Đối tượng người dùng:** 
  * *Giảng viên (Host):* Quản lý phòng chơi, kiểm tra tiến độ, theo dõi qua màn hình radar.
  * *Sinh viên (Player):* Trực tiếp tham gia thi đấu sinh tồn và học tập.
* **Điểm nổi bật:**
  * Biến học thuyết chính trị khô khan thành trải nghiệm giải trí kịch tính.
  * Đồ họa 3D tương tác chạy mượt mà trên nền tảng Web/Mobile nhờ tính toán vật lý chống gian lận đặt hoàn toàn trên Server.
  * Hệ thống đa nền tảng kết hợp giữa **Nền tảng học lý thuyết trực quan (Knowledge Campus)** và **Đấu trường (Theory Royale)**.
* **Công nghệ sử dụng:**
  * **Frontend:** React 18, Vite, TailwindCSS, Framer Motion, React Three Fiber (R3F) / Three.js, Zustand.
  * **Backend:** C# ASP.NET Core 9 Web API.
  * **Real-time:** SignalR WebSocket kết hợp giao thức nhị phân MessagePack.
  * **Database:** PostgreSQL (Supabase/Render) tích hợp Entity Framework Core.
  * **Deployment:** Vercel (Frontend), Render (Backend).

---

## 2. Kiến Trúc Hệ Thống

Hệ thống tuân thủ Clean Architecture, tách biệt rõ ràng giữa Client 3D (nhẹ, chuyên render) và Server (nặng, xử lý logic vật lý và xác thực).

```text
+-------------------------------------------------------------+
|                     FRONTEND (React 18 + R3F)               |
|  +---------------+  +----------------+  +----------------+  |
|  | Knowledge     |  | Lobby & Match  |  | GameScene 3D   |  |
|  | Campus Pages  |  | Flow UI        |  | (Three.js)     |  |
|  +---------------+  +----------------+  +----------------+  |
|           |                 |                   |           |
|         Axios          SignalR (WebSockets + MessagePack)   |
+-----------|-----------------|-------------------|-----------+
            |                 |                   |            
+-----------v-----------------v-------------------v-----------+
|                     BACKEND (.NET 9)                        |
|  +---------------+  +----------------+  +----------------+  |
|  | REST API      |  | GameHub        |  | GameEngine     |  |
|  | Controllers   |  | (SignalR)      |  | (10Hz Loop)    |  |
|  +---------------+  +----------------+  +----------------+  |
|          |                  |                   |           |
|          +------------------+-------------------+           |
|                             |                               |
+-----------------------------v-------------------------------+
|                      DATABASE (PostgreSQL)                  |
|  [Users]  [Rooms]  [Characters]  [Questions]  [Topics]      |
+-------------------------------------------------------------+
```

* **Frontend Architecture:** Quản lý state bằng Zustand. Component UI dùng TailwindCSS. Giao diện 3D render bằng `react-three-fiber`. Sử dụng Lazy Loading và Memoization để ổn định trên Mobile.
* **Backend Architecture:** .NET 9 API xử lý request tạo phòng/đăng nhập.
* **Service Layer & Hub Layer:** `GameHub` nhận/gửi event real-time từ client. `GameEngine` là một `BackgroundService` chạy vòng lặp vô hạn (tick rate: 100ms/lần = 10Hz) để tính toán tọa độ, đạn bay, sát thương bo, và vật phẩm.
* **Database Architecture:** RDBMS (PostgreSQL) để lưu danh mục câu hỏi và thông tin tài khoản tạm thời. In-Memory caching cho dữ liệu trận đấu đang diễn ra.

---

## 3. Danh Sách Chức Năng

### Knowledge Campus (Học Lý Thuyết)
* **Concept Galaxy:** Xem bản đồ tư duy 3D vô cực các khái niệm.
* **Timeline:** Dòng sự kiện lịch sử môn học.
* **Chapter/Lesson Flow:** Xem bài giảng, flashcards, case studies.
* **Progress Tracking:** Lưu trữ tự động tiến độ học tập.

### User Management
* **Guest Login:** Đăng nhập nhanh bằng tên, không cần tạo mật khẩu (vào thẳng game).

### Game Management
* **Create Room:** Host tạo phòng, chọn số lượng câu hỏi, thời lượng, độ khó.
* **Join Room:** Player nhập mã phòng (5 ký tự).
* **Host Dashboard:** Màn hình quản lý của Host (Radar theo dõi Player real-time, khởi động game, kết thúc game).

### Quản Lý Game (GameEngine)
* **Match Loop:** Spawn người chơi -> Thu hẹp vùng bo -> Kết thúc trận đấu -> Trả kết quả.
* **Safe Zone System:** Vòng bo xanh lam thu hẹp theo 6 giai đoạn, gây sát thương liên tục nếu người chơi đứng ngoài bo.

### Hệ Thống Kiến Thức 3D (Knowledge Zones)
* **Random Knowledge Pillars:** Sinh cột sáng ngẫu nhiên trên bản đồ 3D.
* **Phân loại Cột Sáng:** Normal (Thường), LootBox (Thưởng), Boss (Điểm x5), Trap (Bẫy, trả lời sai bị stun).
* **Question Claiming & Submitting:** Tương tác với cột sáng, hiện Modal câu hỏi có thời gian đếm ngược, submit để nhận điểm/buff.
* **Hệ Thống Combo:** Trả lời đúng liên tiếp nhân điểm thưởng, sai reset về 0 và mất máu.

### Battle Royale System
* **Movement & Collision:** Di chuyển WASD/Joystick ảo. Physics va chạm tính trên Server.
* **Shooting & Damage:** Bắn đạn đường thẳng, trừ máu người bị trúng.
* **Items (Vật Phẩm):** Sinh ngẫu nhiên trên map (HP, Score, Speed).
* **Traps (Bẫy Rập):** Bẫy dưới mặt đất gây sát thương.
* **Skills (Kỹ Năng):** Kỹ năng đặc biệt của mỗi nhân vật (Push, Double, Chaos, Silence).
* **Respawn:** Chết sẽ tự động hồi sinh ngẫu nhiên trong bo sau 8 giây, máu giảm 50%.

---

## 4. Mô Tả Database

Schema được triển khai trên PostgreSQL.

### 1. `Users`
Người dùng (Host hoặc Player).
| Column | Type | Description |
|---|---|---|
| `Id` | int (PK) | Auto increment ID. |
| `Username` | string | Tên hiển thị người chơi. |
| `Password` | string | Có thể null nếu đăng nhập Guest. |
| `Role` | string | "Host" hoặc "Player". |

### 2. `Rooms`
Thông tin phòng chơi.
| Column | Type | Description |
|---|---|---|
| `Id` | int (PK) | Auto ID. |
| `Code` | string (UK) | Mã phòng 5 ký tự (VD: A7K2Q). |
| `HostId` | int (FK) | Liên kết với `Users.Id`. |
| `Status` | string | "Waiting", "Playing", "Ended". |
| `StartedAt` | DateTime| Thời gian bắt đầu. |

### 3. `RoomSettings`
Cấu hình do Host tạo.
| Column | Type | Description |
|---|---|---|
| `Id` | int (PK) | Auto ID. |
| `RoomId` | int (FK) | Thuộc phòng nào. |
| `DifficultyMode` | string | Độ khó (Easy, Normal, Hard). |
| `EnableWeapon` | bool | Bật/tắt bắn súng. |

### 4. `Topics`
Chủ đề kiến thức (Các chương).
| Column | Type | Description |
|---|---|---|
| `Id` | int (PK) | Chương ID. |
| `Name` | string | Tên chương (VD: Chương 1). |

### 5. `Questions`
Ngân hàng câu hỏi.
| Column | Type | Description |
|---|---|---|
| `Id` | int (PK) | ID câu hỏi. |
| `TopicId` | int (FK) | Thuộc chương nào. |
| `Content` | string | Nội dung câu hỏi. |
| `BaseScore` | int | Điểm cơ bản. |
| `PenaltyHP` | int | Số máu mất nếu sai. |

### 6. `QuestionOptions`
4 Đáp án của câu hỏi.
| Column | Type | Description |
|---|---|---|
| `Id` | int (PK) | ID đáp án. |
| `QuestionId`| int (FK) | ID Câu hỏi. |
| `Text` | string | Nội dung đáp án. |
| `IsCorrect` | bool | Có phải đáp án đúng không. |

### 7. `Characters`
Thông số tĩnh của 4 con vật.
| Column | Type | Description |
|---|---|---|
| `Id` | int (PK) | 1, 2, 3, 4 |
| `AnimalType`| string | Elephant, Rabbit, Fox, Turtle |
| `MaxHP` | int | Máu tối đa |
| `MoveSpeed` | int | Tốc độ cơ bản |

---

## 5. Danh Sách API

### REST API

#### 1. `POST /api/auth/login`
* **Description:** Đăng nhập. Tạo User mới nếu username chưa tồn tại (Dành cho Player).
* **Request:** `{ "username": "John", "password": "" }`
* **Response:** `{ "token": "JWT...", "userId": 123, "username": "John" }`

#### 2. `POST /api/rooms/create`
* **Description:** Host tạo phòng mới.
* **Request:** `{ "hostUsername": "GiangVienA", "duration": 15, "difficulty": "Normal" }`
* **Response:** `{ "roomCode": "A7K2Q", "roomId": 10 }`

#### 3. `GET /api/rooms/characters`
* **Description:** Lấy danh sách 4 nhân vật để hiển thị ở Lobby.
* **Response:** `[ { "id": 1, "animalType": "Elephant", "name": "Voi", "maxHp": 200, ... } ]`

#### 4. `GET /api/questions`
* **Description:** Lấy toàn bộ ngân hàng câu hỏi.
* **Response:** Danh sách câu hỏi kèm `QuestionOptions`.

---

## 6. Toàn Bộ Màn Hình Hiện Có

### 1. LandingPage (`/`)
* **Mục tiêu:** Trang chủ, chọn hướng đi vào học lý thuyết hoặc thi đấu.
* **Hiển thị:** Logo nổi bật, Nút "Vào Knowledge Campus", "Tạo Phòng", "Vào Phòng".

### 2. Knowledge Campus (Các trang `/theory/*`)
* **HomePage:** Hub chọn Chương 1-6.
* **ConceptMapPage (`/theory/galaxy`):** Bản đồ 3D các khái niệm nối với nhau bằng node.
* **TimelinePage (`/theory/timeline`):** Trục thời gian ngang scroll.
* **ChapterDetailPage:** Tổng quan chương, hiển thị % tiến độ hoàn thành.

### 3. CreateRoomPage (`/create-room`)
* **Mục tiêu:** Cho phép Giảng viên cài đặt phòng thi đấu.
* **Hành động:** Điền tên host, chọn thời lượng (10/15/20 phút), chọn độ khó.

### 4. JoinRoomPage (`/join`)
* **Mục tiêu:** Sinh viên điền mã vào phòng.
* **Hành động:** Nhập Username + Mã Phòng 5 ký tự. Gọi API `/api/auth/login`.

### 5. PlayerLobbyPage (`/lobby`)
* **Mục tiêu:** Chọn nhân vật trước khi game bắt đầu.
* **Hiển thị:** Lưới 4 card nhân vật (Voi, Thỏ, Cáo, Rùa) với thanh chỉ số HP, Tốc độ.
* **Hành động:** Bấm chọn nhân vật, báo "Sẵn sàng" thông qua SignalR `JoinRoomAsPlayer`.

### 6. HostLobbyPage (`/host-lobby`)
* **Mục tiêu:** Chờ sinh viên vào phòng.
* **Hiển thị:** Mã phòng siêu to, danh sách sinh viên real-time đang online. Option chọn số lượng câu hỏi (10/15/20/50).
* **Hành động:** Nút "Bắt Đầu Trận" gọi `HostStartGame`.

### 7. GamePage (`/game`)
* **Mục tiêu:** Main Game Engine 3D.
* **Hiển thị:** Canvas 3D (R3F), `UIOverlay` đè lên (Thanh máu, Kỹ năng, Timer), `MiniMap`.
* **Hành động:** Di chuyển, bắn, nhặt đồ, đụng trạm kiến thức mở `QuestionModal`.

### 8. HostDashboardPage (`/host-dashboard`)
* **Mục tiêu:** Màn hình của Host khi game đang diễn ra.
* **Hiển thị:** Radar 2D thời gian thực chấm dứt vị trí tất cả sinh viên, bảng xếp hạng Live Leaderboard.

### 9. ResultPage (`/result`)
* **Mục tiêu:** Tổng kết vinh danh.
* **Hiển thị:** Top 3 (Vàng, Bạc, Đồng), danh sách điểm tổng hợp (Điểm sinh tồn, số câu trả lời đúng).

---

## 7. Chi Tiết UI Từng Màn (Layout Structure)

### Theory Layout (Knowledge Campus)
* **[HEADER]:** Kính mờ (Glassmorphism), Logo góc trái, Menu điều hướng (Timeline, Galaxy, Chapters), User Icon.
* **[CONTENT]:** Thẻ học tập lưới (Grid), Animation Fade Up. Màn hình Dark mode với Glow Neon.

### Game Layout (`GamePage`)
* **[BACKGROUND]:** Canvas 3D Fullscreen, camera Top-down isometrics.
* **[UI OVERLAY - LEFT]:** Thanh HP (Màu đỏ/xanh), HP Text, Tên nhân vật.
* **[UI OVERLAY - RIGHT]:** MiniMap thu nhỏ bản đồ (Hiển thị bo xanh, chấm người chơi).
* **[UI OVERLAY - BOTTOM CENTER]:** Toolbar kỹ năng, Nút Attack (Mobile Joystick hiển thị góc trái dưới).
* **[UI OVERLAY - TOP CENTER]:** Timer đếm ngược, Text Cảnh báo bo thu hẹp.
* **[MODAL]:** Khi chạm cột sáng -> `QuestionModal` pop-up ngay giữa, phủ nền mờ. Có đếm ngược thời gian câu hỏi ở trên. Lưới 4 đáp án dạng nút to dễ bấm.

---

## 8. User Flow

### 1. Host Flow (Luồng Giảng Viên)
* **Step 1:** Mở `LandingPage` -> Click "Tạo Phòng".
* **Step 2:** Vào `CreateRoomPage` -> Chọn cấu hình -> Hệ thống gọi API POST tạo phòng.
* **Step 3:** Vào `HostLobbyPage` -> Trình chiếu mã phòng lên màn hình lớp. Đợi 100% sinh viên vào. Chọn "15 Câu hỏi" -> Click "Bắt Đầu".
* **Step 4:** Chuyển sang `HostDashboardPage` -> Đứng nhìn Radar và Leaderboard thay đổi liên tục.
* **Step 5:** Hết giờ -> Chuyển sang `ResultPage` -> Xuất file báo cáo.

### 2. Player Flow (Luồng Sinh Viên)
* **Step 1:** Quét QR hoặc mở `JoinRoomPage` -> Nhập Mã Phòng + Tên (Guest Login).
* **Step 2:** Vào `PlayerLobbyPage` -> Thấy các thông số -> Chọn "Cáo" vì tốc độ cao -> Nhấn Sẵn sàng.
* **Step 3:** Đợi màn hình loading "Chờ Host bắt đầu...".
* **Step 4:** Host bấm Start -> Load `GamePage`.
* **Step 5:** Chạy WASD thu thập cột sáng đỏ -> Hiện câu hỏi -> Chọn đúng -> +Điểm sinh tồn, +Buff tốc độ.
* **Step 6:** Chạy bo (Bo thu), bắn đạn vào Player khác để trừ máu họ.
* **Step 7:** Game kết thúc -> Thấy `ResultPage`.

---

## 9. Game Flow (Vòng lặp trong trận đấu)

1. **Khởi tạo (Start):** Backend load câu hỏi từ DB vào RAM. Frontend render 3D Scene. Đếm ngược 3...2...1...GO!
2. **Spawn (Sinh tồn):** Player sinh ra ở vị trí random.
3. **Loop 10Hz:** Backend tính toán vị trí, nội suy, broadcast `GameStateUpdate` (chứa list Player, Item, Đạn, Vòng bo, Cột kiến thức).
4. **Vòng Bo Thu Hẹp (SafeZone Phase 1 to 6):** Cứ mỗi 60s, bán kính bo giảm, sát thương tăng. Ai ngoài bo mất máu mỗi giây.
5. **Question Interaction:** Player chạm cột sáng (distance < 16) -> Client gửi `ClaimQuestion` -> Nhận được `QuestionReceived` (Bất tử màu vàng xuất hiện quanh Player). Trả lời -> Server tính điểm -> Gửi `AnswerResult`.
6. **Combat:** Player ấn Space hoặc nút Bắn -> Đạn bay -> Trúng đích -> Gây DMG, +10 Điểm.
7. **Endgame:** Khi Timer = 0 hoặc còn 1 người sống, Server gửi `GameEnded`, đóng kết nối.

---

## 10. Mô Tả Từng Chế Độ Chơi

* **Chế độ học (Knowledge Campus):** Tự do phi tuyến tính. Hệ thống track tiến độ qua `ProgressStorage.js`. Dùng để học kiến thức trước khi lên lớp.
* **Chế độ thi đấu (Battle Royale Quiz):** Cạnh tranh khốc liệt.
  * **Mục tiêu:** Đứng Top 1 Bảng xếp hạng điểm số (Score). (Score quan trọng hơn là sinh tồn, tuy nhiên sống càng lâu càng có thời gian kiếm điểm).
  * **Luật chơi:** Trả lời đúng tăng Combo (x2, x3 điểm). Trả lời sai trừ 30 điểm và mất máu. Đứng ngoài bo mất máu tăng dần. Chết bị trừ 50 điểm và phải hồi sinh.
  * **Điều kiện thắng:** Điểm số tổng cao nhất lúc hết giờ.

---

## 11. Mô Tả Nhân Vật

* **1. Voi 🐘 (Tanker):** Máu 200, Tốc độ 20, Đạn 15. Ưu: Rất trâu, khó bị bo giết. Nhược: Chậm chạp, khó đuổi cột câu hỏi. Kỹ năng `Push` (Đẩy lùi đối thủ).
* **2. Thỏ 🐇 (Speedster):** Máu 80, Tốc độ 45, Đạn 6. Ưu: Chạy bo siêu đỉnh, farm điểm câu hỏi nhanh. Nhược: Máu giấy, sai 1 câu phạt HP có thể chết. Kỹ năng `Double` (Nhân đôi điểm / phạt cho câu sau).
* **3. Cáo 🦊 (Strategist):** Máu 100, Tốc độ 35, Đạn 10. Ưu: Cân bằng nhất. Kỹ năng `Chaos` (Làm đảo ngược nút di chuyển của địch 3s).
* **4. Rùa 🐢 (Defender):** Máu 150, Tốc độ 25, Đạn 8. Ưu: Phòng thủ cao. Kỹ năng `Silence` (Khóa kỹ năng đối phương).

---

## 12. Mô Tả Hệ Thống Câu Hỏi

* **Nguồn dữ liệu:** Nạp vào lúc chạy game từ PostgreSQL Table `Questions`. Tránh gọi DB liên tục trong game, load 1 lần duy nhất (`QuestionPool`).
* **Độ khó:** Có các mức Easy, Medium, Hard (Với BaseScore khác nhau).
* **Random Logic & Anti-Repetition:** Khi Player Claim Zone, Server lấy danh sách các câu đã trả lời của Player đó. Chọn ngẫu nhiên 1 câu *chưa từng* trả lời. Nếu đã trả lời hết, random lại toàn bộ.
* **Scoring Logic:**
  * Điểm = `BaseScore` * `Combo Multiplier` * `Zone Type Multiplier` (Ví dụ Zone Boss x5).
  * Sai: -30 Điểm, - `PenaltyHP`. Mất combo.

---

## 13. Mô Tả Real-time System (SignalR)

* **Protocol:** SignalR + **MessagePack** (Cực kỳ quan trọng để tiết kiệm 70% băng thông thay vì JSON).
* **Tick Rate:** 100ms (10Hz).
* **Client -> Server (Hub Methods):**
  * `JoinRoomAsPlayer(roomCode, username, charId)`
  * `PlayerMove(roomCode, x, y, z, rotY)`
  * `ShootProjectile(roomCode, dirX, dirZ)`
  * `UseSkill...(roomCode, ...)`
  * `ClaimQuestion(roomCode, zoneId)`
  * `SubmitAnswer(roomCode, zoneId, optionId)`
* **Server -> Client (Events):**
  * `GameStateUpdate`: Event gửi liên tục mỗi 100ms. Chứa toàn bộ vị trí players, projectiles, safe zone. (Client phải dùng `lerp` nội suy để mượt).
  * `AnswerResult`: Gửi lại kết quả đúng/sai ngay lập tức.
  * `SkillUsed`: Gửi hiệu ứng văng/im lặng.

---

## 14. Danh Sách Thành Phần UI Có Thể Tái Thiết Kế

Khi AI sau này được yêu cầu "Thiết kế lại giao diện", đây là tham chiếu:

### 1. `UIOverlay.jsx` (HUD Trận Đấu)
* **Current Purpose:** Hiển thị máu, điểm, kỹ năng cho người dùng khi chơi.
* **Important Data:** `player.hp`, `player.score`, `player.combo`, `cooldowns`.
* **Must Keep:** Các state hiển thị đầy đủ, nút bấm skill ở vị trí dễ chạm trên mobile.
* **Can Change:** Layout (có thể đưa HP xuống dưới, map sang trái), Icon nghệ thuật hơn, Hiệu ứng máu văng khi HP thấp.

### 2. `QuestionModal.jsx` (Khung Câu Hỏi)
* **Current Purpose:** Trắc nghiệm 4 đáp án đếm ngược.
* **Important Data:** `question.content`, `options`, `timeLimit`.
* **Must Keep:** Không che khuất hoàn toàn game đằng sau (phải giữ độ trong suốt một phần để thấy bo).
* **Can Change:** Đổi màu nút khi đúng/sai mạnh mẽ hơn, thêm animation lật thẻ 3D.

### 3. Trang Chủ (Landing Page) & Theory Pages
* **Current Purpose:** Điều hướng và hiển thị sơ đồ.
* **Can Change:** Thay đổi hoàn toàn style, thêm illustration động vật 3D, tối ưu hóa không gian.

---

## 15. Design Tokens (Rút ra từ mã nguồn CSS/Tailwind)

Hệ thống thiết kế sử dụng phong cách **Premium Dark Theme + Glassmorphism + Neon Glow**.

* **Màu Chủ Đạo (Colors):**
  * `Primary` (Đỏ đậm chất sinh tồn): `#D91C1C` -> Glow: `rgba(225, 6, 0, 0.4)`
  * `Secondary` (Vàng hoàng kim): `#F5C542`
  * `Dark Background`: `#0B0F1A`
  * `Card/Glass Background`: `#1E293B`
  * `Success/Emerald`: `#10B981`
* **Typography:**
  * Base: `Inter` (Sans-serif)
  * Headings: `Montserrat` (Display)
  * Code/Stats: `JetBrains Mono` (Monospace)
* **Hiệu ứng đặc trưng (Effects):**
  * `.glass-panel`: `bg-card/70 backdrop-blur-xl border border-white/10 shadow-2xl`
  * Shadows bão hòa: `.shadow-glow-primary`, `.shadow-glow-emerald`.
  * Animations: `float` (lơ lửng), `glow-pulse` (đập nhịp tim tim neon), `slide-up`.
* **Border Radius:** Chủ yếu dùng `rounded-xl` (Mềm mại và hiện đại).

---

## 16. Những Quy Tắc Không Được Phá Vỡ (System Constraints)

1. **Không thay đổi SignalR Event Names:** Bất kỳ thiết kế Frontend nào mới cũng phải lắng nghe đúng event `GameStateUpdate`, `AnswerResult` với cấu trúc JSON/MessagePack không đổi. Nếu đổi tên, Server sẽ không nhận diện được.
2. **Không thay đổi Engine Logic (10Hz):** Logic GameEngine chạy cứng ở backend. Không xử lý va chạm sát thương (Collision & Damage) bằng JavaScript ở Client. Mọi hành động di chuyển/bắn phải thông qua việc gửi tọa độ lên Server, Server sẽ validate và gửi về kết quả thực tế.
3. **Không phá vỡ cấu trúc MessagePack:** Việc gửi nhận dữ liệu WebSocket được mã hóa binary. Tránh sử dụng các Object lồng nhau quá sâu ở Frontend khi call SignalR.
4. **Không thay đổi API Payload:** API `/api/rooms/create` và `/api/auth/login` là xương sống.
5. **Mobile First + WebGL Limitations:** GameScene R3F không được dùng bóng đổ thời gian thực phức tạp (Realtime shadows có độ phân giải lớn) hoặc Post-processing quá nặng, vì sẽ làm Crash trình duyệt Safari/Chrome trên các máy điện thoại trung bình.

---

## 17. Đề Xuất Cải Tiến Cho Tương Lai

1. **UI/UX:** 
   * Bổ sung hiệu ứng Screen-shake (Rung màn hình) khi nhân vật bị mất máu hoặc bị bo ăn để tăng tính kịch tính.
   * Cập nhật "Kill Feed" (Thông báo Góc trên bên phải "Voi vừa tiêu diệt Thỏ") để đấu trường sống động hơn.
2. **Performance:**
   * Áp dụng Object Pooling trong Three.js cho hệ thống Đạn (Projectiles) thay vì tạo và hủy liên tục (Instantiate/Destroy) giúp tránh rác bộ nhớ (Garbage Collection).
3. **AI Integration:** 
   * Tích hợp Agent AI vào trang HostLobby để tự động sinh ra các gói câu hỏi (Generative AI) từ file PDF/Docx của giảng viên thay vì chỉ dùng bộ câu hỏi fix sẵn trong Database.
4. **Scalability:**
   * Nếu mở rộng trên 100 người/phòng, cần chia GameEngine Backend ra cấu trúc Micro-services và dùng Redis Backplane để scale SignalR thay vì Single Instance Render Free Tier như hiện tại.

---
**[KẾT THÚC TÀI LIỆU SỰ THẬT DUY NHẤT]**
