const editForm = document.querySelector(".edit-form");
const deleteBtn = document.querySelector("#deleteBtn");

const deleteBtnHandler = async (event) => {
    
    const id = document.getElementById("blogID").value.trim();
    if (id) {
        const response = await fetch(`/api/blogs/delete/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    } 
}

const editFormHandler = async (event) => {
    event.preventDefault();
    
    const title = document.querySelector('#title-edit').value.trim();
    const content = document.querySelector('#content-edit').value.trim();
    const id = document.getElementById("blogID").value.trim();
    if (title && content) {
        const response = await fetch(`/api/blogs/edit/${id}`, {
            method: 'PUT',
            body: JSON.stringify({title, content }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    } else {
        document.querySelector("#errors").textContent = "Title and Content could not be empty"
    }
}

editForm.addEventListener("submit", editFormHandler);
deleteBtn.addEventListener("click", deleteBtnHandler);