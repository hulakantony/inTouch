const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const cors = require('cors');
const path = require('path');
const passport = require('passport');
const session      = require('express-session');
const flash    = require('flash');
const mongoose = require('mongoose');
const configDB = require('./config/database.js');

//mongoose.connect(configDB.url); // connect to our database


//const socket = require('./routes/socket.io');

/*PASSPORT*/
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

require('./routes/public')(app, passport);

app.use(cors());
const staticAssetsPath = path.resolve(__dirname, 'static');
app.use(express.static(staticAssetsPath));
io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

http.listen(8080, function(){
  console.log('listening on *:8080');
});

