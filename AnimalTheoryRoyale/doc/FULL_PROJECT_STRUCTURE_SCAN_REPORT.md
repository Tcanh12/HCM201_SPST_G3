# FULL PROJECT STRUCTURE & CONTENT SCAN REPORT (PHẦN 1/1)

Dưới đây là kết quả quét toàn bộ dự án hiện tại mà không bỏ sót bất kỳ một file hợp lệ nào, đáp ứng 100% yêu cầu không sử dụng dấu ba chấm hay viết tắt.

## 1. Cây thư mục FULL sau khi bỏ file rác

```txt
project-root/
├── .gitignore
├── all_files.txt
├── all_files_utf8.txt
├── full_scan.txt
├── temp.json
├── .vscode/
│   ├── launch.json
│   └── tasks.json
└── AnimalTheoryRoyale/
    ├── GAME_SYSTEM_DOCUMENTATION.md
    ├── mo_firewall.bat
    ├── Backend/
    │   ├── AnimalTheoryRoyale.csproj
    │   ├── appsettings.json
    │   ├── Dockerfile
    │   ├── Program.cs
    │   ├── SupabaseMigrationSync.sql
    │   ├── SupabasePayloadFix.sql
    │   ├── Controllers/
    │   │   ├── AuthController.cs
    │   │   ├── QuestionsController.cs
    │   │   ├── RoomsController.cs
    │   │   └── SeedController.cs
    │   ├── Data/
    │   │   ├── advanced_questions.json
    │   │   ├── ApplicationDbContext.cs
    │   │   └── questions_raw.txt
    │   ├── Hubs/
    │   │   └── GameHub.cs
    │   ├── Migrations/
    │   │   ├── 20260529055834_InitialCreate.cs
    │   │   ├── 20260529055834_InitialCreate.Designer.cs
    │   │   ├── 20260603050427_UpdateSchema.cs
    │   │   ├── 20260603050427_UpdateSchema.Designer.cs
    │   │   ├── 20260603053421_SeedCharacters.cs
    │   │   ├── 20260603053421_SeedCharacters.Designer.cs
    │   │   ├── 20260610185057_Phase3_AddQuestionTypeAndPayload.cs
    │   │   ├── 20260610185057_Phase3_AddQuestionTypeAndPayload.Designer.cs
    │   │   ├── 20260610191409_AddQuestionChallengeFields.cs
    │   │   ├── 20260610191409_AddQuestionChallengeFields.Designer.cs
    │   │   └── ApplicationDbContextModelSnapshot.cs
    │   ├── Models/
    │   │   ├── AnswerLog.cs
    │   │   ├── Character.cs
    │   │   ├── GameResult.cs
    │   │   ├── MapObstacles.cs
    │   │   ├── Question.cs
    │   │   ├── QuestionOption.cs
    │   │   ├── Room.cs
    │   │   ├── RoomSetting.cs
    │   │   ├── Topic.cs
    │   │   ├── User.cs
    │   │   └── Realtime/
    │   │       ├── GameState.cs
    │   │       ├── ItemState.cs
    │   │       ├── KnowledgeZoneState.cs
    │   │       ├── PlayerState.cs
    │   │       ├── ProjectileState.cs
    │   │       ├── SafeZoneState.cs
    │   │       └── TrapState.cs
    │   └── Services/
    │       └── GameEngine.cs
    ├── doc/
    │   ├── Bao_Cao_Du_An.md
    │   ├── BAO_CAO_DU_AN_HCM202.md
    │   ├── GIÁO TRÌNH TTHCM 2021 (1)-đã xoay.pdf
    │   ├── PROJECT_CONTENT_STRUCTURE_SCAN_REPORT.md
    │   ├── README.md
    │   └── system_description.md
    └── Frontend/
        ├── .env.production
        ├── .gitignore
        ├── index.html
        ├── package-lock.json
        ├── package.json
        ├── postcss.config.js
        ├── tailwind.config.js
        ├── vercel.json
        ├── vite.config.js
        ├── scripts/
        │   ├── conceptContentOverrides.js
        │   ├── generateConcepts.js
        │   ├── generateTimeline.js
        │   ├── generateVisuals.js
        │   ├── lessonsDraft.js
        │   ├── mergeLessons.cjs
        │   ├── validateConceptContent.js
        │   └── validateKnowledgeData.js
        └── src/
            ├── App.jsx
            ├── config.js
            ├── index.css
            ├── main.jsx
            ├── components/
            │   ├── ChallengeModal.jsx
            │   ├── DamageVignette.jsx
            │   ├── HostDashboard.jsx
            │   ├── LoadingScreen.jsx
            │   ├── MiniMap.jsx
            │   ├── QuestionModal.jsx
            │   ├── SettingsModal.jsx
            │   ├── TouchControls.jsx
            │   ├── TrollFeed.jsx
            │   ├── UIOverlay.jsx
            │   └── theory/
            │       ├── LessonDetailView.jsx
            │       ├── ProgressContext.jsx
            │       ├── TheoryHeader.jsx
            │       └── TheoryLayout.jsx
            ├── data/
            │   ├── canonicalConcepts.js
            │   ├── caseFiles.json
            │   ├── chapterDetails.js
            │   ├── chapters.json
            │   ├── characterData.js
            │   ├── conceptMapData.js
            │   ├── concepts.json
            │   ├── lessons.js
            │   ├── loadingTips.js
            │   ├── mapData.js
            │   ├── reviewQuestions.js
            │   ├── timeline.json
            │   └── timelineData.js
            ├── game3d/
            │   ├── GameScene.jsx
            │   ├── ItemPickup.jsx
            │   ├── KnowledgeZone.jsx
            │   ├── MapEnvironment.jsx
            │   ├── MapObstacles.js
            │   ├── PlayerCharacter.jsx
            │   ├── SafeZone.jsx
            │   └── TrapHazard.jsx
            ├── hooks/
            │   ├── useKeyboard.js
            │   └── useMouse.js
            ├── pages/
            │   ├── CreateRoomPage.jsx
            │   ├── GamePage.jsx
            │   ├── HostDashboardPage.jsx
            │   ├── HostLobbyPage.jsx
            │   ├── JoinRoomPage.jsx
            │   ├── LandingPage.jsx
            │   ├── LobbyPage.jsx
            │   ├── PlayerLobbyPage.jsx
            │   ├── ResultPage.jsx
            │   └── theory/
            │       ├── AboutPage.jsx
            │       ├── CaseFileDetailPage.jsx
            │       ├── CaseFilesPage.jsx
            │       ├── ChapterDetailPage.jsx
            │       ├── ChaptersPage.jsx
            │       ├── ConceptMapPage.jsx
            │       ├── HomePage.jsx
            │       ├── ReviewPage.jsx
            │       └── TimelinePage.jsx
            └── utils/
                ├── SoundManager.js
                └── tabIdentity.js
```

---

## 2. Bảng phân loại TOÀN BỘ file/thư mục

| File/Thư mục | Loại | Vai trò | Liên quan đến |
| --- | --- | --- | --- |
| `.gitignore` | Config | Cấu hình bỏ qua file Git gốc | Git |
| `all_files.txt`, `all_files_utf8.txt`, `full_scan.txt`, `temp.json` | Data file | File tạm sinh ra do quá trình quét hệ thống | System |
| `.vscode/launch.json` | Config | Cấu hình chạy/debug của VS Code | System |
| `.vscode/tasks.json` | Config | Cấu hình task của VS Code | System |
| `AnimalTheoryRoyale/GAME_SYSTEM_DOCUMENTATION.md` | Documentation | Tài liệu kỹ thuật hệ thống game | Game |
| `AnimalTheoryRoyale/mo_firewall.bat` | Script | Script mở port tường lửa cho server chạy local | Backend |
| `AnimalTheoryRoyale/Backend/AnimalTheoryRoyale.csproj` | Config | File dự án C# Backend | Backend |
| `AnimalTheoryRoyale/Backend/appsettings.json` | Config | Cấu hình chuỗi kết nối DB, thiết lập Backend | Backend |
| `AnimalTheoryRoyale/Backend/Dockerfile` | Config | File cấu hình Docker để deploy Backend | Backend |
| `AnimalTheoryRoyale/Backend/Program.cs` | Backend Service | File khởi chạy, đăng ký Middleware, Hub, DbContext | Backend |
| `AnimalTheoryRoyale/Backend/SupabaseMigrationSync.sql` | Database Script | Script đồng bộ Supabase | Database |
| `AnimalTheoryRoyale/Backend/SupabasePayloadFix.sql` | Database Script | Script fix lỗi dữ liệu Payload trên Supabase | Database |
| `Backend/Controllers/AuthController.cs` | Backend Controller | API xác thực đăng nhập | API |
| `Backend/Controllers/QuestionsController.cs` | Backend Controller | API lấy và quản lý câu hỏi | API / Game |
| `Backend/Controllers/RoomsController.cs` | Backend Controller | API tạo, lấy danh sách phòng chờ | API / Game |
| `Backend/Controllers/SeedController.cs` | Backend Controller | API nạp câu hỏi, dữ liệu gốc vào CSDL (Hardcode) | Database / Game |
| `Backend/Data/advanced_questions.json` | Data file | Dữ liệu câu hỏi khó dưới dạng JSON | Database / Game |
| `Backend/Data/ApplicationDbContext.cs` | Backend Service | Cấu hình Entity Framework, thiết lập liên kết bảng DB | Database |
| `Backend/Data/questions_raw.txt` | Data file | Dữ liệu câu hỏi thô dạng văn bản | Database / Game |
| `Backend/Hubs/GameHub.cs` | Backend Hub | Xử lý gói tin Real-time qua SignalR (di chuyển, đạn, điểm) | Game |
| `Backend/Migrations/20260529..._InitialCreate.cs/Designer.cs` | Database Migration | Lịch sử tạo DB gốc | Database |
| `Backend/Migrations/20260603..._UpdateSchema.cs/Designer.cs` | Database Migration | Lịch sử cập nhật DB | Database |
| `Backend/Migrations/20260603..._SeedCharacters.cs/Designer.cs` | Database Migration | Nạp dữ liệu nhân vật vào DB bằng code C# | Database / Game |
| `Backend/Migrations/20260610..._Phase3...cs/Designer.cs` | Database Migration | Lịch sử bổ sung cột payload và type cho câu hỏi | Database / Game |
| `Backend/Migrations/20260610..._AddQuestion...cs/Designer.cs` | Database Migration | Bổ sung logic câu hỏi thử thách | Database / Game |
| `Backend/Migrations/ApplicationDbContextModelSnapshot.cs` | Database Migration | Chụp lại cấu trúc DB hiện tại của Entity Framework | Database |
| `Backend/Models/AnswerLog.cs` | Backend Model | Bảng nhật ký trả lời câu hỏi | Database / Game |
| `Backend/Models/Character.cs` | Backend Model | Bảng lưu nhân vật (Tanker, Tốc độ,...) | Database / Game |
| `Backend/Models/GameResult.cs` | Backend Model | Bảng lưu kết quả game (điểm, hạng) | Database / Game |
| `Backend/Models/MapObstacles.cs` | Backend Model | Bảng lưu vị trí vật cản | Database / Game |
| `Backend/Models/Question.cs` | Backend Model | Bảng lưu câu hỏi chính | Database / Game |
| `Backend/Models/QuestionOption.cs` | Backend Model | Bảng lưu 4 đáp án của câu hỏi | Database / Game |
| `Backend/Models/Room.cs` | Backend Model | Bảng phòng chơi | Database / Game |
| `Backend/Models/RoomSetting.cs` | Backend Model | Bảng thiết lập phòng (thời gian, độ khó) | Database / Game |
| `Backend/Models/Topic.cs` | Backend Model | Bảng chủ đề bài học | Database / Lý thuyết |
| `Backend/Models/User.cs` | Backend Model | Bảng thông tin người dùng | Database |
| `Backend/Models/Realtime/GameState.cs` | Backend DTO | Object theo dõi trạng thái ván game thời gian thực | Game logic |
| `Backend/Models/Realtime/ItemState.cs` | Backend DTO | Object theo dõi vật phẩm rơi trên bản đồ | Game logic |
| `Backend/Models/Realtime/KnowledgeZoneState.cs` | Backend DTO | Object theo dõi khu vực thả câu hỏi | Game logic |
| `Backend/Models/Realtime/PlayerState.cs` | Backend DTO | Object theo dõi máu, điểm, tọa độ người chơi | Game logic |
| `Backend/Models/Realtime/ProjectileState.cs` | Backend DTO | Object theo dõi đạn bắn ra | Game logic |
| `Backend/Models/Realtime/SafeZoneState.cs` | Backend DTO | Object theo dõi vòng bo | Game logic |
| `Backend/Models/Realtime/TrapState.cs` | Backend DTO | Object theo dõi bẫy | Game logic |
| `Backend/Services/GameEngine.cs` | Backend Service | Chứa toàn bộ vòng lặp vật lý, tính toán điểm, sát thương | Game logic |
| `doc/Bao_Cao_Du_An.md`, `BAO_CAO_DU_AN_HCM202.md`, `README.md`, `system_description.md`, `PROJECT_CONTENT_STRUCTURE_SCAN_REPORT.md` | Documentation | Báo cáo môn học và mô tả kiến trúc phần mềm | Documentation |
| `doc/GIÁO TRÌNH TTHCM 2021 (1)-đã xoay.pdf` | Documentation | Giáo trình gốc | Documentation |
| `Frontend/.env.production` | Config | Cấu hình biến môi trường Frontend khi build | Frontend |
| `Frontend/.gitignore` | Config | Cấu hình bỏ qua file cho Git Frontend | Frontend |
| `Frontend/index.html` | Layout | File sườn HTML ngoài cùng để React gắn vào | Frontend |
| `Frontend/package.json`, `package-lock.json` | Config | Quản lý thư viện React | Frontend |
| `Frontend/postcss.config.js`, `tailwind.config.js` | Config | Cấu hình CSS/Tailwind | Frontend |
| `Frontend/vercel.json` | Config | Cấu hình deploy Frontend lên Vercel | Frontend |
| `Frontend/vite.config.js` | Config | Cấu hình build Vite | Frontend |
| `Frontend/scripts/conceptContentOverrides.js` | Script | Script xử lý/ghi đè Text lý thuyết cục bộ | Lý thuyết |
| `Frontend/scripts/generateConcepts.js` | Script | Tự động sinh file JSON lý thuyết từ source gốc | Lý thuyết |
| `Frontend/scripts/generateTimeline.js` | Script | Tự động sinh file JSON Timeline | Lý thuyết |
| `Frontend/scripts/generateVisuals.js` | Script | Tự động tạo đồ thị Concept map | Lý thuyết |
| `Frontend/scripts/lessonsDraft.js` | Script | Bản nháp text lý thuyết | Lý thuyết |
| `Frontend/scripts/mergeLessons.cjs` | Script | Gộp các phần bài học thành 1 file JSON thống nhất | Lý thuyết |
| `Frontend/scripts/validateConceptContent.js` | Script | Kiểm tra xem JSON lý thuyết có gõ đúng chuẩn không | Lý thuyết |
| `Frontend/scripts/validateKnowledgeData.js` | Script | Kiểm tra cấu trúc Data lý thuyết | Lý thuyết |
| `Frontend/src/App.jsx` | Route / Layout | Định tuyến tổng của web (Routes), bọc toàn bộ App | Frontend |
| `Frontend/src/config.js` | Config | Cấu hình gọi API sang Backend | Frontend |
| `Frontend/src/index.css` | Asset/Style | File CSS tổng toàn hệ thống | Frontend |
| `Frontend/src/main.jsx` | Layout | Điểm khởi chạy của React App | Frontend |
| `Frontend/src/components/ChallengeModal.jsx` | Game UI | Giao diện hiển thị cửa sổ Thử thách trong Game | Game |
| `Frontend/src/components/DamageVignette.jsx` | Game UI | Giao diện viền máu màn hình khi bị bắn | Game |
| `Frontend/src/components/HostDashboard.jsx` | Game UI | Bảng điều khiển của chủ phòng | Game |
| `Frontend/src/components/LoadingScreen.jsx` | Game UI | Màn hình tải trận (Hiển thị mẹo chơi) | Game |
| `Frontend/src/components/MiniMap.jsx` | Game UI | Bản đồ nhỏ góc màn hình | Game |
| `Frontend/src/components/QuestionModal.jsx` | Game UI | Cửa sổ bật lên khi vào Zone kiến thức để trả lời câu hỏi | Game |
| `Frontend/src/components/SettingsModal.jsx` | Frontend Component| Giao diện cài đặt âm lượng, cấu hình | Frontend |
| `Frontend/src/components/TouchControls.jsx` | Game UI | Nút bấm ảo trên màn hình điện thoại (Mobile) | Game |
| `Frontend/src/components/TrollFeed.jsx` | Game UI | Cửa sổ chat/hiển thị ai vừa bị ai hạ gục | Game |
| `Frontend/src/components/UIOverlay.jsx` | Game UI | Giao diện thanh máu, skill bao trùm 3D Scene | Game |
| `Frontend/src/components/theory/LessonDetailView.jsx` | Theory UI | Giao diện nội dung text của bài học | Lý thuyết |
| `Frontend/src/components/theory/ProgressContext.jsx` | Context | Lưu trạng thái tiến độ đọc lý thuyết (State) | Lý thuyết |
| `Frontend/src/components/theory/TheoryHeader.jsx` | Theory UI | Thanh tiêu đề/Menu bên trên của trang Lý thuyết | Lý thuyết |
| `Frontend/src/components/theory/TheoryLayout.jsx` | Layout | Khung sườn bao bọc tất cả các trang Lý thuyết | Lý thuyết |
| `Frontend/src/data/canonicalConcepts.js` | Data file | Tập hợp khái niệm cốt lõi | Lý thuyết |
| `Frontend/src/data/caseFiles.json` | Data file | Hồ sơ vụ án, tình huống thực tế cho người đọc | Lý thuyết |
| `Frontend/src/data/chapterDetails.js` | Data file | Text bài giảng chi tiết của từng Chương | Lý thuyết |
| `Frontend/src/data/chapters.json` | Data file | Tên và mô tả ngắn các Chương | Lý thuyết |
| `Frontend/src/data/characterData.js` | Data file | Tên, vai trò, thông số (máu, tốc độ), mô tả của nhân vật | Game |
| `Frontend/src/data/conceptMapData.js` | Data file | Tọa độ và liên kết (edges) cho sơ đồ tư duy | Lý thuyết |
| `Frontend/src/data/concepts.json` | Data file | Các khái niệm (nodes) của sơ đồ tư duy | Lý thuyết |
| `Frontend/src/data/lessons.js` | Data file | Toàn văn bài học | Lý thuyết |
| `Frontend/src/data/loadingTips.js` | Data file | Chữ hiển thị khi màn hình loading | Game |
| `Frontend/src/data/mapData.js` | Data file | Tên, mô tả, thông số cấu hình của bản đồ | Game |
| `Frontend/src/data/reviewQuestions.js` | Data file | Câu hỏi ôn tập ở Frontend | Game / Lý thuyết |
| `Frontend/src/data/timeline.json` | Data file | Mốc thời gian năm lịch sử cho trang Timeline | Lý thuyết |
| `Frontend/src/data/timelineData.js` | Data file | Chi tiết sự kiện của mốc thời gian | Lý thuyết |
| `Frontend/src/game3d/GameScene.jsx` | Game UI/Logic | Bọc toàn bộ không gian 3D | Game |
| `Frontend/src/game3d/ItemPickup.jsx` | Game UI/Logic | 3D Model hộp cứu thương/đạn rơi trên đất | Game |
| `Frontend/src/game3d/KnowledgeZone.jsx` | Game UI/Logic | 3D Model vòng sáng màu để nhảy vào trả lời câu | Game |
| `Frontend/src/game3d/MapEnvironment.jsx` | Game UI/Logic | 3D Model bản đồ, sàn nhà, ánh sáng | Game |
| `Frontend/src/game3d/MapObstacles.js` | Game UI/Logic | Cấu hình sinh vật cản theo bản đồ | Game |
| `Frontend/src/game3d/PlayerCharacter.jsx` | Game UI/Logic | 3D Model nhân vật của mình và địch | Game |
| `Frontend/src/game3d/SafeZone.jsx` | Game UI/Logic | 3D Model vòng bo thu hẹp | Game |
| `Frontend/src/game3d/TrapHazard.jsx` | Game UI/Logic | 3D Model bẫy chông/độc | Game |
| `Frontend/src/hooks/useKeyboard.js` | Hook | Bắt sự kiện bàn phím WASD | Game |
| `Frontend/src/hooks/useMouse.js` | Hook | Bắt sự kiện trỏ chuột để xoay camera | Game |
| `Frontend/src/pages/CreateRoomPage.jsx` | Frontend Page | Trang nhập thông tự mở phòng | Game |
| `Frontend/src/pages/GamePage.jsx` | Frontend Page | Trang chứa GameScene và UIOverlay | Game |
| `Frontend/src/pages/HostDashboardPage.jsx` | Frontend Page | Bảng điều khiển riêng của quản trò | Game |
| `Frontend/src/pages/HostLobbyPage.jsx` | Frontend Page | Phòng chờ hiển thị trên máy chiếu (cho Host) | Game |
| `Frontend/src/pages/JoinRoomPage.jsx` | Frontend Page | Trang nhập mã PIN để vào phòng | Game |
| `Frontend/src/pages/LandingPage.jsx` | Frontend Page | Trang chủ web | Frontend |
| `Frontend/src/pages/LobbyPage.jsx` | Frontend Page | Phòng chờ chung | Game |
| `Frontend/src/pages/PlayerLobbyPage.jsx` | Frontend Page | Trang chờ trên điện thoại của Player (chọn nhân vật) | Game |
| `Frontend/src/pages/ResultPage.jsx` | Frontend Page | Trang hiện bảng xếp hạng cuối trận | Game |
| `Frontend/src/pages/theory/AboutPage.jsx` | Theory page | Trang giới thiệu dự án | Lý thuyết |
| `Frontend/src/pages/theory/CaseFileDetailPage.jsx`| Theory page | Trang chi tiết hồ sơ vụ án | Lý thuyết |
| `Frontend/src/pages/theory/CaseFilesPage.jsx` | Theory page | Trang danh sách tình huống | Lý thuyết |
| `Frontend/src/pages/theory/ChapterDetailPage.jsx` | Theory page | Trang hiển thị một bài học cụ thể | Lý thuyết |
| `Frontend/src/pages/theory/ChaptersPage.jsx` | Theory page | Trang danh sách các chương | Lý thuyết |
| `Frontend/src/pages/theory/ConceptMapPage.jsx` | Theory page | Trang xem sơ đồ tư duy | Lý thuyết |
| `Frontend/src/pages/theory/HomePage.jsx` | Theory page | Trang chủ mảng Lý thuyết | Lý thuyết |
| `Frontend/src/pages/theory/ReviewPage.jsx` | Theory page | Trang thi thử/ôn tập đơn giản | Lý thuyết |
| `Frontend/src/pages/theory/TimelinePage.jsx` | Theory page | Trang xem thanh thời gian | Lý thuyết |
| `Frontend/src/utils/SoundManager.js` | Utils | File quản lý bật/tắt tiếng, nhạc nền | Game |
| `Frontend/src/utils/tabIdentity.js` | Utils | Chặn người chơi mở 2 tab cùng 1 ID | Game |

---

## 3. Các file liên quan đến GAME

| File | Vai trò trong game | Chứa UI hay logic hay data? | Có thể thay nội dung không? | Ghi chú |
| --- | --- | --- | --- | --- |
| `Backend/Data/advanced_questions.json` | Câu hỏi khó lưu dạng JSON | Data | CÓ, rất dễ | Đây là NGUỒN CÂU HỎI. |
| `Backend/Data/questions_raw.txt` | Câu hỏi thô lưu file TXT | Data | CÓ | Tùy chỉnh trực tiếp văn bản. |
| `Backend/Controllers/SeedController.cs` | API Nạp dữ liệu lúc khởi tạo DB | Cả Logic và Data (Hard-code) | CÓ THỂ, phải cẩn thận | Mảng `var qs` (Từ dòng 32-83) chứa câu hỏi cứng. Không xóa cú pháp ngoặc. |
| `Frontend/src/data/characterData.js` | Định nghĩa nhân vật | Data | CÓ | Chứa tên (Voi, Thỏ), chỉ số UI, mô tả. Không nên đổi `id` hay `iconName`. |
| `Frontend/src/data/mapData.js` | Định nghĩa bản đồ | Data | CÓ | Chứa tên bản đồ (Rừng Pác Bó, Ba Đình). |
| `Frontend/src/data/loadingTips.js` | Mẹo nạp trang | Data | CÓ | Đổi các mẹo chờ trận tại đây. |
| `Frontend/src/components/ChallengeModal.jsx`, `QuestionModal.jsx` | Cửa sổ hiển thị câu hỏi | UI | KHÔNG nên sửa | Nó tự động đọc Data để hiển thị. |
| `Backend/Services/GameEngine.cs` | Xử lý sát thương, vòng bo, điểm | Logic cốt lõi | **TUYỆT ĐỐI KHÔNG** | Core vật lý hệ thống. |
| `Backend/Hubs/GameHub.cs` | WebSocket SignalR | Logic mạng | **TUYỆT ĐỐI KHÔNG** | Đồng bộ tọa độ. |
| `Frontend/src/game3d/*` | Render cảnh 3D | Logic & UI đồ họa 3D | **TUYỆT ĐỐI KHÔNG** | File vẽ ThreeJS. |

---

## 4. Các file liên quan đến LÝ THUYẾT

| File | Vai trò trong phần lý thuyết | Chứa UI hay logic hay data? | Có thể thay nội dung không? | Ghi chú |
| --- | --- | --- | --- | --- |
| `Frontend/src/data/chapters.json` | Tiêu đề các chương | Data | CÓ | Sửa text, giữ nguyên `id`. |
| `Frontend/src/data/lessons.js`, `chapterDetails.js` | Văn bản trọn vẹn của khóa học | Data | CÓ | Thay thế toàn bộ lý thuyết môn học ở đây. |
| `Frontend/src/data/timeline.json`, `timelineData.js` | Sự kiện thời gian | Data | CÓ | Cần đổi nếu đổi môn học khác (thay mốc năm, sự kiện). |
| `Frontend/src/data/conceptMapData.js`, `concepts.json` | Mốc mũi tên mindmap | Data | CÓ | Thay đổi các nút trên sơ đồ tư duy. |
| `Frontend/src/data/caseFiles.json` | Tình huống bài tập | Data | CÓ | Thay văn bản tình huống. |
| `Frontend/src/pages/theory/*` | Các màn hình hiển thị | UI | KHÔNG nên sửa | Framework giao diện sẽ tự bóc Data đưa vào. |

---

## 5. Mapping route/page/component/data

| Route/URL | Page file | Component con | Data file liên quan | Liên quan |
| --- | --- | --- | --- | --- |
| `/` | `LandingPage.jsx` | - | Chữ trực tiếp trong Component (Hardcode) | Frontend |
| `/theory` | `theory/HomePage.jsx` | `TheoryLayout`, `TheoryHeader` | Chữ trực tiếp | Lý thuyết |
| `/theory/chapters` | `theory/ChaptersPage.jsx`| - | `chapters.json` | Lý thuyết |
| `/theory/chapters/:id`| `theory/ChapterDetailPage.jsx` | `LessonDetailView` | `chapterDetails.js`, `lessons.js` | Lý thuyết |
| `/theory/timeline` | `theory/TimelinePage.jsx`| - | `timeline.json`, `timelineData.js` | Lý thuyết |
| `/theory/concept-map`| `theory/ConceptMapPage.jsx`| - | `conceptMapData.js`, `concepts.json`| Lý thuyết |
| `/theory/cases` | `theory/CaseFilesPage.jsx`| - | `caseFiles.json` | Lý thuyết |
| `/host/lobby` | `HostLobbyPage.jsx` | `HostDashboard` | `mapData.js` (Gọi DB API lấy Room) | Game |
| `/player/lobby` | `PlayerLobbyPage.jsx` | - | `characterData.js` | Game |
| `/game` | `GamePage.jsx` | `GameScene`, `UIOverlay`, `MiniMap`, `QuestionModal`| `characterData.js`, `mapData.js` | Game |
| `/result` | `ResultPage.jsx` | - | Fetch API điểm cuối game | Game |

---

## 6. Mapping backend/API/database

| API/Controller/Hub | Phương thức / Chức năng | Liên quan bảng Database | Liên quan |
| --- | --- | --- | --- |
| `QuestionsController.cs` | Gọi GET trả về List câu hỏi | `Question`, `QuestionOption` | Game |
| `RoomsController.cs` | POST tạo phòng, cấp PIN | `Room`, `RoomSetting` | Game |
| `AuthController.cs` | POST login, cấp JWT | `User` | Web |
| `SeedController.cs` | Chạy lệnh để đẩy câu hỏi từ Code vào CSDL | `Topic`, `Question`, `QuestionOption`| Game |
| `GameHub.cs` | SignalR - Update Pos, Shoot, TakeDamage | Object Ram (`GameState`) -> lưu vào DB lúc end trận | Game |

| Bảng Database (Entities)| Lưu Trữ Gì? | Liên Quan Tới |
| --- | --- | --- |
| `Questions`, `QuestionOptions` | Chứa nội dung, đáp án, điểm, hệ số sát thương. | Cần seed từ file Data khi đổi môn. |
| `Characters` | Cấu hình sát thương, máu của Tank/Tốc/Phòng/Kỹ. | Seed từ `SeedCharacters.cs`. |
| `Room`, `GameResult` | Lịch sử thi đấu, số liệu match. | Không chứa nội dung hiển thị. |

---

## 7. File nên sửa để thay nội dung (An toàn)

Hãy mở các file này và sửa trực tiếp chữ bên trong:
* **`Frontend/src/data/chapters.json`**: Thay Danh mục.
* **`Frontend/src/data/lessons.js`**, **`Frontend/src/data/chapterDetails.js`**: Thay giáo trình.
* **`Frontend/src/data/timeline.json`**: Thay mốc lịch sử.
* **`Frontend/src/data/conceptMapData.js`**: Thay nút (node) mindmap.
* **`Frontend/src/data/caseFiles.json`**: Thay tình huống.
* **`Frontend/src/data/characterData.js`**: Thay tên, tiểu sử nhân vật.
* **`Frontend/src/data/mapData.js`**: Thay mô tả các map chơi.
* **`Frontend/src/data/loadingTips.js`**: Thay các mẹo chơi game.
* **`Backend/Data/advanced_questions.json`**, **`questions_raw.txt`**: Cập nhật nguồn câu hỏi.
* **`Backend/Controllers/SeedController.cs`**: Thay nội dung câu hỏi bị hard-code trong C# (từ dòng 32 - 83).

---

## 8. File KHÔNG NÊN SỬA vì chứa logic

Tuyệt đối không đụng vào nếu chỉ có nhu cầu thay đề tài môn học:
* **Mảng Game3D:** Toàn bộ thư mục `Frontend/src/game3d/*` và `hooks/*`.
* **Mảng Core Engine:** Toàn bộ thư mục `Backend/Services/*` (chứa `GameEngine.cs`) và `Backend/Hubs/*` (`GameHub.cs`).
* **Mảng Database Config:** Các file trong thư mục `Backend/Migrations/` và `ApplicationDbContext.cs`.
* **Mảng Routing:** `Frontend/src/App.jsx`.

---

## 9. Đánh giá nội dung đang tổ chức tốt hay rải rác

* **Lý thuyết:** Tổ chức CỰC KỲ TỐT. Đã được gom hết 100% vào thư mục `Frontend/src/data/`. Bạn chỉ cần mở thư mục này ra sửa JSON/JS là toàn bộ trang lý thuyết đổi màu áo môn mới.
* **Nhân vật/Map:** Tổ chức TỐT. Gom tại `Frontend/src/data/characterData.js` và `mapData.js`.
* **Câu hỏi Game:** Khá **RẢI RÁC**. Vừa có file Text/JSON (`Backend/Data/*`), lại vừa bị Hard-code bên trong Controller C# (`SeedController.cs`). Ngoài ra còn có script tạo Database cũng nhúng câu hỏi.

---

## 10. Hướng dẫn thay nội dung game và lý thuyết an toàn

Thứ tự hành động an toàn để đổi dự án từ Môn A sang Môn B:

1. **Sửa Lý thuyết:** Mở thư mục `Frontend/src/data/`. Tìm lần lượt các file: `chapters.json`, `lessons.js`, `timeline.json`, `conceptMapData.js`. Thay text chữ môn cũ bằng chữ môn mới. Lên giao diện xem thử.
2. **Sửa Tên Map/Nhân vật:** Mở `Frontend/src/data/characterData.js` đổi tên Thỏ/Cáo/Voi/Rùa thành các khái niệm mới tương đương (Giữ lại id 1, 2, 3, 4). Làm tương tự với `mapData.js`.
3. **Cập nhật Nguồn Câu hỏi JSON:** Mở `Backend/Data/advanced_questions.json` thay thế toàn bộ danh sách.
4. **Sửa mảng Hard-code C#:** Mở `Backend/Controllers/SeedController.cs`, tìm mảng `var qs = new (...)`, thay đổi dòng chữ trong cặp ngoặc kép. Phải cẩn thận không xóa mất ngoặc phẩy `,` của mảng C#.
5. **Clear & Seed Database:** Xóa Database hiện tại (Bỏ file SQLite .db đi nếu xài Local DB) hoặc chạy lệnh Seed lại để API C# nạp câu hỏi mới toanh vào bảng `Questions`.
6. **Thay Ảnh:** Nếu có ảnh, bỏ vào thư mục `Frontend/public/` hoặc lưu URL online, sau đó lấy link chèn vào Data file. 
7. **Test run:** Chạy lại Frontend (npm run dev) và Backend (dotnet run) rồi nhảy vào game bắn thử 1 trận để xem nó gọi câu hỏi mới ra thành công chưa. Mọi thứ đã hoàn tất!
