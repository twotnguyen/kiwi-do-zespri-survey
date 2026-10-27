const csvSource = 'du-lieu-502-luot.csv';
const cleanCsvSource = 'du-lieu-393-mau-sach.csv';

// Hỗ trợ BOM, CRLF/LF, dấu phẩy và xuống dòng trong dấu ngoặc kép,
// cũng như dấu ngoặc kép được escape theo chuẩn CSV bằng hai dấu "".
function parseCSV(text) {
  const rows = [];
  let row = [];
  let value = '';
  let quoted = false;
  let closedQuote = false;
  const source = text.replace(/^\uFEFF/, '');
  for (let i = 0; i < source.length; i++) {
    const char = source[i];
    if (quoted) {
      if (char === '"') {
        if (source[i + 1] === '"') { value += '"'; i++; }
        else { quoted = false; closedQuote = true; }
      } else value += char;
    } else if (char === ',' || char === '\n' || char === '\r') {
      row.push(value);
      value = '';
      closedQuote = false;
      if (char !== ',') {
        rows.push(row);
        row = [];
        if (char === '\r' && source[i + 1] === '\n') i++;
      }
    } else if (char === '"' && !value && !closedQuote) {
      quoted = true;
    } else {
      if (closedQuote || char === '"') throw new Error('CSV có dấu ngoặc kép không hợp lệ.');
      value += char;
    }
  }
  if (quoted) throw new Error('CSV chưa đóng dấu ngoặc kép; có thể file đang được lưu.');
  if (row.length || value || closedQuote) rows.push([...row, value]);
  return rows.filter(fields => fields.some(field => field.trim()));
}

function aggregateCSV(text) {
  const rows = parseCSV(text);
  if (!rows.length) throw new Error('CSV không có dòng tiêu đề.');
  const normalize = value => value.trim().normalize('NFC');
  const headers = rows[0].map(normalize);
  const questions = survey.sections.flatMap(section => section.questions);
  const indexes = questions.map(question => {
    const index = headers.indexOf(normalize(question.text));
    if (index === -1) throw new Error(`CSV thiếu cột: ${question.text}`);
    return index;
  });
  const timestampIndex = headers.indexOf('Dấu thời gian');
  if (timestampIndex === -1) throw new Error('CSV thiếu cột Dấu thời gian.');
  const counts = questions.map(() => ({}));
  let first = null;
  let last = null;
  rows.slice(1).forEach((row, rowIndex) => {
    if (row.length !== headers.length) throw new Error(`Bản ghi ${rowIndex + 1} có số cột không đúng.`);
    const timestamp = row[timestampIndex].trim();
    const match = /^(\d{1,2})\/(\d{1,2})\/(\d{4}) (\d{1,2}):(\d{2}):(\d{2})$/.exec(timestamp);
    if (!match) throw new Error(`Bản ghi ${rowIndex + 1} có thời gian không đúng định dạng ngày/tháng/năm giờ:phút:giây.`);
    const [, day, month, year, hour, minute, second] = match.map(Number);
    const time = new Date(year, month - 1, day, hour, minute, second).getTime();
    if (!first || time < first.time) first = { time, label: timestamp };
    if (!last || time > last.time) last = { time, label: timestamp };
    questions.forEach((question, index) => {
      const answer = normalize(row[indexes[index]]);
      if (!answer) return;
      const choices = question.options || ['1', '2', '3', '4', '5'];
      const choice = choices.find(item => normalize(item) === answer);
      if (!choice) throw new Error(`Bản ghi ${rowIndex + 1}, câu ${index + 1} có lựa chọn không hợp lệ: ${answer}`);
      counts[index][choice] = (counts[index][choice] || 0) + 1;
    });
  });
  return { source: csvSource, total: rows.length - 1, firstResponse: first?.label, lastResponse: last?.label, counts };
}
