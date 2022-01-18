var express = require("express");
const req = require("express/lib/request");
const res = require("express/lib/response");
var app = express();
var port=8082;
const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
const connectionURL = 'mongodb://127.0.0.1:27017/'
const databaseName = 'Commercials13'
const databasecomm = 'commercialsAdds'
const databasecommUsers = 'commercialsUsers'
var http = require( 'http' ).createServer(app);
var io = require( 'socket.io' )( http );
var bodyParser = require('body-parser')
var user;
var countUsers=1;
var screen1State =" ", screen2State=" ", screen3State=" ";
var flag =0;
 
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());   

const path = require('path');

app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug');
app.use("/script", express.static('./script/'));
let db=0;
 
var temp =[];
let screen=0;
var admin;


var idArray= ["0","1","2","3","4","5","6","7","8"];
MongoClient.connect(connectionURL,{useNewUrlParser : true},(error,client) => {

    if (error){
        return console.log("Can't connect to db")
    }
     db = client.db(databaseName);
     
      db.collection(databasecomm).find().toArray((error,tasks)=>{
      temp = tasks})

      db.collection(databasecommUsers).findOne({
        Screen:1
          }, (error,task) => {
        screen1=task;
    })

    db.collection(databasecommUsers).findOne({
      Screen:2
        }, (error,task2) => {
          screen2=task2;
  })

  db.collection(databasecommUsers).findOne({
    Screen:3
      }, (error,task3) => {
        screen3=task3;
})

  db.collection("commercialsAdmin").findOne({
      
  }, (error,task) => {
  user=task;
  })


app.get('/screen=:screen', (req, res) => {
  screen = req.params.screen ;
    res.render('index',{
      screen:temp,
      
  });
  
  
});



app.get('/admin',function(req,res){
  res.sendFile(path.join(__dirname+'/index5.html'));
 
});

app.post("/editcoom",function(sReq, sRes){
  
  console.log("temp: "+temp);

    changeCom(temp[0]._id , sReq.body.com0 ,sReq.body.com9);
    changeCom(temp[1]._id , sReq.body.com1 ,sReq.body.com10);
    changeCom(temp[2]._id , sReq.body.com2 ,sReq.body.com11);
    changeCom(temp[3]._id , sReq.body.com3 ,sReq.body.com12);
    changeCom(temp[4]._id , sReq.body.com4 ,sReq.body.com13);
    changeCom(temp[5]._id , sReq.body.com5 ,sReq.body.com14);
    changeCom(temp[6]._id , sReq.body.com6 ,sReq.body.com15);
    changeCom(temp[7]._id , sReq.body.com7 ,sReq.body.com16);
    changeCom(temp[8]._id , sReq.body.com8 ,sReq.body.com17);
});


function changeCom(id,img, openT){
console.log(id + img + openT);

db.collection(databasecomm).update({_id:mongodb.ObjectID(id)}, 
{$set: {opentime: openT,image: img
}});



console.log("temp "+temp);

}


app.post('/login', function(sReq, sRes) {
  var username = sReq.body.username;
  var password = sReq.body.password;
      
  if (username==user.username && password == user.password) {
         // do something here with a valid login
        
         sRes.render('admin',{
          screen:temp, usersconnect:countUsers, screen1:screen1State, screen2:screen2State,
           screen3:screen3State,
         });
          
         

  } else { 
         // user or password doesn't match
         sRes.json("Wrong details, please go back to the firsg page!");
  }
});




http.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);

});



io.on( 'connection', function(socket) {
  countUsers++; 
  console.log( "a user has connected!" );
  if (screen == 0)
  {
    UserConnect(0, true);
    screen1State = "Screen 1 is connected"
   }

  if (screen == 1)
  {
    UserConnect(1, true);
    screen2State = "Screen 2 is connected"
  }
  if (screen == 2)
  {
    UserConnect(2, true);
    screen3State = "Screen 3 is connected"

  }
  
  socket.on( 'disconnect', function() {
    if(countUsers!=0){
       countUsers--;
    }
    if (screen == 0)
    {
      UserConnect(0, false);
      screen1State = "Screen 1 is disconnected"
    }
    if (screen == 1)
    {
     UserConnect(1, false);
     screen2State = "Screen 2 is disconnected"

    }
    if (screen == 2)
    {
      UserConnect(2, false);
      screen3State = "Screen 3 is disconnected"

    }

    console.log( "user disconnected");
    });
 });


});


function UserConnect(num, b)
{
  var myquery = { Screen:num };
  var newvalues = { $set: { isConnected: b } };
  db.collection(databasecommUsers).updateOne(myquery, newvalues, function(err, res) {
  } ) ;
}