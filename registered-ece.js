async function loadApproved() {
  const res = await fetch('/api/admin/ece/approved');
  const data = await res.json();

  const container = document.getElementById('approvedList');
  container.innerHTML = '';

  data.forEach(student => {
    const p = document.createElement('p');
    p.textContent = `${student.name} (${student.username})`;
    container.appendChild(p);
  });
}

loadApproved();