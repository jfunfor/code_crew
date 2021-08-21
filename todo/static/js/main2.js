const urlFilterAll = 'api/tasks',
    urlFilterActive = 'api/filter_active',
    urlFilterCompleted = 'api/filter_completed',
    urlFilterClearCompleted = 'api/filter_clearCompleted';



document.getElementById('todos__workspace')
    .addEventListener('click',event => {
        let currentUrl = (event.target.innerHTML === 'All') ? urlFilterAll :
            (event.target.innerHTML === 'Active') ? urlFilterActive :
                (event.target.innerHTML === 'Completed') ? urlFilterCompleted :
                    (event.target.innerHTML === 'Clear completed') ? urlFilterClearCompleted : '';
        let taskId = (event.target.className === 'list-todos__btn-del') ? event.target.id : null;

        console.log(event.target);

        if (currentUrl != '') {
            renderTasks(currentUrl);
        }
        if (taskId != null) {
            deleteTask(taskId);
        }
})


function renderTasks(url) {
    let todosList, tasks, divTask, clearAllElements;
    // url = "/tasks"
    // paramsList = {filter: true, somethingElse: false}
    // funcApi(url, paramsList, httpHeaders)
    sendRequest('GET', url)
    .then(data => {
        todosList = document.getElementById('todos__list');
        console.log(todosList);
        tasks = data.forEach((task) => {
            divTask = createTaskItem(task);
            todosList.appendChild(divTask);
        });
    })
}

function deleteTask(taskId) {
    console.log(taskId);
    sendRequest('DELETE','/api/tasks/' + taskId)
        .then(() => document.getElementById('divTask' + taskId).remove())
}


function addTask(element) {
    if(event.key === 'Enter' && element.value) {
        sendRequest('POST','/api/tasks/',{'title_of_task': element.value})
            .then(task => {
            document.getElementById('todos__list').appendChild(createTaskItem(task));
            document.getElementById('search-todos__input').value = '';
        });
    }
}

function sendRequest(method, url, data) {
    return fetch(url, {
        method: method,
        body: JSON.stringify(data),
        headers: data ? {'Content-Type': 'application/json'} : {}
    }).then (response => {
        return response.statusText !="No Content" ? response.json() : null
    })
}

function createTaskItem(task) {
    let divTask, inputTaskName, inputTaskIsCompleted, labelTaskIsCompleted, btnDeleteTask;

    console.log(task.id);

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
    btnDeleteTask.id = task.id;


    divTask.appendChild(inputTaskIsCompleted);
    divTask.appendChild(labelTaskIsCompleted);
    divTask.appendChild(inputTaskName);
    divTask.appendChild(btnDeleteTask);

    return divTask;
}


renderTasks(urlFilterAll);