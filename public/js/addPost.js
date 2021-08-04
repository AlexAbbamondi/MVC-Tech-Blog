//create a new post
async function newFormHandler(event) {
    event.preventDefault();

    //get values from input
    const title = document.querySelector('#postTitle').value.trim();
    const body = document.querySelector('#postContent').value.trim();

    //send info to the route
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

    //if everything is ok then return to homepage
    if (res.ok) {
        document.location.replace('/');
    } else {
        alert("Cannot not add a post");
    }
}

//eventlistner
document.querySelector('.newPostForm').addEventListener('submit', newFormHandler);