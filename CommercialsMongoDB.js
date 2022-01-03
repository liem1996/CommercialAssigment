var express = require("express");
var app = express();
const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
const connectionURL = 'mongodb://127.0.0.1:27017/'
const databaseName = 'CommercialssLiem12'

const path = require('path');

app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug');

MongoClient.connect(connectionURL,{useNewUrlParser : true},(error,client) => {
    if (error){
        return console.log("Can't connect to db")
    }
     db = client.db(databaseName);
    db.collection('commercialsAdds').insertMany(
       [
        {
          opentime: 2000,
          image:"https://i.ytimg.com/vi/b7gTudFZoL8/maxresdefault.jpg"
        },
        {
          opentime: 3000,
          image:"https://static.wixstatic.com/media/9aa509_4d6b69af038e47269d1e39735987c6ed~mv2.jpg/v1/fill/w_250,h_363,al_c,q_90/9aa509_4d6b69af038e47269d1e39735987c6ed~mv2.jpg"  
        },
        {
          opentime: 6000,
          image:"https://o.quizlet.com/DkJ6OEEA6nkfdZsb7CEOiw.jpg" 
        },
      {
        opentime: 2000,
        image:"https://images1.ynet.co.il/PicServer5/2018/12/13/8942861/wide-article-980.jpg"
      },
      {
        opentime: 3000,
        image:"https://cashcow-cdn.azureedge.net/images/a26817b8-bab0-4579-9fbe-9a8e27a12ce8_500.jpg"

      },
      {
        opentime: 6000,
        image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw9BiZB7lUGFNWWdKsMAIBPULWCA-O6yNEIw&usqp=CAU"

      },
    {
      opentime: 2000,
      image:"https://gidigov.co.il/wp-content/uploads/2016/03/bezeq-2.jpg"
    },
    {
      opentime: 3000,
      image:"https://www.makorrishon.co.il/wp-content/uploads/2018/03/1_118491090.jpg"

    },
    {
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
        Screen: 1
        },
       {
        isConnected: false,
        Screen: 2    
         },
       {
        isConnected: false,
        Screen: 3
       },
]
   , (error,result) => {
       if (error){
           return console.log('Could not insert')
       }
   })
     console.log("done entering to DB");

})