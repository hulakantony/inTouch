module.exports = function (socket) {
	socket.on('chat message', function(msg) {
		socket.broadcast.emit('chat message', msg);
	})
}