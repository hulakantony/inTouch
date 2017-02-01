const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const cors = require('cors');
const path = require('path');
//const socket = require('./routes/socket');


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

