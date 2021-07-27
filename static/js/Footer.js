function countItemsLeft()
{
    let checkboxArr = Array.from(document.getElementsByClassName('list-todos__chb'));
    let n =checkboxArr.length;
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
    let checkboxArr = Array.from(document.getElementsByClassName('list-todos__chb'));
    let itemArr = Array.from(document.getElementsByClassName('list-todos__item'));
    let n =checkboxArr.length;
    for (let i=0;i<n;i++)
        if(checkboxArr[i].checked)
            itemArr[i].style.display='none';
        else itemArr[i].style.display='block';
}

function filterAll()
{
    let itemArr = Array.from(document.getElementsByClassName('list-todos__item'));
    let n =itemArr.length;
    for (let i=0;i<n;i++)
        itemArr[i].style.display='block';
}

function filterCompleted()
{
    let checkboxArr = Array.from(document.getElementsByClassName('list-todos__chb'));
    let itemArr = Array.from(document.getElementsByClassName('list-todos__item'));
    let n =checkboxArr.length;
    for (let i=0;i<n;i++)
        if(!checkboxArr[i].checked)
            itemArr[i].style.display='none';
        else itemArr[i].style.display='block';
}