//Takes user to self.handlebars
//Populate values

const updatePostHandler = async (event) => {
    event.preventDefault();
    console.log(event);

    // const id = window.location.toString().split('/')[
    //     window.location.toString().split('/').length - 1
    //   ];

    // const response = await fetch (`/api/blog/edit/${id}`, {
    //     method: "DELETE",
    // });
    
    // if (response.ok) {
    //     document.location.replace('/');
    //     alert('Blogpost deleted.');
    // } else {
    //     alert('Failed to delete blogpost');
    // };
};

document
  .querySelector('#editPostBtn')
  .addEventListener('click', updatePostHandler);