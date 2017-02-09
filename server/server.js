//'use strict';
const app = require('./app');
const debug = require('debug')('sreamplay:server');
const http = require('http');

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || '8080');
app.set('port', port);


/**
 * Create HTTP server.
 */

const server = http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

//SocketIo connection...
var User = require('./models/user');
const io = require('socket.io')(server);

io.on('connection', function(socket){	
	socket.on('connect', function(){
		console.log( 'socket has connected to the chat.' + socket.id);
		io.emit('connect')
	})
	socket.on('chat message', function(msg){
		io.emit('chat message', msg);
	});
	socket.on('user joined', function(user){
		console.log(22222, user)
		User.findOneAndUpdate({'local.nickname': user.nickname}, {
	      "$set": {
	        "local.active": true,
	        "lastActive": Date.now()
	      }
	    }, function (err, user) {
	    	if(err) throw err;	      
	    })		
		io.emit('user joined', user);		
	})
	socket.on('user left', function(user){		
		User.findOneAndUpdate({'local.nickname': user.nickname}, {
	      "$set": {
	        "local.active": false,
	        "lastActive": Date.now()
	      }
	    }, function (err, user) {
	    	if(err) throw err;
	      console.log(user)
	    })
		io.emit('user left', user);	
		io.emit('stop typing', user.nickname)	
	})  
	socket.on('typing', function (nickname) {
    	io.emit('typing', nickname);
    });
    socket.on('stop typing', function (nickname) {    	
    	io.emit('stop typing', nickname);
    });
    
	socket.on('disconnect', function(){
		console.log('disconnect')
		socket.disconnect(true)
	})
});


/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}


/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
