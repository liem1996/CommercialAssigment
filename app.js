var express = require("express");
const req = require("express/lib/request");
const res = require("express/lib/response");
var app = express();
var port = 8082;
const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
const connectionURL = 'mongodb://127.0.0.1:27017/'
const databaseName = 'AllCommercials'
const databasecomm = 'commercialsAdds'
const databasecommUsers = 'commercialsUsers'
const databaseAdmin = 'commercialsAdmin'
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser')
var user;
var countUsers = 1;
var screen1State = " ", screen2State = " ", screen3State = " ";
var flag = 0, flag2 = 0;
var username;
var password;
const ObjectID = require('mongodb').ObjectID;
var myId, myName, opentime, image;
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

const path = require('path');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use("/script", express.static('./script/'));
let db = 0;

var temp = [];
let screen = 0;
var admin = [];

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {

  if (error) {
    return console.log("Can't connect to db")
  }
  db = client.db(databaseName);

  db.collection(databasecomm).find().toArray((error, tasks) => {
    temp = tasks
  })

  db.collection(databaseAdmin).find().toArray((error, tasks) => {
    admin = tasks
  })

  db.collection(databasecommUsers).findOne({
    Screen: 1
  }, (error, task) => {
    screen1 = task;
  })

  db.collection(databasecommUsers).findOne({
    Screen: 2
  }, (error, task2) => {
    screen2 = task2;
  })

  db.collection(databasecommUsers).findOne({
    Screen: 3
  }, (error, task3) => {
    screen3 = task3;
  })

  db.collection("commercialsAdmin").findOne({

  }, (error, task) => {
    user = task;
  })


  app.get('/screen=:screen', (req, res) => {
    screen = req.params.screen;
    res.render('index', {
      screen: temp,

    });


  });



  app.get('/admin', function (req, res) {
    res.sendFile(path.join(__dirname + '/login.html'));

  });


  

  app.post("/editcoom", function (sReq, sRes) {

    username = sReq.body.adminName;
    password = sReq.body.adminPassword;
   

    flag = temp.length;
    var num, num2, num3, var1, var2, var3, var4;
    var1=sReq.body.myId;
    var2=sReq.body.myName;
    var3=sReq.body.opentime;
    var4=sReq.body.image;
  
  for (var i =0; i<temp.length; i++)
  {
    var comVar = "com";
    var comDel = "delete";
    num = sReq.body[comVar +i];
    num2 = sReq.body[comVar +flag];
    num3 = sReq.body[comDel + i];
  
    changeCom(temp[i]._id, num2, num,i);
    if (var1!= "" && var2!=""&&var3!=""&&var4!="")
    {
     addCom(var1,var2,var3,var4);
     var1="";
     var2="";
     var3="";
     var4="";
     db.collection(databasecomm).find().toArray((error, tasks) => {
      temp = tasks
      })
    }
    
    
    var list =[]

    if (num3)
    {
      deleteCom(temp[i]._id);
      db.collection(databasecomm).find().toArray((error, tasks) => {
        temp = tasks
      })
    }
    flag++;
  }

  console.log(temp);

    changeAdmin(admin[0]._id, username, password);
    
    db.collection(databasecomm).find().toArray((error, tasks) => {
      temp = tasks
    })


    
    setTimeout(() => {
      sRes.render('admin', {
        screen: temp, usersconnect: countUsers, screen0: screen1State, screen1: screen2State,
        screen2: screen3State, adminName: username, adminPassword: password,
      });
    }, 2000);
   

    });


  function deleteCom(id){

  db.collection(databasecomm).deleteOne({
    _id: id
  }).then((result) => {
    
  }).catch((error) => {
    console.log(error)
    
  })
}

  function changeAdmin(id, name, pass) {
   

    db.collection(databaseAdmin).updateMany({ _id: mongodb.ObjectID(id) },
      {
        $set: {
          username: name, password: pass
        }
      });
     
  }

  function addCom(id,name,openT,img){
      
    db.collection(databasecomm).insertMany(
      [
       {
         myId : id,
         myName: name,
         opentime: openT,
         image:img
       },
      ]
    )

       
  }

function changeCom(id, img, openT,index) {
  
  db.collection(databasecomm).updateMany({ _id: mongodb.ObjectID(id) },
      {
        $set: {
          opentime: openT, image: img
        }
        
      }
      );
      

  }


  app.post('/submit',function (sReq, sRes){

  });

  app.post('/login', function (sReq, sRes) {
    username = sReq.body.username;
    password = sReq.body.password;

    if (username == user.username && password == user.password) {
      // do something here with a valid login

      sRes.render('admin', {
        screen: temp, usersconnect: countUsers, screen0: screen1State, screen1: screen2State,
        screen2: screen3State, adminName: username, adminPassword: password,
      });



    } else {
      // user or password doesn't match
      sRes.sendFile(path.join(__dirname + '/views/404page.html'));
      //sRes.json("Wrong details, please go back to the firsg page!");
    }
  });




  http.listen(port, () => {
    console.log(`listening at http://localhost:${port}`);

  });



  io.on('connection', function (socket) {
    countUsers++;
    console.log("a user has connected!");
    if (screen == 0) {
      UserConnect(0, true);
      screen1State = "Screen 0 is connected"
    }

    if (screen == 1) {
      UserConnect(1, true);
      screen2State = "Screen 1 is connected"
    }
    if (screen == 2) {
      UserConnect(2, true);
      screen3State = "Screen 2 is connected"

    }

    socket.on('disconnect', function () {
      if (countUsers != 0) {
        countUsers--;
      }
      if (screen == 0) {
        UserConnect(0, false);
        screen1State = "Screen 0 is disconnected"
      }
      if (screen == 1) {
        UserConnect(1, false);
        screen2State = "Screen 1 is disconnected"

      }
      if (screen == 2) {
        UserConnect(2, false);
        screen3State = "Screen 2 is disconnected"

      }

      console.log("user disconnected");
    });
  });


});


function UserConnect(num, b) {
  var myquery = { Screen: num };
  var newvalues = { $set: { isConnected: b } };
  db.collection(databasecommUsers).updateOne(myquery, newvalues, function (err, res) {
  });
}