var express = require("express");
var app = express();
var port=8089;
const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
const connectionURL = 'mongodb://127.0.0.1:27017/'
const databaseName = 'CommercialssLiem'
const databasecomm = 'commercialsAdds'

const path = require('path');

app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug');
app.use("/script", express.static('./script/'));
let db=0;
 
var temp =[];
var temp2 =[];
var temp3 =[];


MongoClient.connect(connectionURL,{useNewUrlParser : true},(error,client) => {
    if (error){
        return console.log("Can't connect to db")
    }
     db = client.db(databaseName);

      db.collection(databasecomm).find({Screen:1}).toArray((error,tasks)=>{
      temp = tasks}
      )

      db.collection(databasecomm).find({Screen:2}).toArray((error,tasks2)=>{
        temp2 = tasks2})

        db.collection(databasecomm).find({Screen:3}).toArray((error,tasks3)=>{
          temp3 = tasks3})
})


app.get('/screen=1', (req, res) => {
    res.render('index',{
      screen:temp,
    });
  });

  app.get('/screen=2', (req, res) => {
    res.render('index',{
      screen:temp2,
    });
  });

  app.get('/screen=3', (req, res) => {
    res.render('index',{
      screen:temp3,
    });
  });

  app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`);

  
  });