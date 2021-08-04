//add a new comment
async function commentFormHandler(event) {
    event.preventDefault();
  
    //get the input
    const body = document.querySelector('#postContent').value.trim();
  
    //get the id
    const post_id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
  
    //send info to the route
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
      
        //reload page if everything worked
        if (res.ok) {
          document.location.reload();
        } else {
          alert("Cannot add comment");
        }
      }
  }
  
  //event listener
  document.querySelector('.commentPostForm').addEventListener('submit', commentFormHandler);