const form = document.querySelector('#survey-form');
const sectionsRoot = document.querySelector('#sections');
const summary = document.querySelector('#validation-summary');
const success = document.querySelector('#success');

function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}

document.querySelector('#survey-title').textContent = survey.title;
survey.introduction.forEach(text => document.querySelector('#introduction').append(element('p', '', text)));

survey.sections.forEach((section, sectionIndex) => {
  const panel = element('section', 'survey-section');
  panel.setAttribute('aria-labelledby', `section-${sectionIndex}`);
  const heading = element('h2', 'section-heading', section.title);
  heading.id = `section-${sectionIndex}`;
  heading.tabIndex = -1;
  panel.append(heading);

  if (sectionIndex === 2) {
    const description = element('div', 'card section-description');
    description.append(element('p', '', 'Trong nghiên cứu này, mình tập trung đánh giá ba yếu tố có khả năng ảnh hưởng đến ý định mua sắm đa kênh đối với Kiwi đỏ, bao gồm:'));
    const groups = element('ul');
    section.questions.filter(q => q.group).forEach(q => groups.append(element('li', '', q.group.replace(/ \([A-Z]+\)$/, ''))));
    description.append(groups, element('p', '', 'Bạn hãy lựa chọn mức độ đồng ý phù hợp nhất với quan điểm của mình theo thang đo 5 mức độ:'));
    const scale = element('ol');
    survey.scale.forEach(text => scale.append(element('li', '', text)));
    description.append(scale, element('p', '', 'Không có câu trả lời đúng hay sai, mọi ý kiến của bạn đề có giá ý đối với nghiên cứu.'));
    panel.append(description);
  }

  section.questions.forEach(question => {
    if (question.group) panel.append(element('h3', 'group-title', question.group));
    const fieldset = element('fieldset', 'card question');
    fieldset.id = question.id;
    const legend = element('legend', '', question.text);
    const required = element('span', 'asterisk', '*');
    required.setAttribute('aria-label', 'bắt buộc');
    legend.append(required);
    fieldset.append(legend);
    const options = element('div', question.options ? 'options' : 'scale');
    (question.options || survey.scale).forEach((text, i) => {
      const label = element('label', question.options ? 'option' : 'scale-option');
      const input = document.createElement('input');
      input.type = 'radio';
      input.name = question.id;
      input.value = question.options ? text : String(i + 1);
      input.required = true;
      input.setAttribute('aria-describedby', `${question.id}-error`);
      if (!question.options) input.setAttribute('aria-label', `${i + 1} — ${text}`);
      const caption = element('span', '', question.options ? text : String(i + 1));
      label.append(...(question.options ? [input, caption] : [caption, input]));
      options.append(label);
    });
    fieldset.append(options);
    if (!question.options) {
      const endpoints = element('div', 'scale-endpoints');
      endpoints.setAttribute('aria-hidden', 'true');
      endpoints.append(element('span', '', survey.scale[0]), element('span', '', survey.scale[4]));
      fieldset.append(endpoints);
    }
    const error = element('p', 'error', 'Vui lòng trả lời câu hỏi này.');
    error.id = `${question.id}-error`;
    error.hidden = true;
    fieldset.append(error);
    panel.append(fieldset);
  });
  sectionsRoot.append(panel);
});

function setInvalid(fieldset, invalid) {
  fieldset.classList.toggle('invalid', invalid);
  fieldset.querySelector('.error').hidden = !invalid;
  fieldset.querySelectorAll('input').forEach(input => input.setAttribute('aria-invalid', String(invalid)));
}

form.addEventListener('change', event => {
  const fieldset = event.target.closest('fieldset');
  if (fieldset) setInvalid(fieldset, false);
  summary.textContent = '';
});

form.addEventListener('submit', event => {
  event.preventDefault();
  const unanswered = [...form.querySelectorAll('fieldset')].filter(fieldset => !fieldset.querySelector('input:checked'));
  form.querySelectorAll('fieldset').forEach(fieldset => setInvalid(fieldset, unanswered.includes(fieldset)));
  if (unanswered.length) {
    summary.textContent = `Còn ${unanswered.length} câu hỏi bắt buộc chưa được trả lời.`;
    unanswered[0].querySelector('input').focus({ preventScroll: true });
    unanswered[0].scrollIntoView({ block: 'center' });
    return;
  }
  form.hidden = true;
  success.hidden = false;
  success.focus({ preventScroll: true });
  success.scrollIntoView({ block: 'center' });
});

function resetSurvey() {
  form.reset();
  form.querySelectorAll('fieldset').forEach(fieldset => setInvalid(fieldset, false));
  form.hidden = false;
  success.hidden = true;
  summary.textContent = '';
  const heading = document.querySelector('#section-0');
  heading.focus({ preventScroll: true });
  heading.scrollIntoView({ block: 'start' });
}

document.querySelector('#clear').addEventListener('click', () => {
  if (window.confirm('Xóa toàn bộ câu trả lời?')) resetSurvey();
});
document.querySelector('#restart').addEventListener('click', resetSurvey);
