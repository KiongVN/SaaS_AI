# SaaS AI
>Build một Project SaaS AI với Next.js 13, React, Tailwind, Prisma, Stripe | Full Tutorial 2023
>
> Project được clone theo youtuer  [*Dev Xịn Đây*](https://www.youtube.com/watch?v=X8Qd7SMbfaQ&t=7466s)



## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [Shadcn/ui](https://ui.shadcn.com/docs/installation/next) - Beautifully designed components that you can copy and paste into your apps. Accessible. Customizable.

## Setup Project 
> Tạo cấu trúc trang tạo các *routes* trong **App** thư mục.
- Auth
  - Sign-in
  - Sign-up
- Dashboard
  - Audio
  - Code
  - Conversation
  - Video
  - Dashboard
- landing

> Mỗi mục gồm các thư mục:
- layout.tsx
- error.tsx
- page.tsx

> **Tạo Auth:**
>  Liên kết với thư viện **Clerk**:
- [**Clerk**](https://clerk.com/): Cần nhiều hơn chỉ là một hộp đăng nhập? Clerk là một bộ hoàn chỉnh gồm các giao diện người dùng có thể nhúng, API linh hoạt và bảng thông tin quản trị viên để xác thực và quản lý người dùng của bạn.
- Đăng nhập để cấu tạo thư mục: Quản lý các tài khoản 
- Hướng dẫn tạo [Auth](https://clerk.com/docs/quickstarts/nextjs) 
- Bổ sung tạo Auth: [.evn](https://clerk.com/docs/references/nextjs/custom-signup-signin-pages)

> **fix** *warning tailwin với vscode*:
```json
    {
        "files.associations": {
        "*.css": "tailwindcss"
        },
        "css.customData": [".vscode/css_custom_data.json"],
        "scss.lint.unknownAtRules": "ignore",
        "css.lint.unknownAtRules": "ignore",
        "spellright.language": [
        "en"
        ],
        "spellright.documentTypes": [
        "latex",
        "plaintext"
        ]   
    }

```