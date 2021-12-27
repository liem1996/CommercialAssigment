
const { response } = require("express");
var express = require("express");
var app = express();
var fs = require('fs');
var port=8089;

app.use("/script", express.static('./script/'));


// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;
// const connectionURL = 'mongodb://localhost:27017';
// const databaseName = 'shay';
  

  
//   MongoClient.connect(connectionURL,{useNewUrlParser : true},(error,client) => {
//       if (error){
//           return console.log("Can't connect to db");
//       }
//       const db = client.db(databaseName);
  
//       db.collection('stam').insertMany([
        
//           {
       
//             opentime: 2000,
//             image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8f8PY_WSeMxTbcTyAmel0fzUo0wCs_HykrQ&usqp=CAU"
           
//         },
//         {
            
//             opentime: 3000,
//             image:"https://static.wixstatic.com/media/9aa509_4d6b69af038e47269d1e39735987c6ed~mv2.jpg/v1/fill/w_250,h_363,al_c,q_90/9aa509_4d6b69af038e47269d1e39735987c6ed~mv2.jpg"
//         },            
//         {
            
//             opentime: 6000,
//             image:"https://o.quizlet.com/DkJ6OEEA6nkfdZsb7CEOiw.jpg"
//         }, 
//       ], (error,result) => {
//           if (error){
//               return console.log('Could not insert')
//           }
//           console.log(result.ops)
//       })
  
//       db.collection('stam').find({completed: false}).toArray((error,tasks) => {
//           console.log("hello" + tasks)



//       })
  
//       // db.collection('stam').findOne({
//       //     _id: new mongodb.ObjectID("5eb2c1832db05baf1066dd2f")
//       // }, (error,task) => {
//       //     console.log(task)
//       // })
  
      
//   })
 
  app.get('/screen=:screen', (req, res) => {
    let screen = (req.params.screen % 3 ) ;
    //app.use(express.static(path.join(__dirname, 'staticScreen')));
    res.sendFile(__dirname + `/screen${screen}.html`);


  })
  
  app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`);
  })


//   db.collection('stam').find({}, function(err, products){
//     if(err){
//         console.log("rrrr" + err);
//         res.json(err);
//     }
//     else{
//         res.json(products);
//     }
// });
