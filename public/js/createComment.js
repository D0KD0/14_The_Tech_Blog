const createCommentForm = document.querySelector(".comment-form");

const createCommentFormHandler = async (event) => {
    event.preventDefault();

    const comment = document.querySelector('#comment').value.trim();
    const blog_id = document.querySelector('#blogID').value.trim();

    if (comment) {
        const response = await fetch(`/api/comments/${blog_id}`, {
            method: 'POST',
            body: JSON.stringify({"content": comment }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            // If successful, redirect the browser to the home page
            location.reload();
        } else {
            alert(response.statusText);
        }
    }
}

createCommentForm.addEventListener("submit", createCommentFormHandler)