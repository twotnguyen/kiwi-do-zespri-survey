// Nội dung lấy từ Google Form gốc. Không thêm hoặc thay đổi lựa chọn trả lời.
const survey = {
  source: 'https://forms.gle/Aq6RbvtBnkmwi15M6',
  title: 'KHẢO SÁT CÁC YẾU TỐ ẢNH HƯỞNG ĐẾN Ý ĐỊNH MUA SẮM ĐA KÊNH ĐỐI VỚI SẢN PHẨM KIWI ĐỎ TẠI TP. HỒ CHÍ MINH',
  introduction: [
    'Xin chào bạn!',
    'Mình hiện đang thực hiện khóa luận tốt nghiệp với đề tài nghiên cứu về ý định mua sắm đa kênh đối với sản phẩm Kiwi đỏ (RubyRed) của nhãn hàng Zespri tại TP. Hồ Chí Minh. Khảo sát được thực hiện nhằm tìm hiểu nhận thức của người tiêu dùng về đặc tính sản phầm, trải nghiệm mua sắm đa kênh, cảm nhận về tính khan hiếm và ý định mua sản phẩm.',
    'Khảo sát chỉ phục vụ mục đích nghiên cứu học thuật. Các câu trả lời sẽ được tổng hợp và bảo mật, không sử dụng để xác định danh tính cá nhân. Rất mong bạn dành ít phút để hoàn thành bảng hỏi.',
    'Xin chân thành cảm ơn sự hỗ trợ của bạn!'
  ],
  scale: ['Hoàn toàn không đồng ý', 'Không đồng ý', 'Trung lập', 'Đồng ý', 'Hoàn toàn đồng ý'],
  sections: [
    { title: 'Phần 1: Thông tin sàng lọc', questions: [
      { id: 'q1', text: 'Bạn có đang sinh sống tại TP. Hồ Chí Minh?', options: ['Có', 'Không'] },
      { id: 'q2', text: 'Trong 3 tháng gần đây, bạn có mua trái cây tươi nhập khẩu không?', options: ['Có', 'Không'] },
      { id: 'q3', text: 'Trước khảo sát này, bạn đã từng nghe nói hoặc biết đến sản phẩm Kiwi đỏ Zespri chưa?', options: ['Đã biết và từng mua', 'Đã biết nhưng chưa mua', 'Chưa biết đến'] }
    ] },
    { title: 'Phần 2: Thông tin cơ bản', questions: [
      { id: 'q4', text: 'Giới tính của bạn là?', options: ['Nam', 'Nữ'] },
      { id: 'q5', text: 'Độ tuổi của bạn là?', options: ['18-24 tuổi', '25-34 tuổi', '35-44 tuổi', 'Từ 45 tuổi trở lên'] },
      { id: 'q6', text: 'Thu nhập trung bình hằng tháng của bạn', options: ['Dưới 15 triệu đồng', 'Từ 15 đến dưới 25 triệu đồng', 'Từ 25 đến 40 triệu đồng', 'Trên 40 triệu đồng'] }
    ] },
    { title: 'Phần 3: Đánh giá các thuộc tính nghiên cứu', questions: [
      { id: 'q7', group: 'Nhận thức thuộc tính sản phẩm (TT)', text: 'Tôi bị hấp dẫn bởi hương vị ngọt ngào của Kiwi đỏ (RubyRed) Zespri.' },
      { id: 'q8', text: 'Tôi cảm thấy an tâm vì Kiwi đỏ được lai tạo tự nhiên, không biến đổi gen.' },
      { id: 'q9', text: 'Kiwi đỏ có sắc tố tự nhiên Anthocyanin giúp chống oxy hóa và bảo vệ sức khỏe tim mạch là lý do thuyết phục tôi mua hàng.' },
      { id: 'q10', text: 'Hàm lượng Vitamin C tự nhiên trong Kiwi đỏ là khoảng 189 mg/ 100g phần thịt quả. Tôi đánh giá cao điều này.' },
      { id: 'q11', group: 'Trải nghiệm Omnichannel (OC)', text: 'Tôi cảm thấy yên tâm khi giá và thông tin Kiwi đỏ trên website/app giống với chuỗi cửa hàng vật lý.' },
      { id: 'q12', text: 'Giao hàng nhanh trong 2 giờ sẽ giúp tôi yên tâm về độ tươi ngon của quả, không bị dập hỏng do thịt quả mềm.' },
      { id: 'q13', text: 'Tôi thấy việc đặt online rồi nhận tại cửa hàng là tiện lợi, vì tôi có thể tự kiểm tra độ chín của quả.' },
      { id: 'q14', text: 'Tôi thấy dễ dàng mua Kiwi đỏ ngay sau khi xem thông tin trên mạng xã hội.' },
      { id: 'q15', group: 'Cảm nhận tính khan hiếm (KH)', text: 'Kiwi đỏ chỉ có theo mùa, từ tháng 4 đến tháng 6, nên tôi muốn mua sớm.' },
      { id: 'q16', text: 'Vì Kiwi đỏ chỉ bán khoảng 8 tuần trên kệ, tôi muốn mua trước khi hết hàng.' },
      { id: 'q17', text: 'Kiwi đỏ được phân phối với số lượng có hạn, điều đó khiến tôi thấy sản phẩm đặc biệt hơn.' },
      { id: 'q18', group: 'Ý định mua sắm đa kênh (YD)', text: 'Tôi có ý định mua Kiwi đỏ trong mùa vụ năm nay.' },
      { id: 'q19', text: 'Kiwi đỏ có giá cao hơn trái cây thông thường [giá tham khảo: 300.000 đồng/kg]. Tôi sẵn sàng trả mức giá này để mua.' },
      { id: 'q20', text: 'Tôi sẽ cân nhắc mua Kiwi đỏ để biếu tặng và dùng cho gia đình trong mùa vụ này.' },
      { id: 'q21', text: 'Tôi dự định sẽ tiếp tục tái đặt hàng qua ứng dụng giao nhanh sau khi đã trải nghiệm dùng thử tại điểm bán.' }
    ] }
  ]
};
