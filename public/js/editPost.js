//Takes user to self.handlebars
//Populate values

const updatePostHandler = async (event) => {
    event.preventDefault();
    // console.log(event);

    const title = document.querySelector('#edit-post-title').value.trim();
    const content = document.querySelector('#edit-post-content').value.trim();

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const response = await fetch (`/blog/edit/${id}`, {
        method: "PUT",
        body: JSON.stringify({
            title: title,
            content: content,
            edited: true,
        }),
        headers: {'Content-type': 'application/json'}
    });
    
    if (response.ok) {
        document.location.replace('/');
        alert('Blogpost edited.');
    } else {
        alert('Failed to delete blogpost');
    };
};

document
  .querySelector('#editPostBtn')
  .addEventListener('click', updatePostHandler);