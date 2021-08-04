//Edit a post
async function editFormHandler(event) {
  event.preventDefault();

  //get the id
  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  //get the input values
  const title = document.querySelector('#postTitle').value;
  const body = document.querySelector('#postContent').value;

  //send the infor to the route
  const res = await fetch(`/api/posts/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      title,
      body,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  //if everything was ok then go back to the dashboard
  if (res.ok) {
    document.location.replace("/dashboard");
  } else {
    alert("Cannot update this post");
  }
}

//eventlistener
document.querySelector(".editPostForm").addEventListener("submit", editFormHandler);
