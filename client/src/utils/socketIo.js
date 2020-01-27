// export const socket = require('socket.io-client')('', {
// 	reconnectionAttempts: 10 //自动重连
// });
import {ioServer} from "../config";
import {sid_obj} from "./utils";

const socket = require('socket.io-client')(ioServer + '/broadcast');

export const onSocket = function (eventName) {
	socket.on('connect', () => {
		const {id} = socket;
		const {channel, sid} = sid_obj(id);
		if (sid) {
			localStorage.setItem(channel, sid);
		}
	});
	// 系统首次广播判断授权
	socket.on('auth', res => {
		console.info(res);
		if (res && res.code === 2403) {
			this.authObj.isAuth = false;
			console.info(this.authObj, '未授权');
		} else if (res.code === 0) {
			this.authObj.isAuth = true;
			console.info(this.authObj, '授权');
		}
		
	});
	socket.on(eventName, (data) => {
		console.info(data);
	});
};


export const emitSocket = (eventName, data) => {
	socket.emit(eventName, data);
};
