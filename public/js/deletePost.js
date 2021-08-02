const deletePostHandler = (event) => {
    event.preventDefault();

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
      ];

    const response = await fetch (`/api/blog/edit/${id}`, {
        method: "DELETE",
    });
    
    if (response.ok) {
        document.location.replace('/');
        alert('Blogpost deleted.');
    } else {
        alert('Failed to delete blogpost');
    };
};
// TODO: Add the delete button on post
document
  .querySelector('.delete-blogpost')
  .addEventListener('submit', deletePostHandler);