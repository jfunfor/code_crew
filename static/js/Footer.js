let checkboxArr =
    Array.from(document.getElementsByClassName('list-todos__chb'));
let footerBtnArr =
    Array.from(document.getElementsByClassName('footer__but'))

checkboxArr.forEach(function(element) {
    element.onchange=countItemsLeft;
})

footerBtnArr[0].onclick=handleBtnAll;
footerBtnArr[1].onclick=handleBtnActive;
footerBtnArr[2].onclick=handleBtnCompleted;
footerBtnArr[3].onclick=handleBtnClearCompleted;

function countItemsLeft() {
    let checkboxArr = Array.from(document.getElementsByClassName('list-todos__chb'));
    let n = checkboxArr.length;
    let counterItemsLeft=0;
    for (let i=0;i<n;i++)
    if(!checkboxArr[i].checked)  counterItemsLeft++;
    document.getElementsByName('num_of_left')[0].value =counterItemsLeft;
}

function handleBtnClearCompleted() {
    let checkboxArr = Array.from(document.getElementsByClassName('list-todos__chb'));
    let inputItemArr = Array.from(document.getElementsByClassName('inputs-style list-todos__input'));
    let n =checkboxArr.length;
    for (let i=0;i<n;i++)
        if(checkboxArr[i].checked)
        {
            checkboxArr[i].checked=false;
            inputItemArr[i].style.textDecoration="none";
        }
    document.getElementsByName('num_of_left')[0].value =n;
}

function handleBtnAll() {
    let itemArr = Array.from(document.getElementsByClassName('list-todos__item'));
    let n =itemArr.length;
    for (let i=0;i<n;i++)
        itemArr[i].style.display='block';
    handlePressedFilterBtn();
}

function handleBtnActive() {
    let checkboxArr = Array.from(document.getElementsByClassName('list-todos__chb'));
    console.log('ssss');
    let itemArr = Array.from(document.getElementsByClassName('list-todos__item'));
    let n =checkboxArr.length;
    for (let i=0;i<n;i++)
        if(checkboxArr[i].checked)
            itemArr[i].style.display='none';
        else itemArr[i].style.display='block';
    handlePressedFilterBtn();
}

function handleBtnCompleted() {
    let checkboxArr = Array.from(document.getElementsByClassName('list-todos__chb'));
    let itemArr = Array.from(document.getElementsByClassName('list-todos__item'));
    let n =checkboxArr.length;
    for (let i=0;i<n;i++)
        if(!checkboxArr[i].checked)
            itemArr[i].style.display='none';
        else itemArr[i].style.display='block';
    handlePressedFilterBtn();
}
function handlePressedFilterBtn(){
    let filterBtnArr =
        Array.from(document.getElementsByClassName('footer__but-filters'));
    let n=filterBtnArr.length;
    for (let i=0;i<n;i++)
        if(this != filterBtnArr[i])
            filterBtnArr[i].style.border='1px solid white';
        else filterBtnArr[i].style.border='1px solid #CCCCCC';
}
