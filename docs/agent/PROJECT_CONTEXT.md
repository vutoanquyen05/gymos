# Bối cảnh dự án — GYMOS

Cập nhật: 21/11/2026 | Nguồn: [gymos.md](../../gymos.md) v1.0, [AGENT_RULES.md](../../AGENT_RULES.md) v1.0, Nghiệm thu F01 và Kết quả xác minh môi trường thực tế.

## Mục tiêu và phạm vi sản phẩm

- Một chuỗi Gym truyền thống, không phải SaaS đa doanh nghiệp. Mobile hội viên là trọng tâm; Web vận hành chi nhánh; Backend dùng chung; thiết bị cửa chuyên dụng.
- Mobile First, Automation First, Self-service First, Minimal Operations, No Overengineering, Feature First.
- Giới hạn đầy đủ: gymos.md §1.3. Không mở HR/ERP/HQ admin, dịch vụ chuyên biệt, tự đăng ký online, tập thử, phân hạng, QR check-in.

## Công nghệ và cấu trúc

- Hiện trạng môi trường thực tế máy phát triển (Đã kiểm chứng trực tiếp ngày 19/11/2026):
  + **Hệ điều hành:** Microsoft Windows 10 Pro 22H2 (Build `19045.7846`). [Đã xác minh qua WMI & Registry]
  + **Node Version Manager:** `fnm 1.39.0`. [Đã xác minh qua `fnm --version`]
  + **Node.js:** `v24.22.3` LTS (Krypton), `fnm current` hiển thị `v24.22.3`. [Đã xác minh qua `node --version`]
  + **Package Managers:** `npm 11.19.1`, `pnpm 12.21.0` (chạy trực tiếp trong PowerShell terminal không gặp lỗi ExecutionPolicy). [Đã xác minh qua `npm --version`, `pnpm --version`]
  + **Git:** `git version 2.52.0.windows.1`. [Đã xác minh qua `git --version`]
  + **WSL2:** Phiên bản `3.0.5.0`, Kernel `6.18.58.1-1`, Default Version `2`, Distro `docker-desktop`. [Đã xác minh qua `wsl --version`, `wsl --status`, `wsl -l -v`]
  + **Docker Desktop:** `4.99.0` (Engine `29.9.3`, Compose `v5.7.0`, context `desktop-linux`, chạy trên nhân WSL2). [Đã xác minh qua `docker version`, `docker info`, `docker compose version`, `docker ps -a`]
  + **Expo Go trên điện thoại:** Client version `57.0.9`, Supported SDKs: `57`. [Đã xác minh qua ảnh chụp màn hình Settings của người dùng]
  + **Đánh giá môi trường:** Toàn bộ công cụ máy đã được người dùng cài đặt hoàn tất và đạt 100% yêu cầu; **không cần cài đặt lại các công cụ này**. Người dùng đã chính thức phê duyệt triển khai Kế hoạch P3 cùng 5 thao tác kỹ thuật ngày 19/11/2026.
- Stack chính thức (kết hợp gymos §3.1 và Quyết định P3 — Latest Stable Compatible):
  + **Kiến trúc:** Modular Monolith, Monorepo quản lý bằng pnpm workspaces và Turborepo v2 (`turbo@2.11.12` - cố định theo chính sách `minimumReleaseAge` 24h của pnpm 12). Người dùng đã cài đặt `@expo/ngrok` toàn cục hỗ trợ Expo Tunnel.
  + **Runtime & Package Manager:** Node.js 24 LTS (`24.22.3`) thông qua `fnm`; cố định chính xác trong `package.json` (`engines`, `packageManager: pnpm@12.21.0`) và duy nhất một file `.node-version`.
  + **Database Local:** Docker Desktop + WSL2 + Docker Compose; PostgreSQL 17 container (`postgres:17-alpine`, port 5432), lưu dữ liệu bền vững bằng named volume `postgres_data`. Không tái sử dụng Supabase `gym-workout` cũ.
  + **Backend:** NestJS 12 (`@nestjs/core@12.5.1`), TypeScript 6.0.3, Prisma ORM 7 (`@prisma/client@7.10.1`, `prisma@7.10.1` - bản stable mới nhất; không dùng v8 RC). Cấu hình `tsconfig.json` kế thừa `tsconfig.base.json`, chuẩn hóa `module: NodeNext`, `moduleResolution: NodeNext`, biên dịch CommonJS không dùng `baseUrl` hay `ignoreDeprecations`. Cổng API mặc định chuyển sang 3005 để tránh xung đột với Antigravity IDE nội bộ trên cổng 3000/3001.
  + **Web:** React 19 (`19.3.1`) + Vite 8 (`8.3.8`) SPA, Tailwind CSS 3.4 (`3.4.17`) + Radix UI (`@radix-ui/react-slot@1.1.2`) + Lucide React (`1.75.0`), TypeScript 5.6.3.
  + **Mobile:** React Native (`0.86.3`) + Expo SDK 57 (`expo@~57.0.33`, `react@19.2.3`), NativeWind (`4.2.7` kèm `react-native-css-interop@0.2.7`) + Tailwind CSS (`3.4.17`) + Lucide React Native (`1.75.0`), TypeScript 5.6.3, `@react-native-async-storage/async-storage@2.2.0`, `@react-native/metro-config@0.86.3`. Cấu hình `metro.config.js` tiêu chuẩn tối giản của Expo + NativeWind. Tab Check-in sử dụng icon `CalendarCheck`.
  + **Design System & Theme:** Design Tokens dùng chung giữa Web và Mobile (`packages/design-tokens`); màu Energetic Orange (`#F97316`), Be Vietnam Pro font, 4-point spacing; class CSS tự viết tuân thủ BEM. Bộ Semantic Tokens phân định Light và Dark mode (`themeColors`). Mobile hỗ trợ 3 chế độ: `system` (mặc định), `light`, `dark`, lưu tùy chọn qua `AsyncStorage`, đồng bộ NativeWind `dark:` classes, dynamic `StatusBar` và React Navigation Theme.
  + **Agent Rules:** Tự động nạp qua `.agents/rules/coder_rules.md` (đồng bộ nguyên văn với `CODER_RULES.md`).
- Cấu trúc Monorepo chính thức:
  + `apps/api`: NestJS 12 Backend REST API.
  + `apps/web`: React 19 + Vite 8 SPA.
  + `apps/mobile`: React Native + Expo SDK 57.
  + `packages/design-tokens`: Tokens màu sắc, spacing, typography dùng chung.
  + `packages/shared-types`: Kiểu dữ liệu cơ sở tối thiểu cho F01 (`ApiResponse<T>`, `HealthCheckResponse`).
- Nguyên tắc triển khai F01 (Quyết định người dùng):
  + Xây dựng nền tảng sạch, đơn giản, hoạt động được và dễ mở rộng.
  + Không xây dựng trước nghiệp vụ của các feature tiếp theo (không tạo schema/logic F02+).
  + Không tạo enum, utility, adapter, component hoặc abstraction khi chưa có nhu cầu sử dụng.
  + Không tạo dữ liệu nghiệp vụ giả lập không cần thiết.
  + Không ghi OTP, token hoặc thông tin nhạy cảm vào log.
  + Sử dụng `.env.example` và bảo vệ file `.env` (gitignored). Bảo toàn toàn bộ tài liệu hiện có.
  + Health Check kiểm tra kết nối PostgreSQL thực tế (`SELECT 1`), trả về HTTP 200 khi kết nối và HTTP 503 khi mất kết nối.
  + Không tạo hoặc chạy migration cho các bảng nghiệp vụ.

## Quy ước đã duyệt theo nguồn, áp dụng qua kế hoạch task

| Nội dung | Quy tắc + ví dụ | Nguồn |
|---|---|---|
| Tên | Tiếng Anh, phù hợp ngôn ngữ/framework; files `kebab-case`, components `PascalCase`, biến/hàm `camelCase` | AGENT_RULES A §6; Quyết định 19/11 |
| CSS | Tailwind CSS / NativeWind cho utilities; class tự viết dùng BEM (ví dụ `gymos-btn--disabled`) | A §6; Quyết định 19/11 |
| Comment | Tiếng Việt, mục đích hàm tạo/sửa, tham số/return/tác động phụ khi cần | A §6 |
| UI | Modern Minimalist Fitness, Energetic Orange (`#F97316`), Be Vietnam Pro, 4-point spacing, Light/Dark | gymos §7; Quyết định 19/11 |
| Tổ chức file | `apps/` (`api`, `web`, `mobile`), `packages/` (`design-tokens`, `shared-types`), `.agents/rules/` | Quyết định 19/11 |
| Phối hợp Git | Advisor chủ động hướng dẫn Người dùng thực hiện các thao tác Git tại những cột mốc phù hợp, kèm câu lệnh cụ thể. Coder tuyệt đối không tự ý add, commit, push hay đổi nhánh. | Quyết định Người dùng 19/11 |

## Tài nguyên tái sử dụng

| Tài nguyên/đường dẫn | Mục đích | Giới hạn/lưu ý |
|---|---|---|
| Môi trường máy đã cài đặt | fnm, Node 24 LTS, pnpm, WSL2, Docker Desktop | Đã xác minh 100% sẵn sàng; không cần cài đặt lại |
| Mã nguồn trong repo | Không có (khởi tạo mới từ F01) | Tuân thủ phạm vi tối giản |
| MCP Figma (`figma_figma`) | Tham chiếu UI design, Code Connect, xuất assets | Đã xác thực user `vquyen`, sẵn sàng sử dụng |
| MCP Playwright (`playwright`) | Tự động hóa kiểm thử UI Web trên trình duyệt thực tế | Đã tích hợp sẵn trong môi trường |
| mindmap và planning docs | Điều hướng/phân rã/tiêu chí | Giữ nguyên tài liệu dẫn xuất |

## Chạy và kiểm tra (Kế hoạch P3 — Sẵn sàng thực thi)

| Mục | Lệnh/thao tác | Trạng thái điều kiện môi trường |
|---|---|---|
| Runtime | Node `24.22.3`, pnpm `12.21.0` | **Đã sẵn sàng** trên terminal |
| Docker & Compose | Docker Engine `29.9.3`, Compose `v5.7.0` | **Đã sẵn sàng** trên WSL2 engine |
| Build | `pnpm run build` | Chờ người dùng duyệt khởi tạo monorepo |
| Lint | `pnpm run lint` | Chờ người dùng duyệt khởi tạo monorepo |
| Typecheck | `pnpm run typecheck` | Chờ người dùng duyệt khởi tạo monorepo |
| Test | `pnpm run test` | Chờ người dùng duyệt khởi tạo monorepo |
| Local DB | `docker compose up -d` | Sẽ chạy sau khi tạo `docker-compose.yml` |
| Health API (online) | `curl http://localhost:3000/api/v1/health` | HTTP 200, `database: "connected"` |
| Health API (offline) | `docker compose stop postgres; curl ...` | HTTP 503, `database: "disconnected"` |
| Web E2E (Playwright) | `playwright test` / MCP Playwright | Trình duyệt mở `http://localhost:5173`, xác nhận font Be Vietnam Pro, theme `#F97316` |
| Mobile Run | `pnpm --filter mobile run start` | Expo Dev Server khởi chạy, kiểm tra trên thiết bị/trình giả lập |

## Quyết định còn hiệu lực (trích yếu; nguồn đầy đủ vẫn bắt buộc đọc theo task)

| ID tham chiếu | Quyết định | Phạm vi | Nguồn |
|---|---|---|---|
| D01 | Một tài khoản toàn chuỗi; mua lần đầu tại quầy; PENDING/ACTIVE/SUSPENDED; chi nhánh gốc cố định | Hội viên | gymos §2.1 |
| D02 | Một quyền lợi và một ngày hết hạn trong members; tháng lịch, hết hạn cuối ngày VN | Gói tập | §2.2 |
| D03 | Giá Backend, giảm tuần tự, VND, đuôi 9, giá sàn, ưu đãi tốt nhất hợp lệ, quota/snapshot | Giá | §2.3–2.4 |
| D04 | QR ngân hàng 15 phút, một yêu cầu chờ, đối soát timestamp ngân hàng, không cộng hạn trùng, ngoại lệ không cấp quyền | Thanh toán | §2.5–2.6 |
| D05 | Toàn chuỗi đúng trạng thái và giờ, tiện ích chỉ hiển thị, manual online/face device, offline thiết bị tối đa 24h | Chi nhánh/Check-in | §2.7–2.8 |
| D06 | OTP không password, phiên độc lập có thể thu hồi, App không tự đăng ký; staff RBAC/data scope | Auth | §2.9 |
| D07 | Push/in-app tự động, tùy chọn riêng, lưu 90 ngày; SMS cho OTP | Notification | §2.10 |
| D08 | Xóa tài khoản ngay/lên lịch, hủy trước gia hạn, xóa riêng khuôn mặt giữ quyền lợi | Privacy | §2.11 |
| D09 | 5 tab, Gói tập một trang, lịch sử giao dịch bên trong, Check-in lịch tháng, dòng nhận diện không icon, Limited Offline | Mobile | §5 |
| D10 | Web quản lý/lễ tân theo chi nhánh; doanh thu gói tập; không HQ/HR/ERP | Web | §6 |
| D11 | Feature First, 3 giai đoạn; mỗi task có duyệt và kiểm tra | Quy trình | §8, AGENT_RULES A |
| D12 | Môi trường dev (P3): Node 24.22.3 LTS qua fnm, pnpm 12.21.0 cố định, Docker Desktop + WSL2 chạy PostgreSQL 17 container; volume postgres_data; duy nhất .node-version | Nền tảng F01 | Quyết định 19/11 |
| D13 | UI Stack (P3): Web: Vite 8 + React 19 + Tailwind 3.4 + Radix + Lucide; Mobile: Expo SDK 57 + RN 0.86 + React 19 + NativeWind 4.2.7 + Tailwind 3.4; tokens dùng chung; BEM cho CSS tự viết | UI / Design | Quyết định 19/11 |
| D14 | Nạp luật tự động: Tạo `.agents/rules/coder_rules.md` đồng bộ `CODER_RULES.md` | Quy tắc Agent | Quyết định 19/11 |
| D15 | Phạm vi F01 tối giản: Nền tảng sạch, hoạt động được, không tạo trước model/enum/utility/abstraction F02+; Health check kiểm tra DB thật | Phạm vi F01 | Quyết định 19/11 |
| D16 | Hoàn thiện nền tảng F01: Nâng TypeScript Backend lên 6.0.3, chuẩn hóa peer dependencies với @react-native/metro-config@0.86.3, tích hợp @react-native-async-storage/async-storage@2.2.0, hoàn thiện Theme Mobile Light/Dark/System với icon CalendarCheck | Hoàn thiện F01 | Quyết định 20/11 |
| D17 | Chuẩn hóa TS Backend sạch: Kế thừa tsconfig.base.json, sử dụng module/moduleResolution NodeNext, biên dịch CommonJS, loại bỏ hoàn toàn baseUrl, ignoreDeprecations và các tùy chọn deprecated | Cấu hình TS Backend | Quyết định 20/11 |
| D18 | Nghiệm thu và đóng F01: Mobile đạt 12/12 tiêu chí thực tế trên Expo Go, Web & Backend tích hợp thành công trên cổng 3005; toàn bộ kiểm thử Monorepo không cache đạt 100%; đóng TASK-001 | Nghiệm thu F01 | Quyết định 21/11 |

## Giới hạn đã biết

- Nền tảng Monorepo F01 đã khởi tạo hoàn tất, sạch sẽ, đạt chuẩn và đã được nghiệm thu chính thức.
- Chưa chọn vendor SMS/ngân hàng/thiết bị; không kết nối dịch vụ thật khi chưa duyệt. Xem [OPEN_QUESTIONS](../planning/OPEN_QUESTIONS.md).
- Không chứa secrets, không đưa dữ liệu cá nhân thật vào test; không tự đặt bảng giá chính thức.
- Hồ sơ lịch sử: [TASK-001](tasks/TASK-001.md); Trạng thái: **F01 COMPLETED — TASK-001 ĐÃ ĐÓNG (Nghiệm thu chính thức 21/11/2026)**. Sẵn sàng thực hiện Initial Commit và bước sang F02 khi có phê duyệt.
