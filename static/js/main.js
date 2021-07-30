let checkboxArr =
    Array.from(document.getElementsByClassName('list-todos__chb'));
let footerBtnArr =
    Array.from(document.getElementsByClassName('footer__btn'))

footerBtnArr[0].onclick=handleBtnAllClick;
footerBtnArr[1].onclick=handleBtnActiveClick;
footerBtnArr[2].onclick=handleBtnCompletedClick;
footerBtnArr[3].onclick=handleBtnClearCompletedClick;
checkboxArr.forEach(function(element) {
    element.onchange=handleOutputItemsCounterOnchange;
})

function handleOutputItemsCounterOnchange() {
    countItemsLeft();
    crossOutItem();
}
function handleBtnClearCompletedClick() {
    let checkboxArr = Array.from(document.getElementsByClassName('list-todos__chb'));
    let inputItemArr = Array.from(document.getElementsByClassName('inputs-style list-todos__input'));
    let n =checkboxArr.length;
    for (let i=0;i<n;i++)
        if(checkboxArr[i].checked)
            checkboxArr[i].checked=false;
    inputItemArr[i].style.textDecoration="none";
    document.getElementsByName('num_of_left')[0].value =n;
}

function handleBtnAllClick() {
    let itemArr = Array.from(document.getElementsByClassName('list-todos__item'));
    let n =itemArr.length;
    for (let i=0;i<n;i++)
        itemArr[i].style.display='block';
    holdFilterBtnPressed(this);
}

function handleBtnActiveClick() {
    let checkboxArr = Array.from(document.getElementsByClassName('list-todos__chb'));
    let itemArr = Array.from(document.getElementsByClassName('list-todos__item'));
    let n =checkboxArr.length;
    for (let i=0;i<n;i++)
        if(checkboxArr[i].checked)
            itemArr[i].style.display='none';
        else itemArr[i].style.display='block';
    holdFilterBtnPressed(this);
}

function handleBtnCompletedClick() {
    let checkboxArr = Array.from(document.getElementsByClassName('list-todos__chb'));
    let itemArr = Array.from(document.getElementsByClassName('list-todos__item'));
    let n =checkboxArr.length;
    for (let i=0;i<n;i++)
        if(!checkboxArr[i].checked)
            itemArr[i].style.display='none';
        else itemArr[i].style.display='block';
    holdFilterBtnPressed(this);
}

function holdFilterBtnPressed(clickedBtn) {
    let filterBtnArr =
        Array.from(document.getElementsByClassName('footer__btn-filters'));
    let n=filterBtnArr.length;
    for (let i=0;i<n;i++)
        if(clickedBtn != filterBtnArr[i])
            filterBtnArr[i].style.border='1px solid white';
        else filterBtnArr[i].style.border='1px solid #CCCCCC';
}
function countItemsLeft() {
    let checkboxArr = Array.from(document.getElementsByClassName('list-todos__chb'));
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
