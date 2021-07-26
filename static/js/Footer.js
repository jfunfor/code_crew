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

function btn_Active()
{

    if(chb1.checked) document.getElementById('item1').style.display='none';
    else document.getElementById('item1').style.display='block';
    if(chb2.checked) document.getElementById('item2').style.display='none';
    else document.getElementById('item2').style.display='block';
    if(chb3.checked) document.getElementById('item3').style.display='none';
    else document.getElementById('item3').style.display='block';
    if(chb4.checked) document.getElementById('item4').style.display='none';
    else document.getElementById('item4').style.display='block';

}

function btn_All()
{
    document.getElementById('item1').style.display='block';
    document.getElementById('item2').style.display='block';
    document.getElementById('item3').style.display='block';
    document.getElementById('item4').style.display='block';
}

function btn_Completed()
{
    if(!chb1.checked) document.getElementById('item1').style.display='none';
    else document.getElementById('item1').style.display='block';
    if(!chb2.checked) document.getElementById('item2').style.display='none';
    else document.getElementById('item2').style.display='block';
    if(!chb3.checked) document.getElementById('item3').style.display='none';
    else document.getElementById('item3').style.display='block';
    if(!chb4.checked) document.getElementById('item4').style.display='none';
    else document.getElementById('item4').style.display='block';
}