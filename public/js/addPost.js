async function newFormHandler(event) {
    event.preventDefault();

    const title = document.querySelector('#postTitle').value.trim();
    const body = document.querySelector('#postContent').value.trim();

    const res = await fetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify({
            title,
            body
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (res.ok) {
        document.location.replace('/');
    } else {
        alert("Cannot not add a post");
    }
}

document.querySelector('.newPostForm').addEventListener('submit', newFormHandler);