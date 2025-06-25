document.getElementById('registerForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = document.getElementById('username').value;
  const branch = document.getElementById('branch').value;

  const res = await fetch('/api/register-course', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, branch })
  });

  const data = await res.json();
  alert(data.message || data.error);
});