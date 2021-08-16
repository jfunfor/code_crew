function createTaskItem(task) {
    let divTask, inputTaskName, inputTaskIsCompleted, labelTaskIsCompleted, btnDeleteTask;

    divTask = document.createElement('div');
    divTask.id = 'divTask' + task.id;
    divTask.className = "list-todos__item";

    inputTaskIsCompleted = document.createElement('input');
    inputTaskIsCompleted.type = 'checkbox';
    inputTaskIsCompleted.id = 'chb' + task.id;
    inputTaskIsCompleted.checked = task.is_active;
    inputTaskIsCompleted.className = "list-todos__chb"

    labelTaskIsCompleted = document.createElement('label');
    labelTaskIsCompleted.className = "list-todos__invisible-lbl";
    labelTaskIsCompleted.htmlFor = 'chb' + task.id;

    inputTaskName = document.createElement('input');
    inputTaskName.value = task.title_of_task;
    inputTaskName.className = "inputs-style list-todos__input";

    btnDeleteTask = document.createElement('button');
    btnDeleteTask.className = 'list-todos__btn-del';
    btnDeleteTask.onclick = () => deleteTask(task.id);


    divTask.appendChild(inputTaskIsCompleted);
    divTask.appendChild(labelTaskIsCompleted);
    divTask.appendChild(inputTaskName);
    divTask.appendChild(btnDeleteTask);

    return divTask;
}


function renderTasks() {
    fetch('/api/tasks')
    .then(response => response.json())
    .then(data => {
        todosList = document.getElementById('todos__list');
        tasks = data.forEach((task) => {
            divTask = createTaskItem(task);
            todosList.appendChild(divTask);
        });
    })
}


function deleteTask(taskId) {
    fetch('/api/tasks/' + taskId, {method: 'DELETE'}).then(() => document.getElementById('divTask' + taskId).remove())
}


function searchTask(element) {
    if(event.key === 'Enter' && element.value) {
        fetch('/api/tasks/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
              },
            body: JSON.stringify({'title_of_task': element.value})
        })
        .then(response => response.json())
        .then(task => {
            document.getElementById('todos__list').appendChild(createTaskItem(task));
            document.getElementById('search-todos__input').value = '';
        });
    }
}


renderTasks();