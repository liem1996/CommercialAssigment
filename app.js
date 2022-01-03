var express = require("express");
var app = express();
var port=8089;
const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
const connectionURL = 'mongodb://127.0.0.1:27017/'
const databaseName = 'CommercialssLiem12'
const databasecomm = 'commercialsAdds'
const databasecommUsers = 'commercialsUsers'
var http = require( 'http' ).createServer(app);
var io = require( 'socket.io' )( http );


const path = require('path');

app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug');
app.use("/script", express.static('./script/'));
let db=0;
 
var temp =[];
let screen=0;

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


app.get('/screen=:screen', (req, res) => {
  screen = req.params.screen ;
  
    res.render('index',{
      screen:temp,
  });
  
  
});


http.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);

});

io.on( 'connection', function( socket ) {
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

  




