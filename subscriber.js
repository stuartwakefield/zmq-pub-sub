var zmq = require('zmq');

// Create a subscriber socket
// http://api.zeromq.org/2-1:zmq-socket#toc10
var sock = zmq.socket('sub');
var port = 5556;

// This will connect to an existing publisher bound to the
// following address...
sock.connect('tcp://127.0.0.1:' + port);

// Filters out messages by topic, this can be set to a
// blank string to receive all messages...
sock.subscribe('seconds.ping');

console.log('Consumer subscribed to port %s', port);

sock.on('message', function(msg) {
	
	// Separate out the topic and the message
	// data...
	var str = msg.toString();
	var pivot = str.indexOf(' ');
	var topic = str.substr(0, pivot);
	var raw = str.substr(pivot + 1);
	var data = JSON.parse(raw);

	console.log('Message: %s', topic, data);
});