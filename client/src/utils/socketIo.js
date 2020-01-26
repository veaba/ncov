var socket = require('socket.io-client')('http://127.0.0.1:9999', {
	reconnectionAttempts: 10 //自动重连
});

export const onSocket = (room, eventName) => {
	socket.nsp = '/' + room;
	socket.on(eventName, (data) => {
		return new Promise(((resolve, reject) => {
			resolve(data);
			if (!data) {
				reject(data);
			}
		}));
	});
};

export const emitSocket = (room, eventName, data) => {
	socket.nsp = '/' + room;
	socket.emit(eventName, data);
};
