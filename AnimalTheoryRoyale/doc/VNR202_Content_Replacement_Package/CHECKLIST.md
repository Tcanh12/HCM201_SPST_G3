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
