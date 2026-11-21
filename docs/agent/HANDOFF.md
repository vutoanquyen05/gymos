# Bàn giao hiện tại — GYMOS

Cập nhật: 21/11/2026 | Phiên Coder: Nghiệm thu chính thức F01 và Đóng TASK-001

- **Mục tiêu đang theo đuổi:** Khởi động dự án GYMOS đúng đặc tả [gymos.md](../../gymos.md); F01 Nền tảng Monorepo đã hoàn thành toàn diện và được Người dùng cùng Advisor nghiệm thu chính thức.
- **Nhiệm vụ đang hoạt động:** [TASK-001](tasks/TASK-001.md) — Khởi tạo nền tảng GYMOS (F01) $\rightarrow$ **TRẠNG THÁI: CLOSED (COMPLETED)**.
- **Trạng thái:** **F01 ĐÃ HOÀN THÀNH (COMPLETED)**.
  + Đạt 100% 12/12 tiêu chí kiểm thử Mobile trên điện thoại thật qua Expo Go (khởi động, 5 tabs, icon CalendarCheck, Light/Dark/System theme, lưu AsyncStorage, font Be Vietnam Pro, màu sắc tương phản, Safe Area, Reload/Fast Refresh, zero runtime errors).
  + Xác minh tích hợp thành công Website (port 5173) với Backend API (port 3005) qua Playwright MCP, kiểm tra trạng thái PostgreSQL 17 và phản hồi Health Check chuẩn xác.
  + Toàn bộ chuỗi kiểm thử Monorepo không sử dụng cache (`typecheck --force`, `build --force`, `lint`, `unit test`) đạt 100% xanh.
  + Cấu hình TypeScript Backend sạch: Kế thừa `tsconfig.base.json`, `NodeNext`, biên dịch CommonJS, loại bỏ hoàn toàn `baseUrl`, `ignoreDeprecations` và cảnh báo IDE.
- **Rà soát danh mục tệp chuẩn bị Initial Commit (19 mục nguồn/cấu hình sạch):**
  1. `.agents/` (Quy tắc agent tự động nạp `coder_rules.md`)
  2. `.env.example` (Mẫu cấu hình môi trường chuẩn, không chứa secret)
  3. `.gitignore` (Bảo vệ bí mật `.env`, build outputs, generated client, `.expo`)
  4. `.node-version` (Khóa phiên bản Node.js `24.22.3`)
  5. `.vscode/` (Cấu hình editor `settings.json`)
  6. `AGENT_RULES.md` (Quy tắc phát triển GYMOS)
  7. `README.md` (Tài liệu giới thiệu dự án)
  8. `apps/` (`api`, `web`, `mobile` - mã nguồn 3 ứng dụng sạch)
  9. `docker-compose.yml` (PostgreSQL 17 container bind 127.0.0.1:5432)
  10. `docs/` (`agent/`, `planning/` - hệ thống tài liệu quản trị và phân tích)
  11. `eslint.config.mjs` (Cấu hình ESLint 9 Flat Config toàn monorepo)
  12. `gymos.md` (Đặc tả nghiệp vụ gốc v1.0)
  13. `mindmap.md` (Bản đồ phân rã hệ thống)
  14. `package.json` (Root monorepo package configuration)
  15. `packages/` (`design-tokens`, `shared-types` - thư viện dùng chung)
  16. `pnpm-lock.yaml` (Khóa phiên bản dependency chính xác 100%)
  17. `pnpm-workspace.yaml` (Cấu hình workspaces và chính sách build)
  18. `tsconfig.base.json` (Cấu hình TypeScript base cho monorepo)
  19. `turbo.json` (Cấu hình Turborepo v2 pipeline)
  *(Không có tệp rác, không có `.env`, không có `node_modules`, không có build artifacts).*
- **Quy ước phối hợp Git:**
  - **Advisor chủ động hướng dẫn Người dùng thực hiện Initial Commit tại cột mốc đóng F01, kèm câu lệnh cụ thể.**
  - Coder tuân thủ nghiêm ngặt: không tự ý `git add`, `commit`, `push`, hay đổi nhánh.
- **Chưa làm / Giới hạn:**
  - Chưa commit Git, chưa push remote, tuyệt đối chưa bắt đầu F02.
- **Nhiệm vụ tiếp theo dự kiến:**
  - Advisor hướng dẫn Người dùng thực hiện Initial Commit để lưu trữ mốc nền tảng F01.
  - Sau khi Initial Commit hoàn tất, Advisor và Người dùng mở nhiệm vụ tiếp theo: **F02 — Chi nhánh và tài khoản vận hành tối thiểu**.
- **File tài liệu liên quan:**
  + [docs/agent/PROJECT_CONTEXT.md](file:///d:/VTQ_D/Libraries/Desktop/pj/gymos/docs/agent/PROJECT_CONTEXT.md)
  + [docs/agent/HANDOFF.md](file:///d:/VTQ_D/Libraries/Desktop/pj/gymos/docs/agent/HANDOFF.md)
  + [docs/agent/tasks/TASK-001.md](file:///d:/VTQ_D/Libraries/Desktop/pj/gymos/docs/agent/tasks/TASK-001.md)
  + [docs/planning/FEATURE_BACKLOG.md](file:///d:/VTQ_D/Libraries/Desktop/pj/gymos/docs/planning/FEATURE_BACKLOG.md)
  + [docs/planning/ROADMAP.md](file:///d:/VTQ_D/Libraries/Desktop/pj/gymos/docs/planning/ROADMAP.md)
  + [docs/planning/ACCEPTANCE_CRITERIA.md](file:///d:/VTQ_D/Libraries/Desktop/pj/gymos/docs/planning/ACCEPTANCE_CRITERIA.md)
  + [docs/planning/OPEN_QUESTIONS.md](file:///d:/VTQ_D/Libraries/Desktop/pj/gymos/docs/planning/OPEN_QUESTIONS.md)
