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
## Layout 

- Dựng layout từ trang dashboard dùng trong ***/dashboard***
- Gồm có 2 chế độ: ***mobile, Pc***
- Tìm hiểu chính về các Components lớn: **tobar, sidebar, mobileSidebar, updateProModel.**

```ts
import { UpgradeProModel } from "@/components/dashboard"
import { MobileSidebar, Sidebar } from "@/components/sidebar"
import Topbar from "@/components/topbar"
import { cn } from "@/lib/utils"

const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const isProPlan = false;
  const userLimitCount = 3;
  return (
    <div>
      <header><Topbar/></header>
      <main className={cn(
        "lg:bg-gray-950 lg:overflow-hidden lg:pl-80 lg:pr-7 lg:py-7 [&:has([is-navbar-minimal]:lg:pl-20)] "
      )}>
        <Sidebar 
        userLimitCount={userLimitCount}
        isProPlan={isProPlan}
        className={cn(
          "fixed left-0 z-20 w-80 [&:has([is-navbar-minimal])]:w-fit hidden",
          "lg:block"
        )}
        />
        <MobileSidebar 
        isProPlan={isProPlan}
        userLimitCount={userLimitCount}
        />
        <UpgradeProModel
        isProPlan={isProPlan}
        />
        <div className={cn(
          "bg-background h-[calc(100vh-56px)]",
          "lg:rounded-3xl lg:p-7"
        )}>
          {children}
        </div>
      </main>
    </div>
    
  )
}
export default DashboardLayout
```

> **tobar**
  - Xây dựng thanh Tobar header gồm các thành phần: Logo, nút menu
  - Đặc điểm  hiện khi chế độ không full màn
  ```ts
  const Topbar = () => {
    const {handleOpenOrClose} = useSidebarStore()
    return (
        <div className={cn(
            "flex items-center p-4 justify-between sticky top-0",
            "lg:hidden",  
        )}>
            <Logo/>
            <Button
            variant="ghost"
            size="icon"
            onClick={handleOpenOrClose}
            >
                <Menu/>
            </Button>
        </div>
    )
  }
  ```

> **sidebar**
- Khi sử dụng ***isMinimal*** từ store cho mình giá trị đóng mở thanh sidebar ở dạng thu gọn 
- Sử dụng components ***Navbar*** sẽ được giải thích chi tiết ở sau nhưng nó tạo các đường dẫn chủ yếu đến các routes
- Dùng ***user*** để hiển thị users trên Sidebar với sự giúp sức của ***Clerk***
-  Tạo thánh ***Progress*** custom lại thư viện thêm tính chất cho từng props
-  Tạo phần ***Dark mode*** sử dụng thư viện shand ui theo hướng dẫn trên doc
```ts
"use client";

import { UserButton, useUser } from "@clerk/nextjs";

import { cn } from "@/lib/utils";
import Logo from "@/components/logo";
import { useSidebarStore } from "@/stores/sidebar-store";
import { Progress } from "@/components/ui/progress";
import { MAX_FREE_COUNTS } from "@/constants";
import ThemeToggle from "./theme-toggle";
import SidebarToggle from "./sidebar-toggle";
import Navbar from "./navbar";
import SubscriptionButton from "../subscription-btn";

export interface SidebarProps {
  className?: string;
  isProPlan?: boolean;
  userLimitCount: number;
}

const Sidebar: React.FC<SidebarProps> = ({ className, isProPlan, userLimitCount }) => {
  const { isMinimal } = useSidebarStore();
  const { user } = useUser();

  return (
    <div className={cn(
      "text-white",
      className
    )}>
      <div className="h-20 pl-7 pr-6">
        <div className="flex items-center justify-between w-full">
          {
            !isMinimal &&
            <Logo />
          }
          <SidebarToggle />
        </div>
      </div>
      <div className="grow overflow-y-auto scroll-smooth scrollbar-none">
        <Navbar />
      </div>
      <div className={cn(
        "fixed bottom-8 left-1 right-4",
        "lg:left-1 lg:right-auto",
        !isMinimal && "lg:left-2"
      )}>
        <div className="mb-4 p-4 rounded-lg bg-gray-900">
          <div className="mb-4 flex items-center">
            <UserButton afterSignOutUrl="/" />
            {
              !isMinimal &&
              <span className="text-sm ml-4">
                {user?.emailAddresses?.[0]?.emailAddress}
              </span>
            }
          </div>
          {
            !isMinimal &&
            <div className="border-t border-t-gray-950 pt-2">
              {
                !isProPlan &&
                <div className="mb-4">
                  <div className="text-center mb-2 text-muted-foreground font-semibold">
                    {userLimitCount}/{MAX_FREE_COUNTS} Free Generations
                  </div>
                  <Progress
                    value={(userLimitCount/MAX_FREE_COUNTS) * 100}
                    className="bg-gray-950 h-3"
                    indicatorClassName="gradient-btn"
                  />
                </div>
              }
              <SubscriptionButton isPro={isProPlan} />
            </div>
          }
        </div>
        <ThemeToggle />
      </div>
    </div>
  )
}

export default Sidebar;
```
> **Nabar**
- Hiện thị tất cả những đường dẫn của mình 
```ts
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

import { NAVIGATIONS } from "@/constants";
import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/stores/sidebar-store";

const Navigation = () => {
  const pathname = usePathname();
  const { isMinimal, handleClose } = useSidebarStore();

  return (
    <div className="px-4">
      {
        NAVIGATIONS.map(({ title, url, icon }, index) =>
          <div key={index} className="mb-2">
            <Link href={url} onClick={handleClose}>
              <div
                className={cn(
                  "flex items-center py-1 rounded-lg px-5 opacity-70",
                  "hover:opacity-100",
                  isMinimal && "px-1",
                  pathname.includes(url) && "transition-colors bg-gradient-to-l from-slate-800 to-slate-900 shadow-[inset_0px_0.0625rem_0_rgba(255,255,255,0.05),0_0.25rem_0.5rem_0_rgba(0,0,0,0.1)] opacity-100"
                )}
              >
                <div className="flex items-center p-2">
                  <div>
                    <Image width={24} height={24} src={icon} alt={title} />
                  </div>
                  {
                    !isMinimal &&
                    <span className="ml-4 text-sm">{title}</span>
                  }
                </div>
              </div>
            </Link>
          </div>
        )}
    </div>
  )
}

export default Navigation;
```

> Cách customs lại tất cả các giá trị của ui thêm props hay thêm các giá trị không có sẵn:
- tạo prop mới từ cách kế thừa ***React.ComponentPropsWithoutRef*** sẽ thêm được thuôc tính mới vào những gì muốn điều chỉnh trong ui
```ts
interface ProgressProps extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  indicatorClassName?: string;
}


const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, value,indicatorClassName, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className={cn(
      "h-full w-full flex-1 bg-primary transition-all",
      indicatorClassName 
      )}
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
```
- Khi sử dụng Components sẽ có những giá trị đươc thêm props sẽ sử dụng được :
```ts
<Progress
    value={(userLimitCount/MAX_FREE_COUNTS) * 100}
    className="bg-gray-950 h-3"
    indicatorClassName="gradient-btn"
/>
```

> **stores**
- **sidebar-store.tsx**:
```ts
import {create} from "zustand"

export interface SidebarState {
    isOpen: boolean;
    isMinimal: boolean;
    handleOpenOrClose: () => void;
    handleClose: () => void;
    handleChangeSidebar: () => void;

}

export const useSidebarStore = create<SidebarState>((set) => ({
    isOpen: false,
    isMinimal: false,
    handleOpenOrClose: () => set((state) => ({...state, isOpen: !state.isOpen})),
    handleClose: () => set((state) => ({...state, isOpen: false})),
    handleChangeSidebar: () => set((state) => ({...state, isMinimal: !state.isMinimal}))
}))
```

- Phần này tạo một hook React tùy chỉnh có tên là useSidebarStore bằng cách sử dụng hàm create của Zustand. Nó nhận một hàm callback làm đối số, trong đó có một hàm set. Bên trong hàm callback này:
  - Một đối tượng trạng thái ban đầu được xác định với isOpen và isMinimal được thiết lập là false.
  - Ba hàm được xác định (handleOpenOrClose, handleClose, handleChangeSidebar) để điều chỉnh trạng thái bằng cách sử dụng hàm set. Các hàm này chuyển đổi các thuộc tính isOpen và isMinimal của đối tượng trạng thái.

- **pro-store.ts**:
  
```ts
import { create } from "zustand";

export interface ProState {
    isOpen: boolean;
    handleOpenOrCloseProModal: () => void;
    handleCloseProModal: () => void;
}

export const useProState = create<ProState>()((set) => ({
    isOpen:false,
    handleOpenOrCloseProModal: () => set((state) => ({...state, isOpen:!state.isOpen})),
    handleCloseProModal:() => set((state) => ({...state, isOpen:false}))
}))
```
- Stores này có những chức năng cơ bản để thay đổi trạng thái cuả những giá trị như isOpen, isMinimal 

