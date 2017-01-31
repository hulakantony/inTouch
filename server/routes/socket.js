module.exports = function (socket) {
	socket.on('chat message', function(msg) {
		console.log(msg)
		socket.broadcast.emit('chat message', msg);
	})
}