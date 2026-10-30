# Phân bố dữ liệu mô phỏng — 502 dòng, 21 câu hỏi

**Đây là dữ liệu mô phỏng theo phân bố mục tiêu, không phải kết quả khảo sát thực tế.**

- CSV: `test 1 (Câu trả lời) - Câu trả lời biểu mẫu 1.csv`.
- Excel cùng dữ liệu: `test 1 (Câu trả lời) - Câu trả lời biểu mẫu 1.xlsx`.
- Giảm từ 538 xuống 502 lượt theo yêu cầu; giữ nguyên tỷ lệ mục tiêu trong `PHAN-BO-NGAN-GON.md`.
- CSV, Excel và báo cáo 538 lượt trước lần điều chỉnh này được sao lưu với đuôi `.before-502.bak`.
- Chuẩn hóa tổng phần trăm từng câu về 100% để xử lý sai số làm tròn; chia số lượt bằng phương pháp phần dư lớn nhất.
- Chọn đều 502 dòng từ dữ liệu mô phỏng cũ, giữ thứ tự. Sau đó thay tối thiểu các ô trong mỗi cột để đạt số lượng đã phân bổ. Dấu thời gian được tạo lại riêng ở bước tiếp theo.
- Dùng seed 20261022502 để chọn các ô cần điều chỉnh. Không bảo đảm tương quan hoặc độ tin cậy thang đo.
- Dấu thời gian được tạo mô phỏng với seed 20261012022: từ **12/10/2026 08:24:21** đến **22/10/2026 21:38:45**, tăng dần và không trùng. Số lượt từ ngày 12 đến 22 lần lượt là 48, 48, 38, 46, 43, 39, 51, 50, 57, 34, 48. Các giờ được phân bố không đều trong khoảng 08:00–22:30; đây không phải thời điểm thu thập khảo sát thực tế. CSV/Excel trước lần đổi thời gian được sao lưu với đuôi `.before-time-update.bak`.
- Cột `Loại dữ liệu` tiếp tục đánh dấu `Mô phỏng` ở toàn bộ 502 dòng.
- Cập nhật lựa chọn theo yêu cầu: câu 4 chuyển 21 ô `Không muốn trả lời` thành `Nam`; câu 6 chuyển 50 ô `Không muốn trả lời` thành `Trên 40 triệu đồng`. Đây là điều chỉnh dữ liệu mô phỏng, không suy diễn thu nhập hay giới tính của người thật. Các ô khác và dấu thời gian giữ nguyên. Bản trước cập nhật có đuôi `.before-option-update.bak`.
- `Rubyred (Câu trả lời).xlsx` là file riêng có 2 phản hồi, không phải bản Excel xuất từ CSV; được giữ nguyên.
- Phần trăm thực tế và độ lệch dưới đây làm tròn 2 chữ số thập phân; độ lệch tính bằng điểm phần trăm.

- Độ lệch lớn nhất so với tỷ lệ mục tiêu: **0.139 điểm phần trăm**.
## 1. Bạn có đang sinh sống tại TP. Hồ Chí Minh?

Số câu trả lời có dữ liệu: **502 / 502**.

| Lựa chọn | Mục tiêu | Số lượng | Tỷ lệ thực tế | Độ lệch |
| --- | ---: | ---: | ---: | ---: |
| Có | 84.4% | 424 | 84.46% | +0.06 |
| Không | 15.6% | 78 | 15.54% | -0.06 |

## 2. Trong 3 tháng gần đây, bạn có mua trái cây tươi nhập khẩu không?

Số câu trả lời có dữ liệu: **502 / 502**.

| Lựa chọn | Mục tiêu | Số lượng | Tỷ lệ thực tế | Độ lệch |
| --- | ---: | ---: | ---: | ---: |
| Có | 69% | 346 | 68.92% | -0.08 |
| Không | 31% | 156 | 31.08% | +0.08 |

## 3. Trước khảo sát này, bạn đã từng nghe nói hoặc biết đến sản phẩm Kiwi đỏ Zespri chưa?

Số câu trả lời có dữ liệu: **502 / 502**.

| Lựa chọn | Mục tiêu | Số lượng | Tỷ lệ thực tế | Độ lệch |
| --- | ---: | ---: | ---: | ---: |
| Đã biết và từng mua | 15.2% | 76 | 15.14% | -0.06 |
| Đã biết nhưng chưa mua | 20.3% | 102 | 20.32% | +0.02 |
| Chưa biết đến | 64.5% | 324 | 64.54% | +0.04 |

## 4. Giới tính của bạn là?

Số câu trả lời có dữ liệu: **502 / 502**.

| Lựa chọn | Mục tiêu | Số lượng | Tỷ lệ thực tế | Độ lệch |
| --- | ---: | ---: | ---: | ---: |
| Nam | 21% | 106 | 21.12% | +0.12 |
| Nữ | 79% | 396 | 78.88% | -0.12 |

## 5. Độ tuổi của bạn là?

Số câu trả lời có dữ liệu: **502 / 502**.

| Lựa chọn | Mục tiêu | Số lượng | Tỷ lệ thực tế | Độ lệch |
| --- | ---: | ---: | ---: | ---: |
| 18-24 tuổi | 31% | 156 | 31.08% | +0.08 |
| 25-34 tuổi | 56.1% | 282 | 56.18% | +0.08 |
| 35-44 tuổi | 8% | 40 | 7.97% | -0.03 |
| Từ 45 tuổi trở lên | 4.8% | 24 | 4.78% | -0.02 |

## 6. Thu nhập trung bình hằng tháng của bạn

Số câu trả lời có dữ liệu: **502 / 502**.

| Lựa chọn | Mục tiêu | Số lượng | Tỷ lệ thực tế | Độ lệch |
| --- | ---: | ---: | ---: | ---: |
| Dưới 15 triệu đồng | 40.3% | 202 | 40.24% | -0.06 |
| Từ 15 đến dưới 25 triệu đồng | 39.6% | 199 | 39.64% | +0.04 |
| Từ 25 đến 40 triệu đồng | 10.2% | 51 | 10.16% | -0.04 |
| Trên 40 triệu đồng | 9.9% | 50 | 9.96% | +0.06 |

## 7. Tôi bị hấp dẫn bởi hương vị ngọt ngào của Kiwi đỏ (RubyRed) Zespri.

Số câu trả lời có dữ liệu: **502 / 502**.

| Lựa chọn | Mục tiêu | Số lượng | Tỷ lệ thực tế | Độ lệch |
| --- | ---: | ---: | ---: | ---: |
| 1 | 3.5% | 17 | 3.39% | -0.11 |
| 2 | 4.8% | 24 | 4.78% | -0.02 |
| 3 | 26.6% | 134 | 26.69% | +0.09 |
| 4 | 34% | 171 | 34.06% | +0.06 |
| 5 | 31% | 156 | 31.08% | +0.08 |

Điểm trung bình: **3.85 / 5**.

## 8. Tôi cảm thấy an tâm vì Kiwi đỏ được lai tạo tự nhiên, không biến đổi gen.

Số câu trả lời có dữ liệu: **502 / 502**.

| Lựa chọn | Mục tiêu | Số lượng | Tỷ lệ thực tế | Độ lệch |
| --- | ---: | ---: | ---: | ---: |
| 1 | 3.2% | 16 | 3.19% | -0.01 |
| 2 | 4.8% | 24 | 4.78% | -0.02 |
| 3 | 9.5% | 48 | 9.56% | +0.06 |
| 4 | 42.9% | 215 | 42.83% | -0.07 |
| 5 | 39.6% | 199 | 39.64% | +0.04 |

Điểm trung bình: **4.11 / 5**.

## 9. Kiwi đỏ có sắc tố tự nhiên Anthocyanin giúp chống oxy hóa và bảo vệ sức khỏe tim mạch là lý do thuyết phục tôi mua hàng.

Số câu trả lời có dữ liệu: **502 / 502**.

| Lựa chọn | Mục tiêu | Số lượng | Tỷ lệ thực tế | Độ lệch |
| --- | ---: | ---: | ---: | ---: |
| 1 | 4.1% | 21 | 4.18% | +0.08 |
| 2 | 5.4% | 27 | 5.38% | -0.02 |
| 3 | 28.1% | 141 | 28.09% | -0.01 |
| 4 | 32.3% | 162 | 32.27% | -0.03 |
| 5 | 30.1% | 151 | 30.08% | -0.02 |

Điểm trung bình: **3.79 / 5**.

## 10. Hàm lượng Vitamin C tự nhiên trong Kiwi đỏ là khoảng 189 mg/ 100g phần thịt quả. Tôi đánh giá cao điều này.

Số câu trả lời có dữ liệu: **502 / 502**.

| Lựa chọn | Mục tiêu | Số lượng | Tỷ lệ thực tế | Độ lệch |
| --- | ---: | ---: | ---: | ---: |
| 1 | 4.5% | 22 | 4.38% | -0.12 |
| 2 | 6.1% | 31 | 6.18% | +0.08 |
| 3 | 41.4% | 208 | 41.43% | +0.03 |
| 4 | 38.5% | 193 | 38.45% | -0.05 |
| 5 | 9.5% | 48 | 9.56% | +0.06 |

Điểm trung bình: **3.43 / 5**.

## 11. Tôi cảm thấy yên tâm khi thông tin Kiwi đỏ trên website/app giống với chuỗi cửa hàng vật lý.

Số câu trả lời có dữ liệu: **502 / 502**.

| Lựa chọn | Mục tiêu | Số lượng | Tỷ lệ thực tế | Độ lệch |
| --- | ---: | ---: | ---: | ---: |
| 1 | 3% | 15 | 2.99% | -0.01 |
| 2 | 5% | 25 | 4.98% | -0.02 |
| 3 | 10.8% | 54 | 10.76% | -0.04 |
| 4 | 41.8% | 210 | 41.83% | +0.03 |
| 5 | 39.4% | 198 | 39.44% | +0.04 |

Điểm trung bình: **4.10 / 5**.

## 12. Tôi cảm thấy yên tâm về độ tươi ngon của Kiwi đỏ khi đặt mua trên website/app và được giao trong vòng 2 giờ.

Số câu trả lời có dữ liệu: **502 / 502**.

| Lựa chọn | Mục tiêu | Số lượng | Tỷ lệ thực tế | Độ lệch |
| --- | ---: | ---: | ---: | ---: |
| 1 | 3.5% | 17 | 3.39% | -0.11 |
| 2 | 4.5% | 23 | 4.58% | +0.08 |
| 3 | 11.3% | 57 | 11.35% | +0.05 |
| 4 | 39.8% | 200 | 39.84% | +0.04 |
| 5 | 40.9% | 205 | 40.84% | -0.06 |

Điểm trung bình: **4.10 / 5**.

## 13. Tôi thấy việc đặt online rồi nhận tại cửa hàng là tiện lợi, vì tôi có thể tự kiểm tra độ chín của quả.

Số câu trả lời có dữ liệu: **502 / 502**.

| Lựa chọn | Mục tiêu | Số lượng | Tỷ lệ thực tế | Độ lệch |
| --- | ---: | ---: | ---: | ---: |
| 1 | 2.4% | 12 | 2.39% | -0.01 |
| 2 | 5.2% | 26 | 5.18% | -0.02 |
| 3 | 10.2% | 51 | 10.16% | -0.04 |
| 4 | 42.6% | 214 | 42.63% | +0.03 |
| 5 | 39.6% | 199 | 39.64% | +0.04 |

Điểm trung bình: **4.12 / 5**.

## 14. Tôi thấy dễ dàng chuyển từ xem quảng cáo Kiwi đỏ trên mạng xã hội sang đặt mua trực tiếp trên ứng dụng hoặc mua tại siêu thị.

Số câu trả lời có dữ liệu: **502 / 502**.

| Lựa chọn | Mục tiêu | Số lượng | Tỷ lệ thực tế | Độ lệch |
| --- | ---: | ---: | ---: | ---: |
| 1 | 5.2% | 26 | 5.18% | -0.02 |
| 2 | 5.8% | 29 | 5.78% | -0.02 |
| 3 | 40.7% | 204 | 40.64% | -0.06 |
| 4 | 39.2% | 197 | 39.24% | +0.04 |
| 5 | 9.1% | 46 | 9.16% | +0.06 |

Điểm trung bình: **3.41 / 5**.

## 15. Kiwi đỏ chỉ có theo mùa, từ tháng 4 đến tháng 6, nên tôi muốn mua sớm.

Số câu trả lời có dữ liệu: **502 / 502**.

| Lựa chọn | Mục tiêu | Số lượng | Tỷ lệ thực tế | Độ lệch |
| --- | ---: | ---: | ---: | ---: |
| 1 | 4.3% | 21 | 4.18% | -0.12 |
| 2 | 5.9% | 30 | 5.98% | +0.08 |
| 3 | 42.2% | 212 | 42.23% | +0.03 |
| 4 | 37.4% | 188 | 37.45% | +0.05 |
| 5 | 10.2% | 51 | 10.16% | -0.04 |

Điểm trung bình: **3.43 / 5**.

## 16. Vì Kiwi đỏ chỉ bán khoảng 8 tuần trên kệ, tôi muốn mua trước khi hết hàng.

Số câu trả lời có dữ liệu: **502 / 502**.

| Lựa chọn | Mục tiêu | Số lượng | Tỷ lệ thực tế | Độ lệch |
| --- | ---: | ---: | ---: | ---: |
| 1 | 3.3% | 17 | 3.39% | +0.09 |
| 2 | 4.3% | 22 | 4.38% | +0.08 |
| 3 | 11.5% | 58 | 11.55% | +0.05 |
| 4 | 40.5% | 203 | 40.44% | -0.06 |
| 5 | 40.3% | 202 | 40.24% | -0.06 |

Điểm trung bình: **4.10 / 5**.

## 17. Kiwi đỏ được phân phối với số lượng có hạn, điều đó khiến tôi thấy sản phẩm đặc biệt hơn.

Số câu trả lời có dữ liệu: **502 / 502**.

| Lựa chọn | Mục tiêu | Số lượng | Tỷ lệ thực tế | Độ lệch |
| --- | ---: | ---: | ---: | ---: |
| 1 | 5% | 25 | 4.98% | -0.02 |
| 2 | 9.1% | 46 | 9.16% | +0.06 |
| 3 | 65.2% | 328 | 65.34% | +0.14 |
| 4 | 15.2% | 76 | 15.14% | -0.06 |
| 5 | 5.4% | 27 | 5.38% | -0.02 |

Điểm trung bình: **3.07 / 5**.

## 18. Tôi có ý định mua Kiwi đỏ trong mùa vụ năm nay.

Số câu trả lời có dữ liệu: **502 / 502**.

| Lựa chọn | Mục tiêu | Số lượng | Tỷ lệ thực tế | Độ lệch |
| --- | ---: | ---: | ---: | ---: |
| 1 | 3% | 15 | 2.99% | -0.01 |
| 2 | 5.4% | 27 | 5.38% | -0.02 |
| 3 | 10.6% | 53 | 10.56% | -0.04 |
| 4 | 41.1% | 206 | 41.04% | -0.06 |
| 5 | 40% | 201 | 40.04% | +0.04 |

Điểm trung bình: **4.10 / 5**.

## 19. Kiwi đỏ có giá cao hơn trái cây thông thường [giá tham khảo: 300.000 đồng/kg]. Tôi sẵn sàng trả mức giá này để mua.

Số câu trả lời có dữ liệu: **502 / 502**.

| Lựa chọn | Mục tiêu | Số lượng | Tỷ lệ thực tế | Độ lệch |
| --- | ---: | ---: | ---: | ---: |
| 1 | 4.6% | 23 | 4.58% | -0.02 |
| 2 | 6.3% | 32 | 6.37% | +0.07 |
| 3 | 40.1% | 201 | 40.04% | -0.06 |
| 4 | 39.6% | 199 | 39.64% | +0.04 |
| 5 | 9.3% | 47 | 9.36% | +0.06 |

Điểm trung bình: **3.43 / 5**.

## 20. Tôi sẽ cân nhắc mua Kiwi đỏ để biếu tặng và dùng cho gia đình trong mùa vụ này.

Số câu trả lời có dữ liệu: **502 / 502**.

| Lựa chọn | Mục tiêu | Số lượng | Tỷ lệ thực tế | Độ lệch |
| --- | ---: | ---: | ---: | ---: |
| 1 | 4.1% | 20 | 3.98% | -0.12 |
| 2 | 6.7% | 34 | 6.77% | +0.07 |
| 3 | 38.8% | 195 | 38.84% | +0.04 |
| 4 | 41.6% | 209 | 41.63% | +0.03 |
| 5 | 8.7% | 44 | 8.76% | +0.06 |

Điểm trung bình: **3.44 / 5**.

## 21. Tôi dự định sẽ tiếp tục tái đặt hàng qua ứng dụng giao nhanh sau khi đã trải nghiệm dùng thử tại điểm bán.

Số câu trả lời có dữ liệu: **502 / 502**.

| Lựa chọn | Mục tiêu | Số lượng | Tỷ lệ thực tế | Độ lệch |
| --- | ---: | ---: | ---: | ---: |
| 1 | 3.9% | 20 | 3.98% | +0.08 |
| 2 | 5.2% | 26 | 5.18% | -0.02 |
| 3 | 29.4% | 148 | 29.48% | +0.08 |
| 4 | 32.7% | 164 | 32.67% | -0.03 |
| 5 | 28.8% | 144 | 28.69% | -0.11 |

Điểm trung bình: **3.77 / 5**.

