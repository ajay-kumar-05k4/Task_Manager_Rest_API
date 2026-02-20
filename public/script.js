async function fetchTasks() {
    const res = await fetch('/tasks');
    const tasks = await res.json();

    const list = document.getElementById('taskList');
    list.innerHTML = '';

    tasks.forEach(task => {
        list.innerHTML += `
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <div>
                    <strong>${task.title}</strong><br>
                    <small>${task.description}</small>
                </div>
                <div>
                    <button class="btn btn-warning btn-sm me-2" onclick="editTask(${task.id}, '${task.title}', '${task.description}')">Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteTask(${task.id})">Delete</button>
                </div>
            </li>
        `;
    });
}

async function addTask() {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;

    if (!title || !description) {
        alert("Please fill all fields");
        return;
    }

    await fetch('/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description })
    });

    document.getElementById('title').value = '';
    document.getElementById('description').value = '';

    fetchTasks();
}

async function deleteTask(id) {
    await fetch(`/tasks/${id}`, {
        method: 'DELETE'
    });

    fetchTasks();
}

function editTask(id, oldTitle, oldDescription) {
    document.getElementById('title').value = oldTitle;
    document.getElementById('description').value = oldDescription;

    const button = document.querySelector('button.btn-primary');
    button.textContent = "Update Task";
    button.onclick = () => updateTask(id);
}

async function updateTask(id) {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;

    await fetch(`/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description })
    });

    document.getElementById('title').value = '';
    document.getElementById('description').value = '';

    const button = document.querySelector('button.btn-primary');
    button.textContent = "Add Task";
    button.onclick = addTask;

    fetchTasks();
}

fetchTasks();