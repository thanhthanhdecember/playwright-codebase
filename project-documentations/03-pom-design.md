# Thiết kế Page Object Model (POM)

## 1. Nguyên tắc thiết kế
- Tất cả các trang kế thừa từ `BasePage`.
- Mỗi trang chứa các Locator riêng biệt và các phương thức thực thi hành động (Actions).
- Sử dụng chaining method hoặc async/await rõ ràng.

## 2. Danh sách các Class POM chính

### `BasePage` (`src/pages/base.page.ts`)
- Quản lý các element chung: Sidebar menu (Posts, Media, Pages, Comments, Users,...), Top Navigation bar.
- Các hàm chung: `goto()`, `waitForPageLoad()`, `logout()`.

### `LoginPage` (`src/pages/login.page.ts`)
- **Locators**: `#user_login`, `#user_pass`, `#wp-submit`, `#login_error`.
- **Actions**: `login(username, password)`.

### `DashboardPage` (`src/pages/dashboard.page.ts`)
- **Locators**: Heading Dashboard, Widget 'At a Glance', Widget 'Activity', Danh sách 'Recent Comments'.
- **Actions**: `getPublishedPostsCount()`, `getRecentComments()`.

### `PostListPage` (`src/pages/posts/post-list.page.ts`)
- **Locators**: Nút 'Add New', Bảng bài viết, Thanh tìm kiếm bài viết, Filter theo ngày/chuyên mục.
- **Actions**: `createNewPost()`, `searchPost(title)`, `deletePost(title)`.

### `CommentsPage` (`src/pages/comments.page.ts`)
- **Locators**: Bảng danh sách comment, các tab trạng thái (All, Pending, Approved, Spam, Trash).
- **Actions**: `approveComment(commentId)`, `markAsSpam(commentId)`.