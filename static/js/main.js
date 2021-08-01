let checkboxArr =
    Array.from(document.getElementsByClassName('list-todos__chb'));
let footerBtnArr =
    Array.from(document.getElementsByClassName('footer__btn'));
let searchInputArr =
    Array.from(document.getElementsByClassName('search-todos__input'));
let indexClickedButton;

footerBtnArr[0].onclick = handleBtnAllClick;
footerBtnArr[1].onclick = handleBtnActiveClick;
footerBtnArr[2].onclick = handleBtnCompletedClick;
footerBtnArr[3].onclick = handleBtnClearCompletedClick;
searchInputArr[0].onkeyup =  handleSearchInputViaEnterClick;
checkboxArr.forEach(function(element) {
    element.onchange=handleOutputItemsCounterOnchange;
})

function handleSearchInputViaEnterClick(event){
    if(event.keyCode==13) {
        addNewListItem(this);
    }
}

function handleOutputItemsCounterOnchange() {
    countItemsLeft();
    crossOutItem();
    updateChangesActiveAndComplete();
}
function handleBtnClearCompletedClick() {

    let inputItemArr = Array.from(document.getElementsByClassName('inputs-style list-todos__input'));
    let n =checkboxArr.length;
    for (let i=0;i<n;i++)
        if(checkboxArr[i].checked) {
            checkboxArr[i].checked = false;
            inputItemArr[i].style.textDecoration = "none";
        }
    document.getElementsByName('num_of_left')[0].value =n;
    updateChangesActiveAndComplete();
}

function handleBtnAllClick() {
    let itemArr = Array.from(document.getElementsByClassName('list-todos__item'));
    let n =itemArr.length;
    for (let i=0;i<n;i++)
        itemArr[i].style.display='block';
    holdFilterBtnPressed(this);
}

function handleBtnActiveClick() {
    let itemArr = Array.from(document.getElementsByClassName('list-todos__item'));
    let n =checkboxArr.length;
    for (let i=0;i<n;i++)
        if(checkboxArr[i].checked)
            itemArr[i].style.display='none';
        else itemArr[i].style.display='block';
    holdFilterBtnPressed(this);
}

function handleBtnCompletedClick() {
    let itemArr = Array.from(document.getElementsByClassName('list-todos__item'));
    let n =checkboxArr.length;
    for (let i=0;i<n;i++)
        if(!checkboxArr[i].checked)
            itemArr[i].style.display='none';
        else itemArr[i].style.display='block';
    holdFilterBtnPressed(this);
}

function addNewListItem(inputSearch) {
    var divList = document.getElementById("inputListItem");
    console.log(divList);
    var newDiv = document.createElement("div");
    var inputChb = document.createElement("input");
    var inputItemArr = document.getElementsByClassName("list-todos__chb");
    var inputLine = document.createElement("input");
    var label = document.createElement("label");
    var button = document.createElement("button");
    newDiv.className = "list-todos__item";
    inputChb.type = "text";
    inputChb.className = "list-todos__chb";
    inputChb.type = "checkbox";
    inputChb.id = "chb"+(parseInt(inputItemArr[inputItemArr.length-1].id.match(/\d+/))+1);
    label.className = "list-todos__invisible-lbl";
    label.htmlFor = inputChb.id;
    inputLine.type = "text";
    inputLine.className = "inputs-style list-todos__input";
    inputLine.placeholder = "Add the new task";
    inputLine.value = inputSearch.value;
    button.className = "list-todos__btn-del";
    divList.appendChild(newDiv);
    newDiv.appendChild(inputChb);
    newDiv.appendChild(label);
    newDiv.appendChild(inputLine);
    newDiv.appendChild(button);
    inputSearch.value= "";
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
    let n = checkboxArr.length;
    let counterItemsLeft=0;
    for (let i=0;i<n;i++)
        if(!checkboxArr[i].checked)  counterItemsLeft++;
    document.getElementsByName('num_of_left')[0].value =counterItemsLeft;

}
function crossOutItem() {
    let checkboxArr = Array.from(document.getElementsByClassName('list-todos__chb'));
    let inputItemArr = Array.from(document.getElementsByClassName('inputs-style list-todos__input'));
    let n =inputItemArr.length;
    for (let i=0;i<n;i++)
        if(!checkboxArr[i].checked)  inputItemArr[i].style.textDecoration="none";
        else inputItemArr[i].style.textDecoration="line-through";
}
function updateChangesActiveAndComplete() {
    if(indexClickedButton==1) handleBtnActiveClick();
    if(indexClickedButton==2) handleBtnCompletedClick();
    holdFilterBtnPressed(footerBtnArr[indexClickedButton]);
}
