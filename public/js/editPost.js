async function editFormHandler(event) {
  event.preventDefault();

  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  const title = document.querySelector('#postTitle').value;
  const body = document.querySelector('#postContent').value;

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

  if (res.ok) {
    document.location.replace("/dashboard");
  } else {
    alert("Cannot update this post");
  }
}

document
  .querySelector(".editPostForm")
  .addEventListener("submit", editFormHandler);
