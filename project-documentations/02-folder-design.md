# Cấu trúc Tổ chức Folder Dự án (Playwright + TypeScript)

```
playwright-wordpress-tests/
├── .github/
│   └── workflows/
│       └── playwright.yml                  # CI/CD Workflows (GitHub Actions)
├── node_modules/                   
├── project-documentations/   # Tài liệu phân tích & thiết kế dự án
│   ├── 01-website-feature.md
│   ├── 02-folder-design.md
│   ├── 03-pom-design.md
│   ├── 04-utils-design.md
│   ├── 05-fixture-design.md
│   └── 06-coding-convention-design.md
├── src/
│   ├── constants/            # Định nghĩa hằng số, message lỗi, đường dẫn API
│   ├── fixtures/             # Custom Playwright Fixtures
│   ├── pages/                # Page Object Model (POM) Classes
│   │   ├── base.page.ts
│   │   ├── login.page.ts
│   │   ├── dashboard.page.ts
│   │   ├── posts/
│   │   │   ├── post-list.page.ts
│   │   │   └── create-post.page.ts
│   │   └── comments.page.ts
│   ├── utils/                # Các tiện ích hỗ trợ (API Helper, Database, Data Generator)
│   └── types/                # TypeScript Interfaces & Types
├── tests/                      # Thư mục chứa các tệp kịch bản test
│   ├── config/                 # Cấu hình môi trường (dev, staging, prod)
│   │   ├── .env
│   ├── fixtures/               # Custom Playwright Fixtures
│   │   ├── fixtures
│   ├── pages/
│   │   ├── LoginPage.ts

│   ├── auth/
│   ├── dashboard/
│   └── posts/



 
├── .gitignore
├── package.json
├── package-lock.json         
├── playwright.config.ts      # File cấu hình chính của Playwright
└── README.md
```