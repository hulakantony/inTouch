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
var allClients = [];
const io = require('socket.io')(server);

io.on('connection', function(socket){	
	console.log( socket.name + ' has connected from the chat.' + socket.id);
	allClients.push(socket);	
	socket.on('chat message', function(msg){
		io.emit('chat message', msg);
	});
	socket.on('user joined', function(user){
		io.emit('user joined', user)
	})
	socket.on('user left', function(user){
		io.emit('user left', user)
	})  
	socket.on('disconnect', function(){
		console.log( socket.name + ' has disconnected from the chat.' + socket.id);
		var i = allClients.indexOf(socket);
      	allClients.splice(i, 1);
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
