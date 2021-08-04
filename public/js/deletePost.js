async function deleteFormHandler(event) {
    event.preventDefault();

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
        ];

    const res = await fetch(`/api/posts/${id}`, {
        method: 'DELETE'
      });

    if (res.ok) {
        document.location.replace('/dashboard');
      } else {
        alert("Cannot delete this post");
      }
  }
  
  document.querySelector('.deletePost').addEventListener('click', deleteFormHandler);