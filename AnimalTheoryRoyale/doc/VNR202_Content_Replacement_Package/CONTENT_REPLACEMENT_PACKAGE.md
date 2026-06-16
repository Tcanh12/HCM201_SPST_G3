# CONTENT REPLACEMENT PACKAGE

## 1. Khái quát chủ đề mới

### A. Khái quát chủ đề

Chủ đề này nghiên cứu quá trình Đảng Cộng sản Việt Nam xác lập, điều chỉnh và hoàn chỉnh đường lối đấu tranh cách mạng trong giai đoạn 1930–1945. Nội dung bắt đầu từ sự ra đời của Đảng và Cương lĩnh chính trị đầu tiên, đi qua cao trào 1930–1931, phục hồi tổ chức 1932–1935, phong trào dân chủ 1936–1939, chuyển hướng chiến lược 1939–1941, đến cao trào kháng Nhật và Tổng khởi nghĩa tháng Tám năm 1945.

### Trọng tâm cần nhớ

1. Cương lĩnh chính trị đầu tiên đặt độc lập dân tộc ở vị trí trung tâm.
2. Luận cương tháng 10/1930 có đóng góp nhưng còn hạn chế về vấn đề dân tộc và lực lượng cách mạng.
3. Xô viết Nghệ Tĩnh là đỉnh cao phong trào 1930–1931.
4. Giai đoạn 1932–1935 trọng tâm là phục hồi tổ chức Đảng.
5. Phong trào 1936–1939 thể hiện sự linh hoạt sách lược.
6. Hội nghị Trung ương 8 năm 1941 hoàn chỉnh chuyển hướng giải phóng dân tộc.
7. Việt Minh là mặt trận đoàn kết toàn dân.
8. Thắng lợi tháng Tám 1945 là kết quả của đường lối đúng, chuẩn bị lâu dài và nắm bắt thời cơ.

## 2. Dữ liệu đề xuất cho `chapters.json`

| id | chapterNumber | title | conceptCount | color |
|---|---:|---|---:|---|
| chuong-1 | 1 | Đảng ra đời và nền tảng đường lối 1930 | 3 | bg-red-600 |
| chuong-2 | 2 | Cao trào 1930–1931 và phục hồi 1932–1935 | 3 | bg-orange-600 |
| chuong-3 | 3 | Phong trào dân chủ 1936–1939 | 2 | bg-blue-600 |
| chuong-4 | 4 | Chuyển hướng chiến lược 1939–1941 | 3 | bg-emerald-600 |
| chuong-5 | 5 | Việt Minh, kháng Nhật và Cách mạng Tháng Tám | 4 | bg-yellow-600 |

## 3. Dữ liệu đề xuất cho `lessons.js`

File đầy đủ nằm trong package: `lessons.js`.

## 4. Dữ liệu đề xuất cho `chapterDetails.js`

File đầy đủ nằm trong package: `chapterDetails.js`.

## 5. Dữ liệu đề xuất cho `timeline.json`

File đầy đủ nằm trong package: `timeline.json`.

## 6. Dữ liệu đề xuất cho `timelineData.js`

File đầy đủ nằm trong package: `timelineData.js`.

## 7. Dữ liệu đề xuất cho `conceptMapData.js`

File đầy đủ nằm trong package: `conceptMapData.js`.

## 8. Dữ liệu đề xuất cho `concepts.json`

File đầy đủ nằm trong package: `concepts.json`.

## 9. Dữ liệu đề xuất cho `caseFiles.json`

File đầy đủ nằm trong package: `caseFiles.json`.

## 10. Dữ liệu đề xuất cho `reviewQuestions.js`

File đầy đủ nằm trong package: `reviewQuestions.js`.

## 11. Dữ liệu đề xuất cho `characterData.js`

File đầy đủ nằm trong package: `characterData.js`.

## 12. Dữ liệu đề xuất cho `mapData.js`

File đầy đủ nằm trong package: `mapData.js`.

## 13. Dữ liệu đề xuất cho `loadingTips.js`

File đầy đủ nằm trong package: `loadingTips.js`.

## 14. Dữ liệu đề xuất cho `advanced_questions.json`

File đầy đủ nằm trong package: `advanced_questions.json`.

## 15. Dữ liệu đề xuất cho `questions_raw.txt`

File đầy đủ nằm trong package: `questions_raw.txt`.

## 16. Dữ liệu đề xuất cho `SeedController_data_block.cs`

File đầy đủ nằm trong package: `SeedController_data_block.cs`.

## 16. Bảng mapping ID liên kết

File đầy đủ: `ID_MAPPING.md`.

| ID | Loại | Xuất hiện trong file nào | Liên kết với |
| -- | ---- | ------------------------ | ------------ |
| chuong-1 | chapter | chapters.json, lessons.js, chapterDetails.js, timeline.json, timelineData.js, conceptMapData.js, reviewQuestions.js, caseFiles.json | lessons, timeline, concepts, questions, cases |
| chuong-2 | chapter | chapters.json, lessons.js, chapterDetails.js, timeline.json, timelineData.js, conceptMapData.js, reviewQuestions.js, caseFiles.json | lessons, timeline, concepts, questions, cases |
| chuong-3 | chapter | chapters.json, lessons.js, chapterDetails.js, timeline.json, timelineData.js, conceptMapData.js, reviewQuestions.js, caseFiles.json | lessons, timeline, concepts, questions, cases |
| chuong-4 | chapter | chapters.json, lessons.js, chapterDetails.js, timeline.json, timelineData.js, conceptMapData.js, reviewQuestions.js, caseFiles.json | lessons, timeline, concepts, questions, cases |
| chuong-5 | chapter | chapters.json, lessons.js, chapterDetails.js, timeline.json, timelineData.js, conceptMapData.js, reviewQuestions.js, caseFiles.json | lessons, timeline, concepts, questions, cases |
| vnr-ch1-cuong-linh-luan-cuong | lesson | lessons.js, reviewQuestions.js, caseFiles.json | chuong-1 |
| vnr-ch2-xo-viet-phuc-hoi | lesson | lessons.js, reviewQuestions.js, caseFiles.json | chuong-2 |
| vnr-ch3-phong-trao-dan-chu | lesson | lessons.js, reviewQuestions.js, caseFiles.json | chuong-3 |
| vnr-ch4-chuyen-huong-chien-luoc | lesson | lessons.js, reviewQuestions.js, caseFiles.json | chuong-4 |
| vnr-ch5-viet-minh-tong-khoi-nghia | lesson | lessons.js, reviewQuestions.js, caseFiles.json | chuong-5 |
| vnr-1930-1945 | concept | conceptMapData.js, concepts.json, timeline.json, timelineData.js, reviewQuestions.js, caseFiles.json | chuong-1 |
| cn-chuong-1 | concept | conceptMapData.js, concepts.json, timeline.json, timelineData.js, reviewQuestions.js, caseFiles.json | chuong-1 |
| cn-chuong-2 | concept | conceptMapData.js, concepts.json, timeline.json, timelineData.js, reviewQuestions.js, caseFiles.json | chuong-2 |
| cn-chuong-3 | concept | conceptMapData.js, concepts.json, timeline.json, timelineData.js, reviewQuestions.js, caseFiles.json | chuong-3 |
| cn-chuong-4 | concept | conceptMapData.js, concepts.json, timeline.json, timelineData.js, reviewQuestions.js, caseFiles.json | chuong-4 |
| cn-chuong-5 | concept | conceptMapData.js, concepts.json, timeline.json, timelineData.js, reviewQuestions.js, caseFiles.json | chuong-5 |
| cuong-linh-1930 | concept | conceptMapData.js, concepts.json, timeline.json, timelineData.js, reviewQuestions.js, caseFiles.json | chuong-1 |
| luan-cuong-1930 | concept | conceptMapData.js, concepts.json, timeline.json, timelineData.js, reviewQuestions.js, caseFiles.json | chuong-1 |
| xo-viet-nghe-tinh | concept | conceptMapData.js, concepts.json, timeline.json, timelineData.js, reviewQuestions.js, caseFiles.json | chuong-2 |
| phuc-hoi-to-chuc | concept | conceptMapData.js, concepts.json, timeline.json, timelineData.js, reviewQuestions.js, caseFiles.json | chuong-2 |
| sach-luoc-dan-chu | concept | conceptMapData.js, concepts.json, timeline.json, timelineData.js, reviewQuestions.js, caseFiles.json | chuong-3 |
| mat-tran-dan-chu | concept | conceptMapData.js, concepts.json, timeline.json, timelineData.js, reviewQuestions.js, caseFiles.json | chuong-3 |
| chuyen-huong-chien-luoc | concept | conceptMapData.js, concepts.json, timeline.json, timelineData.js, reviewQuestions.js, caseFiles.json | chuong-4 |
| hoi-nghi-tw-8 | concept | conceptMapData.js, concepts.json, timeline.json, timelineData.js, reviewQuestions.js, caseFiles.json | chuong-4 |
| viet-minh | concept | conceptMapData.js, concepts.json, timeline.json, timelineData.js, reviewQuestions.js, caseFiles.json | chuong-5 |
| cao-trao-khang-nhat | concept | conceptMapData.js, concepts.json, timeline.json, timelineData.js, reviewQuestions.js, caseFiles.json | chuong-5 |
| tong-khoi-nghia | concept | conceptMapData.js, concepts.json, timeline.json, timelineData.js, reviewQuestions.js, caseFiles.json | chuong-5 |
| bai-hoc-kinh-nghiem | concept | conceptMapData.js, concepts.json, timeline.json, timelineData.js, reviewQuestions.js, caseFiles.json | chuong-5 |
| tl-1930-02-thanh-lap-dang | timeline | timeline.json, timelineData.js, conceptMapData.js | cuong-linh-1930, vnr-1930-1945 |
| tl-1930-10-luan-cuong | timeline | timeline.json, timelineData.js, conceptMapData.js | luan-cuong-1930 |
| tl-1930-09-xo-viet | timeline | timeline.json, timelineData.js, conceptMapData.js | xo-viet-nghe-tinh |
| tl-1932-chuong-trinh-hanh-dong | timeline | timeline.json, timelineData.js, conceptMapData.js | phuc-hoi-to-chuc |
| tl-1935-dai-hoi-i | timeline | timeline.json, timelineData.js, conceptMapData.js | phuc-hoi-to-chuc |
| tl-1936-hoi-nghi-thuong-hai | timeline | timeline.json, timelineData.js, conceptMapData.js | sach-luoc-dan-chu, mat-tran-dan-chu |
| tl-1938-mat-tran-dan-chu | timeline | timeline.json, timelineData.js, c

... xem `ID_MAPPING.md` để xem đầy đủ.

## 17. Checklist kiểm tra trước khi thay vào code

| Tiêu chí | Đạt/Chưa đạt | Ghi chú |
| -------- | ------------ | ------- |
| Không đổi schema | Đạt | Giữ đúng field theo DATA_SCHEMA_ANALYSIS.md. |
| Không thiếu field bắt buộc | Đạt | Đủ field cho từng file data. |
| Không sai kiểu dữ liệu | Đạt | String/number/boolean/array/object đúng schema. |
| ID liên kết đồng bộ | Đạt | Đã kiểm tra chapterId, lessonId, conceptIds, edge source/target. |
| Câu hỏi có đúng 4 đáp án | Đạt | reviewQuestions, questions_raw, SeedController đều 4 đáp án. |
| correctAnswer/ci là index số | Đạt | Dùng 0–3. |
| Options trong backend có Text và IsCorrect | Đạt | advanced_questions.json đúng object. |
| ChallengePayloadJson là JSON string hợp lệ | Đạt | Tạo bằng json.dumps và parse lại. |
| Chỉ có 1 map default | Đạt | hongkong1930 là default duy nhất. |
| Có đủ 4 nhân vật | Đạt | 4 key: 1,2,3,4. |
| Loading tips đúng schema | Đạt | 20 tips có text, chapter, icon. |
| Không viết lại logic C# | Đạt | Chỉ tạo topicNames và qs. |
| Nội dung có thể thay vào data file mà không cần sửa component | Đạt có điều kiện | chapterDetails.sections.content phụ thuộc component render hiện tại; schema chỉ nêu content phụ thuộc type. |
