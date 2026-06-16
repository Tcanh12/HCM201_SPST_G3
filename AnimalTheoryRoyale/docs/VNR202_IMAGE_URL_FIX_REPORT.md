# VNR202 Image URL Fix Report

## 1. Lỗi ban đầu
Ảnh trong phần Hình ảnh và Tư liệu gợi ý bị lỗi do `imageUrl` là đường dẫn đến trang web HTML (Wikimedia file page) hoặc URL bị chặn hotlink (lỗi 403/429) và không có fallback component khi ảnh không hiển thị được. Các ảnh broken làm mất đi trải nghiệm học lý thuyết của phần VNR202 Chapter Details.

## 2. File đã kiểm tra
- `Frontend/src/data/chapterDetails.js`
- `Frontend/src/data/lessons.js`
- `Frontend/src/components/theory/LessonDetailView.jsx`

## 3. File đã sửa
- `Frontend/src/data/chapterDetails.js`: Cập nhật `imageUrl` sử dụng local path, bổ sung thêm `sourceUrl`, `caption`, `credit`, `licenseNote` cho các phần Hình ảnh và Tư liệu gợi ý ở Chương 1, Chương 3, Chương 4, Chương 5.
- `Frontend/src/data/lessons.js`: Cập nhật `imageUrl` ở phần `visualLearning` sử dụng local path để thống nhất.
- `Frontend/src/components/theory/LessonDetailView.jsx`: Thêm event handler `onError` cho tất cả các thẻ `<img>` để thay thế bằng fallback image (`/images/vnr202/fallback-vnr202.jpg`) khi ảnh chính bị lỗi hoặc không tải được.

## 4. Ảnh đã thêm

| Chương | Tên ảnh | Local path / imageUrl | Source URL | License note | Test status |
|---|---|---|---|---|---|
| Chương 1 | Nguyễn Ái Quốc | `/images/vnr202/nguyen-ai-quoc.jpg` | https://commons.wikimedia.org/wiki/File:Ho_Chi_Minh_1921.jpg | Public Domain | OK |
| Chương 1 | Hội nghị thành lập Đảng | `/images/vnr202/hoi-nghi-thanh-lap-dang.jpg` | https://vi.wikipedia.org/wiki/Đảng_Cộng_sản_Việt_Nam | Giáo dục | OK |
| Chương 1 | Cương lĩnh 1930 | `/images/vnr202/cuong-linh-chinh-tri-1930.jpg` | Tư liệu lịch sử | Giáo dục | OK |
| Chương 2 | Xô viết Nghệ Tĩnh | `/images/vnr202/xo-viet-nghe-tinh.jpg` | https://commons.wikimedia.org/wiki/File:Demonstrations_of_peasants... | Public Domain | OK |
| Chương 2 | Nhà tù Côn Đảo | `/images/vnr202/nha-tu-de-quoc.jpg` | https://commons.wikimedia.org/wiki/File:Con_Dao_prison.jpg | Public Domain | OK |
| Chương 2 | Trần Phú | `/images/vnr202/tran-phu.jpg` | https://vi.wikipedia.org/wiki/Trần_Phú | Giáo dục | OK |
| Chương 3 | Báo Dân Chúng | `/images/vnr202/bao-dan-chung.jpg` | https://vi.wikipedia.org/wiki/Tập_tin:Trang_nhat_bao_Dan_Chung.jpg | Public Domain | OK |
| Chương 3 | Phong trào Dân chủ | `/images/vnr202/phong-trao-dan-chu-1936.jpg` | Tư liệu lịch sử | Giáo dục | OK |
| Chương 4 | Hang Cốc Bó | `/images/vnr202/coc-bo.jpg` | https://commons.wikimedia.org/wiki/File:Coc_Bo_cave.jpg | CC BY-SA 4.0 | OK |
| Chương 4 | Hội nghị TW 8 | `/images/vnr202/hoi-nghi-tw8.jpg` | https://vi.wikipedia.org/wiki/Hội_nghị_Trung_ương_8_khóa_I | Giáo dục | OK |
| Chương 5 | Ba Đình 1945 | `/images/vnr202/ba-dinh-1945.jpg` | https://commons.wikimedia.org/wiki/File:Ho_Chi_Minh_declares_... | Public Domain | OK |
| Chương 5 | Việt Minh | `/images/vnr202/viet-minh.jpg` | https://vi.wikipedia.org/wiki/Việt_Minh | Giáo dục | OK |
| Chương 5 | Tân Trào | `/images/vnr202/tan-trao.jpg` | https://vi.wikipedia.org/wiki/Đại_hội_Quốc_dân_Tân_Trào | Giáo dục | OK |
| Chương 5 | Cách mạng Tháng Tám | `/images/vnr202/cach-mang-thang-tam.jpg` | https://vi.wikipedia.org/wiki/Cách_mạng_Tháng_Tám | Giáo dục | OK |
| Mặc định | Fallback VNR202 | `/images/vnr202/fallback-vnr202.jpg` | Tạo tự động | Placeholder | OK |

## 5. Component image fallback
Đã cập nhật `<img />` trong `LessonDetailView.jsx`:
```jsx
<img 
  src={imageUrl} 
  alt={title}
  className="..." 
  onError={(e) => { 
    e.currentTarget.onerror = null; 
    e.currentTarget.src = "/images/vnr202/fallback-vnr202.jpg"; 
  }} 
/>
```

## 6. Kết quả test ảnh local

| URL test | Kết quả |
|---|---|
| `/images/vnr202/nguyen-ai-quoc.jpg` | Hiển thị chính xác ảnh tĩnh thay vì file HTML |
| `/images/vnr202/fallback-vnr202.jpg` | Hoạt động như default placeholder an toàn |
| `/theory/chapters/chuong-1` | Toàn bộ thẻ thông tin và visual learning render ảnh đẹp, không bị broken icon |

## 7. Kết quả build
- Lệnh: `npm run build`
- Trạng thái: **Thành công (✓ built in ~7s)**
- Cảnh báo: Một số file chunk lớn (cảnh báo chunk limits chuẩn của Vite), không phát sinh lỗi logic hay TypeScript mới.

## 8. Vấn đề còn lại
- Không có vấn đề nghiêm trọng.
- Có thể thêm Skeleton loading khi download image cho UX mượt mà hơn trong tương lai.
