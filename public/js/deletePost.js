//delete a post
async function deleteFormHandler(event) {
    event.preventDefault();

    //get the id
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
        ];

    //send to the route
    const res = await fetch(`/api/posts/${id}`, {
        method: 'DELETE'
      });

      //if everything worked then go back to the dashboard page
    if (res.ok) {
        document.location.replace('/dashboard');
      } else {
        alert("Cannot delete this post");
      }
  }
  
  //eventlistener
  document.querySelector('.deletePost').addEventListener('click', deleteFormHandler);