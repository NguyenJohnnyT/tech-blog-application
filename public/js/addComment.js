const addComment = async (event) => {
    // console.log(event);

    const content = document.querySelector('#add-comment-content').value.trim();
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const response = await fetch(`/blog/comment/add/${id}`, {
        method: "POST",
        body: JSON.stringify({
            content: content,
            blog_id: id
        }),
        headers: {'Content-type': 'application/json'}
    });

    if (response.ok) {
        document.location.reload();
        alert('Comment added.');
    }

}

document.querySelector('#addCommentBtn').addEventListener('click', addComment);