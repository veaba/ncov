// export const socket = require('socket.io-client')('', {
// 	reconnectionAttempts: 10 //自动重连
// });
export const socket = (room) => {
	let url = 'http://127.0.0.1:9999';
	if (room) {
		url = url + '/' + room;
	}
	return require('socket.io-client')(url, {
		reconnectionAttempts: 10 //自动重连
	});
};

export const onSocket = (room, eventName) => {
	return new Promise(((resolve, reject) => {
		socket(room).on(eventName, (data) => {
			resolve(data);
			if (!data) {
				reject(data);
			}
		});
	}));
};

export const emitSocket = (room, eventName, data) => {
	socket(room).emit(eventName, data);
};

