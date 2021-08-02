const deletePostHandler = (event) => {
    event.preventDefault();

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
      ];

    const response = await fetch (`/api/blog/${id}`, {
        method: "DELETE",
    });
    
    if (response.ok) {
        document.location.replace('/');
        alert('Blogpost deleted.');
    } else {
        alert('Failed to delete blogpost');
    };
};
// 
document
  .querySelector('.delete-blogpost')
  .addEventListener('submit', deletePostHandler);