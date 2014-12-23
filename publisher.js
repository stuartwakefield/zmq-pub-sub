var zmq = require('zmq');
var sock = zmq.socket('pub');
var port = 5556;
var count = 0;

function sendMessage(topic, data) {
	var message = [topic, JSON.stringify(data)].join(' ');
	console.log('Sending message: %s', message);
	sock.send(message);
};

sock.bind('tcp://127.0.0.1:' + port, function(err) {
	if (err) {
		console.error("Could not bind to port %s", port);

	} else {
		console.log("Bound to port %s", port);
		setInterval(function(){
			sendMessage('seconds.ping', {
				time: new Date().toISOString()
			});
			if (count == 0) {
				sendMessage('minutes.ping', {
					time: new Date().toISOString()
				});
			}
			count = (count + 1) % 60;
		}, 1000);
	}
});

