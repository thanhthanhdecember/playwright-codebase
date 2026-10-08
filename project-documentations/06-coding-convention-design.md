// Các coding convention dùng trong dự án
# Quy chuẩn Lập trình (Coding Convention)

## 1. Bảng quy tắc đặt tên (Naming Conventions)
- **Folder / File**: Dùng `kebab-case` (Ví dụ: `post-list.page.ts`, `01-website-feature.md`[cite: 2]).
- **Class / Interface / Type**: Dùng `PascalCase` (Ví dụ: `DashboardPage`, `PostData`).
- **Variable / Function / Method**: Dùng `camelCase` (Ví dụ: `getUserName()`, `postTitle`).
- **Constant**: Dùng `UPPER_SNAKE_CASE` (Ví dụ: `MAX_TIMEOUT`, `BASE_URL`).

## 2. Chiến lược Chọn Element Locators (Locator Strategy)
- Ưu tiên theo thứ tự của Playwright:
  1. `page.getByRole()`
  2. `page.getByLabel()`
  3. `page.getByText()`
  4. Attribute cố định: `page.locator('#wp-submit')` hoặc `[data-testid="..."]`.
- Hạn chế tối đa sử dụng XPath tuyệt đối hoặc CSS Selector phụ thuộc quá nhiều vào tầng HTML cha-con dễ thay đổi.

## 3. Quản lý Bất đồng bộ & Assertions
- Bắt buộc dùng `await` cho tất cả các thao tác tương tác hoặc chờ đợi.
- Sử dụng **Web-First Assertions** (`await expect(locator).toBeVisible()`) thay vì lấy giá trị rồi dùng `expect(boolean)`.
- Không sử dụng `page.waitForTimeout()` cứng, luôn chờ theo trạng thái cụ thể của element hoặc mạng.