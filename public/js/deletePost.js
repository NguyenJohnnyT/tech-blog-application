const deletePostHandler = async (event) => {
    event.preventDefault();
    // console.log(event);

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
      ];
    
    // console.log(id);
    const response = await fetch (`/blog/edit/${id}`, {
        method: "DELETE",
    });
    
    if (response.ok) {
        alert('Blogpost deleted.');
        document.location.replace('/')
    } else {
        alert('Failed to delete blogpost');
    };
};

document
  .querySelector('#delPostBtn')
  .addEventListener('click', deletePostHandler);