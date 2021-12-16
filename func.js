
const { response } = require("express");
var express = require("express");
var app = express();
var fs = require('fs');
var port=8081;





app.get('/screen=:screen', (req, res) => {
    let screen = (req.params.screen % 3 ) ;
    //app.use(express.static(path.join(__dirname, 'staticScreen')));
    res.sendFile(__dirname + `/screen${screen}.html`);
  })
  
  app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`);
  })

  

  