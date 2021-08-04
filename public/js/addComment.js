async function commentFormHandler(event) {
    event.preventDefault();
  
    const body = document.querySelector('#postContent').value.trim();
  
    const post_id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
  
    if (body) {
        const res = await fetch('/api/comments', {
          method: 'POST',
          body: JSON.stringify({
            post_id,
            body
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        });
      
        if (res.ok) {
          document.location.reload();
        } else {
          alert("Cannot add comment");
        }
      }
  }
  
  document.querySelector('.commentPostForm').addEventListener('submit', commentFormHandler);