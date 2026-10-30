"""Tạo lại 15 cột Likert (câu 7-21) của dữ liệu MÔ PHỎNG từ mô hình nhân tố tiềm ẩn.

Giữ nguyên 502 dòng, dấu thời gian, câu sàng lọc, nhân khẩu học và phân bố từng câu
(gán lại theo thứ hạng điểm tiềm ẩn). Chỉ thay đổi cách các câu Likert đi cùng nhau.
Dữ liệu vẫn là mô phỏng, không phải kết quả khảo sát thực tế.
"""
import csv
import sys
import numpy as np

SEED = 20261006  # chọn trong dải 20261001-20261200: seed đạt tiêu chí EFA ở cả 502 và 393 mẫu
# TT4 và KH1 có hệ số tải thấp hơn nhưng vẫn đủ để Corrected Item-Total trên 0,3 (giữ đủ 15 biến).
LOADING = {'TT': [.80, .80, .80, .65], 'OC': [.84] * 4, 'KH': [.65, .80, .80], 'YD': [.78] * 4}
PHI = np.array([[1, .40, .40, .50],   # TT
                [.40, 1, .35, .45],   # OC
                [.40, .35, 1, .55],   # KH
                [.50, .45, .55, 1]])  # YD
FIRST, LAST = 7, 21  # cột Likert trong CSV: [7, 22)

def read(path):
    with open(path, encoding='utf-8-sig', newline='') as f:
        return list(csv.reader(f))

def write(path, rows):
    with open(path, 'w', encoding='utf-8-sig', newline='') as f:
        csv.writer(f, lineterminator='\r\n').writerows(rows)

def simulate(old):
    n = len(old)
    rng = np.random.default_rng(SEED)
    f = rng.multivariate_normal(np.zeros(4), PHI, size=n)
    cols = []
    for g, factor in zip(LOADING, f.T):
        for l in LOADING[g]:
            cols.append(l * factor + np.sqrt(1 - l * l) * rng.standard_normal(n))
    new = np.zeros((n, LAST - FIRST + 1), dtype=int)
    for j, z in enumerate(cols):
        values = np.sort(old[:, j])          # giữ đúng phân bố cũ của câu
        new[:, j] = values[np.argsort(np.argsort(z, kind='stable'), kind='stable')]
    return new

if __name__ == '__main__':
    src, dst502, dst393 = sys.argv[1:4]
    rows = read(src)
    head, body = rows[0], rows[1:]
    old = np.array([[int(r[i]) for i in range(FIRST, LAST + 1)] for r in body])
    new = simulate(old)
    for r, vals in zip(body, new):
        r[FIRST:LAST + 1] = [str(v) for v in vals]
    write(dst502, [head] + body)
    write(dst393, [head] + [r for r in body if r[1] == 'Có' and r[2] == 'Có'])
