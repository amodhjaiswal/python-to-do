// Fetch all tasks and display them
function fetchTasks() {
    fetch('/api/tasks')
        .then(response => response.json())
        .then(tasks => {
            const taskList = document.getElementById('taskList');
            taskList.innerHTML = '';
            tasks.forEach(task => {
                const listItem = document.createElement('li');
                listItem.textContent = task.title;

                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.onclick = () => deleteTask(task.id);

                listItem.appendChild(deleteButton);
                taskList.appendChild(listItem);
            });
        });
}

// Add a new task
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskTitle = taskInput.value.trim();

    if (taskTitle) {
        fetch('/api/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title: taskTitle })
        }).then(() => {
            taskInput.value = '';
            fetchTasks();
        });
    }
}

// Delete a task
function deleteTask(taskId) {
    fetch(`/api/tasks/${taskId}`, {
        method: 'DELETE'
    }).then(() => fetchTasks());
}

// Initial fetch of tasks
fetchTasks();

