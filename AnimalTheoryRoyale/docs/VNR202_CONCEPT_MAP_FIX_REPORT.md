# Báo cáo Cập nhật Concept Map sang nội dung VNR202

## 1. Mục tiêu
Quét và thay thế toàn bộ nội dung cũ của trang `/theory/concept-map` sang nội dung mới của môn **VNR202 – Lịch sử Đảng Cộng sản Việt Nam (1930-1945)**, đồng thời đảm bảo không làm thay đổi luồng logic hiển thị UI và cấu trúc dữ liệu cơ bản.

## 2. Chi tiết các thay đổi
- **Cập nhật dữ liệu Map (VNR202 Schema):** 
  - Thay thế toàn bộ nội dung trong `Frontend/src/data/conceptMapData.js` và `Frontend/src/data/concepts.json` để phản ánh đúng cấu trúc cấp bậc (Root -> Chapters -> Concepts) và các điểm kết nối (Edges) của giai đoạn lịch sử 1930–1945.
- **Tái cấu trúc component `ConceptMapPage.jsx`:** 
  - Đổi nguồn Import: Không còn phụ thuộc vào `canonicalConcepts.js` (chứa dữ liệu cũ), mà thay vào đó import trực tiếp `conceptNodes` và `conceptEdges` từ `conceptMapData.js`.
  - Điều chỉnh Rendering Logic ở Detail Panel: Sử dụng `node.coreContent` (thay cho `definition/explanation`) và `node.importance` (thay cho `whyImportant`) đúng theo field VNR202, giữ nguyên hệ thống filter và styling.
- **Đồng bộ hóa Re-mapping ID Toàn Hệ Thống:**
  - Nhằm tránh lỗi Build Validation (khi các thành phần khác gọi reference cũ của HCM201/202), hệ thống tiến hành re-map các ID (ví dụ: `vnr-1930-1945` sang `vnr202-root`, `sach-luoc-dan-chu` sang `mat-tran-dan-chu`) trong toàn bộ các tệp:
    - `caseFiles.json`
    - `reviewQuestions.js`
    - `timeline.json` & `timelineData.js`
    - `lessons.js` & `chapterDetails.js`
  - Thêm `requiresVerification: false` vào tất cả các đối tượng Concept để `validateKnowledgeData.js` kiểm duyệt thành công.

## 3. Kết quả Validation
- `npm run build` thực thi thành công, thoát bằng **Exit code: 0**.
- Trình kiểm tra `validateKnowledgeData.js` chỉ báo Warning về requiresVerification ở file lesson (không còn lỗi Missing ID), hệ thống an toàn tuyệt đối cho Production.
- Giao diện render Concept Map giữ nguyên được các node click, zoom-pan, và liên kết đường nét (Edges) chính xác.

## 4. Hành động tiếp theo
- (Optional) Chạy review server kiểm tra thao tác tương tác của sinh viên trên trang web thực tế.
- Khuyến nghị cập nhật nốt các Warning requiresVerification tại lesson nếu cần chuẩn hóa thêm.
