document.getElementById('signupForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value;
  console.log(name);
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const branch = document.getElementById('branch').value;
  const collegeId = document.getElementById('collegeId').value;

  try {
    const res = await fetch('http://localhost:5000/api/signup', { 
      method: 'POST',
      // headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, username, password, branch, collegeId })
    });

    const data = await res.json();
    alert(data.message || data.error);

    if (res.ok) {
      window.location.href = 'login.html';
    }
  } catch (err) {
    console.error(err);
    alert('Error signing up. Check console.');
  }
});
