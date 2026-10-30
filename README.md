# Website mô phỏng khảo sát Kiwi đỏ Zespri

## Chạy website và tự đồng bộ CSV

Không cần cài thư viện hoặc build. Cần Python 3 để phục vụ website qua HTTP:

```bash
cd /Users/twot/Documents/CODE/KIWI-KLinh
python3 -m http.server 8080 --bind 127.0.0.1
```

Mở **http://localhost:8080** bằng trình duyệt, rồi chọn tab **Thống kê**. Giữ cửa sổ Terminal chạy máy chủ; nhấn Ctrl+C để dừng.

> Không mở trực tiếp `index.html` bằng `file://` nếu muốn thống kê tự đồng bộ. Trình duyệt không cho website đọc file CSV cục bộ theo cách này; tab thống kê sẽ hiện hướng dẫn thay vì số liệu cũ.

### Khi sửa dữ liệu

1. Sửa file `test 1 (Câu trả lời) - Câu trả lời biểu mẫu 1.csv` trong cùng thư mục.
2. Lưu dưới dạng CSV UTF-8, giữ nguyên tên file và tiêu đề cột. Có thể đổi thứ tự cột; website đối chiếu theo tiêu đề câu hỏi.
3. Website kiểm tra lại CSV mỗi 5 giây, bỏ qua cache và chỉ dựng lại biểu đồ khi nội dung thay đổi. Không cần tải lại trang. Trình duyệt có thể giảm tần suất kiểm tra khi tab ở nền.

Số phản hồi, thời gian, biểu đồ, số lượng, tỷ lệ và điểm trung bình đều được tính lại từ CSV. Không giới hạn cứng ở 538: nếu thêm hoặc xóa dòng, website tự hiển thị số phản hồi mới.

Nếu CSV đang lưu dở, không hợp lệ hoặc máy chủ tạm ngừng, website báo lỗi, giữ số liệu của lần đọc thành công gần nhất (nếu có), và tự thử lại. Không âm thầm bỏ các đáp án lạ khỏi thống kê.

## Dữ liệu hiện tại

- **502 dòng dữ liệu mô phỏng**, đã giảm từ 538 lượt theo tỷ lệ mục tiêu trong `PHAN-BO-NGAN-GON.md`; không phải kết quả khảo sát thực tế và không dùng để chứng minh kết luận thực nghiệm.
- CSV và Excel cùng tên hiện có đúng 502 dòng, dữ liệu khớp nhau. Bản 538 lượt của CSV, Excel và báo cáo được sao lưu với đuôi `.before-502.bak`.
- Các tỷ lệ mục tiêu trong file ngắn gọn được giữ nguyên; chỉ tổng lượt đổi thành 502. Độ lệch lớn nhất giữa tỷ lệ thực tế và mục tiêu là khoảng **0,139 điểm phần trăm** do số lượng phải là số nguyên.
- `Rubyred (Câu trả lời).xlsx` là file riêng có 2 phản hồi, không phải bản xuất từ CSV của website và được giữ nguyên.
- Cập nhật mới nhất: câu 4 chuyển 21 ô Không muốn trả lời thành Nam (Nam 106, Nữ 396); câu 6 chuyển 50 ô Không muốn trả lời thành Trên 40 triệu đồng. CSV/Excel và các báo cáo trước lần đổi lựa chọn được sao lưu với đuôi `.before-option-update.bak`. Chỉ thay đổi dữ liệu mô phỏng trên máy, không chỉnh sửa các phản hồi đã gửi lên Google Forms.
- Các ghi chú chuyển đổi 538 lượt bên dưới là lịch sử trước lần giảm xuống 502. Số lượng và tỷ lệ hiện tại xem `PHAN-BO-DU-LIEU-MO-PHONG.md`.
- 15 cột Likert (câu 7–21) của hai file CSV được tạo lại bằng `make_factor_sim.py` từ mô hình nhân tố tiềm ẩn (TT, OC, KH, YD; seed 20261006). Dấu thời gian, câu 1–6 và phân bố từng câu không đổi; chỉ cách các câu Likert đi cùng nhau thay đổi. Vẫn là dữ liệu mô phỏng, khóa luận phải ghi rõ điều này. Chạy lại: `python3 make_factor_sim.py <csv-502-cũ> du-lieu-502-luot.csv du-lieu-393-mau-sach.csv`.
- Cột `Loại dữ liệu` đánh dấu `Mô phỏng` ở mọi dòng. Website dùng 21 cột câu hỏi để thống kê và bỏ qua cột đánh dấu này.
- Câu hỏi đã cập nhật theo Google Form mới: 6 câu đầu giữ nguyên, 12 phát biểu đổi nội dung và 3 phát biểu bổ sung. Xem `CAP-NHAT-BIEU-MAU.md` để đối chiếu.
- Câu 4 đã chuyển 22 dòng Nam sang Không muốn trả lời: Nữ 425 (79,00%), Nam 91 (16,91%), Không muốn trả lời 22 (4,09%). CSV trước lần sửa này có đuôi `.csv.before-gender-update.bak`. Các câu khác, dấu thời gian và thứ tự 538 dòng không đổi.
- Toàn bộ 15 câu Phần 3 đã được tạo lại điểm mô phỏng theo các mức tập trung người dùng chỉ định, gồm cả ba câu từng để trống. Sau lần giảm dữ liệu, hiện mỗi câu đều có đủ 502 điểm hợp lệ từ 1–5.
- Các mức chỉ định chiếm phần lớn, không loại bỏ hoàn toàn các mức khác. Điểm được xáo trộn độc lập với seed 202621538; không phải phản hồi thực tế.
- CSV trước lần sửa Phần 3 được giữ với đuôi `.csv.before-part3-update.bak`, báo cáo trước lần sửa được giữ tại `PHAN-BO-DU-LIEU-MO-PHONG.before-part3-update.md.bak`.
- CSV 18 câu trước cập nhật được sao lưu với đuôi `.csv.before-form-update.bak`; báo cáo phân bố cũ được giữ tại `PHAN-BO-DU-LIEU-MO-PHONG.before-form-update.md.bak`.
- Dấu thời gian hiện tại được tạo mô phỏng từ **12/10/2026 08:24:21** đến **22/10/2026 21:38:45**, tăng dần, không trùng nhau và có khoảng cách không đều; không phải thời điểm thu thập khảo sát thực tế. CSV/Excel trước lần đổi thời gian được sao lưu với đuôi `.before-time-update.bak`.
- Bản 538 phản hồi trước điều chỉnh được sao lưu với đuôi **`.csv.before-simulation.bak`**. File gốc 1.000 phản hồi vẫn được giữ với đuôi **`.csv.bak`**. Website không đọc các bản sao lưu.
- Xem `PHAN-BO-DU-LIEU-MO-PHONG.md` để biết số lượng, tỷ lệ của đầy đủ 21 câu và phương pháp tạo dữ liệu. Các cột được xáo trộn độc lập; không bảo đảm tương quan hoặc độ tin cậy thang đo.
- Thống kê toàn bộ dữ liệu CSV, không lọc theo câu sàng lọc và không đồng bộ với Google Forms.
- Các lượt điền thử ở tab Câu hỏi không được ghi vào CSV và không cộng vào thống kê.

## Các file

- `CAU-HOI.md`: toàn bộ 21 câu hỏi, các đáp án và hướng dẫn từ biểu mẫu mới.
- `CAP-NHAT-BIEU-MAU.md`: đối chiếu câu cũ/mới, mã Google và cách chuyển dữ liệu mô phỏng.
- `PHAN-BO-DU-LIEU-MO-PHONG.md`: phân bố chính xác và nguồn gốc bộ dữ liệu mô phỏng.
- `index.html`: cấu trúc trang khảo sát và hai tab.
- `styles.css`: giao diện khảo sát responsive và hình kiwi bằng CSS.
- `questions.js`: câu hỏi, lựa chọn và thang đo.
- `app.js`: biểu mẫu, kiểm tra câu bắt buộc, xóa và làm lại khảo sát.
- `csv-data.js`: đọc định dạng CSV, kiểm tra tiêu đề/lựa chọn và tổng hợp phản hồi.
- `statistics.js`: chuyển tab, tải CSV định kỳ, dựng biểu đồ và bảng số liệu.
- `statistics.css`: giao diện thống kê responsive.
- File `.csv`: nguồn dữ liệu trực tiếp của thống kê.
- File `.csv.bak`: bản sao nguyên vẹn dữ liệu trước khi cắt còn 538 phản hồi.

## Tab thống kê

- 6 biểu đồ tròn cho câu chọn đáp án, kèm bảng số lượng và tỷ lệ phần trăm.
- 15 mục thống kê cho thang điểm 1–5: biểu đồ cột, số lượng, tỷ lệ, điểm trung bình và bảng số liệu khi có dữ liệu; câu chưa có dữ liệu chỉ hiển thị thông báo, không tính điểm trung bình.
- Tỷ lệ tính trên số câu trả lời không trống của từng câu hỏi, làm tròn tối đa một chữ số thập phân. Điểm trung bình là tổng điểm chia số câu trả lời của câu hỏi.
- Dòng chỉ có khoảng trắng được bỏ qua; ô trả lời trống không được tính vào mẫu số của câu hỏi đó.
- Có thông báo trạng thái đồng bộ, thời gian kiểm tra gần nhất và lỗi đọc dữ liệu.
- Chuyển tab không làm mất đáp án đang điền. Hỗ trợ phím trái/phải, Home/End khi focus vào tab.
- Biểu đồ dùng SVG/CSS, không cần thư viện hoặc Internet; chỉ cần máy chủ cục bộ đang chạy.

## Biểu mẫu

- Toàn bộ 21 câu hỏi hiển thị trên một trang, giữ tiêu đề ba phần theo nguồn.
- Tất cả đều bắt buộc, mỗi câu chỉ chọn một đáp án. Nút “Hoàn thành” kiểm tra toàn bộ biểu mẫu và đưa người dùng đến câu chưa trả lời đầu tiên.
- Sau khi hoàn thành, hiển thị thông báo xác nhận bản mô phỏng.
- Không gửi câu trả lời đến máy chủ, không lưu vào localStorage/cookie. Tải lại hoặc đóng trang sẽ mất câu trả lời đang điền.
- Đây là bản mô phỏng theo phong cách Google Forms, không phải bản sao pixel-perfect. Banner kiwi được vẽ bằng CSS; không sử dụng dịch vụ ngoài.
- Lựa chọn hiện tại khớp form: giới tính chỉ có Nam/Nữ; thu nhập gồm Dưới 15 triệu đồng, Từ 15 đến dưới 25 triệu đồng, Từ 25 đến 40 triệu đồng, Trên 40 triệu đồng.

Máy chủ hướng dẫn ở trên chỉ lắng nghe trên máy cục bộ. Không công khai thư mục chứa CSV và bản sao lưu nếu chưa có chủ ý chia sẻ dữ liệu.

Nguồn câu hỏi hiện tại: https://forms.gle/Aq6RbvtBnkmwi15M6

File Word có sẵn được giữ nguyên, không phải thành phần của website.
