import zmq
import json

port = 5556
context = zmq.Context()

# Define this socket as a subscriber
# http://api.zeromq.org/2-1:zmq-socket#toc10
socket = context.socket(zmq.SUB)

# Will connect to a publisher bound to the following
# address...
# http://zeromq.github.io/pyzmq/api/zmq.html#zmq.Socket.connect
# http://api.zeromq.org/2-1:zmq-connect
socket.connect("tcp://127.0.0.1:%s" % port)

# This subscriber is listening out for all messages
# the string can be changed to filter by particular
# topics...
# http://zeromq.github.io/pyzmq/api/zmq.html#zmq.Socket.setsockopt_string
# http://api.zeromq.org/2-1:zmq-setsockopt
socket.setsockopt_string(zmq.SUBSCRIBE, 'seconds.ping')

while True:
	data = socket.recv().decode('UTF-8')
	topic, raw = data.split(' ', 1)
	message = json.loads(raw)
	print("Message: %s %s" % (topic, message))