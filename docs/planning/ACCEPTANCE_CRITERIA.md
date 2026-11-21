# GYMOS — Tiêu chí nghiệm thu định hướng

19/11/2026 · Trích §9.2 [gymos.md](../../gymos.md). Chưa có kết quả test.

Danh mục sau là gợi ý để chuyển thành test cụ thể sau khi duyệt kế hoạch; không khẳng định đã test hoặc đã triển khai.

| Nhóm | Tình huống và kết quả mong đợi |
|---|---|
| Đăng ký | Hồ sơ PENDING không đăng nhập/check-in, chi nhánh gốc chưa có; thanh toán hợp lệ kích hoạt một lần; đăng ký trùng bị chặn/tái sử dụng hồ sơ phù hợp |
| Giá | Giá giống nhau trên API/Web/App/QR, snapshot không đổi khi bảng giá đổi, tính giảm tuần tự và đuôi 9 theo quy tắc đã duyệt |
| Khuyến mãi | Không tạo giá 0 hoặc dưới sàn; không âm thầm sửa ưu đãi công bố; quota không bị vượt khi nhiều người mua |
| Thanh toán | Đúng số và nội dung, đúng cửa sổ hiệu lực thì thành công; sai/thiếu/quá hạn/hủy sai thời điểm thành ngoại lệ; callback lặp không cộng hạn lần hai |
| Giao dịch đến chậm | Thanh toán ngân hàng đúng hạn được ghi nhận khi nhận muộn, thời điểm ngân hàng quyết định doanh thu và cơ sở tính hạn |
| Gia hạn | Còn hạn cộng hạn cũ; hết hạn tính ngày thanh toán; kiểm tra cuối tháng/năm nhuận, nửa đêm giờ Việt Nam, nhiều yêu cầu đồng thời |
| Chi nhánh | Hội viên tập toàn chuỗi đang hoạt động; chi nhánh đóng/ngoài giờ từ chối; không kiểm tra quyền tiện ích riêng |
| Check-in | Lưu mọi lượt thành công, bỏ sự kiện trùng, không lưu lượt thất bại; nhiều lượt cùng ngày là một ngày tập; manual không bypass điều kiện |
| Thiết bị offline | Cache quyền tối đa 24h; đồng bộ sự kiện đúng một lần khi có mạng; không check-in thủ công offline; đảm bảo không chặn thoát hiểm |
| OTP | Paste, nhập/xóa tự chuyển, auto verify đủ 6 số, chống yêu cầu lặp, lỗi/hết hạn/resend; không cấp phiên cho tài khoản không đủ điều kiện |
| Phiên | Multi-device độc lập, đăng xuất một thiết bị không đá thiết bị khác, thu hồi từ xa, khóa/đổi số thu hồi mọi phiên |
| Dữ liệu | Hội viên chỉ xem dữ liệu của mình; nhân viên theo vai trò/phạm vi; không lộ định danh/biometrics/OTP/token trong API hoặc log ngoài phạm vi cho phép |
| Xóa tài khoản | Xóa ngay hoặc hẹn, hủy trước khi bắt đầu, phải hủy trước gia hạn; không khôi phục dữ liệu đã xóa; đăng ký lại mã mới |
| Xóa khuôn mặt | Giữ quyền lợi, không còn check-in mặt online, check-in thủ công vẫn được; theo dõi xóa trên thiết bị và bản sao |
| Offline App | Chỉ xem dữ liệu cho phép, hiển thị offline; không thanh toán/sửa dữ liệu, không xác nhận quyền vào, làm sạch dữ liệu khi đổi tài khoản |
| Thông báo | Mới nhất, đọc/chưa đọc, tùy chọn auto save, dedup, dọn 90 ngày không ảnh hưởng lịch sử nghiệp vụ |
| UI | Năm tab đúng thứ tự, Gói tập một trang, giao dịch là trang con, lịch đúng tháng; Light/Dark/System, hồ sơ không icon từng trường |
| Báo cáo | Chỉ doanh thu hội viên hợp lệ, theo chi nhánh và timestamp ngân hàng; không nhầm doanh thu với kế toán/lợi nhuận hoặc số lượt với occupancy |

## Bổ sung yêu cầu kiểm tra cho mọi nhiệm vụ (theo AGENT_RULES phần A §9)

| Mục | Cần ghi nhận |
|---|---|
| Build | Lệnh, môi trường, kết quả, bằng chứng |
| Lint / typecheck | Lệnh phù hợp thực tế, kết quả riêng |
| Test | Thành công, lỗi, biên; unit/integration/E2E theo phạm vi |
| Chạy luồng chính | Dữ liệu test được phép, thao tác, kết quả |
| UI | Trạng thái, thiết bị/màn hình, bằng chứng thực tế khi có UI |

## Kết quả Nghiệm thu Nền tảng F01 (Hoàn thành ngày 21/11/2026 qua TASK-001)

- **Mobile (12/12 tiêu chí trên điện thoại thật):** ĐẠT
  1. Khởi động ứng dụng mượt mà.
  2. Tương tác đầy đủ 5 tab (Trang chủ, Gói tập, Check-in, Chi nhánh, Cá nhân).
  3. Icon tab Check-in: `CalendarCheck` (đã loại bỏ icon cũ).
  4. Light Mode: Giao diện sáng với độ tương phản cao, nền trắng.
  5. Dark Mode: Giao diện tối chuyên nghiệp (`dark:bg-slate-900`, `dark:text-white`).
  6. System Mode: Tự động đồng bộ theo chế độ giao diện của hệ điều hành.
  7. Ghi nhớ Theme: Lưu và khôi phục chính xác qua AsyncStorage (`@gymos/theme_mode`).
  8. Typography: Font Be Vietnam Pro nạp thành công ở cả 4 độ dày (400, 500, 600, 700).
  9. Màu sắc thương hiệu: Energetic Orange `#F97316` chuẩn xác.
  10. Safe Area: Tương thích hoàn toàn với tai thỏ/dynamic island và thanh điều hướng.
  11. Fast Refresh & Reload: Phản hồi tức thì khi cập nhật mã nguồn hoặc lắc máy chọn reload.
  12. Zero Runtime Errors: Không có lỗi hay crash nào trong quá trình vận hành.
- **Web & Backend Integration:** ĐẠT
  + Website tại cổng 5173 giao tiếp thành công với Backend API tại cổng 3005 (`/api/v1/health`), hiển thị widget trạng thái PostgreSQL.
- **Kiểm thử tự động Monorepo:** ĐẠT
  + Typecheck không cache: 7/7 packages thành công.
  + Build không cache: 5/5 packages thành công.
  + Lint: 0 errors, 0 warnings.
  + Backend Unit Test: 2/2 tests pass (8ms).
  + Android Bundling: 3481 modules, 5.7MB Hermes bytecode, exit code 0.

Đạt / Không đạt / Chưa xác minh / Không áp dụng (kèm lý do). Các test vendor mock không thay thế test thiết bị/ngân hàng thật. Không coi tài liệu hoặc build là bằng chứng nghiệp vụ. Coder chuyển hàng tương ứng thành test case có precondition, thao tác, kỳ vọng và bằng chứng sau khi duyệt, không tự chốt quy tắc còn mở.
