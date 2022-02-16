var express = require("express");
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
var flag = 0;
var username;
var password;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

const path = require('path');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use("/script", express.static('./script/'));

let db = 0;
var commercialsList = [];
var usersList = [];
let screen = 0;

// Mongo DB connection
MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {

  if (error) {
    return console.log("Can't connect to db")
  }
  db = client.db(databaseName);

  db.collection(databasecomm).find().toArray((error, tasks) => {
    commercialsList = tasks
  })

  db.collection("commercialsAdmin").findOne({
  }, (error, task) => {
    user = task;
  })


  // using render in order to get into the index.pug according to the screen
  // by that, sending the commercials to the right screen
  app.get('/screen=:screen', (req, res) => {
    screen = req.params.screen;
    res.render('index', {
      screen: commercialsList,
    });
    conectNotconect(screen);
  });


  // navigating to the login.html screen after entering the admin page
  app.get('/admin', function (req, res) {
    res.sendFile(path.join(__dirname + '/login.html'));
  });

  // the post method from the admin.pug main form - main checks
  // the screen for editing the mongo DB
  app.post("/editcoom", function (sReq, sRes) {

    username = sReq.body.adminName;
    password = sReq.body.adminPassword;

    flag = commercialsList.length;
    var num, num2, deleteFlag, var1, var2, var3, var4;
    var1=sReq.body.myId;
    var2=sReq.body.myName;
    var3=sReq.body.opentime;
    var4=sReq.body.image;
  // to run on the commercials array and run fucntions of edit, delete etc
  for (var i =0; i<commercialsList.length; i++)
  {
    var comVar = "com";
    var comDel = "delete";
    num = sReq.body[comVar +i];
    num2 = sReq.body[comVar +flag];
    deleteFlag = Boolean(sReq.body[comDel + i]);
  
    changeCom(commercialsList[i]._id, num2, num,i);

    if (var1!= "" && var2!=""&&var3!=""&&var4!="")
    {
     addCom(var1,var2,var3,var4);
     var1="";
     var2="";
     var3="";
     var4="";
     db.collection(databasecomm).find().toArray((error, tasks) => {
      commercialsList = tasks
      })
    }
  
    // check if the value of the checkbox in the admin.pug of the specific commercial
    // is marked as true of false 
    if (deleteFlag==true)
    {
      deleteCom(commercialsList[i]._id);
      db.collection(databasecomm).find().toArray((error, tasks) => {
        commercialsList = tasks
      });
      sReq.body[comDel + i]=false;
      deleteFlag=false;
      
      
    }

    flag++;
  } // end of for loops


    changeAdmin(user._id, username, password);
    
    db.collection(databasecomm).find().toArray((error, tasks) => {
      commercialsList = tasks
    })

   // refreshing the page in order to create a delay of 2 sec for the mongo to be save
    setTimeout(() => {
      sRes.redirect(307, '/refresh');
    }, 2000);
   

    });

    app.post('/refresh',function(req,res){
      res.render('admin', {
        screen: commercialsList, usersconnect: countUsers, screen0: screen1State, screen1: screen2State,
        screen2: screen3State, adminName: username, adminPassword: password,
      });
    });



  function deleteCom(id){

  db.collection(databasecomm).deleteOne({
    _id: id
  }).then((result) => {
    
  }).catch((error) => {
    console.log(error)
    
  })
}

// if the admin is being change, the function update the mongo and
// use timeout to create a delay when qurey from the mongo
  function changeAdmin(id, name, pass) {
    db.collection(databaseAdmin).updateMany({ _id: mongodb.ObjectID(id) },
      {
        $set: {
          username: name, password: pass
        }
      });

   setTimeout(() => {
    db.collection("commercialsAdmin").findOne({
    }, (error, task) => {
      user = task;
    });
   }, 2000);
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

  // the login post function that check the connection of the user and navigate 
  // to the next screen -> if connected than rendring, else go to 404 page
  app.post('/login', function (sReq, sRes) {
    username = sReq.body.username;
    password = sReq.body.password;
  
    if (username == user.username && password == user.password) {
      // do something here with a valid login

      sRes.render('admin', {
        screen: commercialsList, usersconnect: countUsers, screen0: screen1State, screen1: screen2State,
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

  db.collection(databasecommUsers).find().toArray((error, tasks) => {
    usersList = tasks
  })

  // function that checks by the each screen who is connected and who isnt
  function conectNotconect(screen1){
    io.once('connection', function (socket) {
      countUsers++;
      console.log("a user has connected!");
      if (screen1 == 0) {
        UserConnect(0, true);
        screen1State = "Screen 0 is connected"
      }
  
      if (screen1 == 1) {
        UserConnect(1, true);
        screen2State = "Screen 1 is connected"
      }
      if (screen1 == 2) {
        UserConnect(2, true);
        screen3State = "Screen 2 is connected"
  
      }
  
      socket.once('disconnect', function () {
       
          countUsers--;
        
        if (screen1 == 0) {
          UserConnect(0, false);
          screen1State = "Screen 0 is disconnected"
        }
        if (screen1 == 1) {
          UserConnect(1, false);
          screen2State = "Screen 1 is disconnected"
  
        }
        if (screen1 == 2) {
          UserConnect(2, false);
          screen3State = "Screen 2 is disconnected"
  
        }
  
        console.log("user disconnected");
      });
    });
  }
  

  // function that update the current state of user in the db
  function UserConnect(num, b) {
    db.collection(databasecommUsers).updateMany(
      { 
        _id: mongodb.ObjectID(usersList[num]._id)
       },
    {
      $set: {
        isConnected: b
      }
    });
  
  }

});