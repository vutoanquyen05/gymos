# GYMOS — Điểm chưa chốt

19/11/2026 · Trích §9.1 [gymos.md](../../gymos.md); OQ-ID và nhóm liên quan là đề xuất. Cập nhật các mục đã được người dùng chốt sau khảo sát TASK-001.

| Nhóm | Cần xác minh/chốt | Trạng thái / Quyết định đã chốt | Nhóm liên quan (đề xuất) |
|---|---|---|---|
| Hiện trạng | Repository, docs/agent, dependency/version, Git, môi trường, tool/MCP/skill/workflow, lệnh kiểm tra | **Đã nghiệm thu (21/11/2026 - TASK-001):** Node 24 LTS (`24.22.3`) qua `fnm`; `pnpm` (`12.21.0`) cố định; Docker Desktop + WSL2 + Compose chạy PostgreSQL 17 container; volume `postgres_data`; duy nhất 1 file `.node-version`; không đổi ExecutionPolicy toàn hệ thống; không dùng Supabase cũ; quy tắc nạp qua `.agents/rules/coder_rules.md`. | OQ-01 · F01 (Hoàn thành) |
| Nền tảng | Cấu trúc folder/module thực tế, naming, UI library/icon/font, version, CI/CD và phiên bản công cụ | **Đã nghiệm thu (21/11/2026 - TASK-001):** Monorepo (apps/api: NestJS 12 + TS 6.0.3 + Prisma 7; apps/web: Vite 8 + React 19 + Tailwind 3.4 + Radix + Lucide; apps/mobile: Expo SDK 57 + RN 0.86 + React 19 + NativeWind 4.2.7 + Tailwind 3.4 + AsyncStorage 2.2.0; packages/design-tokens, shared-types); Font: Be Vietnam Pro; dynamic Theme Light/Dark/System; icon CalendarCheck; Health API kiểm tra DB thật tại cổng 3005. | OQ-02 · F01 (Hoàn thành) |
| Phân quyền | Tạo/sửa/thu hồi tài khoản nhân viên, login Web, quyền theo chi nhánh, khóa/mở khóa hội viên toàn chuỗi, quyền xử lý ngoại lệ | Chưa chốt | OQ-03 · F02/F14 |
| Cấu hình tập trung | Ai/công cụ nào quản lý giá/khuyến mãi/chi nhánh/giờ/tiện ích; không tự mở rộng Web thành HQ admin | Chưa chốt | OQ-04 · F02/F06 |
| Hội viên | Mốc bắt đầu 30 ngày của PENDING, định danh chuẩn hóa/hộ chiếu, xác minh danh tính thủ công, quy trình xử lý khóa/đổi số | Chưa chốt | OQ-05 · F03/F11 |
| Giá | Giá/thời hạn mở bán, tỷ lệ giảm và giá sàn thực tế; làm tròn, đuôi 9 theo các lớp, thứ tự/độ chính xác khi kết hợp | Chưa chốt | OQ-06 · F06 |
| Khuyến mãi | Tiêu chí đối tượng, quota, thứ tự nhiều ưu đãi, quy tắc khi bằng giá, cách công bố/sửa/kiểm tra tổ hợp và chương trình tương lai | Chưa chốt | OQ-07 · F06 |
| Ngân hàng | Vendor, tài khoản, QR, webhook/polling, timestamp, duplicate, ngoại lệ, đối soát khi hết hạn/hủy; xử lý sự kiện đến muộn trong lúc có giao dịch mới | Chưa chốt | OQ-08 · F07 |
| Xác thực | SMS provider, OTP TTL/rate limit/resend, AutoFill, token TTL/rotation/thu hồi, định danh thiết bị/phiên | Chưa chốt | OQ-09 · F04 |
| Thiết bị | Vendor/model, SDK, edge recognition và backend decision, đồng bộ template, offline 24 giờ, xóa từ xa, thay thế khi lỗi/thoát hiểm | Chưa chốt | OQ-10 · F10 |
| Chi nhánh | Danh mục thật, thiết kế 24/7/qua nửa đêm, ngày lễ, bản đồ provider, fallback nếu không GPS, quy tắc khoảng cách | Chưa chốt | OQ-11 · F02/F09 |
| Quyền riêng tư | Căn cứ/consent, thời hạn xóa và lưu trữ, xóa dữ liệu trên thiết bị offline/backup, đăng ký lại, giao dịch đang chờ, nghĩa vụ với hạn còn lại và tài khoản khóa; điều khoản/chính sách thực tế | Chưa chốt | OQ-12 · F12 |
| Thông báo | Nội dung/thời điểm nhắc sau hết hạn, hợp nhất thông báo liên quan, đối tượng giờ hoạt động, token push và lỗi gửi | Chưa chốt | OQ-13 · F13 |
| Offline App | Phạm vi cache, TTL, mã hóa/loại bỏ, hành vi khi tài khoản đã bị thu hồi, xử lý dữ liệu cũ | Chưa chốt | OQ-14 · F05/F08/F09/F11 |
| UI | Wireframe chi tiết và mọi trạng thái, design token, accessibility, route, tên hiển thị chính xác | Đã chốt token gốc và library cho F01; wireframe chi tiết từng màn hình xử lý theo từng feature | OQ-15 · Mỗi feature UI |
| Vận hành | VPS/Object Storage/backup, monitoring/alert, mục tiêu phục hồi, CI/CD, kiểm thử thiết bị và quy trình triển khai | Local DB đã chốt Docker Compose; VPS/CI/CD Staging/Production chưa chốt | OQ-16 · F01/F15 |

Các vấn đề này không phải yêu cầu chốt hết trước khi khảo sát. Chỉ xử lý các phụ thuộc của nhiệm vụ hiện tại và không tự quyết phần bị chặn.

## Xử lý

Coder kiểm chứng phần liên quan, ghi Q-ID trong TASK, dẫn OQ-ID, báo lựa chọn/tác động/đề xuất, phần bị chặn. Người dùng chốt; chỉ cập nhật PROJECT_CONTEXT khi có quyết định có hiệu lực. Ưu tiên OQ-01–02 trong TASK-001; kiểm tra khả năng tích hợp sớm, không chọn vendor thay người dùng.
