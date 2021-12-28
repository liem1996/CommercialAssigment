const { response } = require("express");
var express = require("express");
var app = express();
var fs = require('fs');
var port=8089;
const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
const connectionURL = 'mongodb://127.0.0.1:27017/'
const databaseName = 'Coomercials6'
const databasecomm = 'commercialsAdds'

var screen1=0;
var taketext=0;

const path = require('path');

app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug');
app.use("/script", express.static('./script/'));
let db=0;
 
var temp =[];



MongoClient.connect(connectionURL,{useNewUrlParser : true},(error,client) => {
    if (error){
        return console.log("Can't connect to db")
    }
     db = client.db(databaseName);
    db.collection('commercialsAdds').insertMany(
       [
        {
          opentime: 2000,
          image:"https://i.ytimg.com/vi/b7gTudFZoL8/maxresdefault.jpg",
          Screen:1,
          txt:"hello"
        },
        {
          opentime: 3000,
          image:"https://static.wixstatic.com/media/9aa509_4d6b69af038e47269d1e39735987c6ed~mv2.jpg/v1/fill/w_250,h_363,al_c,q_90/9aa509_4d6b69af038e47269d1e39735987c6ed~mv2.jpg",
          Screen:1  , 
          txt:"hello2"
  
        },
        {
          opentime: 6000,
          image:"https://o.quizlet.com/DkJ6OEEA6nkfdZsb7CEOiw.jpg",
          Screen:1   ,
          txt:"hello3"
 
        },
    ], (error,result) => {
        if (error){
            return console.log('Could not insert')
        }
        console.log(result.ops)
    })

     
      db.collection(databasecomm).find({Screen:1}).toArray((error,tasks)=>{
       console.log(tasks[0].txt)
      temp = tasks})

     

})


app.get('/screen=:screen', (req, res) => {
    let screen = (req.params.screen % 3 ) ;
    //app.use(express.static(path.join(__dirname, 'staticScreen')));
    console.log(screen1);
    res.render('index',{
      screen:temp,
      

    });
    console.log(taketext);
    
  });


  app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`);
    console.log("hi");
   

    /*
    var i=0;
  
    function func(){
     i++;  
     $('image.result').attr("src",image);
    }
    
    console.log(opentime);
    setInterval(func,opentime);
    */
  });