function crossOutItem() {
    let checkboxArr = Array.from(document.getElementsByClassName('list-todos__chb'));
    let inputItemArr = Array.from(document.getElementsByClassName('inputs-style list-todos__input'));
    let n =inputItemArr.length;
    for (let i=0;i<n;i++)
        if(!checkboxArr[i].checked)  inputItemArr[i].style.textDecoration="none";
        else inputItemArr[i].style.textDecoration="line-through";
}