<img src="commercials.png" width="430" height="150">

# :globe_with_meridians: Commercials Server :globe_with_meridians:

This is our final project in Internet applications course, as part of our B.Sc. Computer Science studies that was taught by Mr. Haim Shafir. We built NodeJS commercials server using express, sockets connection, mongoDB, get and post requests and responds, body-parser to get information from the pug, render to route between pages and screens and pass information to the new http url.

# Main idea :bulb:

Our client will deploy few numbers of screens in parallel to present random changing commercials. To the system there is main server written in nodeJS and displaying computers - each displaying computer is connected to an add screen.
The commericals display dynamically in each pug screen by uploading new commericails and exisiting commercials from the mongo DB, and also using scripts written in JS to present on the screen.

| Client-screen | Admin |
| :------------ | -----:|
| screen 0  | Change admin password and email |
| screen 1 |  Edit existing commericals |
| screen 2 |   Delete exisiting commercials |
|   |   Add new commerical |
|  |    See who is connected/disconnected from the clients |
|  | See the number of connected clients |

# Technologies :flashlight:

- Pug - using pug to build the client side, and connect it to the nodeJS server.
- JS - using functions such as setTimeOut, setInterval, getElementById, JSON Parse from server, random function for the commericals.
- MongoDB - creating the DB collections: CommercialsAdds, CommercialsAdmin, CommericalsUsers using base operations of MongoDB such as delete, add and edit in the server and in
 the DB creation file.
- NodeJS - crating the server using express, js, get and post reqests and responds, etc.
- SocketIO - creating the connection of the clients to the server by syncoronized if user is connected or disconnected.
- CSS + HTML - creating the login and 404 error as HTML, validation, style of the admin pug file, pug index style (the commercials) and HTML files of login and 404 error.

# Run the code :runner:

First, run the MongoDB creation and second, run the nodeJS server.
```
node CommercialsMongoDB.js
```
```
node app.js
```

# Demo :video_camera:

Watch a demo video of the project on youtube:

https://www.youtube.com/watch?v=hCJ7zqxgn2k

DB demo:

<img src="MongoDB Compass - localhost_27017_AllCommercials 2022-02-16 14-22-40.gif" width="500" height="300">


Thank you for watching!
