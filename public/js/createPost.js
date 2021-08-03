const addPost = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#new-post-title').value.trim();
    const content = document.querySelector('#new-post-content').value.trim();

    if (title && content) {
        const response = await fetch ('/dashboard/add', {
            method: 'POST',
            body: JSON.stringify({ title, content}),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            alert('Blog posted!');
            document.location.replace('/dashboard');
        } else {
            alert ('Failed to create new blogpost');
        }
    }
}

document.querySelector('#addPostBtn').addEventListener('click', addPost)