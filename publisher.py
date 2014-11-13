import zmq
import time
import json

port = 5556
count = 0

context = zmq.Context()
socket = context.socket(zmq.PUB)
socket.bind("tcp://127.0.0.1:%s" % port)

def send_json_message(socket, topic, message):
	print("Sending message: %s %s" % (topic, json.dumps(message)))
	socket.send_string("%s %s" % (topic, json.dumps(message)))

while True:
	send_json_message(socket, "seconds.ping", {
		'time': time.strftime('%Y-%m-%dT%H:%M:%SZ', time.gmtime())
	})
	
	if count == 0:
		send_json_message(socket, "minutes.ping", {
			'time': time.strftime('%Y-%m-%dT%H:%M:%SZ', time.gmtime())
		})

	count = (count + 1) % 60
	time.sleep(1)
