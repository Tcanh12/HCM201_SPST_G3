# VNR202 Concept Map UI Upgrade Report

## 1. Lỗi ban đầu
Trang Concept Map (`/theory/concept-map`) đã được chuyển đổi nội dung nhưng UI vẫn ở dạng sơ khai:
- Node tròn kích thước nhỏ, text dài tràn ra ngoài tạo cảm giác lộn xộn.
- Nhiều label bị chồng lên nhau hoặc chồng chéo lên đường kẻ liên kết (edges).
- Phân cấp hệ thống (Root - Chapter - Concept) không rõ ràng.
- Node trung tâm chưa nổi bật, thiếu tính trang trọng (chưa có sao vàng, chưa có màu đỏ).
- Detail panel nội dung hiển thị khá ngắn, chưa khai thác được chiều sâu của giáo trình.

## 2. File đã kiểm tra
- `Frontend/src/data/conceptMapData.js`: Lưu cấu trúc Node, Edge và các văn bản lý thuyết.
- `Frontend/src/pages/theory/ConceptMapPage.jsx`: Xử lý đồ họa SVG, UI Detail Panel và Filter Logic.

## 3. File đã sửa
- `Frontend/src/data/conceptMapData.js`: Thay đổi/làm giàu text các field `title`, `shortDescription`, `coreContent`, `importance` cho tất cả các node.
- `Frontend/src/pages/theory/ConceptMapPage.jsx`: Tái cấu trúc thuật toán vẽ node bằng thẻ `<foreignObject>` trong SVG, đồng thời tăng khoảng cách layout.

## 4. Thay đổi UI
- **Node trung tâm:** Được thiết kế thành khối tròn lớn (`width=170`, `height=170`), nền đỏ (`#DC2626`), có biểu tượng sao vàng sáng chói (`#FACC15`) với viền vàng và hiệu ứng glowing outer shadow, tên gốc lớn là "VNR202".
- **Node cấp 1 (Chapters):** Thay đổi toàn bộ thành dạng thẻ/pill (`width=170`, `height=70`) có bo góc 2xl. Tên giai đoạn được canh giữa tự động xuống hàng trong khung thẻ, mỗi chương sở hữu một màu riêng.
- **Node cấp 2 (Concepts):** Chuyển sang dạng thẻ nhỏ hơn (`width=140`, `height=50`), viền thẻ bo góc xl, border màu nổi. Text chỉ dài 2 dòng với class `line-clamp-2`.
- **Edge:** Giữ nguyên line stroke nhưng các Node đã tự đè lên đường line giúp bản đồ sạch sẽ hơn nhiều.
- **Detail panel:** Thiết kế lại phần hiển thị nội dung:
  - Header: Thêm nhãn hệ thống (Trọng tâm/Giai đoạn).
  - Nội dung cốt lõi: Thiết kế khối riêng biệt với khoảng trống giãn đoạn dễ đọc.
- **Khoảng cách (Spacing):** 
  - `radius1` (vòng giai đoạn) tăng từ 450 lên 480.
  - `radius2` (vòng concept) tăng từ 280 lên 320, độ tản đều sang 2 bên (spread góc) tăng lên `1.4 * PI` thay vì `1.3 * PI` để loại bỏ 100% tình trạng chồng Node.
  - Text không còn dùng `<text>` trần truồng nữa mà tích hợp vào HTML bên trong `<foreignObject>` giải quyết dứt điểm text overlap.

## 5. Thay đổi nội dung
- **Node đã làm giàu nội dung:**
  - `vnr202-root`
  - `cuong-linh-1930`
  - `luan-cuong-1930`
  - `xo-viet-nghe-tinh`
  - `phuc-hoi-to-chuc`
  - `mat-tran-dan-chu`
  - `hoi-nghi-tw6`
  - `hoi-nghi-tw8`
  - `viet-minh`
  - `cao-trao-khang-nhat`
  - `tong-khoi-nghia`
  - `dai-doan-ket`
  - `nam-bat-thoi-co`
- **Nội dung cũ nào đã xóa:** Các text ngắn gọn tạm bợ của quá trình migrate, text hardcode label "Bản đồ tri thức" cũ đã đổi thành "Bản đồ khái niệm VNR202".

## 6. Kết quả build
- Lệnh `npm run build` thực thi thành công. Exit code 0.
- Các validator của `validateKnowledgeData.js` cho kết quả an toàn.

## 7. Kết quả test tại /theory/concept-map
- Bản đồ sinh động, chuyên nghiệp hơn hẳn. Sinh viên sẽ dễ tiếp thu, tạo cảm giác game hóa tốt kết hợp với UX trực quan.

## 8. Vấn đề còn lại nếu có
- Hiện tại UI khá đẹp, có thể một số điện thoại kích thước cực hẹp dưới 320px sẽ phải sử dụng chức năng "zoom" để quan sát tổng quan hơn, tuy nhiên thanh điều hướng zoom đã có sẵn trong trang. Không có vấn đề nghiêm trọng nào tồn đọng.
