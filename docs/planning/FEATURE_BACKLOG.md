# GYMOS — Feature backlog

19/11/2026 · Đề xuất phân rã, chưa duyệt thứ tự chi tiết. Mọi Fxx chưa khảo sát/triển khai; không phải TASK-ID. Chỉ tạo TASK mới khi bắt đầu phạm vi cụ thể. Nguồn [gymos.md](../../gymos.md); tiêu chí [ACCEPTANCE_CRITERIA.md](ACCEPTANCE_CRITERIA.md); điểm mở [OPEN_QUESTIONS.md](OPEN_QUESTIONS.md).

| ID | Nhóm | Phụ thuộc chính | Nguồn |
|---|---|---|---|
| F01 | Nền tảng monorepo | COMPLETED (TASK-001) | §3, §4.1, §7, §8.2 |
| F02 | Chi nhánh và tài khoản vận hành tối thiểu | F01 | §2.7, §2.9, §3.4, §6.1 |
| F03 | Hồ sơ hội viên và đăng ký PENDING | F02 | §2.1, §4.3, §6.3 |
| F04 | Xác thực hội viên | F03 | §2.9, §3.4, §5.2 |
| F05 | Trang chủ phần dữ liệu đã có | F04 | §5.3, §7 |
| F06 | Giá và khuyến mãi | F02 | §2.2–2.4, §4.4 |
| F07 | QR, đối soát, mua lần đầu và gia hạn | F03, F06; F04 cho App | §2.1–2.6, §3.6, §4.6, §5.4, §6.3 |
| F08 | Check-in thủ công và lịch App | F02, F07, F04 | §2.8, §5.5, §6.3 |
| F09 | Danh sách và chi tiết chi nhánh | F02, F04 | §2.7, §5.6 |
| F10 | Thiết bị nhận diện | F08; khảo sát từ F01 | §2.8, §2.11, §3.7 |
| F11 | Cá nhân và quản lý phiên | F04, F07 | §2.1.1, §2.9, §5.7 |
| F12 | Quyền riêng tư và xóa dữ liệu | F07, F10, F11 | §2.11, §3.8, §5.7 |
| F13 | Thông báo và tự động hóa | F04; sự kiện F07–F12 theo phạm vi | §2.10, §3.5, §5.8 |
| F14 | Hoàn thiện Website vận hành | F02–F13 theo màn hình | §6, §2.6 |
| F15 | Hoàn thiện và nghiệm thu hệ thống | F01–F14 | §3.8, §8, §9 |

## F01 — Nền tảng monorepo

- Trạng thái: COMPLETED (Đã nghiệm thu chính thức ngày 21/11/2026 qua TASK-001).
- Phạm vi: Khởi tạo monorepo pnpm workspaces + Turborepo; NestJS 12 + Prisma 7 (PostgreSQL 17 container), Web React 19 + Vite 8, Mobile React Native 0.86 + Expo SDK 57 (5 tabs, NativeWind 4.2.7, dynamic theme Light/Dark/System, icon CalendarCheck); Design tokens dùng chung (`packages/design-tokens`), kiểu dùng chung (`packages/shared-types`). Đạt 100% 12/12 tiêu chí nghiệm thu Mobile thực tế trên điện thoại thật và xác minh kết nối Web - Backend tại cổng 3005.
- Đầu ra thực tế: Cả 3 ứng dụng chạy ổn định, kiểm thử tự động 100% xanh (Typecheck không cache, Build không cache, Lint, Unit Test, Expo-Doctor 21/21, Android Bundling 3481 modules).
- Phụ thuộc: Đã giải quyết (TASK-001).
- Nguồn: `gymos.md` §3, §4.1, §7, §8.2.
- Khi giao việc: xác định lát cắt DB/API/UI/test cần thiết; xác minh tài nguyên và câu hỏi mở; trình P1, không chạy trước duyệt.

## F02 — Chi nhánh và tài khoản vận hành tối thiểu

- Trạng thái: Chưa khảo sát / chưa duyệt thực thi.
- Phạm vi: Dữ liệu chi nhánh, giờ/status; staff auth, role và data scope cần thiết cho đăng ký/quầy; chưa xây HQ admin.
- Đầu ra định hướng: Dữ liệu chi nhánh và quyền truy cập quầy kiểm tra được.
- Phụ thuộc: F01.
- Nguồn: `gymos.md` §2.7, §2.9, §3.4, §6.1.
- Khi giao việc: xác định lát cắt DB/API/UI/test cần thiết; xác minh tài nguyên và câu hỏi mở; trình P1, không chạy trước duyệt.

## F03 — Hồ sơ hội viên và đăng ký PENDING

- Trạng thái: Chưa khảo sát / chưa duyệt thực thi.
- Phạm vi: Tìm/nhập hồ sơ tại quầy, kiểm tra trùng, trường bắt buộc, PENDING, tái sử dụng; chi nhánh gốc và hạn chưa có.
- Đầu ra định hướng: Stepper phần hồ sơ, API và ràng buộc dữ liệu; chưa được tự kích hoạt.
- Phụ thuộc: F02.
- Nguồn: `gymos.md` §2.1, §4.3, §6.3.
- Khi giao việc: xác định lát cắt DB/API/UI/test cần thiết; xác minh tài nguyên và câu hỏi mở; trình P1, không chạy trước duyệt.

## F04 — Xác thực hội viên

- Trạng thái: Chưa khảo sát / chưa duyệt thực thi.
- Phạm vi: SMS OTP, phiên JWT độc lập, persistent login, thu hồi, 6 ô paste/backspace/auto verify; fixture test cần duyệt nếu chưa có hội viên ACTIVE.
- Đầu ra định hướng: Đăng nhập và duy trì phiên với dữ liệu test được duyệt; không mở đăng ký App.
- Phụ thuộc: F03.
- Nguồn: `gymos.md` §2.9, §3.4, §5.2.
- Khi giao việc: xác định lát cắt DB/API/UI/test cần thiết; xác minh tài nguyên và câu hỏi mở; trình P1, không chạy trước duyệt.

## F05 — Trang chủ phần dữ liệu đã có

- Trạng thái: Chưa khảo sát / chưa duyệt thực thi.
- Phạm vi: Header, hồ sơ, hạn và chi nhánh khi có dữ liệu đáng tin; chỉ hiển thị chỉ số thật; bổ sung widget khi F06–F10 sẵn sàng.
- Đầu ra định hướng: Dashboard tối thiểu có trạng thái loading/empty/error; không số liệu giả.
- Phụ thuộc: F04.
- Nguồn: `gymos.md` §5.3, §7.
- Khi giao việc: xác định lát cắt DB/API/UI/test cần thiết; xác minh tài nguyên và câu hỏi mở; trình P1, không chạy trước duyệt.

## F06 — Giá và khuyến mãi

- Trạng thái: Chưa khảo sát / chưa duyệt thực thi.
- Phạm vi: Một quyền lợi, số tháng/giảm tuần tự/đuôi 9/giá sàn; ưu đãi hợp lệ, preview, quota; cơ chế cấu hình tập trung cần chốt.
- Đầu ra định hướng: Backend tính giá thống nhất, API và UI lựa chọn; dữ liệu thực không tự đặt.
- Phụ thuộc: F02.
- Nguồn: `gymos.md` §2.2–2.4, §4.4.
- Khi giao việc: xác định lát cắt DB/API/UI/test cần thiết; xác minh tài nguyên và câu hỏi mở; trình P1, không chạy trước duyệt.

## F07 — QR, đối soát, mua lần đầu và gia hạn

- Trạng thái: Chưa khảo sát / chưa duyệt thực thi.
- Phạm vi: QR 15 phút, snapshot, giữ quota, webhook/polling, ngoại lệ và transaction nhất quán; hoàn thiện đăng ký/quầy, gia hạn App, lịch sử/biên nhận.
- Đầu ra định hướng: Thanh toán hợp lệ kích hoạt/cộng hạn đúng một lần; sai không cấp quyền; phân biệt mock và ngân hàng thật.
- Phụ thuộc: F03, F06; F04 cho App.
- Nguồn: `gymos.md` §2.1–2.6, §3.6, §4.6, §5.4, §6.3.
- Khi giao việc: xác định lát cắt DB/API/UI/test cần thiết; xác minh tài nguyên và câu hỏi mở; trình P1, không chạy trước duyệt.

## F08 — Check-in thủ công và lịch App

- Trạng thái: Chưa khảo sát / chưa duyệt thực thi.
- Phạm vi: Kiểm tra quyền online, ghi lượt thành công, cache App theo phạm vi đã duyệt, lịch tháng/số ngày/số lượt, quyền quầy.
- Đầu ra định hướng: Cùng điều kiện vào tại mọi chi nhánh, lịch đúng ngày Việt Nam.
- Phụ thuộc: F02, F07, F04.
- Nguồn: `gymos.md` §2.8, §5.5, §6.3.
- Khi giao việc: xác định lát cắt DB/API/UI/test cần thiết; xác minh tài nguyên và câu hỏi mở; trình P1, không chạy trước duyệt.

## F09 — Danh sách và chi tiết chi nhánh

- Trạng thái: Chưa khảo sát / chưa duyệt thực thi.
- Phạm vi: Tìm kiếm, danh sách/bản đồ, tiện ích, lịch ngoại lệ, GPS foreground, chi nhánh gốc chỉ đánh dấu.
- Đầu ra định hướng: Hiển thị lịch/trạng thái đúng; không giả khoảng cách; provider cần duyệt.
- Phụ thuộc: F02, F04.
- Nguồn: `gymos.md` §2.7, §5.6.
- Khi giao việc: xác định lát cắt DB/API/UI/test cần thiết; xác minh tài nguyên và câu hỏi mở; trình P1, không chạy trước duyệt.

## F10 — Thiết bị nhận diện

- Trạng thái: Chưa khảo sát / chưa duyệt thực thi.
- Phạm vi: Một vendor, consent, adapter, online decision, offline tối đa 24 giờ, đồng bộ sự kiện/mẫu/xóa; thoát hiểm.
- Đầu ra định hướng: Thử nghiệm thiết bị thật trước nghiệm thu; mock chỉ xác minh logic.
- Phụ thuộc: F08; khảo sát từ F01.
- Nguồn: `gymos.md` §2.8, §2.11, §3.7.
- Khi giao việc: xác định lát cắt DB/API/UI/test cần thiết; xác minh tài nguyên và câu hỏi mở; trình P1, không chạy trước duyệt.

## F11 — Cá nhân và quản lý phiên

- Trạng thái: Chưa khảo sát / chưa duyệt thực thi.
- Phạm vi: Hồ sơ, sửa trường cho phép, đổi số tại quầy/thu hồi, thiết bị đăng nhập, giao diện, hỗ trợ.
- Đầu ra định hướng: Không lộ ghi chú hoặc định danh; thao tác đúng quyền; không icon từng trường.
- Phụ thuộc: F04, F07.
- Nguồn: `gymos.md` §2.1.1, §2.9, §5.7.
- Khi giao việc: xác định lát cắt DB/API/UI/test cần thiết; xác minh tài nguyên và câu hỏi mở; trình P1, không chạy trước duyệt.

## F12 — Quyền riêng tư và xóa dữ liệu

- Trạng thái: Chưa khảo sát / chưa duyệt thực thi.
- Phạm vi: Xóa riêng khuôn mặt, hủy lịch xóa tài khoản, xóa ngay/sau hết hạn, xử lý thiết bị/backup/giao dịch, đăng ký lại.
- Đầu ra định hướng: Có quy trình đã duyệt và bằng chứng xóa; không báo hoàn tất khi còn bản sao chưa xác minh.
- Phụ thuộc: F07, F10, F11.
- Nguồn: `gymos.md` §2.11, §3.8, §5.7.
- Khi giao việc: xác định lát cắt DB/API/UI/test cần thiết; xác minh tài nguyên và câu hỏi mở; trình P1, không chạy trước duyệt.

## F13 — Thông báo và tự động hóa

- Trạng thái: Chưa khảo sát / chưa duyệt thực thi.
- Phạm vi: In-app, Expo Push, nhắc hạn, bảo mật, giờ, tùy chọn auto save, 90 ngày; hook sự kiện từ feature liên quan.
- Đầu ra định hướng: Dedup, cập nhật lịch nhắc khi đổi hạn, lịch sử nghiệp vụ độc lập.
- Phụ thuộc: F04; sự kiện F07–F12 theo phạm vi.
- Nguồn: `gymos.md` §2.10, §3.5, §5.8.
- Khi giao việc: xác định lát cắt DB/API/UI/test cần thiết; xác minh tài nguyên và câu hỏi mở; trình P1, không chạy trước duyệt.

## F14 — Hoàn thiện Website vận hành

- Trạng thái: Chưa khảo sát / chưa duyệt thực thi.
- Phạm vi: Sidebar, dashboard vai trò, hội viên, check-in, giao dịch/ngoại lệ, báo cáo đúng chi nhánh, gói/khuyến mãi chỉ đọc, cài đặt theo quyền.
- Đầu ra định hướng: Web chi nhánh hoàn chỉnh, không HR/ERP/HQ; báo cáo theo thời điểm thanh toán ngân hàng.
- Phụ thuộc: F02–F13 theo màn hình.
- Nguồn: `gymos.md` §6, §2.6.
- Khi giao việc: xác định lát cắt DB/API/UI/test cần thiết; xác minh tài nguyên và câu hỏi mở; trình P1, không chạy trước duyệt.

## F15 — Hoàn thiện và nghiệm thu hệ thống

- Trạng thái: Chưa khảo sát / chưa duyệt thực thi.
- Phạm vi: Kiểm thử end-to-end thật, bảo mật/privacy, backup/restore, monitoring, staging, phát hành sau duyệt.
- Đầu ra định hướng: Bằng chứng test, rủi ro, điều kiện go-live; không tự deploy.
- Phụ thuộc: F01–F14.
- Nguồn: `gymos.md` §3.8, §8, §9.
- Khi giao việc: xác định lát cắt DB/API/UI/test cần thiết; xác minh tài nguyên và câu hỏi mở; trình P1, không chạy trước duyệt.
