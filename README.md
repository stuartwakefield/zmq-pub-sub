# ZMQ Pub/Sub

First install ZMQ. Using Homebrew:

	brew install zmq

Make sure you also have Node.js and Python 3+:

	brew install nodejs python3

Install the Python requirements (you may need additional build tools):

	pip3 install -r requirements.txt

Install the Node.js modules (you may need node-gyp installed):

	npm install

Run one of the publishers:

	node publisher.js
	python3 publisher.py

Run any number of subscribers:

	node subscriber.js
	python3 subscriber.py