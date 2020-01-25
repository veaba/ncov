var socket = require('socket.io-client')('http://127.0.0.1:8080');
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

export const emitSocket = (eventName, data) => {
	socket.emit(eventName, data);
};
