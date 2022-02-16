var express = require("express");
var app = express();
const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
const connectionURL = 'mongodb://127.0.0.1:27017/'
const databaseName = 'AllCommercials'

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
          myName: "Pizza",
          opentime: 3000,
          image:"https://i.ytimg.com/vi/qfSg78JALzg/maxresdefault.jpg"  
        },
        {
          myId : 2,
          myName: "Primor",
          opentime: 3000,
          image:"https://primor.co.il/wp-content/uploads/2016/12/picslider4.jpg" 
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
        opentime: 3000,
        image:"https://i.ytimg.com/vi/-bQIIEhY7PY/maxresdefault.jpg"

      },
    {
      myId : 6,
      myName: "Disney",
      opentime: 2000,
      image:"https://cdn.mos.cms.futurecdn.net/hZs2sf9VCzS3RCCQyn26bY-1200-80.jpg"
    },
    {
      myId : 7,
      myName: "Clalit",
      opentime: 3000,
      image:"https://lessismore-ad.co.il/wp-content/uploads/2017/01/%D7%9B%D7%9C%D7%9C%D7%99%D7%AA-%D7%97%D7%95%D7%9C%D7%95%D7%9F-ribua.jpg"

    },
    {
      myId : 8,
      myName: "CafeElit",
      opentime: 3000,
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
      username:"admin@gmail.com",
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