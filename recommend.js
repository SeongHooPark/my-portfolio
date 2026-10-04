const API_URL =
  'https://recommendation-api-production-edf9.up.railway.app/api/recommendations';

async function loadRecommendations() {
  const response = await fetch(API_URL);
  const recommendations = await response.json();

  const list = document.getElementById('recommendation-list');
  list.innerHTML = '';

  if (recommendations.length === 0) {
    list.textContent = '아직 추천글이 없어요. 첫 추천글을 남겨주세요!';
    return;
  }

  recommendations.forEach((rec) => {
    const item = document.createElement('div');
    item.className = 'recommendation-item';

    const name = document.createElement('strong');
    name.textContent = rec.name;

    const relation = document.createElement('span');
    relation.textContent = ' · ' + rec.relation;

    const content = document.createElement('p');
    content.textContent = rec.content;

    item.append(name, relation, content);
    list.appendChild(item);
  });
}

loadRecommendations();

async function submitRecommendation() {
  const name = document.getElementById('rec-name').value;
  const relation = document.getElementById('rec-relation').value;
  const content = document.getElementById('rec-content').value;

  const missing = [];
  if (!name.trim()) missing.push('이름을 입력해주세요.');
  if (!relation.trim()) missing.push('관계를 입력해주세요.');
  if (!content.trim()) missing.push('추천 내용을 입력해주세요.');

  if (missing.length > 0) {
    alert(missing.join('\n'));
    return;
  }

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: name, relation: relation, content: content }),
  });

  if (!response.ok) {
    alert('등록에 실패했어요. 잠시 후 다시 시도해주세요.');
    return;
  }

  document.getElementById('rec-name').value = '';
  document.getElementById('rec-relation').value = '';
  document.getElementById('rec-content').value = '';

  loadRecommendations();
}

document
  .getElementById('rec-submit')
  .addEventListener('click', submitRecommendation);
