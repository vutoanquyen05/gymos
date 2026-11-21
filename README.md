# GYMOS — Hệ thống Quản trị & Vận hành Chuỗi Phòng Gym

Hệ thống phần mềm quản lý cho một chuỗi phòng gym truyền thống (single-tenant multi-branch), tập trung vào Mobile Hội viên, Web Lễ tân/Quản lý chi nhánh, Backend Modular Monolith dùng chung và thiết bị nhận diện cửa tự động.

## 1. Yêu cầu môi trường

- **Hệ điều hành:** Windows 10/11 (hỗ trợ WSL2) hoặc macOS / Linux.
- **Node.js:** `v24.22.3` LTS (quản lý qua `fnm`).
- **pnpm:** `12.21.0`.
- **Docker & Docker Compose:** Docker Desktop kết hợp WSL2 backend.
- **PostgreSQL:** Phiên bản 17 (chạy trong Docker container).

## 2. Cấu trúc Monorepo

```text
gymos/
├── apps/
│   ├── api/             # NestJS 12.5.1 Backend REST API
│   ├── web/             # React 19.3.1 + Vite 8.3.8 Web App
│   └── mobile/          # React Native 0.86.3 + Expo SDK 57 Mobile App
├── packages/
│   ├── design-tokens/   # Hệ màu, spacing, typography dùng chung Web & Mobile
│   └── shared-types/    # Kiểu dữ liệu cơ sở dùng chung (API Response, Health Check)
├── .agents/
│   └── rules/           # Quy tắc tự động nạp cho AI agent (Coder Rules)
├── docker-compose.yml   # Cấu hình PostgreSQL 17 container
├── .env.example         # Mẫu biến môi trường
└── turbo.json           # Cấu hình Turborepo v2 pipeline
```

## 3. Khởi động và Phát triển

### Bước 1: Khởi động cơ sở dữ liệu PostgreSQL 17
```bash
# Tạo file môi trường từ file mẫu
cp .env.example .env

# Khởi chạy container PostgreSQL
docker compose up -d

# Kiểm tra trạng thái container
docker compose ps
```

### Bước 2: Cài đặt dependencies và sinh Prisma Client
```bash
pnpm install
pnpm --filter @gymos/api run prisma:generate
```

### Bước 3: Chạy ứng dụng ở chế độ phát triển
```bash
# Chạy toàn bộ hệ thống
pnpm run dev

# Hoặc chạy riêng từng thành phần:
pnpm --filter @gymos/api run dev       # Backend API (port 3005)
pnpm --filter @gymos/web run dev       # Web Frontend (port 5173)
pnpm --filter @gymos/mobile run start   # Mobile Expo Dev Server
```

## 4. Kiểm thử và Kiểm tra chất lượng mã nguồn

```bash
# Kiểm tra định kiểu TypeScript toàn Monorepo
pnpm run typecheck

# Kiểm tra chuẩn mã nguồn qua ESLint
pnpm run lint

# Chạy Unit Tests
pnpm run test

# Biên dịch toàn bộ Monorepo
pnpm run build
```

## 5. Quy chuẩn bảo mật Secrets

- Không bao giờ commit file `.env` hoặc file chứa thông tin nhạy cảm lên Git.
- Cổng PostgreSQL được cấu hình chỉ mở trên loopback `127.0.0.1:5432` để đảm bảo an toàn.
