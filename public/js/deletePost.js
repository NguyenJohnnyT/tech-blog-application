const deletePostHandler = async (event) => {
    event.preventDefault();
    // console.log(event);
    const confirmation = confirm('Really delete?')
    if (confirmation) {
        const id = window.location.toString().split('/')[
            window.location.toString().split('/').length - 1
        ];
        
        // console.log(id);
        const response = await fetch (`/blog/edit/${id}`, {
            method: "DELETE",
        });
        
        if (response.ok) {
            alert('Blogpost deleted.');
            document.location.replace('/dashboard')
        } else {
            alert('Failed to delete blogpost');
        };
    } else {
        return;
    }
};

document
  .querySelector('#delPostBtn')
  .addEventListener('click', deletePostHandler);