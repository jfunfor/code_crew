let checkboxArr =
    Array.from(document.getElementsByClassName('list-todos__chb'));
let footerBtnArr =
    Array.from(document.getElementsByClassName('footer__but'))

checkboxArr.forEach(function(element) {
    element.onchange=countItemsLeft;
})

footerBtnArr[0].onclick=filterAll;
footerBtnArr[1].onclick=filterActive;
footerBtnArr[2].onclick=filterCompleted;
footerBtnArr[3].onclick=filterClearCompleted;

function countItemsLeft()
{
    let checkboxArr = Array.from(document.getElementsByClassName('list-todos__chb'));
    let n = checkboxArr.length;
    let counterItemsLeft=0;
    for (let i=0;i<n;i++)
    if(!checkboxArr[i].checked)  counterItemsLeft++;
    document.getElementsByName('num_of_left')[0].value =counterItemsLeft;
}
function filterClearCompleted()
{
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

function filterActive()
{
    let filterBtnArr =
        Array.from(document.getElementsByClassName('footer__but-filters'));
    let checkboxArr = Array.from(document.getElementsByClassName('list-todos__chb'));
    console.log('ssss');
    let itemArr = Array.from(document.getElementsByClassName('list-todos__item'));
    let n =checkboxArr.length;
    for (let i=0;i<n;i++)
        if(checkboxArr[i].checked)
            itemArr[i].style.display='none';
        else itemArr[i].style.display='block';
    n=filterBtnArr.length;
    for (let i=0;i<n;i++)
        if(this != filterBtnArr[i])
            filterBtnArr[i].style.border='1px solid white';
        else filterBtnArr[i].style.border='1px solid #CCCCCC';
}

function filterAll()
{
    let filterBtnArr =
        Array.from(document.getElementsByClassName('footer__but-filters'));
    let itemArr = Array.from(document.getElementsByClassName('list-todos__item'));
    let n =itemArr.length;
    for (let i=0;i<n;i++)
        itemArr[i].style.display='block';
    n=filterBtnArr.length;
    for (let i=0;i<n;i++)
        if(this != filterBtnArr[i])
            filterBtnArr[i].style.border='1px solid white';
        else filterBtnArr[i].style.border='1px solid #CCCCCC';
}

function filterCompleted()
{
    let filterBtnArr =
        Array.from(document.getElementsByClassName('footer__but-filters'));
    let checkboxArr = Array.from(document.getElementsByClassName('list-todos__chb'));
    let itemArr = Array.from(document.getElementsByClassName('list-todos__item'));
    let n =checkboxArr.length;
    for (let i=0;i<n;i++)
        if(!checkboxArr[i].checked)
            itemArr[i].style.display='none';
        else itemArr[i].style.display='block';
    n=filterBtnArr.length;
    for (let i=0;i<n;i++)
        if(this != filterBtnArr[i])
            filterBtnArr[i].style.border='1px solid white';
        else filterBtnArr[i].style.border='1px solid #CCCCCC';
}
