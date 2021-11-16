var Message = {
    messageName: "message",
    text1: document.getElementById("text1"),
    image1: document.getElementById("image1"),
    image2: document.getElementById("image2")
};


function Message12(messageName, text, image1, image2) {
    this.messageName = messageName;
    this.text = text;
    this.image1 = image1;
    this.image2 = image2;
};


// The message object

var message1 = new Message12("message1", document.getElementById("text1"), document.getElementById("image1"), document.getElementById("image2"));
var message2 = new Message12("message2", document.getElementById("text1"), document.getElementById("image1"), document.getElementById("image2"));
var message3 = new Message12("message3", document.getElementById("text1"), document.getElementById("image1"), document.getElementById("image2"));
var message4 = new Message12("message4", document.getElementById("text1"), document.getElementById("image1"), document.getElementById("image2"));
var message5 = new Message12("message5", document.getElementById("text1"), document.getElementById("image1"), document.getElementById("image2"));

var messages = [];
messages.push(message1);
messages.push(message2);
messages.push(message3);
messages.push(message4);
messages.push(message5);

//Inject all the messages by their tempate into the array
// messages.length = 5;

const today = new Date();
CurrentDay = today.getDay() + 1;
var CurrentDate = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
var time = today.getHours();


function checkCommercial(CurrentDate) {

    // calculating the advertising date for each adevrtaisment
    //if ((check("01/01/2021", "31/12/2021", CurrentDate) && (CurrentDay == 2 || CurrentDay == 3 || CurrentDay == 4) && time >= 6 && time < 16)) {
    if ((check("01/01/2021", "31/12/2021", CurrentDate) && (CurrentDay == 2 || CurrentDay == 4) && time>=6 && time <12)) {
            setTimeout(function () {
            messages[0].text.innerHTML = "On sale 90% discount"+ "<br/>" +"ONLY TODAY!!!! "+ "<br/>"+ "Sweet donuts :) "+ "<br/>"+ "Come and get it ";
            messages[0].image1.src = "https://www.roladin.co.il/wp-content/uploads/2020/11/%E2%95%AB%C2%BA%E2%95%AB%D7%A5%E2%95%AB%C2%BA%E2%95%AB%D7%A9-%E2%95%AB%C2%BA%E2%95%AB%C2%BF%E2%95%AB%D7%A9%E2%95%AB%C2%A5.jpg";
            messages[0].image2.src = "https://www.roladin.co.il/wp-content/uploads/2020/11/%E2%95%AB%C3%B1%E2%95%AB%C2%BA%E2%95%AB%D7%A0%E2%95%AB%C6%92.jpg";

        }, 1800)
        
    }
    if ((check("01/03/2021", "30/04/2021", CurrentDate) && CurrentDay == 3 || CurrentDay == 4) && time >= 10 && time < 16) {
        setTimeout(function () {
            messages[1].text.innerHTML = "On sale 80% discount"+ "<br/>" +"ONLY TODAY!!!! "+ "<br/>"
            + "Hot and tasty pizza :) "+"<br/>" + "say cheese "+ "<br/>"
            + "to the new "+ "<br/>"+ "pizza in our menu "+ "<br/>"
            + "with an extra topping "+ "<br/>"+ "and souces "+ "<br/>"
            + "kosher pizza "+ "<br/>"+ "Come and get it !!!"+ "<br/>";
            messages[1].image1.src = "https://medias.timeout.co.il/www/uploads/2020/03/%D7%A4%D7%99%D7%A6%D7%94%D7%A9%D7%99%D7%A7%D7%90%D7%92%D7%95_optimized-1140x641.jpg";
            messages[1].image2.src = "";

        }, 1800)
    }
    if (check("01/05/2021", "15/06/2021", CurrentDate) && time >= 8 && time < 22) {
        setTimeout(function () {
            document.body.style.backgroundColor = "pink"; 
            messages[2].text.innerHTML = "";
            messages[2].image1.src = "";
            messages[2].image2.src = "";

        }, 1800)
    }
    if (check("29/03/2021", "15/04/ 2021", CurrentDate) && (CurrentDay == 2) && time >= 15 && time < 19) {
        setTimeout(function () {
            messages[3].text.innerHTML = "If you drink dont drive!!! "+ "<br/>" +"Save your life and others"+ "<br/>";
            messages[3].image1.src = "";
            messages[3].image2.src = "";

        }, 1800)
    }
    if (check("01/04/ 2021", "30/04/ 2021", CurrentDate) && (CurrentDay == 2 || CurrentDay == 4 || CurrentDay == 3) && time >= 1 && time < 23) {
        setTimeout(function () {
            messages[4].text.innerHTML = "Netflix"+ "<br/>" +"Do you love action?"+ "<br/>"
            + "Do you love drama? "+"<br/>" + "Do you love Gal Gadot? "+ "<br/>"
            + "Soon..."+ "<br/>"+ "Red notice!!!!  "+ "<br/>"
            + "Get ready for the biggest hit of the winter! ";
            messages[4].image1.src = "https://media.istockphoto.com/vectors/coming-soon-lettering-coming-soon-for-promotion-advertisement-sale-vector-id1221240925?k=20&m=1221240925&s=612x612&w=0&h=HX77CIwJ34u7qUMpI_W5z4dDnEbHGv66mGXVTpIccv8=";
            messages[4].image2.src = "https://i.ytimg.com/vi/ZzpLS6h2Jq0/maxresdefault.jpg";

        }, 1800)
    }
}

checkCommercial();

//var dayInMilliseconds = 1000 * 60 * 60 * 24;
//setInterval(checkCommercial, dayInMilliseconds);


// this function check if the sending day is in the range and return boolean value
function check(start, end, curr) {
    var d1 = start.split("/");
    var d2 = end.split("/");
    var c = curr;

    var from = new Date(d1[2], parseInt(d1[1]) - 1, d1[0]); // -1 because months are from 0 to 11
    var to = new Date(d2[2], parseInt(d2[1]) - 1, d2[0]);
    var check = new Date(today.getFullYear(),(today.getMonth()+1) - 1,today.getDate());


    return (check > from && check < to);
}