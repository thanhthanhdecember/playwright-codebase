# Thiết kế các Utility Modules (Utils)

## 1. `api.helper.ts` (`src/utils/api.helper.ts`)
- **Mục đích**: Gọi trực tiếp REST API của WordPress để chuẩn bị dữ liệu (Pre-condition) hoặc dọn dẹp dữ liệu (Clean-up) mà không cần thao tác trên UI.
- **Hàm chính**:
  - `createPostViaAPI(postData)`
  - `deletePostViaAPI(postId)`
  - `getAuthToken()`

## 2. `data-generator.util.ts` (`src/utils/data-generator.util.ts`)
- **Mục đích**: Sinh dữ liệu ngẫu nhiên sử dụng thư viện `@faker-js/faker`.
- **Hàm chính**:
  - `generatePostData()` (trả về title, content, status)
  - `generateUserData()`

## 3. `wait.util.ts` (`src/utils/wait.util.ts`)
- **Mục đích**: Đóng gói các phương thức chờ đặc thù cho các thành phần bất đồng bộ trên trang WordPress Admin.
- **Hàm chính**:
  - `waitForToastMessage()`
  - `waitForSpinnerToDisappear()`