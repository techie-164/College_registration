async function loadPending() {
  const res = await fetch('/api/admin/ece/requests');
  const data = await res.json();

  const container = document.getElementById('requests');
  container.innerHTML = '';

  data.forEach(student => {
    const div = document.createElement('div');
    div.innerHTML = `
      <p>${student.name} (${student.username})</p>
      <button onclick="approve('${student._id}')">Approve</button>
    `;
    container.appendChild(div);
  });
}

async function approve(id) {
  const res = await fetch('/api/admin/ece/approve', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id })
  });

  const data = await res.json();
  alert(data.message || data.error);
  loadPending();
}

loadPending();
