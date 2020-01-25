var socket = require('socket.io-client')('http://127.0.0.1:8080/broadcast');
var all = require('socket.io-client')('http://127.0.0.1:8080');

export const onAll = (eventName) => {
	console.info(all);
	all.on('sendData', (data) => {
		console.info(1111, data);
	});
};
export const onSocket = (eventName) => {
	socket.on(eventName, (data) => {
		return new Promise(((resolve, reject) => {
			resolve(data);
			if (!data) {
				reject(data);
			}
		}));
	});
};

export const emitSocket = (channel, eventName, data) => {
	console.info(channel, eventName, data);
	socket.emit(eventName, data);
	// socket.of(channel).emit(eventName, data);
};
