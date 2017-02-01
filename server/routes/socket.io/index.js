module.exports = function (socket) {
	socket.on('chat message', function(msg) {
		console.log(msg)
		io.broadcast.emit('chat message', msg);
	})
}