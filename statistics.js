const chartColors = ['#3366cc', '#c44432', '#ba7600', '#308045', '#8c4396'];
const integerFormat = new Intl.NumberFormat('vi-VN');
const percentFormat = new Intl.NumberFormat('vi-VN', { maximumFractionDigits: 1 });
const percent = (count, total) => `${percentFormat.format(total ? count / total * 100 : 0)}%`;
const formatCount = count => integerFormat.format(count);

// Các tab không reset hoặc thay đổi câu trả lời đang điền.
const tabs = [...document.querySelectorAll('[role="tab"]')];
function selectTab(tab) {
  tabs.forEach(item => {
    const active = item === tab;
    item.setAttribute('aria-selected', String(active));
    item.tabIndex = active ? 0 : -1;
    document.getElementById(item.getAttribute('aria-controls')).hidden = !active;
  });
  document.querySelector('#survey-description').hidden = tab.id !== 'questions-tab';
}
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectTab(tab));
  tab.addEventListener('keydown', event => {
    let target;
    if (event.key === 'ArrowRight') target = tabs[(index + 1) % tabs.length];
    if (event.key === 'ArrowLeft') target = tabs[(index + tabs.length - 1) % tabs.length];
    if (event.key === 'Home') target = tabs[0];
    if (event.key === 'End') target = tabs[tabs.length - 1];
    if (!target) return;
    event.preventDefault();
    selectTab(target);
    target.focus();
  });
});

function svgElement(tag, attributes, text) {
  const node = document.createElementNS('http://www.w3.org/2000/svg', tag);
  Object.entries(attributes).forEach(([key, value]) => node.setAttribute(key, value));
  if (text) node.textContent = text;
  return node;
}

function pieChart(entries, total) {
  const svg = svgElement('svg', { viewBox: '0 0 240 240', class: 'pie-chart', 'aria-hidden': 'true' });
  let angle = -Math.PI / 2;
  entries.forEach(([label, count], index) => {
    if (!count || !total) return;
    const sweep = count / total * 2 * Math.PI;
    const end = angle + sweep;
    const point = theta => [120 + 106 * Math.cos(theta), 120 + 106 * Math.sin(theta)];
    const startPoint = point(angle);
    const endPoint = point(end);
    const shape = count === total
      ? svgElement('circle', { cx: 120, cy: 120, r: 106, fill: chartColors[index] })
      : svgElement('path', { d: `M120,120 L${startPoint} A106,106 0 ${sweep > Math.PI ? 1 : 0},1 ${endPoint} Z`, fill: chartColors[index], stroke: 'white', 'stroke-width': 1 });
    shape.append(svgElement('title', {}, `${label}: ${formatCount(count)} (${percent(count, total)})`));
    svg.append(shape);
    if (count / total >= .06) {
      const middle = angle + sweep / 2;
      svg.append(svgElement('text', { x: 120 + 69 * Math.cos(middle), y: 120 + 69 * Math.sin(middle), 'text-anchor': 'middle', 'dominant-baseline': 'middle', class: 'pie-percentage' }, percent(count, total)));
    }
    angle = end;
  });
  return svg;
}

function countTable(entries, total) {
  const table = element('table', 'chart-table');
  table.append(element('caption', 'visually-hidden', 'Số lượng và tỷ lệ câu trả lời theo lựa chọn'));
  const head = element('thead');
  const header = element('tr');
  ['Lựa chọn', 'Số lượng', 'Tỷ lệ'].forEach(text => {
    const cell = element('th', '', text);
    cell.scope = 'col';
    header.append(cell);
  });
  head.append(header);
  table.append(head);
  const body = element('tbody');
  entries.forEach(([label, count], index) => {
    const row = element('tr');
    const name = element('th');
    name.scope = 'row';
    const swatch = element('span', 'chart-swatch');
    swatch.style.backgroundColor = chartColors[index];
    swatch.setAttribute('aria-hidden', 'true');
    name.append(swatch, document.createTextNode(label));
    row.append(name, element('td', '', formatCount(count)), element('td', '', percent(count, total)));
    body.append(row);
  });
  table.append(body);
  return table;
}

function barChart(entries, total) {
  const chart = element('div', 'bar-chart');
  // Bảng số liệu bên dưới cung cấp nội dung tương đương cho trình đọc màn hình.
  chart.setAttribute('aria-hidden', 'true');
  const maximum = Math.max(150, Math.ceil(Math.max(...entries.map(([, count]) => count)) / 150) * 150);
  const axis = element('div', 'bar-axis');
  for (let step = 3; step >= 0; step--) axis.append(element('span', '', formatCount(maximum * step / 3)));
  const plot = element('div', 'bar-plot');
  entries.forEach(([label, count]) => {
    const column = element('div', 'bar-column');
    const bar = element('div', 'bar-fill');
    bar.style.height = `${count / maximum * 100}%`;
    bar.title = `${label}: ${formatCount(count)} (${percent(count, total)})`;
    bar.append(element('span', 'bar-value', `${formatCount(count)} (${percent(count, total)})`));
    column.append(bar, element('span', 'bar-label', label));
    plot.append(column);
  });
  chart.append(axis, plot);
  return chart;
}

function renderStatistics(responseData, ids = { badge: 'response-badge', total: 'response-total', dates: 'response-dates', charts: 'statistics-charts' }) {
  document.querySelector(`#${ids.badge}`).textContent = formatCount(responseData.total);
  document.querySelector(`#${ids.total}`).textContent = `${formatCount(responseData.total)} câu trả lời`;
  document.querySelector(`#${ids.dates}`).textContent = responseData.total
    ? `Từ ${responseData.firstResponse} đến ${responseData.lastResponse}`
    : 'CSV chưa có phản hồi.';
  let questionIndex = 0;
  const charts = document.querySelector(`#${ids.charts}`);
  charts.replaceChildren();
  survey.sections.forEach(section => {
  charts.append(element('h2', 'statistics-section-title', section.title));
  section.questions.forEach(question => {
    const counts = responseData.counts[questionIndex];
    const choices = question.options || ['1', '2', '3', '4', '5'];
    const entries = choices.map(choice => [choice, counts[choice] || 0]);
    const total = entries.reduce((sum, [, count]) => sum + count, 0);
    const card = element('article', 'card statistics-card');
    card.dataset.question = question.id;
    const title = element('h3', 'statistics-question', `${questionIndex + 1}. ${question.text}`);
    title.id = `stats-${question.id}`;
    card.setAttribute('aria-labelledby', title.id);
    card.append(title, element('p', 'statistics-meta', `${formatCount(total)} câu trả lời`));
    if (!total) {
      card.append(element('p', 'statistics-meta', 'Chưa có dữ liệu cho câu hỏi này. Điền các ô tương ứng trong CSV để hiển thị thống kê; ô trống không được tính là điểm 0.'));
      charts.append(card);
      questionIndex++;
      return;
    }
    if (question.options) {
      const layout = element('div', 'pie-layout');
      layout.append(pieChart(entries, total), countTable(entries, total));
      card.append(layout);
    } else {
      if (question.group) card.append(element('p', 'statistics-group', question.group));
      const mean = total ? entries.reduce((sum, [value, count]) => sum + Number(value) * count, 0) / total : 0;
      card.append(element('p', 'mean-score', `Điểm trung bình: ${new Intl.NumberFormat('vi-VN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(mean)} / 5`));
      card.append(barChart(entries, total));
      card.append(element('p', 'statistics-meta scale-key', '1: Hoàn toàn không đồng ý · 2: Không đồng ý · 3: Trung lập · 4: Đồng ý · 5: Hoàn toàn đồng ý'));
      const details = element('details', 'chart-details');
      details.append(element('summary', '', 'Xem bảng số liệu'), countTable(entries, total));
      card.append(details);
    }
    charts.append(card);
    questionIndex++;
  });
  });
}

function startSync(source, statusId, ids) {
  const syncStatus = document.querySelector(`#${statusId}`);
  let previousCSV = null;
  async function sync() {
    try {
      const response = await fetch(encodeURIComponent(source), { cache: 'no-store', signal: AbortSignal.timeout(10000) });
      if (!response.ok) throw new Error(`Không đọc được CSV (HTTP ${response.status}).`);
      const text = await response.text();
      if (text !== previousCSV) {
        renderStatistics(aggregateCSV(text), ids);
        previousCSV = text;
      }
      syncStatus.classList.remove('sync-error');
      syncStatus.textContent = `Đã đồng bộ CSV · Kiểm tra lúc ${new Date().toLocaleTimeString('vi-VN')} · Tự kiểm tra mỗi 5 giây.`;
    } catch (error) {
      syncStatus.classList.add('sync-error');
      syncStatus.textContent = `${error.message} ${previousCSV === null ? 'Chưa có số liệu để hiển thị.' : 'Đang giữ số liệu của lần đọc thành công gần nhất.'} Sẽ tự thử lại sau 5 giây.`;
    } finally {
      window.setTimeout(sync, 5000);
    }
  }
  if (location.protocol === 'file:') {
    syncStatus.classList.add('sync-error');
    syncStatus.textContent = 'Không thể tự đọc CSV khi mở bằng file://. Hãy chạy: python3 -m http.server 8080 --bind 127.0.0.1 trong thư mục website, rồi mở http://localhost:8080.';
  } else {
    sync();
  }
}

document.querySelector('#response-source').textContent = csvSource;
document.querySelector('#clean-source').textContent = cleanCsvSource;
startSync(csvSource, 'sync-status', { badge: 'response-badge', total: 'response-total', dates: 'response-dates', charts: 'statistics-charts' });
startSync(cleanCsvSource, 'clean-sync-status', { badge: 'clean-badge', total: 'clean-total', dates: 'clean-dates', charts: 'clean-charts' });
