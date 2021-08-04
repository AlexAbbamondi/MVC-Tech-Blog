const loginFormHandler = async (event) => {
    event.preventDefault();
  
    const username = document.querySelector('#usernameLogin').value.trim();
    const password = document.querySelector('#passwordLogin').value.trim();
  
    if (username && password) {
      const res = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ 
          username, 
          password 
        }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (res.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to log in');
      }
    }
  };
  
  document.querySelector('.loginForm').addEventListener('submit', loginFormHandler);
  