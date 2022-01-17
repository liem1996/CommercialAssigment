var express = require("express");
const req = require("express/lib/request");
const res = require("express/lib/response");
var app = express();
var port=8089;
const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
const connectionURL = 'mongodb://127.0.0.1:27017/'
const databaseName = 'Commercials12'
const databasecomm = 'commercialsAdds'
const databasecommUsers = 'commercialsUsers'
var http = require( 'http' ).createServer(app);
var io = require( 'socket.io' )( http );
var bodyParser = require('body-parser')
var user;
var countUsers=1;
 
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
   

});



app.post('/login', function(sReq, sRes) {
  var username = sReq.body.username;
  var password = sReq.body.password;
      
  if (username==user.username && password == user.password) {
         // do something here with a valid login

         sRes.render('admin',{
          screen:temp, usersconnect:countUsers,
         });
          
         

  } else { 
         // user or password doesn't match
         sRes.json("Wrong details, please go back to the firsg page!");
  }
});




http.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);

});



io.on( 'connection', function( socket ) {
  countUsers++; 
  console.log( "a user has connected!" );
  if (screen == 1)
  {
    UserConnect(1, true);
   }

  if (screen == 2)
  {
    UserConnect(2, true);

  }
  if (screen == 3)
  {
    UserConnect(3, true);

  }
  
  socket.on( 'disconnect', function() {
    if(countUsers!=0){
       countUsers--;
    }
    if (screen == 1)
    {
      UserConnect(1, false);
    }
    if (screen == 2)
    {
     UserConnect(2, false);

    }
    if (screen == 3)
    {
      UserConnect(3, false);

    }

    console.log( "user disconnected");
    });
 });


});


function UserConnect(num, b)
{
  
  var myquery = { Screen: num };
  var newvalues = { $set: { isConnected: b } };
  db.collection(databasecommUsers).updateOne(myquery, newvalues, function(err, res) {
  } ) ;
}