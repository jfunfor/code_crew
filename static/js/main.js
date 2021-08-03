let checkboxArr =
    Array.from(document.getElementsByClassName('list-todos__chb'));
let footerBtnArr =
    Array.from(document.getElementsByClassName('footer__btn'));
let searchInputArr =
    Array.from(document.getElementsByClassName('search-todos__input'));
let indexClickedButton;
let btnAll = footerBtnArr[0];
let btnActive = footerBtnArr[1];
let btnCompleted = footerBtnArr[2];
let btnClearCompleted = footerBtnArr[3];
let inputElementNewListItem = searchInputArr[0];
let deleteBtnArr =
    Array.from(document.getElementsByClassName('list-todos__btn-del'));
let numberItem= checkboxArr.length;

btnAll.onclick = handleBtnAllClick;
btnActive.onclick = handleBtnActiveClick;
btnCompleted.onclick = handleBtnCompletedClick;
btnClearCompleted.onclick = handleBtnClearCompletedClick;
inputElementNewListItem.onkeydown = handleSearchInputViaEnterClick;
inputElementNewListItem.onkeyup = handleOutputItemsCounter;
checkboxArr.forEach(function(element) {
    element.onchange=handleOutputItemsCounter;
})
deleteBtnArr.forEach(function(element,index) {
    element.onclick=function(){deleteItemBtn(index); };
})

function handleSearchInputViaEnterClick(event){
    if(event.keyCode==13) {
        addNewListItem(this);
        updateItemElements();
        })
    }
}

function handleOutputItemsCounter() {
    countItemsLeft();
    crossOutItem();
    updateChangesActiveComplete();
}
function handleBtnClearCompletedClick() {
    let inputItemArr = Array.from(document.getElementsByClassName('inputs-style list-todos__input'));
    for (let i=0;i<numberItem;i++)
        if(checkboxArr[i].checked) {
            checkboxArr[i].checked = false;
            inputItemArr[i].style.textDecoration = "none";
        }
    document.getElementsByName('num_of_left')[0].value =numberItem;
    updateChangesActiveComplete();
}

function handleBtnAllClick() {
    let itemArr = Array.from(document.getElementsByClassName('list-todos__item'));
    for (let i=0;i<numberItem;i++)
        itemArr[i].style.display='block';
    holdFilterBtnPressed(this);
}

function handleBtnActiveClick() {
    let itemArr = Array.from(document.getElementsByClassName('list-todos__item'));
    for (let i=0;i<numberItem;i++)
        if(checkboxArr[i].checked)
            itemArr[i].style.display='none';
        else itemArr[i].style.display='block';
    holdFilterBtnPressed(this);
}

function handleBtnCompletedClick() {
    let itemArr = Array.from(document.getElementsByClassName('list-todos__item'));
    for (let i=0;i<numberItem;i++)
        if(!checkboxArr[i].checked)
            itemArr[i].style.display='none';
        else itemArr[i].style.display='block';
    holdFilterBtnPressed(this);
}

function addNewListItem(inputSearch) {
    let divList = document.getElementById("inputListItem");
    let inputItemArr = document.getElementsByClassName("list-todos__chb");
    let chbId = "chb" + (parseInt(inputItemArr[inputItemArr.length-1].id.match(/\d+/))+1);
    let newDiv = createNewDiv("list-todos__item");
    let newChb = createNewChb("list-todos__chb","checkbox",chbId);
    let newLabel = createNewLabel("list-todos__invisible-lbl",chbId);
    let newInputLine = createNewInputLine("inputs-style list-todos__input","text","Add the new task",inputSearch.value);
    let newBtn = createNewBtn("list-todos__btn-del");
    divList.appendChild(newDiv);
    newDiv.appendChild(newChb);
    newDiv.appendChild(newLabel);
    newDiv.appendChild(newInputLine);
    newDiv.appendChild(newBtn);
    inputSearch.value= "";
    updateItemElements();
}
function createNewDiv(className) {
    let newDiv = document.createElement("div");
    newDiv.className = className;
    return newDiv;
}
function createNewChb(className, type, id) {
    let newChb = document.createElement("input");
    newChb.className = className;
    newChb.type = type;
    newChb.id = id;
    return newChb;
}
function createNewLabel(className,htmlFor) {
    let newLabel = document.createElement("label");
    newLabel.className = className;
    newLabel.htmlFor = htmlFor;
    return newLabel;
}
function createNewInputLine(className,type,placeholder,value) {
    let newInputLine = document.createElement("input");
    newInputLine.className = className;
    newInputLine.type = type;
    newInputLine.placeholder = placeholder;
    newInputLine.value = value;
    return newInputLine;
}
function createNewBtn(className) {
    let newBtn = document.createElement("button");
    newBtn.className = className;
    return newBtn;
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
            indexClickedButton=i;
             }
}
function countItemsLeft() {
    let checkboxArr =
        Array.from(document.getElementsByClassName('list-todos__chb'));
    let n = checkboxArr.length;
    let counterItemsLeft=0;
    for (let i=0;i<numberItem;i++)
        if(!checkboxArr[i].checked)  counterItemsLeft++;
    document.getElementsByName('num_of_left')[0].value =counterItemsLeft;

}
function crossOutItem() {
    let checkboxArr = Array.from(document.getElementsByClassName('list-todos__chb'));
    let inputItemArr = Array.from(document.getElementsByClassName('inputs-style list-todos__input'));
    for (let i=0;i<numberItem;i++)
        if(!checkboxArr[i].checked)  inputItemArr[i].style.textDecoration="none";
        else inputItemArr[i].style.textDecoration="line-through";
}
function updateChangesActiveComplete() {
    updateItemElements();
    if(indexClickedButton==1) handleBtnActiveClick();
    if(indexClickedButton==2) handleBtnCompletedClick();
    holdFilterBtnPressed(footerBtnArr[indexClickedButton]);
}
function deleteItemBtn(indexDelBtn) {
    let itemArr =
        Array.from(document.getElementsByClassName('list-todos__item'));
    itemArr[indexDelBtn].parentNode.removeChild(itemArr[indexDelBtn]);
    updateItemElements();
}
function updateItemElements() {
    checkboxArr =
        Array.from(document.getElementsByClassName('list-todos__chb'));
    searchInputArr =
        Array.from(document.getElementsByClassName('search-todos__input'));
    deleteBtnArr =
        Array.from(document.getElementsByClassName('list-todos__btn-del'));
    numberItem= checkboxArr.length;
    checkboxArr.forEach(function(element) {
        element.onchange=handleOutputItemsCounter;
    })
    deleteBtnArr.forEach(function(element,index) {
        element.onclick=function(){deleteItemBtn(index); };
    })
}