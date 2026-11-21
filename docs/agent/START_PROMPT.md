# Prompt khởi động Coder — GYMOS

Sao chép phần trong khối bên dưới vào Antigravity sau khi đã đưa bộ tài liệu vào workspace (không ghi đè tài liệu repo có sẵn). Nạp riêng CODER_RULES theo cơ chế đã xác minh. Không nạp phần B Advisor như luật Coder.

```text
NHIỆM VỤ KHẢO SÁT — Khởi động GYMOS (TASK-001 đề xuất)

Hãy thực hiện vai trò Coder theo docs/agent/CODER_RULES.md (phần A của AGENT_RULES.md). Người dùng là người duyệt; Advisor không cấp quyền sửa code. Kiểm tra cơ chế nạp luật của môi trường thực tế; không giả định tên file tự được nạp.

Bối cảnh và nguồn: đọc gymos.md để nắm đặc tả, mindmap.md để định hướng; docs/planning/ROADMAP.md, FEATURE_BACKLOG.md, ACCEPTANCE_CRITERIA.md, OPEN_QUESTIONS.md là tài liệu dẫn xuất, thứ tự/ID đề xuất. Đọc docs/agent/PROJECT_CONTEXT.md, HANDOFF.md và tasks/TASK-001.md. Nếu repo đã có tài liệu hoặc TASK-ID trùng, bảo toàn bản hiện hành, báo xung đột và dùng ID tiếp theo khi phù hợp. Không tự chọn khi source và tài liệu mâu thuẫn.

Câu hỏi cần trả lời:
1. Repo trống hay có source? Cấu trúc, Git/trạng thái thay đổi, tài liệu, manifest/lockfile, stack/version thực tế so với gymos.md §3?
2. Component/hàm/design system/test/cấu hình có thể tái sử dụng? Quy ước tên, comment, folder, BEM hiện tại? Nêu bằng chứng và giới hạn.
3. MCP, skills, workflows và môi trường phát triển nào thực sự có? Có hướng dẫn nào cần đọc? Lệnh build/lint/typecheck/test/run/UI nào có thật, yêu cầu gì? Không tự cài để khảo sát.
4. Những điểm cần chốt cho F01, gồm cấu trúc, runtime/version, local DB, test, UI kit/icon/font, quản lý secrets, dữ liệu test, staging; phân biệt yêu cầu đã chốt và đề xuất. Chỉ khảo sát khả năng tích hợp SMS/ngân hàng/thiết bị sớm, không kết nối thật khi chưa duyệt.

Phạm vi cho phép: đọc có mục tiêu, kiểm kê và ghi tài liệu agent. Không sửa code/cấu hình/dependency/dữ liệu, không scaffold, migration, commit/push/deploy. Lệnh có tác động không rõ phải hỏi trước. Không đọc/ghi secrets vào báo cáo. Không tự đặt dữ liệu/giá production.

Đầu ra: cập nhật PROJECT_CONTEXT.md, HANDOFF.md và TASK hiện tại; ghi đường dẫn và chứng cứ ngắn, phần chưa xác minh và lựa chọn cần chuyển Advisor. Trình kế hoạch P1 cho nền tảng F01 gồm hiện trạng, mục tiêu/phạm vi, các bước/phụ thuộc, tài nguyên reuse, quy ước theo nhóm + ví dụ, file dự kiến, bố cục UI nếu có, kiểm tra, tác động mở rộng/bảo trì, câu hỏi và phần bị chặn; tách thao tác cần phê duyệt riêng. Không đánh dấu đã duyệt.

Khảo sát thực tế, trình kế hoạch hiện trạng → hướng làm → file dự kiến sửa → cách kiểm tra; nêu ảnh hưởng mở rộng/bảo trì và chờ người dùng duyệt trước khi sửa code. Mọi điểm chưa rõ phải tạo câu hỏi chuyển Advisor. Chỉ tiếp tục phần độc lập đã rõ và đã được duyệt.
```
