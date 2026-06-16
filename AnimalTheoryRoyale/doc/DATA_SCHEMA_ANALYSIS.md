# Phân tích Schema File Dữ Liệu - Animal Theory Royale

Để chuẩn bị cho việc thay thế nội dung, đây là báo cáo phân tích chi tiết schema (cấu trúc dữ liệu) của toàn bộ các file data trong dự án. Việc tạo nội dung mới bắt buộc phải tuân thủ chính xác các cấu trúc này để không làm hỏng luồng hoạt động của Frontend và Backend.

---

## 1. NHÓM LÝ THUYẾT FRONTEND

### 1.1. `Frontend/src/data/chapters.json`
- **Loại file:** Mảng các đối tượng JSON.
- **Mục đích:** Khai báo danh sách các chương học chính.
- **Schema:**
  - `id` (string): Mã chương (vd: `"chuong-1"`).
  - `chapterNumber` (number): Số thứ tự chương.
  - `title` (string): Tiêu đề chương.
  - `summary` (string): Mô tả ngắn gọn.
  - `tags` (array of strings): Các từ khóa.
  - `conceptCount` (number): Số lượng khái niệm trong chương.
  - `color` (string): Mã màu (thường là Tailwind class hoặc hex).

### 1.2. `Frontend/src/data/lessons.js`
- **Loại file:** Array các JS object (`export const lessons`).
- **Mục đích:** Chứa nội dung bài học chi tiết của từng chương.
- **Schema:**
  - `id` (string): Mã bài học (vd: `"hcm-ch01-khai-niem-tu-tuong-hcm"`).
  - `chapterId` (string): Map với `id` trong `chapters.json`.
  - `title` (string): Tên bài học.
  - `readingTime` (number): Thời gian đọc ước tính (phút).
  - `type` (string): Loại bài (vd: `"theory"`).
  - `description` (string): Tóm tắt bài.
  - `coreTheory` (array of objects): Nội dung lý thuyết chính, mỗi object gồm:
    - `title` (string): Tên phần.
    - `content` (array of strings): Các đoạn văn bản.
  - `conceptBreakdown` (array of objects): Phân tích khái niệm để hiển thị icon/list, gồm:
    - `title` (string), `description` (string), `icon` (string - tên Lucide icon).
  - `visualLearning` (array of strings): Chứa các ID khái niệm (`conceptId`) để link sang Mindmap.

### 1.3. `Frontend/src/data/chapterDetails.js`
- **Loại file:** JS Object (`export const chapterDetails`).
- **Mục đích:** Cung cấp thông tin hiển thị cho trang chi tiết chương (ChapterDetail page).
- **Schema:**
  - Key là `chapterId` (vd: `"chuong-1"`), Value là object gồm:
    - `title`, `description` (string).
    - `sections` (array of objects): Quy định cách render UI, mỗi section có `title`, `type` (`mindmap`, `three-pillars`, `info-cards`), và `content` (phụ thuộc vào `type`).
    - `quiz` (array of objects): Các câu hỏi trắc nghiệm nhỏ kèm `question`, `options` (array of strings), `correctAnswer` (index).

### 1.4. `Frontend/src/data/timeline.json` & `timelineData.js`
- **Loại file:** JSON Array / JS Array (`export const timelineEvents`).
- **Mục đích:** Dữ liệu cho trang Lịch sử / Dòng thời gian.
- **Schema:**
  - `id` (string): ID sự kiện.
  - `period` hoặc `year` (string): Mốc thời gian.
  - `title` (string): Tên sự kiện.
  - `shortDescription`, `historicalContext`, `problem`, `ideologicalDevelopment`, `impact`, `learningValue` (string): Các thông tin chi tiết.
  - `relatedChapterIds`, `relatedConceptIds`, `keyQuestions` (array of strings).
  - `requiresVerification` (boolean).

### 1.5. `Frontend/src/data/conceptMapData.js`
- **Loại file:** 2 JS Arrays (`export const conceptNodes`, `export const conceptEdges`).
- **Mục đích:** Dữ liệu chính cho tính năng Mindmap/Graph.
- **Schema `conceptNodes`:**
  - `id` (string): Mã node.
  - `title`, `shortDescription`, `coreContent`, `importance` (string).
  - `chapterId` (string).
  - `level` (number): Cấp bậc node (0 là root, 1 là chapter, 2 là khái niệm...).
  - `category` (string): Nhóm khái niệm.
  - `relatedConcepts`, `relatedCases`, `relatedTimeline` (array of strings).
- **Schema `conceptEdges`:**
  - `source` (string - ID của node gốc).
  - `target` (string - ID của node đích).
  - `label` (string, optional): Tên đường nối.

### 1.6. `Frontend/src/data/concepts.json`
- **Loại file:** JSON Array.
- **Mục đích:** Có thể dùng cho bản vẽ canvas/UI đơn giản liên kết khái niệm.
- **Schema:** 
  - `id`, `label`, `description` (string).
  - `type` (string: `"root"`, `"chapter"`, `"concept"`).
  - `x`, `y` (number): Tọa độ tĩnh.
  - `connections` (array of strings).

### 1.7. `Frontend/src/data/caseFiles.json`
- **Loại file:** JSON Array.
- **Mục đích:** Chứa các tình huống thực tiễn (Case study).
- **Schema:**
  - `id`, `title`, `summary`, `situation`, `analysis`, `lesson`, `reflectionQuestion`, `suggestedAnswer`, `teacherNote` (string).
  - `chapterIds`, `lessonIds`, `conceptIds`, `tags`, `discussionPrompts` (array of strings).
  - `difficulty` (string: `"easy"`, `"medium"`, `"hard"`).
  - `requiresVerification` (boolean).

### 1.8. `Frontend/src/data/reviewQuestions.js`
- **Loại file:** JS Array (`export const reviewQuestions`).
- **Mục đích:** Ngân hàng câu hỏi ôn tập (quiz) cho phần lý thuyết.
- **Schema:**
  - `id`, `question`, `explanation`, `chapterId`, `lessonId`, `feedbackCorrect`, `feedbackIncorrect` (string).
  - `type` (string, thường là `"multiple-choice"`).
  - `options` (array of strings): 4 đáp án.
  - `correctAnswer` (number): Vị trí index (0-3) của đáp án đúng.
  - `conceptIds` (array of strings).
  - `difficulty`, `bloomLevel` (string).
  - `points`, `timeLimit` (number).
  - `requiresVerification` (boolean).

---

## 2. NHÓM GAME FRONTEND

### 2.1. `Frontend/src/data/characterData.js`
- **Loại file:** JS Object (`export const CHARACTER_DATA`).
- **Mục đích:** Thông tin nhân vật (hiển thị ở sảnh, tên skill, màu sắc...).
- **Schema:**
  - Key là ID nhân vật (1, 2, 3, 4).
  - Object gồm: `id`, `name`, `animalType`, `role`, `roleVi`, `iconName`, `description`, `shortDesc`, `outfit`.
  - `colors`: Object (`primary`, `secondary`, `glow`, `bg`, `border`, `gradient`).
  - `skills`: Object chứa 5 kĩ năng (`passive`, `push`, `double`, `dizzy`, `ultimate`), mỗi kĩ năng có `name`, `desc`, `iconName`, `visualDesc`.
  - `statLabels`: Object (`hp`, `speed`, `damage`).
  - `accessories` (array of strings).

### 2.2. `Frontend/src/data/mapData.js`
- **Loại file:** JS Object (`export const MAP_CONFIGS`).
- **Mục đích:** Cấu hình bản đồ cho phòng chờ và game 3D.
- **Schema:**
  - Key là map ID (vd: `"academy"`, `"pacbo"`).
  - Object gồm: `key`, `id`, `name`, `nameVi`, `subtitle`, `description`, `difficulty`, `knowledgeDensity`, `theme`, `zoneLayout` (string).
  - `icon` (Lucide icon reference).
  - `color`, `accentColor`, `groundColor`, `fogColor`, `skyColor` (hex code).
  - `ambientLight`, `directionalLight` (number).
  - `spawnPoints` (array of arrays): Tọa độ sinh ra người chơi (vd: `[[-6, 0, -6], ...]`).
  - `props` (array of strings): Các mô hình 3D trong map.
  - `isDefault` (boolean).

### 2.3. `Frontend/src/data/loadingTips.js`
- **Loại file:** JS Array (`export const LOADING_TIPS`).
- **Mục đích:** Các câu tip nhỏ hiển thị khi loading.
- **Schema:**
  - Mỗi object gồm: `text` (string), `chapter` (number hoặc null), `icon` (emoji string).

---

## 3. NHÓM BACKEND

### 3.1. `Backend/Data/advanced_questions.json`
- **Loại file:** JSON Array.
- **Mục đích:** Ngân hàng câu hỏi nâng cao (điền từ, nối từ, sắp xếp, tình huống...).
- **Schema:**
  - `TopicName` (string): Tên chủ đề.
  - `QuestionType` (string): `"TrueFalse"`, `"FillBlank"`, `"Matching"`, `"Ordering"`, `"ShortAnswer"`, `"CaseStudy"`.
  - `Difficulty` (string): `"Easy"`, `"Medium"`, `"Hard"`.
  - `Content`, `Explanation` (string).
  - `ChallengePayloadJson` (string - JSON stringified): Dùng để truyền data đặc thù như mảng từ khóa cho FillBlank, map cặp giá trị cho Matching...
  - `Options` (array of objects): Mảng các đáp án chứa `Text` (string) và `IsCorrect` (boolean).

### 3.2. `Backend/Data/questions_raw.txt`
- **Loại file:** Plain text.
- **Mục đích:** Định dạng text thô để tool parse import câu hỏi.
- **Schema (Quy ước text):**
  - Bắt đầu bằng `### Câu <số>`.
  - `**Chủ đề:**`
  - `**Độ khó:**`
  - `**Câu hỏi:**`
  - Các dòng `A.`, `B.`, `C.`, `D.` chứa đáp án.
  - `**Đáp án đúng:**`
  - `**Giải thích:**`

### 3.3. `Backend/Controllers/SeedController.cs`
- **Loại file:** C# Code (Backend Endpoint).
- **Mục đích:** Chứa API `/api/Seed/questions` để tự động tạo câu hỏi trắc nghiệm cơ bản vào database (MySQL).
- **Schema (Hard-coded array trong hàm):**
  - Mảng `topicNames`: string array (các topic sẽ được seed vào table `Topics`).
  - Mảng Tuple C# `qs`: `(int tid, string diff, string content, string expl, string[] opts, int ci)[]`.
    - `tid`: Lấy ID từ topic.
    - `diff`: Độ khó (`"Easy"`, `"Medium"`, `"Hard"`).
    - `content`: Nội dung câu hỏi.
    - `expl`: Giải thích.
    - `opts`: Mảng string chứa 4 đáp án.
    - `ci`: Index (0-3) của đáp án đúng.
  - *Lưu ý:* Khi thay đổi nội dung ở đây phải tuyệt đối cẩn thận cú pháp C# (ngoặc, dấu phẩy).

---

**Kết luận:** 
Tất cả dữ liệu đều được lưu dưới dạng JSON/JS Objects tách biệt với Logic. Khi tạo nội dung lý thuyết/game mới, bạn chỉ cần xây dựng dữ liệu tuân thủ chính xác các field, kiểu dữ liệu, cấu trúc lồng nhau (nested object/array) và các IDs (`chapterId`, `conceptId`...) như phân tích trên, sau đó ghi đè nội dung vào file cũ mà không cần chỉnh sửa bất kỳ Component React hay C# Logic nào.
