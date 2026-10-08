# Phân tích Tính năng Website & Lưu ý khi Testing (WordPress Admin)

## 1. Các nhóm tính năng chính của Website
- **Dashboard**: Tóm tắt hoạt động hệ thống (At a Glance, Activity, Recent Comments).
- **Posts (Bài viết)**: Quản lý danh sách bài viết, tạo/chỉnh sửa/xóa bài viết, phân loại Category/Tag.
- **Media**: Quản lý thư viện hình ảnh, video, tài liệu đính kèm.
- **Pages (Trang)**: Quản lý các trang tĩnh của website.
- **Comments (Bình luận)**: Duyệt, phản hồi, đánh dấu spam hoặc xóa bình luận.
- **Appearance & Plugins**: Tùy chỉnh giao diện, cài đặt và cấu hình plugin (ví dụ: miniOrange API Authentication).
- **Users**: Quản lý tài khoản người dùng, phân quyền (Admin, Editor, Author,...).
- **Settings & Tools**: Cấu hình chung cho website và các công cụ hỗ trợ.

## 2. Lưu ý & Rủi ro khi thực hiện Test Automation
- **Tốc độ phản hồi (Performance/Latency)**:
  - Các thao tác điều hướng menu bên trái có thời gian phản hồi khá nhanh.
  - Thao tác xuất/nhập dữ liệu hoặc lọc bài viết/bình luận có thể mất thêm thời gian chờ.
- **Dữ liệu động (Dynamic Data)**:
  - Danh sách bài viết và bình luận thay đổi liên tục, cần cơ chế làm sạch dữ liệu (cleanup) hoặc tạo dữ liệu test giả lập để không phụ thuộc dữ liệu hiện tại.
- **Xử lý XHR/AJAX**:
  - Khi duyệt bình luận (Approve/Spam/Trash) hoặc lưu cài đặt, trang web gửi các yêu cầu bất đồng bộ (AJAX). Cần đảm bảo Playwright đợi trạng thái mạng hoàn tất (`networkidle` hoặc đợi API response) trước khi assert.
- **iFrame & Editor**:
  - Trình biên soạn bài viết (Gutenberg hoặc Classic Editor) có thể chứa iFrame hoặc các element dạng shadow DOM. Cần dùng đúng locator selector.