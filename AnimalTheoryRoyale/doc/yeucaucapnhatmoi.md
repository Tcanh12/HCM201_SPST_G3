# PROMPT YÊU CẦU CHỈNH SỬA HỆ THỐNG KNOWLEDGE CAMPUS – ANIMAL THEORY ROYALE

Bạn là Senior Full-stack Developer kiêm Educational Content Engineer.
Hãy đọc toàn bộ source code và các file dữ liệu hiện có của dự án Animal Theory Royale, đặc biệt các file liên quan đến nội dung học tập:

* `chapters.json`
* `chapterDetails.js`
* `concepts.json`
* `conceptMapData.js`
* `timeline.json`
* `timelineData.js`
* `caseFiles.json`
* `reviewQuestions.js`
* Các component hiển thị Knowledge Campus, Concept Galaxy, Timeline, Case Study, Quiz/Review Question nếu có.

Mục tiêu chỉnh sửa lần này là:
**chuẩn hóa lại toàn bộ hệ thống nội dung học tập môn Tư tưởng Hồ Chí Minh để dữ liệu nhất quán, dễ mở rộng, đúng học thuật, dễ import, dễ bảo trì và phù hợp với trải nghiệm học tập Gen Z.**

Không được chỉnh sửa lung tung phần gameplay nếu không cần thiết. Ưu tiên sửa phần data model, content schema, mapping ID, UI hiển thị bài học, quiz, case, timeline và concept graph.

---

## 1. BỐI CẢNH HỆ THỐNG

Dự án Animal Theory Royale là hệ sinh thái học tập 3D, kết hợp:

1. **Knowledge Campus**
   Nơi sinh viên học lý thuyết trước khi vào game, bao gồm:

   * Concept Galaxy
   * Timeline
   * Chapter Lesson
   * Case Study
   * Review Questions

2. **Theory Royale**
   Game 3D multiplayer dạng Battle Royale, nơi sinh viên trả lời câu hỏi học thuật để ghi điểm, sống sót và leo bảng xếp hạng.

Môn học ứng dụng chính là:

* Tư tưởng Hồ Chí Minh
* Có thể mở rộng cho Chủ nghĩa xã hội khoa học, Triết học, Lịch sử Đảng, Pháp luật đại cương.

Yêu cầu quan trọng:
Nội dung học tập phải **đúng giáo trình**, không bịa kiến thức, không tự chế khái niệm, không làm sai ý nghĩa học thuật.

---

## 2. VẤN ĐỀ HIỆN TẠI CẦN SỬA

Hiện hệ thống đã có dữ liệu chương, concept, timeline, case và quiz, nhưng còn các vấn đề sau:

### 2.1. Concept ID chưa thống nhất

Một số concept trong các file khác nhau đang dùng ID khác nhau hoặc chưa có trong canonical concept list.

Ví dụ cần kiểm tra:

* `dai-doan-ket`
* `dai-doan-ket-toan-dan-toc`
* `van-hoa-so`
* `trach-nhiem-cong-dan`
* `dao-duc-so`
* `ban-sac-dan-toc`
* `noi-di-doi-voi-lam`
* `chu-nghia-ca-nhan`
* `can-bo`
* `nha-nuoc-cua-dan`

Yêu cầu:
Tạo một danh sách concept ID chuẩn duy nhất. Sau đó cập nhật toàn bộ `relatedConcepts`, `connections`, `relatedCases`, `relatedTimeline`, `conceptIds` để dùng đúng ID chuẩn.

---

### 2.2. Lesson content còn ngắn

Hiện mỗi chapter chủ yếu có:

* title
* objective
* sections
* content ngắn
* diagram
* quiz ít câu

Cần mở rộng thành lesson hoàn chỉnh theo cấu trúc học tập hiện đại:

* Lesson Metadata
* Learning Objectives
* Why This Matters
* Quick Overview
* Core Theory
* Concept Breakdown
* Real-life Scenarios
* Visual Learning Section
* Interactive Learning
* Knowledge Check
* Challenge Section
* Key Takeaways
* Instructor Notes
* Developer Notes

---

### 2.3. Quiz chưa đủ metadata

Hiện quiz/review question thường chỉ có:

* question
* options
* correctAnswer/correctIndex
* explanation

Cần bổ sung:

* `chapterId`
* `conceptIds`
* `difficulty`
* `bloomLevel`
* `type`
* `points`
* `timeLimit`
* `feedbackCorrect`
* `feedbackIncorrect`
* `requiresVerification`

---

### 2.4. Case Study chưa gắn chặt với lesson

Hiện `caseFiles.json` có tình huống rất tốt, nhưng cần chuẩn hóa thêm:

* gắn với chapter
* gắn với lesson
* gắn concept chuẩn
* thêm difficulty
* thêm discussion prompts
* thêm suggested answer
* thêm teacher note
* thêm learning outcome

---

### 2.5. Thiếu validation

Cần thêm logic hoặc script kiểm tra:

* concept ID trong case có tồn tại không
* concept ID trong timeline có tồn tại không
* concept ID trong quiz có tồn tại không
* chapterId có tồn tại không
* lessonId có trùng không
* question có đáp án đúng hợp lệ không
* missing required fields
* duplicate IDs

---

## 3. YÊU CẦU CHỈNH SỬA CHÍNH

Hãy thực hiện các việc sau:

---

# PHẦN A — TẠO CANONICAL CONCEPT ID MAP

Tạo hoặc cập nhật file:

`canonicalConcepts.js` hoặc `canonicalConcepts.json`

Schema đề xuất:

```js
export const canonicalConcepts = [
  {
    id: "tu-tuong-ho-chi-minh",
    title: "Tư tưởng Hồ Chí Minh",
    chapterId: "core",
    level: 0,
    category: "core",
    aliases: ["tthcm", "he-thong-tu-tuong"],
    definition: "Hệ thống quan điểm toàn diện và sâu sắc về những vấn đề cơ bản của cách mạng Việt Nam.",
    shortDescription: "Khái niệm trung tâm của toàn bộ môn học.",
    prerequisiteIds: [],
    relatedConceptIds: [
      "co-so-hinh-thanh",
      "doc-lap-dan-toc",
      "chu-nghia-xa-hoi",
      "dang-cong-san-viet-nam",
      "nha-nuoc-cua-dan",
      "dai-doan-ket",
      "van-hoa",
      "dao-duc-cach-mang",
      "con-nguoi"
    ],
    requiresVerification: false
  }
];
```

Danh sách concept chuẩn tối thiểu cần có:

## Core

* `tu-tuong-ho-chi-minh` — Tư tưởng Hồ Chí Minh

## Chương 1

* `khai-niem-tu-tuong-ho-chi-minh`
* `doi-tuong-nghien-cuu`
* `phuong-phap-nghien-cuu`
* `thong-nhat-ly-luan-va-thuc-tien`
* `quan-diem-lich-su-cu-the`
* `quan-diem-toan-dien-he-thong`
* `y-nghia-hoc-tap`

## Chương 2

* `co-so-hinh-thanh`
* `boi-canh-dan-toc`
* `boi-canh-thoi-dai`
* `truyen-thong-dan-toc`
* `tinh-hoa-van-hoa-nhan-loai`
* `chu-nghia-mac-lenin`
* `nhan-to-chu-quan`
* `qua-trinh-hinh-thanh-phat-trien`
* `gia-tri-tu-tuong`

## Chương 3

* `doc-lap-dan-toc`
* `cach-mang-giai-phong-dan-toc`
* `chu-nghia-xa-hoi`
* `doc-lap-dan-toc-gan-lien-cnxh`
* `nhan-dan-lam-chu`
* `suc-manh-dan-toc-va-thoi-dai`

## Chương 4

* `dang-cong-san-viet-nam`
* `xay-dung-dang`
* `nha-nuoc-cua-dan`
* `nha-nuoc-do-dan`
* `nha-nuoc-vi-dan`
* `can-bo`
* `dao-duc-cong-vu`

## Chương 5

* `dai-doan-ket`
* `luc-luong-dai-doan-ket`
* `mat-tran-dan-toc-thong-nhat`
* `doan-ket-quoc-te`
* `ket-hop-suc-manh-dan-toc-quoc-te`

## Chương 6

* `van-hoa`
* `ban-sac-dan-toc`
* `tiep-thu-tinh-hoa-nhan-loai`
* `dao-duc-cach-mang`
* `can-kiem-liem-chinh`
* `chi-cong-vo-tu`
* `noi-di-doi-voi-lam`
* `chu-nghia-ca-nhan`
* `con-nguoi`
* `trach-nhiem-cong-dan`
* `van-hoa-so`

Sau khi tạo danh sách này, cập nhật toàn bộ file khác để dùng đúng ID chuẩn.

---

# PHẦN B — CHUẨN HÓA LESSON SCHEMA

Tạo schema chuẩn cho bài học. Có thể tạo file:

`lessonSchema.js` hoặc dùng TypeScript interface nếu dự án đang dùng TS.

Schema đề xuất:

```js
{
  lessonId: "hcm-ch01-khai-niem-tu-tuong-hcm",
  chapterId: "chuong-1",
  moduleId: "tu-tuong-ho-chi-minh",
  title: "Khái niệm Tư tưởng Hồ Chí Minh",
  difficulty: "beginner",
  durationMinutes: 15,
  order: 1,
  tags: ["Tư tưởng Hồ Chí Minh", "Khái niệm", "Nhập môn"],
  conceptIds: ["khai-niem-tu-tuong-ho-chi-minh"],
  learningObjectives: [],
  whyThisMatters: "",
  quickOverview: "",
  coreTheory: {
    beginner: "",
    intermediate: "",
    advanced: ""
  },
  conceptBreakdown: [],
  realLifeScenarios: [],
  visualLearning: [],
  interactiveLearning: [],
  knowledgeCheck: {
    easy: [],
    medium: [],
    hard: []
  },
  challengeSection: [],
  keyTakeaways: [],
  furtherReading: [],
  instructorNotes: [],
  developerNotes: {},
  sourceReferences: [],
  requiresVerification: false
}
```

---

# PHẦN C — BỔ SUNG LESSON MẪU CHO CHƯƠNG 1

Hãy tạo lesson hoàn chỉnh đầu tiên cho:

`hcm-ch01-khai-niem-tu-tuong-hcm`

## Lesson Metadata

* Lesson ID: `hcm-ch01-khai-niem-tu-tuong-hcm`
* Module: `tu-tuong-ho-chi-minh`
* Chapter: `chuong-1`
* Topic: Khái niệm Tư tưởng Hồ Chí Minh
* Difficulty: Beginner
* Duration: 15 minutes
* Order: 1
* Tags: `["Tư tưởng Hồ Chí Minh", "Khái niệm", "Chương 1", "Nhập môn"]`

---

## Learning Objectives

Sinh viên sau bài học có thể:

1. Trình bày được khái niệm Tư tưởng Hồ Chí Minh.
2. Nhận diện được các nguồn gốc hình thành tư tưởng Hồ Chí Minh.
3. Phân biệt Tư tưởng Hồ Chí Minh với tiểu sử Hồ Chí Minh hoặc các khẩu hiệu rời rạc.
4. Giải thích được vì sao Tư tưởng Hồ Chí Minh là nền tảng quan trọng để học các chương sau.
5. Vận dụng khái niệm để phân tích một tình huống học tập hoặc đời sống.

---

## Why This Matters

Nếu không hiểu đúng khái niệm Tư tưởng Hồ Chí Minh, sinh viên rất dễ học môn này theo kiểu học thuộc lòng từng câu riêng lẻ. Bài học này giúp người học hiểu rằng Tư tưởng Hồ Chí Minh là một hệ thống quan điểm có cấu trúc, có nguồn gốc lý luận, có cơ sở thực tiễn và gắn chặt với cách mạng Việt Nam.

Trong game Animal Theory Royale, đây là bài nền tảng. Nếu người chơi hiểu đúng khái niệm trung tâm, họ sẽ dễ liên kết các chương sau như độc lập dân tộc, chủ nghĩa xã hội, Đảng, Nhà nước, đại đoàn kết, văn hóa, đạo đức và con người.

---

## Quick Overview

Tư tưởng Hồ Chí Minh là hệ thống quan điểm toàn diện và sâu sắc về những vấn đề cơ bản của cách mạng Việt Nam. Tư tưởng đó được hình thành từ sự vận dụng và phát triển sáng tạo chủ nghĩa Mác – Lênin vào điều kiện cụ thể của Việt Nam, đồng thời kế thừa truyền thống tốt đẹp của dân tộc và tiếp thu tinh hoa văn hóa nhân loại.

Nói đơn giản:
Đây không phải là một vài câu nói nổi tiếng của Bác. Đây là một hệ thống tư tưởng giúp định hướng nhận thức và hành động trong cách mạng Việt Nam.

---

## Core Theory

### Beginner

Ở mức cơ bản, sinh viên cần nhớ 3 ý:

1. Tư tưởng Hồ Chí Minh là một hệ thống quan điểm.
2. Hệ thống đó tập trung vào những vấn đề cơ bản của cách mạng Việt Nam.
3. Tư tưởng này được hình thành từ nhiều nguồn: chủ nghĩa Mác – Lênin, truyền thống dân tộc, tinh hoa văn hóa nhân loại và hoạt động thực tiễn của Hồ Chí Minh.

### Intermediate

Ở mức trung bình, sinh viên cần hiểu rằng Tư tưởng Hồ Chí Minh không hình thành ngẫu nhiên. Nó là kết quả của quá trình quan sát thực tiễn, tìm đường cứu nước, tiếp thu lý luận tiến bộ và vận dụng sáng tạo vào hoàn cảnh Việt Nam.

Tư tưởng này có tính hệ thống vì các nội dung không tách rời nhau. Ví dụ:

* Độc lập dân tộc gắn với chủ nghĩa xã hội.
* Nhà nước phải là của dân, do dân, vì dân.
* Đại đoàn kết là sức mạnh để thực hiện mục tiêu dân tộc.
* Đạo đức cách mạng là nền tảng của người cách mạng.

### Advanced

Ở mức nâng cao, sinh viên cần nhìn Tư tưởng Hồ Chí Minh như một hệ thống lý luận có tính định hướng. Hệ thống này vừa kế thừa chủ nghĩa Mác – Lênin, vừa phát triển sáng tạo theo điều kiện lịch sử, văn hóa và xã hội Việt Nam.

Điểm quan trọng là không được hiểu Tư tưởng Hồ Chí Minh theo cách máy móc. Khi học, cần đặt từng luận điểm vào bối cảnh lịch sử cụ thể và liên hệ với thực tiễn hiện nay.

---

## Concept Breakdown

### Concept 1: Tư tưởng Hồ Chí Minh

**Definition:**
Tư tưởng Hồ Chí Minh là hệ thống quan điểm toàn diện và sâu sắc về những vấn đề cơ bản của cách mạng Việt Nam.

**Explanation:**
Đây là khái niệm trung tâm của môn học. Khi nói đến Tư tưởng Hồ Chí Minh, không chỉ nói đến tiểu sử, câu chuyện cuộc đời hay các câu nói nổi tiếng, mà là nói đến một hệ thống quan điểm có nội dung, logic và giá trị định hướng.

**Importance:**
Nếu hiểu đúng khái niệm này, sinh viên sẽ học các chương sau dễ hơn vì biết cách kết nối các nội dung rời rạc thành một hệ thống.

**Examples:**
Khi học về “Nhà nước của dân, do dân, vì dân”, sinh viên không nên chỉ học thuộc câu chữ. Cần hiểu đây là một phần trong hệ thống tư tưởng về quyền làm chủ của nhân dân.

**Applications:**
Có thể dùng khái niệm này để phân tích các tình huống như trách nhiệm công dân, trung thực trong học tập, ứng xử trên mạng xã hội, tinh thần đoàn kết trong lớp học.

**Common Mistakes:**

* Nghĩ Tư tưởng Hồ Chí Minh chỉ là tiểu sử Hồ Chí Minh.
* Nghĩ môn học chỉ cần học thuộc câu nói.
* Tách từng nội dung khỏi bối cảnh lịch sử.
* Không liên hệ lý luận với thực tiễn.

**Memory Tip:**
Hãy nhớ công thức học nhanh:
“Hệ thống quan điểm → Cách mạng Việt Nam → Mác – Lênin + Dân tộc + Nhân loại + Thực tiễn.”

---

### Concept 2: Nguồn gốc hình thành

**Definition:**
Nguồn gốc hình thành Tư tưởng Hồ Chí Minh gồm chủ nghĩa Mác – Lênin, truyền thống tốt đẹp của dân tộc Việt Nam, tinh hoa văn hóa nhân loại và phẩm chất, hoạt động thực tiễn của Hồ Chí Minh.

**Explanation:**
Tư tưởng Hồ Chí Minh vừa có cơ sở lý luận, vừa có cơ sở thực tiễn. Người không sao chép máy móc bất kỳ học thuyết nào, mà tiếp thu có chọn lọc và vận dụng sáng tạo vào điều kiện Việt Nam.

**Importance:**
Phần này giúp sinh viên hiểu vì sao Tư tưởng Hồ Chí Minh vừa mang tính dân tộc, vừa mang tính khoa học, vừa có giá trị thực tiễn.

**Examples:**
Truyền thống yêu nước của dân tộc Việt Nam là nền tảng ban đầu. Chủ nghĩa Mác – Lênin cung cấp thế giới quan và phương pháp luận khoa học. Tinh hoa văn hóa nhân loại giúp mở rộng tầm nhìn. Hoạt động thực tiễn giúp kiểm nghiệm và phát triển tư tưởng.

**Applications:**
Khi phân tích một quan điểm của Hồ Chí Minh, sinh viên cần xem quan điểm đó liên quan đến nguồn gốc nào và được vận dụng trong bối cảnh nào.

**Common Mistakes:**

* Chỉ nhấn mạnh một nguồn gốc và bỏ qua các nguồn khác.
* Hiểu “tiếp thu tinh hoa văn hóa nhân loại” là tiếp thu tất cả một cách không chọn lọc.
* Hiểu chủ nghĩa Mác – Lênin như sự sao chép nguyên xi.

**Memory Tip:**
Nhớ 4 nguồn:
“Mác – Dân tộc – Nhân loại – Thực tiễn.”

---

## Real-Life Scenarios

### Scenario 1: Học môn chính trị để qua môn

Một sinh viên nghĩ rằng môn Tư tưởng Hồ Chí Minh chỉ cần học thuộc đáp án trắc nghiệm. Khi vào game, bạn ấy trả lời đúng một vài câu nhớ máy móc nhưng gặp câu hỏi tình huống thì không biết phân tích.

**Gợi ý phân tích:**
Bạn ấy chưa hiểu môn học như một hệ thống tư tưởng. Cần học theo concept và mối quan hệ giữa các concept, không chỉ học thuộc đáp án.

---

### Scenario 2: Chia sẻ thông tin trên mạng

Một nhóm sinh viên thấy một bài viết xuyên tạc chính sách xã hội và chia sẻ lại vì nghĩ “mình chỉ share thôi, không ảnh hưởng gì”.

**Gợi ý phân tích:**
Khi học Tư tưởng Hồ Chí Minh, sinh viên cần liên hệ với trách nhiệm công dân, lòng yêu nước và tư duy lý luận. Học không chỉ để thi mà để biết hành xử có trách nhiệm trong đời sống số.

---

### Scenario 3: Làm việc nhóm

Một sinh viên luôn nói sẽ hoàn thành việc nhóm nhưng liên tục trễ deadline. Khi nhóm bị trừ điểm, bạn ấy lại đổ lỗi cho hoàn cảnh.

**Gợi ý phân tích:**
Có thể liên hệ với nguyên tắc “nói đi đôi với làm” và đạo đức cách mạng. Đây là ví dụ cho thấy tư tưởng không nằm xa đời sống mà có thể áp dụng vào học tập hằng ngày.

---

## Visual Learning Section

### Diagram 1

**Type:** Mindmap
**Title:** Tư tưởng Hồ Chí Minh là gì?
**Center:** Tư tưởng Hồ Chí Minh
**Branches:**

* Hệ thống quan điểm
* Cách mạng Việt Nam
* Chủ nghĩa Mác – Lênin
* Truyền thống dân tộc
* Tinh hoa văn hóa nhân loại
* Hoạt động thực tiễn

**Purpose:**
Giúp sinh viên nhìn khái niệm trung tâm dưới dạng mạng lưới thay vì học thuộc một câu dài.

---

### Diagram 2

**Type:** 4-source formation diagram
**Title:** 4 nguồn gốc hình thành Tư tưởng Hồ Chí Minh
**Components:**

* Chủ nghĩa Mác – Lênin
* Truyền thống dân tộc
* Tinh hoa văn hóa nhân loại
* Phẩm chất và hoạt động thực tiễn của Hồ Chí Minh

**Purpose:**
Giúp sinh viên hiểu tư tưởng được hình thành từ nhiều nguồn, không phải từ một yếu tố đơn lẻ.

---

### Diagram 3

**Type:** Learning progression flowchart
**Title:** Học từ khái niệm đến vận dụng
**Flow:**
Khái niệm → Nguồn gốc → Nội dung cốt lõi → Tình huống thực tế → Câu hỏi game

**Purpose:**
Kết nối Knowledge Campus với Theory Royale.

---

## Interactive Learning

### Reflection Questions

1. Vì sao không nên học Tư tưởng Hồ Chí Minh bằng cách học thuộc từng câu rời rạc?
2. Theo bạn, học môn này có thể giúp gì cho sinh viên trong đời sống hiện nay?
3. Khi gặp một thông tin gây tranh cãi trên mạng, việc học Tư tưởng Hồ Chí Minh có thể giúp bạn suy nghĩ thận trọng hơn như thế nào?

---

### Matching Exercise

Ghép nội dung bên trái với ý nghĩa bên phải:

| Left                       | Right                                   |
| -------------------------- | --------------------------------------- |
| Chủ nghĩa Mác – Lênin      | Cơ sở thế giới quan và phương pháp luận |
| Truyền thống dân tộc       | Lòng yêu nước, nhân nghĩa, đoàn kết     |
| Tinh hoa văn hóa nhân loại | Tiếp thu có chọn lọc giá trị tiến bộ    |
| Hoạt động thực tiễn        | Kiểm nghiệm và phát triển tư tưởng      |

---

### Drag-drop Exercise

Sắp xếp quá trình học đúng:

1. Đọc khái niệm
2. Xác định nguồn gốc
3. Hiểu mối quan hệ với chương sau
4. Vận dụng vào tình huống thực tế
5. Làm quiz kiểm tra

Correct order:
`["Đọc khái niệm", "Xác định nguồn gốc", "Hiểu mối quan hệ với chương sau", "Vận dụng vào tình huống thực tế", "Làm quiz kiểm tra"]`

---

## Knowledge Check

### Easy Questions

1. Tư tưởng Hồ Chí Minh là gì?
2. Tư tưởng Hồ Chí Minh tập trung vào những vấn đề cơ bản của lĩnh vực nào?
3. Kể tên 2 nguồn gốc hình thành Tư tưởng Hồ Chí Minh.

### Medium Questions

1. Vì sao không thể xem Tư tưởng Hồ Chí Minh là sự sao chép nguyên xi chủ nghĩa Mác – Lênin?
2. Vì sao cần học Tư tưởng Hồ Chí Minh theo hệ thống?
3. Hãy giải thích vai trò của truyền thống dân tộc trong sự hình thành tư tưởng Hồ Chí Minh.

### Hard Questions

1. Phân tích vì sao Tư tưởng Hồ Chí Minh vừa mang tính dân tộc vừa mang tính khoa học.
2. Hãy lấy một tình huống trong đời sống sinh viên để chứng minh việc học Tư tưởng Hồ Chí Minh có ý nghĩa thực tiễn.
3. Vì sao khi học Tư tưởng Hồ Chí Minh cần gắn lý luận với thực tiễn?

---

## Multiple Choice Questions

### Question 1

**Question:** Tư tưởng Hồ Chí Minh là gì?

**Options:**

A. Là sự sao chép nguyên xi chủ nghĩa Mác – Lênin
B. Là hệ thống quan điểm toàn diện và sâu sắc về những vấn đề cơ bản của cách mạng Việt Nam
C. Là tổng hợp các câu chuyện về cuộc đời Hồ Chí Minh
D. Là một hệ thống khẩu hiệu chính trị rời rạc

**Correct Answer:** B

**Explanation:**
Tư tưởng Hồ Chí Minh là hệ thống quan điểm toàn diện và sâu sắc về những vấn đề cơ bản của cách mạng Việt Nam, không phải là sự sao chép máy móc hay tập hợp câu nói rời rạc.

**Metadata:**

```json
{
  "chapterId": "chuong-1",
  "lessonId": "hcm-ch01-khai-niem-tu-tuong-hcm",
  "conceptIds": ["khai-niem-tu-tuong-ho-chi-minh"],
  "difficulty": "easy",
  "bloomLevel": "remember",
  "points": 10,
  "timeLimit": 20,
  "requiresVerification": false
}
```

---

### Question 2

**Question:** Yếu tố nào sau đây KHÔNG nên được hiểu là cách học đúng môn Tư tưởng Hồ Chí Minh?

**Options:**

A. Học theo hệ thống khái niệm
B. Gắn lý luận với thực tiễn
C. Học thuộc từng câu rời rạc mà không cần hiểu bối cảnh
D. Đặt quan điểm vào hoàn cảnh lịch sử cụ thể

**Correct Answer:** C

**Explanation:**
Học thuộc rời rạc dễ làm sai lệch bản chất tư tưởng. Cần học theo hệ thống, có bối cảnh và biết vận dụng vào thực tiễn.

**Metadata:**

```json
{
  "chapterId": "chuong-1",
  "lessonId": "hcm-ch01-khai-niem-tu-tuong-hcm",
  "conceptIds": ["khai-niem-tu-tuong-ho-chi-minh", "phuong-phap-nghien-cuu"],
  "difficulty": "medium",
  "bloomLevel": "understand",
  "points": 15,
  "timeLimit": 25,
  "requiresVerification": false
}
```

---

### Question 3

**Question:** Vì sao Tư tưởng Hồ Chí Minh có tính sáng tạo?

**Options:**

A. Vì Hồ Chí Minh chỉ lặp lại nguyên văn lý luận có sẵn
B. Vì tư tưởng đó vận dụng và phát triển sáng tạo chủ nghĩa Mác – Lênin vào điều kiện cụ thể của Việt Nam
C. Vì tư tưởng đó không liên quan đến thực tiễn cách mạng Việt Nam
D. Vì tư tưởng đó chỉ dựa trên văn hóa phương Tây

**Correct Answer:** B

**Explanation:**
Tính sáng tạo thể hiện ở việc vận dụng và phát triển chủ nghĩa Mác – Lênin phù hợp với điều kiện lịch sử, văn hóa và thực tiễn Việt Nam.

**Metadata:**

```json
{
  "chapterId": "chuong-1",
  "lessonId": "hcm-ch01-khai-niem-tu-tuong-hcm",
  "conceptIds": ["khai-niem-tu-tuong-ho-chi-minh", "chu-nghia-mac-lenin"],
  "difficulty": "medium",
  "bloomLevel": "analyze",
  "points": 15,
  "timeLimit": 30,
  "requiresVerification": false
}
```

---

## Challenge Section

### Challenge 1: Học thuộc hay học hiểu?

Một sinh viên nói:
“Em chỉ cần học thuộc đáp án quiz là đủ, không cần hiểu bản chất Tư tưởng Hồ Chí Minh.”

Hãy viết phản hồi ngắn từ 3–5 câu để giải thích vì sao cách học này chưa đúng.

**Suggested Answer:**
Cách học thuộc đáp án có thể giúp trả lời một số câu hỏi đơn giản nhưng không giúp hiểu bản chất môn học. Tư tưởng Hồ Chí Minh là một hệ thống quan điểm, vì vậy cần học theo mối liên hệ giữa các khái niệm. Nếu không hiểu, sinh viên sẽ khó vận dụng vào tình huống thực tế như trách nhiệm công dân, đạo đức học tập hoặc ứng xử trên mạng xã hội.

---

### Challenge 2: Liên hệ thực tế

Hãy chọn một tình huống trong đời sống sinh viên và chỉ ra tình huống đó có thể liên hệ với nội dung nào trong Tư tưởng Hồ Chí Minh.

Gợi ý tình huống:

* Gian lận trong thi cử
* Chia sẻ tin giả
* Làm việc nhóm thiếu trách nhiệm
* Gây chia rẽ vùng miền trên mạng
* Thờ ơ với văn hóa dân tộc

---

## Key Takeaways

1. Tư tưởng Hồ Chí Minh là hệ thống quan điểm toàn diện và sâu sắc.
2. Nội dung này tập trung vào những vấn đề cơ bản của cách mạng Việt Nam.
3. Tư tưởng Hồ Chí Minh không phải là tiểu sử hoặc tập hợp câu nói rời rạc.
4. Tư tưởng này được hình thành từ chủ nghĩa Mác – Lênin, truyền thống dân tộc, tinh hoa văn hóa nhân loại và thực tiễn cách mạng.
5. Cần học theo hệ thống, có bối cảnh và biết vận dụng.
6. Bài học này là nền tảng để hiểu các chương sau.
7. Học Tư tưởng Hồ Chí Minh không chỉ để thi, mà còn để rèn tư duy, đạo đức và trách nhiệm công dân.

---

## Instructor Notes

* Sinh viên thường nhầm Tư tưởng Hồ Chí Minh với tiểu sử Hồ Chí Minh. Khi dạy, cần nhấn mạnh đây là hệ thống quan điểm.
* Sinh viên dễ học thuộc định nghĩa nhưng không hiểu ý nghĩa. Nên yêu cầu sinh viên diễn đạt lại bằng ngôn ngữ của mình.
* Nên dùng ví dụ đời sống sinh viên như thi cử, làm việc nhóm, mạng xã hội để tăng tính gần gũi.
* Không nên biến bài học thành phần đọc lại giáo trình dài. Hãy dùng sơ đồ, tình huống và câu hỏi tương tác.
* Khi dạy, cần kết nối bài này với các chương sau: độc lập dân tộc, CNXH, Đảng, Nhà nước, đại đoàn kết, văn hóa, đạo đức, con người.

---

## Developer Notes

Lesson này cần map với các phần sau:

```json
{
  "lessonId": "hcm-ch01-khai-niem-tu-tuong-hcm",
  "chapterId": "chuong-1",
  "moduleId": "tu-tuong-ho-chi-minh",
  "conceptIds": [
    "khai-niem-tu-tuong-ho-chi-minh",
    "chu-nghia-mac-lenin",
    "truyen-thong-dan-toc",
    "tinh-hoa-van-hoa-nhan-loai"
  ],
  "relatedCaseIds": [
    "hoc-that-thi-that",
    "trach-nhiem-cong-dan",
    "noi-di-doi-voi-lam"
  ],
  "relatedTimelineIds": [
    "coi-nguon-tu-tuong",
    "ra-di-tim-duong-cuu-nuoc",
    "tiep-can-chu-nghia-mac-lenin"
  ],
  "suggestedGameZone": "chuong-1",
  "requiresVerification": false
}
```

---

# PHẦN D — CẬP NHẬT CASE STUDY SCHEMA

Cập nhật `caseFiles.json` theo schema mới:

```json
{
  "id": "hoc-that-thi-that",
  "title": "Học thật, thi thật",
  "summary": "Một tình huống về trung thực trong học tập.",
  "chapterIds": ["chuong-6"],
  "lessonIds": ["hcm-ch06-dao-duc-cach-mang"],
  "conceptIds": ["dao-duc-cach-mang", "noi-di-doi-voi-lam"],
  "difficulty": "easy",
  "tags": ["Đạo đức cách mạng", "Nói đi đôi với làm", "Trung thực"],
  "situation": "...",
  "analysis": "...",
  "lesson": "...",
  "reflectionQuestion": "...",
  "discussionPrompts": [
    "Nếu là bạn, bạn sẽ làm gì?",
    "Hành vi gian lận ảnh hưởng thế nào đến năng lực thật?",
    "Tình huống này liên hệ với nguyên tắc đạo đức nào?"
  ],
  "suggestedAnswer": "...",
  "teacherNote": "...",
  "requiresVerification": false
}
```

Yêu cầu cập nhật tất cả case hiện có theo schema này, gồm:

* `hoc-that-thi-that`
* `doan-ket-thoi-dai-so`
* `can-bo-phuc-vu`
* `chong-chu-nghia-ca-nhan`
* `ban-sac-van-hoa-so`
* `noi-di-doi-voi-lam`
* `trach-nhiem-cong-dan`
* `van-hoa-ung-xu-mang`

Nếu case nào có concept chưa tồn tại trong canonical concept list, hãy thêm concept đó hoặc map sang concept gần nhất. Không được để dangling reference.

---

# PHẦN E — CẬP NHẬT QUIZ / REVIEW QUESTION SCHEMA

Cập nhật `reviewQuestions.js` theo schema mới:

```js
{
  id: "q-hcm-ch01-001",
  question: "Tư tưởng Hồ Chí Minh là gì?",
  type: "multiple-choice",
  options: [
    "Là sự sao chép nguyên xi chủ nghĩa Mác - Lênin",
    "Là hệ thống quan điểm toàn diện và sâu sắc về những vấn đề cơ bản của cách mạng Việt Nam",
    "Là sự tổng hợp các luồng tư tưởng phương Đông",
    "Là chủ trương của Đảng Cộng sản Đông Dương"
  ],
  correctAnswer: 1,
  explanation: "Tư tưởng Hồ Chí Minh là hệ thống quan điểm toàn diện và sâu sắc về những vấn đề cơ bản của cách mạng Việt Nam, là kết quả của sự vận dụng và phát triển sáng tạo chủ nghĩa Mác - Lênin vào điều kiện cụ thể của Việt Nam.",
  chapterId: "chuong-1",
  lessonId: "hcm-ch01-khai-niem-tu-tuong-hcm",
  conceptIds: ["khai-niem-tu-tuong-ho-chi-minh"],
  difficulty: "easy",
  bloomLevel: "remember",
  points: 10,
  timeLimit: 20,
  feedbackCorrect: "Chính xác. Đây là định nghĩa nền tảng của môn học.",
  feedbackIncorrect: "Chưa đúng. Cần nhớ Tư tưởng Hồ Chí Minh là một hệ thống quan điểm, không phải sự sao chép hoặc tập hợp rời rạc.",
  requiresVerification: false
}
```

Yêu cầu:

* Giữ lại các câu hỏi hiện có nếu đúng.
* Bổ sung metadata.
* Chuẩn hóa ID câu hỏi.
* Gắn câu hỏi với chapter/lesson/concept.
* Không làm mất explanation cũ.
* Nếu câu nào chưa chắc đúng theo giáo trình, thêm `requiresVerification: true`.

---

# PHẦN F — CẬP NHẬT UI HIỂN THỊ LESSON

Nếu UI hiện chỉ hiển thị content ngắn, hãy nâng cấp giao diện lesson để hiển thị:

1. Header:

   * title
   * chapter
   * difficulty
   * duration
   * tags

2. Learning Objectives

3. Quick Overview

4. Core Theory:

   * Beginner
   * Intermediate
   * Advanced
   * Có thể dùng accordion để giảm tải nhận thức

5. Concept Breakdown:

   * Definition
   * Explanation
   * Importance
   * Examples
   * Applications
   * Common Mistakes
   * Memory Tips

6. Visual Learning:

   * render dạng card/diagram placeholder nếu chưa có diagram thật

7. Interactive Learning:

   * reflection questions
   * matching
   * drag-drop idea

8. Knowledge Check:

   * easy / medium / hard

9. Key Takeaways

10. Related:

* related concepts
* related cases
* related timeline events
* related review questions

Giao diện cần mobile-first, đoạn ngắn, dễ đọc, không tạo wall of text.

---

# PHẦN G — VALIDATION SCRIPT

Tạo script kiểm tra dữ liệu, ví dụ:

`validateKnowledgeData.js`

Script cần kiểm tra:

1. Duplicate `lessonId`
2. Duplicate `conceptId`
3. Duplicate `caseId`
4. Duplicate `questionId`
5. `chapterId` không tồn tại
6. `conceptIds` không tồn tại trong canonicalConcepts
7. `relatedCaseIds` không tồn tại
8. `relatedTimelineIds` không tồn tại
9. Quiz không có correctAnswer hợp lệ
10. Lesson thiếu required fields
11. Case thiếu situation/analysis/lesson
12. Question thiếu explanation
13. `requiresVerification` field bị thiếu

Kết quả console nên hiển thị rõ:

```txt
✅ Knowledge data validation passed
```

hoặc

```txt
❌ Missing conceptId: van-hoa-so in caseFiles.json > doan-ket-thoi-dai-so
❌ Duplicate lessonId: hcm-ch01-khai-niem-tu-tuong-hcm
⚠ requiresVerification missing in question q-hcm-ch03-002
```

---

# PHẦN H — ACCEPTANCE CRITERIA

Sau khi chỉnh sửa xong, hệ thống phải đạt các tiêu chí sau:

1. Không còn concept ID bị lệch giữa các file.
2. Mỗi lesson có schema đầy đủ.
3. Chương 1 có ít nhất 1 lesson hoàn chỉnh theo format mới.
4. Case study gắn đúng chapter/lesson/concept.
5. Review questions có metadata đầy đủ.
6. UI hiển thị lesson mới không lỗi.
7. Game vẫn chạy bình thường.
8. Build không lỗi.
9. Validation script chạy được.
10. Không có nội dung bịa hoặc thay đổi sai ý nghĩa học thuật.
11. Nội dung mới phải ngắn gọn, mobile-friendly, dễ học với Gen Z.
12. Các phần chưa chắc chắn phải đánh dấu `requiresVerification: true`.

---

# PHẦN I — OUTPUT MONG MUỐN

Sau khi hoàn thành, hãy trả về:

1. Danh sách file đã chỉnh sửa.
2. Tóm tắt thay đổi trong từng file.
3. Các concept ID đã chuẩn hóa.
4. Lesson mới đã thêm.
5. Case/quiz đã cập nhật.
6. Cách chạy validation script.
7. Cách test trên giao diện.
8. Các mục còn cần kiểm chứng theo giáo trình.

Không được chỉ nói chung chung. Cần sửa trực tiếp trong code/data nếu có quyền truy cập source.
