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
			var topic = 'seconds.ping';
			var data = {
				time: new Date().valueOf()
			};
			var message = [topic, JSON.stringify(data)].join(' ');
			console.log('Sending message: %s', message);
		 	sock.send(message);
		}, 1000);
	}
});

