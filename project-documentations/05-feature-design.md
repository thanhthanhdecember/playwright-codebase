# Thiết kế Custom Fixtures cho Playwright

## 1. Định hướng
Mở rộng đối tượng `test` mặc định của Playwright để tự động hóa việc khởi tạo trang, đăng nhập và xử lý trạng thái.

## 2. Các Fixtures cần xây dựng (`src/fixtures/custom-fixtures.ts`)

### `authenticatedPage`
- **Mục đích**: Bỏ qua bước đăng nhập UI cho từng test case bằng cách sử dụng lưu trữ trạng thái đăng nhập (`storageState`) hoặc đăng nhập sẵn trước khi vào test.
- **Cách dùng**: Giúp kịch bản test chạy nhanh hơn.

### `dashboardPage`
- **Mục đích**: Tự động khởi tạo instance của `DashboardPage` đã qua đăng nhập.

### `postListPage`
- **Mục đích**: Khởi tạo instance `PostListPage` và di chuyển thẳng tới trang quản lý bài viết.

### `cleanUpPost`
- **Mục đích**: Fixture dạng auto-cleanup, nhận danh sách `postId` được tạo trong quá trình test và tự động xóa sau khi test kết thúc.