var messages = []; 

// The message object
var message = {
    messageName: "message",
    text1: document.getElementById("text1"),
    image1: document.getElementById("image1"),
    image2: document.getElementById("image2"),
    timeLength: 100
}

//Inject all the messages by their tempate into the array
messages.length = 5;
var date1 = Date.now;
    var CurrentDay = date1.getDay();
function fn(CurrentDay){
    
    var yes = [];
    // calculating the advertising date for each adevrtaisment
    // message 1
    if ((check(01/01/2021, 31/12/2021, CurrentDay) && (CurrentDay == 2 || CurrentDay == 4) && date1.getHours()>=6 && date1.getHours() <12))
    {
        
    } 
    if ((check(01/03/2021, 30/04/2021, CurrentDay) && CurrentDay == 3 || CurrentDay == 4)&& date1.getHours()>=10 && date1.getHours() <16){
   
    }
    if (check(01/05/2021, 15/06/2021, CurrentDay)&& date1.getHours()>=8 && date1.getHours() <22){
    
    }
    if (check(29/03/2021, 15/04/2021, CurrentDay) && (CurrentDay == 2)&& date1.getHours()>=15 && date1.getHours() <19){
    
    }
    if (check(01/04/2021, 30/04/2021, CurrentDay) && (CurrentDay == 2 || CurrentDay == 4|| CurrentDay == 3)&& date1.getHours()>=1 && date1.getHours()<23){
    
    }
} 

// this function check if the sending day is in the range and return boolean value
function check(start,end,curr){
    var d1 = start.split("/");
    var d2 = end.split("/");
    var c = curr.split("/");
    
    var from = new Date(d1[2], parseInt(d1[1])-1, d1[0]);  // -1 because months are from 0 to 11
    var to   = new Date(d2[2], parseInt(d2[1])-1, d2[0]);
    var check = new Date(c[2], parseInt(c[1])-1, c[0]);

    return(check > from && check < to);
}

/*
     function fn(dateStart, dateEnd){
        var date1 = Date.now;
        var CurrentDay = date1.getDay();

        // calculating the advertising date for each adevrtaisment
        // message 1
        if (((CurrentDay == 2 || CurrentDay == 4) && date1.getHours()>=6 && date1.getHours() <12))
        {
       
        } 
        else if ((CurrentDay == 3 || CurrentDay == 4)&& date1.getHours()>=10 && date1.getHours() <16){
       
        }
        else if ((CurrentDay == 3 || CurrentDay == 4)&& date1.getHours()>=10 && date1.getHours() <16){
        
        }
    } 
    */

   /* function setToHappen(fn, dateStart, dateEnd){
        return setTimeout(fn(dateStart, dateEnd), dateEnd - dateStart);
    }
    */    

    
