var express = require("express");
var app = express();
const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
const connectionURL = 'mongodb://127.0.0.1:27017/'
const databaseName = 'Commercials13'

const path = require('path');
const { getMaxListeners } = require("process");

app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug');

MongoClient.connect(connectionURL,{useNewUrlParser : true},(error,client) => {
    if (error){
        return console.log("Can't connect to db")
    }

    db = client.db(databaseName);

    db.dropDatabase();

    db.collection('commercialsAdds').insertMany(
       [
        {
          myId : 0,
          myName: "klik",
          opentime: 2000,
          image:"https://i.ytimg.com/vi/b7gTudFZoL8/maxresdefault.jpg"
        },
        {
          myId : 1,
          myName: "Hugim",
          opentime: 3000,
          image:"https://static.wixstatic.com/media/9aa509_4d6b69af038e47269d1e39735987c6ed~mv2.jpg/v1/fill/w_250,h_363,al_c,q_90/9aa509_4d6b69af038e47269d1e39735987c6ed~mv2.jpg"  
        },
        {
          myId : 2,
          myName: "Medicine",
          opentime: 6000,
          image:"https://o.quizlet.com/DkJ6OEEA6nkfdZsb7CEOiw.jpg" 
        },
      {
        myId : 3,
          myName: "AdirMiler",
        opentime: 2000,
        image:"https://images1.ynet.co.il/PicServer5/2018/12/13/8942861/wide-article-980.jpg"
      },
      {
        myId : 4,
        myName: "Cafe",
        opentime: 3000,
        image:"https://cashcow-cdn.azureedge.net/images/a26817b8-bab0-4579-9fbe-9a8e27a12ce8_500.jpg"

      },
      {
        myId : 5,
        myName: "Book",
        opentime: 6000,
        image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw9BiZB7lUGFNWWdKsMAIBPULWCA-O6yNEIw&usqp=CAU"

      },
    {
      myId : 6,
      myName: "Bezeq",
      opentime: 2000,
      image:"https://gidigov.co.il/wp-content/uploads/2016/03/bezeq-2.jpg"
    },
    {
      myId : 7,
      myName: "Clalit",
      opentime: 3000,
      image:"https://www.makorrishon.co.il/wp-content/uploads/2018/03/1_118491090.jpg"

    },
    {
      myId : 8,
      myName: "CafeElit",
      opentime: 6000,
      image:"https://www.shotim.co.il/wp-content/uploads/nostalgic-ad-elite-instant-coffee.jpg"

    },
]
    , (error,result) => {
        if (error){
            return console.log('Could not insert')
        }
    })

    db.collection('commercialsUsers').insertMany(
      [
       {
        isConnected: false,
        Screen: 0
        },
       {
        isConnected: false,
        Screen: 1    
         },
       {
        isConnected: false,
        Screen: 2
       },
]
   , (error,result) => {
       if (error){
           return console.log('Could not insert')
       }
   })

   db.collection('commercialsAdmin').insertMany(
    [
     {
      username:"amitbasat2212@gmail.com",
      password:12345678

     },
]
 , (error,result) => {
     if (error){
         return console.log('Could not insert')
     }
 })
     console.log("done entering to DB");


})