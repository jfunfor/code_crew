const   urlFilterAll = 'api/tasks',
        urlFilterActive = 'api/filter_active',
        urlFilterCompleted = 'api/filter_completed',
        urlFilterClearCompleted = 'api/filter_clearCompleted', // url api для кнопки Clear completed, можно изменить
        urlEditTask = 'api/edit_task';//url api для изменения названия таска, можно изменить
let     todos__workspace = document.getElementById('todos__workspace');


todos__workspace.addEventListener('click',event => {
    let currentUrl = (event.target.innerHTML === 'All') ? urlFilterAll :
        (event.target.innerHTML === 'Active') ? urlFilterActive :
            (event.target.innerHTML === 'Completed') ? urlFilterCompleted :
                (event.target.innerHTML === 'Clear completed') ? urlFilterClearCompleted : '';
    let taskId = (event.target.className === 'list-todos__btn-del') ? event.target.id : null;
    if (currentUrl !== '') {
        renderTasks(currentUrl);
    }
    if (taskId != null) {
        deleteTask(taskId);
    }
    if (event.target.className === 'search-todos__btn') {
        hideFooter();
        hideList();
    }
})
todos__workspace.addEventListener('keydown',event => {
    let taskId;

    if (event.key === 'Enter') {

        taskId = (event.target.className === 'inputs-style list-todos__input') ? event.target.id : null;

        if(event.target.id === 'search-todos__input' & event.target.value) {
            addTask(event.target);
        }
        if(event.target.id === taskId) {
            editTask(event.target);
        }

    }
})


function renderTasks(url) {
    let todosList, tasks, divTask, currentTasks;
    // url = "/tasks"
    // paramsList = {filter: true, somethingElse: false}
    // funcApi(url, paramsList, httpHeaders)
    sendRequest('GET', url)
    .then(data => {
        todosList = document.getElementById('todos__list');

        while (todosList.firstChild) {
            todosList.removeChild(todosList.firstChild);
        }

        data.forEach((task) => {
            divTask = createTaskItem(task);
            todosList.appendChild(divTask);
        });
    })
}

function deleteTask(taskId) {
    sendRequest('DELETE','/api/tasks/' + taskId)
        .then(() => document.getElementById('divTask' + taskId).remove())
}


function addTask(element) {
    sendRequest('POST','/api/tasks/',{'title_of_task': element.value})
        .then(task => {
        document.getElementById('todos__list').appendChild(createTaskItem(task));
        document.getElementById('search-todos__input').value = '';
    });
}

function sendRequest(method, url, data) {
    return fetch(url, {
        method: method,
        body: JSON.stringify(data),
        headers: data ? {'Content-Type': 'application/json'} : {}
    }).then (response => {
        return response.statusText !=="No Content" ? response.json() : null
    })
}

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
    inputTaskName.id = task.id;
    inputTaskName.placeholder = 'Please, add a name of the task'

    btnDeleteTask = document.createElement('button');
    btnDeleteTask.className = 'list-todos__btn-del';
    btnDeleteTask.id = task.id;

    divTask.appendChild(inputTaskIsCompleted);
    divTask.appendChild(labelTaskIsCompleted);
    divTask.appendChild(inputTaskName);
    divTask.appendChild(btnDeleteTask);

    return divTask;
}

function hideFooter() {
    let elFooter = document.getElementById("todos__footer");
    if (elFooter.style.display === "none") {
        elFooter.style.display = "grid";
    }
    else {elFooter.style.display = "none";}
}
function hideList() {
    let elList = document.getElementById("todos__list");
    if (elList.style.display === "none") {
        elList.style.display = "block";
    }
    else {elList.style.display = "none";}
}

function editTask(element) {
    console.log('Next Patch')
}

renderTasks(urlFilterAll);