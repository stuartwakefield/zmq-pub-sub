var zmq = require('zmq');
var sock = zmq.socket('pub');
var port = 5556;
var count = 0;

sock.bind('tcp://127.0.0.1:' + port, function(err) {
	if (err) {
		console.error("Could not bind to port %s", port);
	} else {
		console.log("Bound to port %s", port);
		setInterval(function(){
			var message = 'PING' + count++;
			console.log('Sending message: %s', message);
		 	sock.send(message);
		}, 2500);
	}
});

