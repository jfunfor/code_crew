function counter()
{
    var counter_items_left=0;
    if(!chb1.checked) counter_items_left++;
    if(!chb2.checked) counter_items_left++;
    if(!chb3.checked) counter_items_left++;
    if(!chb4.checked) counter_items_left++;
    document.getElementsByName('num_of_left')[0].value =counter_items_left;
}
function btn_ClearCompleted()
{
    if(chb1.checked) chb1.checked=false;
    if(chb2.checked) chb2.checked=false;
    if(chb3.checked) chb3.checked=false;
    if(chb4.checked) chb4.checked=false;
    counter();
}