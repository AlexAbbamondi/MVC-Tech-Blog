async function signupFormHandler(event) {
    event.preventDefault();

    const username = document.querySelector('#usernameSignup').value.trim();
    const password = document.querySelector('#passwordSignup').value.trim();

    if (username && password) {
        const res = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({
                username,
                password
            }),
            headers: {'Content-Type': 'application/json'}
        });

        if (res.ok) {
            alert('Account created!');
            document.location.replace('/dashboard');
        } else {
            alert("Cannot signup");
        }
    }
}

document.querySelector('.signupForm').addEventListener('submit', signupFormHandler);