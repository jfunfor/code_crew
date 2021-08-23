const   urlFilterAll = 'api/tasks/',
        urlFilterActive = 'api/filter_active/',
        urlFilterCompleted = 'api/filter_completed/',
        urlFilterClearCompleted = 'api/filter_clearCompleted/', // url api для кнопки Clear completed, можно изменить
        urlEditTask = 'api/edit_task/';//url api для изменения названия таска, можно изменить
let     todos__workspace = document.getElementById('todos__workspace');
let     currentMode,urlOfCurrentMode;



todos__workspace.addEventListener('click',event => {
    let urlOfClickedFilter = (event.target.innerHTML === 'All') ? urlFilterAll :
        (event.target.innerHTML === 'Active') ? urlFilterActive :
            (event.target.innerHTML === 'Completed') ? urlFilterCompleted : '';
    let delBtnId = (event.target.className === 'list-todos__btn-del') ? event.target.id : null,
        chbBtnId = (event.target.className === 'list-todos__chb') ? event.target.id : null,
        checkboxStatus = (event.target.className === 'list-todos__chb') ? event.target.checked : null;
    if (currentMode != null) {
        urlOfCurrentMode = (currentMode.innerHTML === 'Active') ? urlFilterActive :
            (currentMode.innerHTML === 'Completed') ? urlFilterCompleted : urlFilterAll;
    }
    if (urlOfClickedFilter !== '') {
        renderTasks(urlOfClickedFilter);
        holdFilterBtnPressed(event.target);
    }
    if (event.target.innerHTML === 'Clear completed') {
        clearAllCompletedTasks(urlFilterCompleted);
    }
    if (delBtnId != null) {
        deleteTask(urlFilterAll, delBtnId);
    }
    if (event.target.className === 'search-todos__btn') {
        hideFooter();
        hideList();
    }
    if (event.target.className === 'list-todos__chb') {
        changeTaskStatus(urlFilterAll, chbBtnId, checkboxStatus);
    }

})
todos__workspace.addEventListener('keydown',event => {
    let taskId, newName;

    if (event.key === 'Enter') {
        taskId = (event.target.className === 'inputs-style list-todos__input') ? event.target.id : null;
        if(event.target.id === 'search-todos__input') {
            if(event.target.value) {
                addTask(urlFilterAll, event.target);
            }
        }
        if(event.target.id === taskId) {
            newName = event.target.value;
            editTask(urlFilterAll, taskId, newName);
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
        countItemsLeft(urlFilterAll);
    })
}
function addTask(url, element) {
    sendRequest('POST',url,{'title_of_task': element.value})
        .then(task => {
            document.getElementById('search-todos__input').value = '';
            if (currentMode.innerHTML !== 'Completed') {
                document.getElementById('todos__list').appendChild(createTaskItem(task));
            }
            countItemsLeft(urlFilterAll);
    });
}
function deleteTask(url, taskId) {
    sendRequest('DELETE',url + taskId)
        .then(() => {
            document.getElementById('divTask' + taskId).remove();
            countItemsLeft(urlFilterAll);
        })
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
function holdFilterBtnPressed(clickedBtn) {

    let filterBtnArr =
        Array.from(document.getElementsByClassName('footer__btn-filters'));
    let n=filterBtnArr.length;
    for (let i=0;i<n;i++)
        if(clickedBtn !== filterBtnArr[i])
            filterBtnArr[i].style.border='1px solid white';
        else {
            filterBtnArr[i].style.border='1px solid #CCCCCC';
            currentMode=filterBtnArr[i];
             }
}
function countItemsLeft(url) {
    sendRequest('GET',url)
        .then((checkboxArr) => {
            let counterItemsLeft=0;
            for (let i=0;i<checkboxArr.length;i++)
                if(!checkboxArr[i].is_active)  counterItemsLeft++;
                document.getElementsByName('num_of_left')[0].value =counterItemsLeft;
        })
}
function clearAllCompletedTasks(url) {
    sendRequest('GET',url)
        .then((completedTasks) => {
            let i=0;
            for (i;i<completedTasks.length;i++) {
                sendRequest('PATCH',urlFilterAll+completedTasks[i].id+'/',{is_active: false})
                    .then(() => renderTasks(urlOfCurrentMode))
            }
        })
}
function editTask(url,taskId,newName) {
    sendRequest('PATCH',url+taskId+'/',{'title_of_task': newName})
}
function changeTaskStatus(url,taskId,newStatus) {
    taskId = parseInt(taskId.replace(/[^\d]/g, ''));
    sendRequest('PATCH', url+taskId+'/',{'is_active':newStatus})
        .then(() => {
            countItemsLeft(urlFilterAll);
            renderTasks(urlOfCurrentMode)
        })
}

renderTasks(urlFilterAll);