# TASK-001 — Khảo sát repository và lập kế hoạch nền tảng GYMOS

Tạo/cập nhật: 21/11/2026 | Trạng thái: CLOSED (COMPLETED) — Đã nghiệm thu chính thức nền tảng F01 theo Kế hoạch P3.

## 1. Yêu cầu và nghiệm thu

- Mục tiêu: Biết chính xác hiện trạng repo, cấu trúc tài nguyên, runtime máy; thống nhất quyết định kỹ thuật và lập kế hoạch P3 cho nền tảng F01 tối giản, hoạt động được theo nguyên tắc Latest Stable Compatible.
- Phạm vi: Khảo sát read-only tài liệu, môi trường và cấu hình agent; kiểm chứng trực tiếp các công cụ máy đã cài đặt; lập kế hoạch P3 chi tiết và kiểm chứng registry. Không scaffold, không sửa code, không thêm dependency, không migration, không commit/push/deploy khi chưa có phê duyệt.
- Nguồn: `gymos.md` §3, §4.1, §7, §8.4, §9.1; `AGENT_RULES.md` A §2–5, 7, 9–11; `FEATURE_BACKLOG.md` F01; Yêu cầu người dùng ngày 19/11/2026 (P3 Latest Stable Compatible & Xác minh môi trường).
- Nghiệm thu: Kế hoạch P3 chi tiết bao phủ đầy đủ bảng phiên bản kiểm chứng từ npm registry, bảo toàn lịch sử P1 và P2, chi tiết 6 nhóm nội dung (phiên bản, môi trường, phạm vi F01, kiểm thử, danh sách file, thao tác cần duyệt riêng). Đã xác minh trực tiếp toàn bộ runtime và công cụ máy qua CLI.

## 2. Khảo sát — Coder điền

| Hạng mục | Kết luận đã kiểm chứng | Bằng chứng/đường dẫn | Tái sử dụng/giới hạn |
|---|---|---|---|
| Repo/Git, tình trạng thay đổi và tài liệu hiện có | Thư mục `gymos` hoàn toàn trống mã nguồn, chỉ có 11 file Markdown tài liệu. Chưa khởi tạo Git repo (`.git` không tồn tại). | Lệnh `git status` -> `fatal: not a git repository`. Lệnh `Get-ChildItem -Recurse` -> Chỉ có docs, gymos.md, mindmap.md, AGENT_RULES.md. | Giữ nguyên toàn bộ 11 file tài liệu hiện có; không có xung đột mã nguồn. |
| Package manifests, lockfile, runtime, stack | Chưa có manifest/lockfile trong repo (`package.json`, `pnpm-workspace.yaml`, `turbo.json`).<br>**Runtime máy đã xác minh 100%:**<br>- OS: Windows 10 Pro 22H2 (Build 19045.7846)<br>- fnm: `1.39.0`, current `v24.22.3`<br>- Node.js: `v24.22.3` LTS (Krypton)<br>- npm: `11.19.1`<br>- pnpm: `12.21.0`<br>- Git: `2.52.0.windows.1` | Lệnh terminal trực tiếp:<br>`(Get-CimInstance Win32_OperatingSystem).Caption`<br>`fnm --version` & `fnm current`<br>`node --version`<br>`npm --version` & `pnpm --version`<br>`git --version` | Đã kiểm chứng: fnm tự động nạp multishells, pnpm và node chạy trực tiếp trong terminal mới không gặp lỗi ExecutionPolicy. Không cần cài đặt lại các công cụ này. |
| Source, entrypoint, DB/config, môi trường | Chưa có thư mục source (`apps/`, `packages/`, `src/`).<br>**Container & Môi trường đã xác minh 100%:**<br>- WSL2: `3.0.5.0`, Default Version `2`, Distro `docker-desktop`<br>- Docker Desktop: `4.99.0`<br>- Docker Engine: `29.9.3`<br>- Docker Compose: `v5.7.0`<br>- Docker daemon: hoạt động tốt, context `desktop-linux`, `docker ps -a` chạy thành công. | Lệnh terminal trực tiếp:<br>`wsl --version` & `wsl --status`<br>`docker version`<br>`docker info`<br>`docker compose version`<br>`docker ps -a` | Đã sẵn sàng khởi chạy container PostgreSQL 17 qua `docker-compose.yml` khi được duyệt. Không cần cấu hình lại WSL2/Docker. |
| Mobile runtime (Expo Go) | Expo Go trên điện thoại đã xác minh: Client version `57.0.9`, Supported SDKs: `57`. Hoàn toàn tương thích Expo SDK 57 (`expo@~57.0.33`, React 19.2.3, RN 0.86.3). | Đã xác minh qua ảnh chụp màn hình Settings trên điện thoại của người dùng. | Sẵn sàng chạy app trên điện thoại thật bằng Expo Go mà không cần build riêng. |
| Component/design system/naming, test có sẵn | Trong repo có 0 component, 0 test, 0 file code. Design system định hướng theo gymos.md §7: Modern Minimalist Fitness, Energetic Orange (`#F97316`), Be Vietnam Pro. Naming: Tiếng Anh cho code, BEM cho CSS tự viết, comment tiếng Việt. | gymos.md §7; AGENT_RULES.md A §6. | Đã chốt UI stack P3: Web (Vite 8 + React 19 + Tailwind 3.4 + Radix + Lucide), Mobile (Expo SDK 57 + RN 0.86 + React 19 + NativeWind 4.2.7 + Tailwind 3.4). |
| MCP/skills/workflows và cách nạp rules | MCP: `figma_figma` (user `vquyen`), `playwright`, `supabase` (project `gym-workout`, schema SaaS cũ không dùng). Skills: 12 Figma skills, `agy-customizations`, `antigravity-guide`... Rules: Antigravity nạp qua `GEMINI.md`, `AGENTS.md`, `.agents/rules/*.md`. | `C:\Users\HI\.gemini\antigravity\builtin\skills\agy-customizations\SKILL.md`; MCP `whoami`. | Chốt tạo `.agents/rules/coder_rules.md` để tự động nạp luật Coder. |
| Lệnh build/lint/typecheck/test/run/UI | Các công cụ nền tảng (`node`, `pnpm`, `docker`) đã sẵn sàng. Các lệnh npm/pnpm script sẽ được cấu hình chuẩn trong `package.json` gốc khi triển khai F01. | Terminal đã chạy tốt `pnpm --version` trực tiếp. | Không cần thay đổi ExecutionPolicy hệ thống. |
| Khả năng tích hợp và điều kiện môi trường thật | SMS: Cần adapter interface `SmsService`, local dùng `MockSmsService`. Ngân hàng: Cần `BankPaymentAdapter`, local dùng mock VietQR. Thiết bị nhận diện: Cần `DoorAccessDeviceAdapter`, local dùng HTTP mock webhook. | gymos.md §3.6, §3.7; Chưa chọn vendor cụ thể theo OPEN_QUESTIONS OQ-08, 09, 10. | Không kết nối vendor thật khi chưa duyệt. Thiết kế kiến trúc adapter độc lập vendor. |

## 3. Lịch sử kế hoạch

### 3.1. Kế hoạch P1 (Lịch sử — Đã chuyển Advisor và Người dùng xem xét)
- Khảo sát hiện trạng repo trống, đề xuất khởi tạo monorepo với Turborepo, NestJS, React+Vite, Expo.
- Tạo câu hỏi Q01-Q04 gửi Advisor. Đã được giải quyết toàn bộ vào ngày 19/11/2026.

### 3.2. Kế hoạch P2 (Lịch sử — Đã tiếp nhận các quyết định định hướng ban đầu)
- Đề xuất: Node 24 LTS, pnpm 9, Docker Compose PostgreSQL 17, Tailwind/NativeWind, F01 tối giản.
- Phản hồi từ người dùng: Nâng cấp thành Kế hoạch P3 theo nguyên tắc **Latest Stable Compatible** (kiểm chứng từ npm registry, không dùng bản cũ nếu không có lý do kỹ thuật, không dùng alpha/beta/RC, rà soát Node 24 LTS, pnpm, Turborepo, NestJS, Prisma 7, Vite 8, React 19, Expo SDK 57, NativeWind 4.2.7, Tailwind 3.4 cho Mobile, PostgreSQL 17).

---

### 3.3. Kế hoạch P3 — Latest Stable Compatible (Chờ duyệt)

Kế hoạch P3 tuân thủ triệt để nguyên tắc **Latest Stable Compatible**: Ưu tiên phiên bản ổn định mới nhất có khả năng tương thích; không dùng alpha, beta, preview, RC hoặc canary; không dùng bản cũ nếu không có lý do kỹ thuật rõ ràng; kiểm chứng bằng tài liệu chính thức, engines và peerDependencies từ npm registry.

#### A. Bảng rà soát và kiểm chứng phiên bản (npm registry - 19/11/2026)

| Ứng viên / Thành phần | Phiên bản kiểm chứng | Trạng thái | Lý do kỹ thuật / Ghi chú tương thích |
|---|---|---|---|
| **Node.js** | `v24.22.3` (LTS Krypton) | **Đạt chuẩn Stable** | Bản Active LTS ổn định nhất của Node 24 (từ nodejs.org index.json). Không dùng Node 25. Đã cài và xác minh trên máy. |
| **pnpm** | `12.21.0` | **Đạt chuẩn Stable** | `dist-tags.latest` trên npm; engines `node: >=18`. Quản lý strict workspaces tối ưu cho monorepo. Đã cài và xác minh trên máy. |
| **Turborepo** | `2.11.13` | **Đạt chuẩn Stable** | `dist-tags.latest` trên npm; engines `node: >=18`. Hỗ trợ pnpm workspaces v12 mượt mà. |
| **TypeScript** | `5.6.3` | **Đạt chuẩn Stable** | Tương thích hoàn hảo với NestJS 12, Vite 8 và Expo SDK 57. |
| **NestJS** | `@nestjs/core@12.5.1` | **Đạt chuẩn Stable** | `dist-tags.latest` trên npm; hỗ trợ Node 24 LTS và TypeScript 5.x. |
| **Prisma** | `@prisma/client@7.10.1`, `prisma@7.10.1` | **Đạt chuẩn Stable** | Bản stable mới nhất của dòng Prisma 7. Bản Prisma 8 hiện là `8.0.0-rc.34` (bị loại vì là RC theo nguyên tắc). |
| **Vite (Web)** | `8.3.8` | **Đạt chuẩn Stable** | `dist-tags.latest` trên npm (Vite 8 stable mới nhất). Bundler siêu nhanh cho SPA. |
| **React (Web)** | `19.3.1` | **Đạt chuẩn Stable** | `dist-tags.latest` trên npm. React 19 chính thức cho Website. |
| **Radix UI Slot (Web)** | `@radix-ui/react-slot@1.1.2` | **Đạt chuẩn Stable** | peerDependencies: `react: '^16.8 || ^17.0 || ^18.0 || ^19.0'`. Tương thích 100% React 19. |
| **Tailwind CSS (Web)** | `3.4.17` | **Đạt chuẩn Stable** | Đồng bộ theme token với Mobile và NativeWind; hỗ trợ đầy đủ class tiện ích và BEM. |
| **Lucide React (Web)** | `1.75.0` | **Đạt chuẩn Stable** | `dist-tags.latest` trên npm; hỗ trợ React 19. |
| **Expo SDK (Mobile)** | `expo@~57.0.33` (SDK 57) | **Đạt chuẩn Stable** | `dist-tags.sdk-57` trên npm. Template chính thức sử dụng `react@19.2.3` và `react-native@0.86.3`. |
| **React (Mobile)** | `19.2.3` | **Đạt chuẩn Stable** | Phiên bản React 19 được Expo SDK 57 template (`expo-template-blank@57.0.35`) ghim chính thức. |
| **React Native (Mobile)** | `0.86.3` | **Đạt chuẩn Stable** | Phiên bản React Native lõi đi kèm Expo SDK 57. |
| **NativeWind (Mobile)** | `4.2.7` | **Đạt chuẩn Stable** | `dist-tags.latest` trên npm; peerDependencies: `tailwindcss: >3.3.0`. |
| **Tailwind CSS (Mobile)** | `3.4.17` | **Đạt chuẩn Stable** | Phiên bản Tailwind v3 stable hoàn hảo nhất cho NativeWind v4 (không ép Web dùng chung nếu có nhu cầu khác). |
| **Lucide React Native (Mobile)**| `1.75.0` | **Đạt chuẩn Stable** | `dist-tags.latest` trên npm; đồng bộ icon set với Web. |
| **PostgreSQL** | `17-alpine` | **Đạt chuẩn Stable** | Docker container image chính thức của PostgreSQL 17. |

#### B. Môi trường phát triển và Quản lý phiên bản (Đã hoàn tất xác minh)
1. **Quản lý phiên bản Node.js với `fnm`:**
   - Đã cài đặt `fnm 1.39.0` qua WinGet (`C:\Users\HI\AppData\Local\Microsoft\WinGet\Links\fnm.exe`).
   - Đã cài đặt và kích hoạt Node.js `24.22.3` LTS.
   - fnm tự động quản lý qua multishells, `node` và `pnpm` nhận diện trực tiếp trong mọi terminal mới.
   - **Chỉ sử dụng duy nhất 1 file `.node-version`** chứa chuỗi `24.22.3` tại thư mục gốc.
2. **Cố định chính xác phiên bản trong `package.json`:**
   ```json
   "engines": {
     "node": "24.22.3",
     "pnpm": "12.21.0"
   },
   "packageManager": "pnpm@12.21.0"
   ```
3. **Chính sách thực thi (ExecutionPolicy):**
   - **Không thay đổi ExecutionPolicy toàn hệ thống**.
   - `pnpm` và `node` chạy trực tiếp bình thường trong PowerShell qua đường dẫn multishell của fnm.
4. **WSL2 + Docker Desktop:**
   - WSL `3.0.5.0` (Default Version 2) và Docker Desktop `4.99.0` (Engine `29.9.3`, Compose `v5.7.0`) đã sẵn sàng.
5. **Thứ tự chuẩn tạo cấu hình và khởi chạy Docker Compose:**
   - Bước 1: Tạo file cấu hình `docker-compose.yml` và file `.env` (copy từ `.env.example`).
   - Bước 2: Kiểm tra Docker daemon đang chạy (`docker info`).
   - Bước 3: Khởi chạy container: `docker compose up -d`.
   - Bước 4: Chờ PostgreSQL sẵn sàng (`docker compose exec postgres pg_isready -U postgres`).
6. **Bảo vệ Secrets & Volume lưu trữ:**
   - Dữ liệu PostgreSQL lưu tại named volume:
     ```yaml
     volumes:
       postgres_data:
         driver: local
     ```
   - Secrets: `.env` chứa thông tin dev cục bộ được đưa vào `.gitignore`. File `.env.example` cung cấp mẫu không lộ mật khẩu thật.
   - Không đưa mật khẩu/token vào logs, docs hay git.

#### C. Phạm vi F01 Tối giản & Quy chuẩn triển khai
- **Cấu trúc Monorepo:** `apps/api`, `apps/web`, `apps/mobile`, `packages/design-tokens`, `packages/shared-types`.
- **Nguyên tắc KISS & Tránh Overengineering:**
  - Tuyệt đối không tạo các model nghiệp vụ `members`, `branches`, `payments` hay logic của F02–F15.
  - Tuyệt đối không tạo dữ liệu giả lập chi nhánh/hội viên; không tạo abstraction/utility/adapter chưa sử dụng.
  - Không tạo hoặc chạy migration cho các bảng nghiệp vụ.
- **Health Check kiểm tra PostgreSQL thực tế:**
  - `HealthController` gọi Prisma execute truy vấn ping `SELECT 1`:
    * Khi database hoạt động bình thường: Trả về HTTP 200 OK `{ "success": true, "data": { "status": "ok", "timestamp": "...", "database": "connected" } }`.
    * Khi mất kết nối database: Bắt ngoại lệ và trả về HTTP 503 Service Unavailable `{ "success": false, "data": { "status": "degraded", "database": "disconnected", "error": "Database connection failed" } }`.

#### D. Cấu trúc Monorepo chi tiết

```text
gymos/
├── .agents/
│   └── rules/
│       └── coder_rules.md              # Bộ luật Coder tự động nạp (đồng bộ CODER_RULES.md)
├── apps/
│   ├── api/                            # NestJS 12.5.1 Backend
│   │   ├── prisma/
│   │   │   └── schema.prisma           # Prisma 7.10.1 schema (public schema, Prisma client)
│   │   ├── src/
│   │   │   ├── modules/
│   │   │   │   └── health/             # Module Health Check duy nhất cho F01
│   │   │   │       ├── health.controller.ts     # Ping DB thật (200 / 503)
│   │   │   │       ├── health.controller.spec.ts# Unit test cho health check
│   │   │   │       └── health.module.ts
│   │   │   ├── prisma/
│   │   │   │   └── prisma.service.ts   # Prisma client singleton service
│   │   │   ├── app.module.ts
│   │   │   └── main.ts
│   │   ├── .env.example
│   │   ├── nest-cli.json
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── vitest.config.ts
│   ├── web/                            # React 19.3.1 + Vite 8.3.8 SPA
│   │   ├── src/
│   │   │   ├── components/             # Layout khung cơ bản
│   │   │   │   ├── Header.tsx
│   │   │   │   └── Sidebar.tsx
│   │   │   ├── styles/
│   │   │   │   └── index.css           # Tailwind directives + BEM base classes
│   │   │   ├── App.tsx                 # Màn hình chính gọi Health API và hiển thị theme
│   │   │   └── main.tsx
│   │   ├── index.html                  # Link nạp font Be Vietnam Pro
│   │   ├── package.json
│   │   ├── postcss.config.js
│   │   ├── tailwind.config.js          # Ánh xạ tokens từ packages/design-tokens
│   │   ├── tsconfig.json
│   │   └── vite.config.ts
│   └── mobile/                         # React Native 0.86.3 + Expo SDK 57 (React 19.2.3)
│       ├── src/
│       │   ├── navigation/
│       │   │   └── BottomTabNavigator.tsx # 5 tab placeholder theo gymos.md §5
│       │   ├── screens/                # 5 màn hình khung rỗng: Home, Plans, CheckIn, Branches, Profile
│       │   │   ├── HomeScreen.tsx
│       │   │   ├── PlansScreen.tsx
│       │   │   ├── CheckInScreen.tsx
│       │   │   ├── BranchesScreen.tsx
│       │   │   └── ProfileScreen.tsx
│       │   └── styles/
│       │       └── global.css          # NativeWind base
│       ├── app.json
│       ├── App.tsx
│       ├── babel.config.js             # Babel preset NativeWind
│       ├── global.d.ts                 # NativeWind type definitions
│       ├── metro.config.js             # Metro config NativeWind v4 cho Monorepo
│       ├── package.json
│       ├── tailwind.config.js          # Tailwind 3.4.17 config cho Mobile
│       └── tsconfig.json
├── packages/
│   ├── design-tokens/                  # Token màu sắc, spacing, typography dùng chung Web/Mobile
│   │   ├── src/
│   │   │   ├── colors.ts               # #F97316 (primary), #EA580C (secondary), neutrals
│   │   │   ├── spacing.ts              # 4-point spacing scale (4, 8, 12, 16, 24, 32...)
│   │   │   ├── typography.ts           # Be Vietnam Pro font tokens
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   └── shared-types/                   # Kiểu dữ liệu cơ sở tối thiểu cho F01
│       ├── src/
│       │   ├── api.ts                  # ApiResponse<T>, HealthCheckResponse
│       │   └── index.ts
│       ├── package.json
│       └── tsconfig.json
├── docker-compose.yml                  # PostgreSQL 17-alpine container + volume postgres_data
├── .env.example                        # Mẫu biến môi trường (PORT, DATABASE_URL)
├── .gitignore                          # Bỏ qua node_modules, .env, dist, .turbo, .expo, postgres_data
├── .node-version                       # 24.22.3 (duy nhất 1 file)
├── eslint.config.mjs                   # ESLint 9 flat config cơ sở
├── package.json                        # Root package manifest (engines, scripts, workspaces)
├── pnpm-workspace.yaml                 # packages: ['apps/*', 'packages/*']
├── tsconfig.base.json                  # Cấu hình TypeScript cơ sở toàn dự án
├── turbo.json                          # Pipelines: build, lint, typecheck, test, dev
└── README.md                           # Hướng dẫn chi tiết setup, docker, run, test
```

#### E. Danh sách toàn bộ file dự kiến tạo (Tổng cộng 48 files)
1. **Gốc & Quy tắc Agent (12 files):**
   - `.agents/rules/coder_rules.md`
   - `.gitignore`
   - `.env.example`
   - `.node-version`
   - `package.json`
   - `pnpm-workspace.yaml`
   - `turbo.json`
   - `tsconfig.base.json`
   - `eslint.config.mjs`
   - `docker-compose.yml`
   - `README.md`
   - `pnpm-lock.yaml` (sinh tự động qua pnpm install)
2. **Package `packages/design-tokens` (6 files):**
   - `packages/design-tokens/package.json`
   - `packages/design-tokens/tsconfig.json`
   - `packages/design-tokens/src/colors.ts`
   - `packages/design-tokens/src/spacing.ts`
   - `packages/design-tokens/src/typography.ts`
   - `packages/design-tokens/src/index.ts`
3. **Package `packages/shared-types` (4 files):**
   - `packages/shared-types/package.json`
   - `packages/shared-types/tsconfig.json`
   - `packages/shared-types/src/api.ts`
   - `packages/shared-types/src/index.ts`
4. **Backend `apps/api` (12 files):**
   - `apps/api/package.json`
   - `apps/api/tsconfig.json`
   - `apps/api/nest-cli.json`
   - `apps/api/.env.example`
   - `apps/api/vitest.config.ts`
   - `apps/api/prisma/schema.prisma`
   - `apps/api/src/prisma/prisma.service.ts`
   - `apps/api/src/modules/health/health.controller.ts`
   - `apps/api/src/modules/health/health.controller.spec.ts`
   - `apps/api/src/modules/health/health.module.ts`
   - `apps/api/src/app.module.ts`
   - `apps/api/src/main.ts`
5. **Web `apps/web` (11 files):**
   - `apps/web/package.json`
   - `apps/web/tsconfig.json`
   - `apps/web/vite.config.ts`
   - `apps/web/postcss.config.js`
   - `apps/web/tailwind.config.js`
   - `apps/web/index.html`
   - `apps/web/src/styles/index.css`
   - `apps/web/src/components/Header.tsx`
   - `apps/web/src/components/Sidebar.tsx`
   - `apps/web/src/App.tsx`
   - `apps/web/src/main.tsx`
6. **Mobile `apps/mobile` (13 files):**
   - `apps/mobile/package.json`
   - `apps/mobile/tsconfig.json`
   - `apps/mobile/app.json`
   - `apps/mobile/metro.config.js`
   - `apps/mobile/babel.config.js`
   - `apps/mobile/global.d.ts`
   - `apps/mobile/tailwind.config.js`
   - `apps/mobile/src/styles/global.css`
   - `apps/mobile/src/navigation/BottomTabNavigator.tsx`
   - `apps/mobile/src/screens/HomeScreen.tsx` (và 4 screens rỗng Plans, CheckIn, Branches, Profile)
   - `apps/mobile/App.tsx`

#### F. Kế hoạch Kiểm thử toàn diện
1. **Kiểm tra mã nguồn tự động:**
   - `pnpm run build`: Turborepo build tuần tự toàn bộ monorepo (exit code 0).
   - `pnpm run lint`: ESLint 9 kiểm tra mã nguồn (exit code 0).
   - `pnpm run typecheck`: TypeScript compiler `tsc --noEmit` toàn monorepo (0 errors).
   - `pnpm run test`: Chạy Vitest unit test kiểm tra HealthController.
2. **Kiểm tra Health API thực tế (DB Online & Offline):**
   - *Kịch bản Online:* Container PostgreSQL đang chạy -> gửi `curl http://localhost:3000/api/v1/health` -> Nhận HTTP 200 `{ success: true, data: { status: "ok", database: "connected" } }`.
   - *Kịch bản Offline:* Tạm dừng container (`docker compose stop postgres`) -> gửi `curl http://localhost:3000/api/v1/health` -> Nhận HTTP 503 `{ success: false, data: { status: "degraded", database: "disconnected" } }`.
   - *Khôi phục:* Chạy lại `docker compose start postgres` -> API tự động kết nối lại trả 200.
3. **Kiểm tra Website bằng Playwright MCP:**
   - Điều hướng browser tới `http://localhost:5173`.
   - Chụp ảnh màn hình (`browser_take_screenshot`) và kiểm tra DOM (`browser_snapshot`):
     * Xác minh font Be Vietnam Pro thực sự được áp dụng trên CSS computed style của phần tử body/heading.
     * Xác minh theme token màu cam `#F97316` hiển thị chuẩn xác trên Card và Button.
     * Xác minh widget hiển thị trạng thái kết nối Backend API.
4. **Kiểm tra Mobile trên thiết bị hoặc trình giả lập (không chỉ Metro bundler):**
   - Khởi chạy Expo Dev Server: `pnpm --filter mobile run start`.
   - Kết nối mở ứng dụng trên thiết bị thật qua Expo Go (hoặc Android Emulator / Expo web preview).
   - Xác minh giao diện ứng dụng hiển thị đầy đủ thanh điều hướng 5 tab (Trang chủ, Gói tập, Check-in, Chi nhánh, Cá nhân) với màu cam `#F97316` và các icon Lucide tương ứng.
5. **Kiểm tra cơ chế tự động nạp Agent Rules:**
   - Xác minh file `.agents/rules/coder_rules.md` tồn tại tại đúng đường dẫn discovery của Antigravity và được nạp vào context.

#### G. Phân tích ảnh hưởng đến khả năng mở rộng và bảo trì
- **Tối ưu tốc độ CI/CD:** Cấu trúc Turborepo giúp tận dụng local và remote cache, các lần build sau chỉ biên dịch phần code có thay đổi.
- **Không vướng nợ kỹ thuật (Zero Technical Debt):** Bằng cách giữ F01 hoàn toàn tối giản, không dựng trước các bảng hay logic nghiệp vụ chưa được duyệt, dự án tránh được việc phải refactor hoặc xóa bỏ mã nguồn thừa khi bước vào F02–F15.
- **Đồng bộ Design System:** `packages/design-tokens` làm nguồn sự thật duy nhất (Single Source of Truth) cho màu sắc, spacing và typography, đảm bảo khi đổi màu thương hiệu hoặc chỉnh góc bo sẽ tự động cập nhật đồng bộ cho cả Web và Mobile.

---

### 3.4. Danh mục thao tác kỹ thuật đã được Người dùng phê duyệt (19/11/2026)

Người dùng đã chính thức phê duyệt Kế hoạch P3 cùng 5 thao tác sau:
1. **Thao tác 1 — Khởi tạo Git repository:** Chạy lệnh `git init` tại thư mục gốc `gymos`.
2. **Thao tác 2 — Thiết lập cơ chế tự động nạp Agent Rules:** Tạo thư mục `.agents/rules/` và copy nội dung `CODER_RULES.md` sang `.agents/rules/coder_rules.md`.
3. **Thao tác 3 — Khởi tạo mã nguồn Monorepo trong phạm vi F01:** Tạo các file dự kiến cho F01 theo cấu trúc P3 (`apps/api`, `apps/web`, `apps/mobile`, `packages/design-tokens`, `packages/shared-types`...).
4. **Thao tác 4 — Khởi chạy PostgreSQL 17 bằng Docker Compose:** Sử dụng named volume `postgres_data` và chỉ mở cổng database trên localhost (`127.0.0.1:5432:5432`).
5. **Thao tác 5 — Cài đặt dependencies P3 và sinh Prisma Client:** Cài đặt các thư viện theo chuẩn Latest Stable Compatible và sinh Prisma Client (`prisma generate --allow-no-models`).

---

## 4. Trạng thái các câu hỏi Advisor

Toàn bộ câu hỏi kỹ thuật nền tảng F01 đã được người dùng và Advisor thống nhất giải quyết qua các nguyên tắc và bảng phiên bản kiểm chứng của P3. Hiện **không có câu hỏi bị chặn** cho F01. Các câu hỏi nghiệp vụ tiếp theo (OQ-03 trở đi) sẽ được phân tích khi bước vào feature tương ứng.

## 5. Nhật ký quyết định và phê duyệt

| ID/ngày | Nội dung | Phạm vi/P-version | Bằng chứng xác nhận |
|---|---|---|---|
| D-TASK001-01 / 19/11/2026 | Hoàn thành khảo sát thực tế repository và môi trường; lập kế hoạch P1 | Khảo sát TASK-001 | Báo cáo khảo sát mục 2, lệnh kiểm tra thực tế |
| D-TASK001-02 / 19/11/2026 | Người dùng chốt quyết định kỹ thuật sau thảo luận Advisor: Node 24 LTS, Docker Compose PostgreSQL 17, Tailwind/NativeWind UI stack, coder rules tự động nạp, F01 tối giản | Kế hoạch P2 (F01) | User request P2 |
| D-TASK001-03 / 19/11/2026 | Điều chỉnh kế hoạch P2 thành P3 theo nguyên tắc Latest Stable Compatible; kiểm chứng toàn bộ dependencies từ npm registry | Kế hoạch P3 (F01) | User request P3: "# TASK-001 — Điều chỉnh kế hoạch P2 thành P3" |
| D-TASK001-04 / 19/11/2026 | Người dùng hoàn tất cài đặt máy; Coder kiểm chứng 100% công cụ thực tế qua terminal (Win 10 22H2, fnm 1.39.0, Node 24.22.3 LTS, npm 11.19.1, pnpm 12.21.0, Git 2.52.0, WSL 3.0.5.0, Docker Desktop 4.99.0, Compose 5.7.0). Đánh dấu hoàn tất setup máy. | Môi trường dev (F01) | Lệnh terminal trực tiếp ngày 19/11/2026 |
| D-TASK001-05 / 19/11/2026 | Người dùng chính thức phê duyệt Kế hoạch P3 cùng 5 thao tác kỹ thuật và xác nhận Expo Go 57.0.9 (SDK 57) | Triển khai P3 (F01) | User request: "# TASK-001 — Phê duyệt triển khai P3" ngày 19/11/2026 |
| D-TASK001-06 / 19/11/2026 | Hoàn tất Thao tác 1 (git init), Thao tác 2 (.agents/rules/coder_rules.md), Thao tác 3 (Monorepo 48 files), Thao tác 4 (PostgreSQL 17 docker compose Up healthy & test query OK). Trình danh mục dependency bổ trợ cho Thao tác 5. | Triển khai P3 (F01) | Lệnh terminal trực tiếp ngày 19/11/2026 |
| D-TASK001-07 / 19/11/2026 | Người dùng phê duyệt và điều chỉnh phiên bản dependency Mobile theo bundledNativeModules.json của Expo SDK 57; hoàn tất cài đặt dependencies, sinh Prisma Client 7 và vượt qua 100% bài kiểm thử | Nghiệm thu kỹ thuật F01 | User request "# TASK-001 — Tiếp tục thực thi P3" và kết quả kiểm thử CLI/Playwright |
| D-TASK001-08 / 19/11/2026 | Hoàn thành rà soát mã nguồn, dependencies, quy chuẩn BEM/comment, kiểm tra Agent rules tự nạp qua discovery, và chuẩn bị initial commit sạch (loại bỏ generated client khỏi Git); cung cấp checklist kiểm tra Expo Go trên điện thoại thật | Chuẩn bị nghiệm thu F01 | User request "# TASK-001 — Kiểm tra cuối cùng trước khi nghiệm thu F01" |
| D-TASK001-09 / 19/11/2026 | Khảo sát lỗi Mobile Runtime (`Duplicate plugin/preset detected: react-native-worklets/plugin & react-native-reanimated/plugin`). Tái hiện thành công qua `expo export -p android -c`. Xác định nguyên nhân gốc rễ và đề xuất phương án tinh giản `babel.config.js` theo chuẩn NativeWind v4 (chờ người dùng duyệt trước khi sửa code). Ghi nhận `turbo@2.11.12` và `@expo/ngrok` toàn cục. | Khắc phục lỗi Mobile Runtime | User request "# TASK-001 — Khắc phục lỗi Mobile Runtime" |
| D-TASK001-10 / 19/11/2026 | Người dùng phê duyệt sửa `babel.config.js`. Coder thực thi loại bỏ mảng plugins dư thừa: Lỗi duplicate transformer biến mất hoàn toàn, 966 modules được transform thành công; build, lint, typecheck, test, expo-doctor (21/21), expo install --check đều đạt 100%. Phát hiện bước resolve module `react-native-css-interop` bị chặn do cấu trúc symlink cô lập của pnpm monorepo. | Khắc phục lỗi Mobile Runtime | User request "# TASK-001 — Phê duyệt khắc phục Mobile Runtime" |
| D-TASK001-11 / 19/11/2026 | Người dùng phê duyệt quy trình khắc phục Metro Module Resolution: Đơn giản hóa `metro.config.js` về chuẩn Expo SDK 57 + NativeWind 4.2.7 (không dùng ánh xạ thủ công `extraNodeModules`), liên kết `react-native-css-interop@0.2.7` trực tiếp vào `apps/mobile/package.json`. Xác minh 100% duy nhất 1 phiên bản runtime qua `pnpm list`. Android Bundling đạt 100% (3467 modules, 5.7MB Hermes bytecode). Toàn bộ kiểm thử monorepo đạt 100% xanh. | Khắc phục lỗi Metro Module Resolution | User request "# TASK-001 — Khắc phục lỗi Metro Module Resolution" |
| D-TASK001-12 / 19/11/2026 | Người dùng xác nhận ứng dụng chạy thành công trên điện thoại thật (5 tab hiển thị và tương tác mượt mà). Coder khảo sát và làm rõ cảnh báo kết nối HMR (`hmr.ts:312`) và kết quả exit code 1 của `pnpm peers check`; xác minh Light/Dark theme, font, màu sắc, icon, Safe Area; bổ sung quy ước Advisor hướng dẫn thao tác Git. Sẵn sàng đóng F01. | Nghiệm thu thực tế F01 | User request "# TASK-001 — Kiểm tra cuối cùng và chuẩn bị đóng F01" |
| D-TASK001-13 / 20/11/2026 | Tiếp nhận yêu cầu hoàn thiện từ Advisor: khảo sát TypeScript 6.0.3 cho API, chuẩn hóa peer dependencies (@react-native/metro-config@0.86.3 cho Mobile), lập phương án nền tảng Theme Mobile (Light/Dark/System) và làm rõ Expo HMR. Chờ Người dùng phê duyệt phương án tổng hợp trước khi sửa code. | Hoàn thiện nền tảng F01 | User request "# TASK-001 — Hoàn thiện nền tảng trước khi đóng F01" |
| D-TASK001-14 / 20/11/2026 | Người dùng phê duyệt triển khai Kế hoạch Hoàn thiện tổng hợp: Coder nâng TS API lên 6.0.3, cấu hình rootDir và ignoreDeprecations tương thích TS6; bổ sung @react-native/metro-config@0.86.3 đưa `pnpm peers check` về exit code 0; tích hợp @react-native-async-storage/async-storage@2.2.0; xây dựng ThemeContext quản lý 3 chế độ (System mặc định, Sáng, Tối); cấu hình dynamic StatusBar & Navigation Theme; đổi icon Check-in sang CalendarCheck; bổ sung bộ chọn Theme tại màn hình Cá nhân; chuyển cổng mặc định sang 3005 tránh xung đột Antigravity IDE; toàn bộ 10 bài test tự động đạt 100% xanh. | Nghiệm thu nền tảng F01 | User request "# TASK-001 — Phê duyệt hoàn thiện nền tảng F01" |
| D-TASK001-15 / 20/11/2026 | Người dùng và Advisor phê duyệt chuẩn hóa cấu hình TypeScript Backend sạch: Kế thừa tsconfig.base.json, sử dụng module/moduleResolution NodeNext, loại bỏ hoàn toàn baseUrl, ignoreDeprecations và cơ chế node10 deprecated; Backend biên dịch CommonJS hoàn hảo, bảo toàn decorators, Prisma Client và Vitest. Toàn bộ chuỗi kiểm thử không cache (Typecheck --force, Build --force, Lint, Unit Test, Health API :3005) đạt 100% xanh. | Chuẩn hóa TS Backend | User request "Advisor đồng ý với định hướng loại bỏ compiler options deprecated" |
| D-TASK001-16 / 21/11/2026 | Người dùng và Advisor nghiệm thu chính thức Mobile trên điện thoại thật (12/12 tiêu chí thành công) và xác minh Website tích hợp Backend tại cổng 3005 qua Playwright MCP; toàn bộ tiêu chí F01 đạt 100%. Đóng TASK-001, đánh dấu F01 COMPLETED, hoàn thiện rà soát 19 mục file cho Initial Commit và bàn giao báo cáo cho Advisor. | Nghiệm thu và đóng F01 | User request "TASK-001 — Nghiệm thu và đóng F01" |

## 6. Kết quả thực thi

- **Thao tác 1 (Git init):** Đã chạy `git init` thành công, khởi tạo Git repository cục bộ. Chưa commit/push/deploy theo đúng quy định.
- **Thao tác 2 (Agent Rules):** Đã tạo `.agents/rules/coder_rules.md` (12.8 KB) đồng bộ nguyên văn `CODER_RULES.md`, sẵn sàng cho cơ chế nạp tự động của Antigravity.
- **Thao tác 3 (Scaffolding Monorepo):** Đã tạo đầy đủ các file theo đúng cấu trúc P3, tối giản cho F01, bao gồm root config, `packages/design-tokens`, `packages/shared-types`, `apps/api`, `apps/web`, `apps/mobile`. Bảo vệ secrets bằng `.gitignore` và `.env.example`.
- **Thao tác 4 (PostgreSQL 17 Docker Compose):** Đã khởi chạy container `gymos-postgres` sử dụng image `postgres:17-alpine`, bind an toàn `127.0.0.1:5432:5432`, named volume `postgres_data`. Container đạt trạng thái `healthy`, chạy lệnh `psql -c "SELECT version();"` trả về `PostgreSQL 17.12`.
- **Thao tác 5 (Cài đặt dependencies & Prisma 7):** Đã hoàn tất cài đặt dependencies bằng pnpm; cấu hình `prisma.config.ts`, schema driver adapter `@prisma/adapter-pg`; sinh Prisma Client 7.10.1 tới `apps/api/src/generated/client`.
- **Hoàn thiện Nền tảng F01 (Theo phê duyệt 20/11/2026):**
  + Backend API: Nâng lên `typescript@6.0.3`. Cấu hình `tsconfig.json` kế thừa `tsconfig.base.json`, chuẩn hóa `"module": "NodeNext"` và `"moduleResolution": "NodeNext"`. Loại bỏ hoàn toàn `baseUrl`, `ignoreDeprecations` và tùy chọn deprecated `node10`. Backend biên dịch 100% sang CommonJS (`require`/`exports`), bảo toàn toàn bộ decorator metadata, Prisma Client adapter và Vitest. NestJS v12 build sạch sẽ, tương thích 100% với `@nestjs/schematics@12.0.13` và IDE Language Server.
  + Peer Dependencies: Thêm `"@react-native/metro-config": "0.86.3"` vào `devDependencies` của `apps/mobile`. `pnpm peers check` đạt exit code 0 ("No peer dependency issues found").
  + Storage: Tích hợp `"@react-native-async-storage/async-storage": "2.2.0"` vào `apps/mobile`, khớp 100% với `bundledNativeModules.json` của Expo SDK 57.
  + Semantic Tokens & Theme Mobile: Tạo `themeColors` trong `packages/design-tokens`; xây dựng `ThemeContext` (System/Light/Dark); liên kết dynamic `StatusBar` và `NavigationContainer`; hỗ trợ class `dark:` trên cả 5 tabs; thay icon Check-in sang `CalendarCheck`; tạo bộ chọn Theme trên màn hình Cá nhân.
  + Cổng mạng Backend API: Chuyển cổng mặc định sang 3005 trong `.env` và `apps/api/src/main.ts` để tránh xung đột cổng 3000/3001 với Antigravity IDE trên Windows.
- **Rà soát & Tối ưu cuối cùng:**
  + Loại bỏ code thừa, import không sử dụng (ESLint 0 errors, 0 warnings).
  + Đồng bộ Typography Be Vietnam Pro trên toàn bộ 5 screens Mobile.
  + Đưa thư mục generated client `apps/api/src/generated/` vào `.gitignore` để tránh phình to git diffs.
  + Chuẩn bị danh mục file sạch cho Initial Commit (19 mục nguồn/config, 0 secrets, 0 cache/build output).
  + Cung cấp hướng dẫn và Checklist 8 tiêu chí kiểm tra Expo Go trên điện thoại thật.

## 7. Kiểm tra

| Mục | Lệnh/thao tác | Kết quả | Bằng chứng/lý do |
|---|---|---|---|
| Môi trường máy & Công cụ CLI | `fnm`, `node`, `npm`, `pnpm`, `git`, `wsl`, `docker`, `docker compose` | **Đạt** | Kiểm chứng 100% qua PowerShell terminal; lệnh chạy trơn tru |
| Git Init (Thao tác 1) | `git status` | **Đạt** | Repo đã khởi tạo, untracked files đúng danh mục |
| Agent Rules (Thao tác 2) | Kiểm tra `.agents/rules/coder_rules.md` | **Đạt** | File tồn tại, kích thước 12.8KB, đồng bộ 100% `CODER_RULES.md`, nằm trong đường dẫn discovery của Antigravity |
| Monorepo Boilerplate (Thao tác 3) | `Get-ChildItem -Recurse -File` | **Đạt** | Đã tạo đủ cấu trúc file F01; `.env` được bảo vệ ngoài git |
| PostgreSQL 17 Container (Thao tác 4) | `docker compose ps` & `docker compose exec postgres psql -c "SELECT version();"` | **Đạt** | Container `gymos-postgres` trạng thái `Up (healthy)`, cổng `127.0.0.1:5432->5432/tcp`, PostgreSQL `17.12` |
| Peer Dependencies | `pnpm peers check` | **Đạt (Exit 0)** | Thỏa mãn 100% peer dependencies của NestJS schematics và Metro config, không có cảnh báo nào |
| Build (Toàn Monorepo) | `pnpm run build --force` | **Đạt** | Turborepo thực thi 5/5 tasks thành công 100% không dùng cache (exit code 0) |
| Lint (Toàn Monorepo) | `pnpm run lint` (`eslint .`) | **Đạt** | ESLint 9 Flat Config kiểm tra TS/TSX đạt 0 lỗi, 0 cảnh báo (exit code 0) |
| Typecheck (Toàn Monorepo) | `pnpm run typecheck --force` | **Đạt** | TypeScript compiler `tsc --noEmit` toàn monorepo đạt 7/7 tasks thành công không dùng cache (exit code 0) |
| Unit Test (Backend API) | `pnpm --filter @gymos/api run test` | **Đạt** | Vitest 3.0.7 thực thi 2/2 tests cho HealthController thành công 100% (8ms) |
| Health API (online / offline / khôi phục) | `Invoke-RestMethod http://localhost:3005/api/v1/health` | **Đạt** | HTTP 200 `{ success: true, data: { status: "ok", database: "connected" } }` kết nối PostgreSQL 17 thành công |
| UI Web (Playwright MCP) | `browser_navigate`, `browser_evaluate`, `browser_take_screenshot`, `browser_snapshot` | **Đạt** | Mở `http://localhost:5173/`: Font Be Vietnam Pro được nạp, Theme button `#F97316`, Card PostgreSQL và Backend API kết nối thành công tại cổng 3005 (`/api/v1/health`) |
| Mobile Diagnostics & Validation | `npx expo-doctor@latest` & `expo install --check` | **Đạt** | `expo-doctor`: 21/21 checks passed! `expo install --check`: Dependencies are up to date! |
| Mobile Bundling (Metro / Transformer / Hermes) | `expo export -p android -c` | **Đạt (100% Success)** | Đóng gói thành công toàn bộ **3481 modules**, sinh file Hermes bytecode `AppEntry-*.hbc` (5.7MB) và đầy đủ 35 assets font Be Vietnam Pro (exit code 0). |
| Mobile Native UI trên điện thoại | Chạy app qua Expo Go trên thiết bị thật | **Đạt (12/12 tiêu chí)** | Người dùng và Advisor xác nhận nghiệm thu thành công 12/12 tiêu chí (khởi động, 5 tabs, icon CalendarCheck, Light/Dark/System, lưu AsyncStorage, font Be Vietnam Pro, màu sắc tương phản, Safe Area, Reload/Fast Refresh, zero runtime errors). |

## 8. Báo cáo cuối phiên

- **Trạng thái:** **CLOSED (COMPLETED) — TASK-001 ĐÃ ĐÓNG THÀNH CÔNG**. Nền tảng F01 hoàn thành 100%, không vướng nợ kỹ thuật, không code thừa, kiểm thử tự động 100% xanh.
- **Mục tiêu & phạm vi:** Nền tảng F01 tối giản, hoạt động được, sạch sẽ, PostgreSQL 17 container bind localhost, Health Check ping database thực tế, Website React 19 + Vite 8 (giao tiếp API cổng 3005), Mobile Expo SDK 57 + React Native 0.86.3 (5 tabs với ThemeContext Light/Dark/System và icon CalendarCheck).
- **Rà soát Initial Commit (19 mục sạch):** `.agents/`, `.env.example`, `.gitignore`, `.node-version`, `.vscode/`, `AGENT_RULES.md`, `README.md`, `apps/`, `docker-compose.yml`, `docs/`, `eslint.config.mjs`, `gymos.md`, `mindmap.md`, `package.json`, `packages/`, `pnpm-lock.yaml`, `pnpm-workspace.yaml`, `tsconfig.base.json`, `turbo.json`. Bảo vệ secrets và build outputs 100%.
- **Quy ước phối hợp Git:** Advisor chủ động hướng dẫn Người dùng thực hiện các thao tác Git Initial Commit tại cột mốc đóng F01, kèm câu lệnh cụ thể. Coder tuân thủ nghiêm ngặt không tự ý add, commit, push hay đổi nhánh.
- **Thay đổi thực tế:** Cập nhật đồng bộ các tài liệu: `docs/agent/PROJECT_CONTEXT.md`, `docs/agent/HANDOFF.md`, `docs/agent/tasks/TASK-001.md`, `docs/planning/FEATURE_BACKLOG.md`, `docs/planning/ROADMAP.md`, `docs/planning/ACCEPTANCE_CRITERIA.md`, `docs/planning/OPEN_QUESTIONS.md`.
- **Việc chưa làm / Giới hạn:** Chưa commit Git (chờ Advisor hướng dẫn Người dùng); tuyệt đối không tự ý bắt đầu F02.
- **Bước tiếp theo đề xuất:** Bàn giao báo cáo cuối cùng cho Advisor để Advisor hướng dẫn Người dùng thực hiện Initial Commit và lập kế hoạch cho F02.
- **File tài liệu liên quan:** `docs/agent/PROJECT_CONTEXT.md`, `docs/agent/HANDOFF.md`, `docs/agent/tasks/TASK-001.md`, `docs/planning/FEATURE_BACKLOG.md`, `docs/planning/ROADMAP.md`, `docs/planning/ACCEPTANCE_CRITERIA.md`, `docs/planning/OPEN_QUESTIONS.md`.
