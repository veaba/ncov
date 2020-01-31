import {ioServer} from "../config";
import {sid_obj} from "./utils";

const socket = require('socket.io-client')(ioServer + '/broadcast', {reconnectionAttempts: 10});
export const onSocket = function (eventName) {
	socket.on('connect', () => {
		const {id} = socket;
		const {channel, sid} = sid_obj(id);
		if (this.authObj) {
			if (sid) {
				this.authObj.oAuthUrl = 'https://github.com/login/oauth/authorize?client_id=e3df94dac858a9eeed1d&redirect_uri=http://localhost:9999/redirect/github/' + sid;
			} else this.authObj.isAuth = false;
		}
		
	});
	socket.on(eventName, (res) => {
		switch (eventName) {
			case 'auth':
				if (res && res.code === 2403) {
					this.authObj.isAuth = false;
					console.info(this.authObj, '未授权');
				} else if (res.code === 0) {
					this.authObj.isAuth = true;
					console.info(this.authObj, '授权');
				}
				break;
			case 'getTotal':
				console.info("getTotal==>", res.data);
				this.totalObj = res.data || {};
				break;
			case 'getWorldMap':
				this.goLoading = true;
				this.worldMapData = res.data || [];
				this.asyncTime = res.msg || 0;
				setTimeout(() => {
					this.goLoading = false;
				}, 100);
				break;
			case 'getChinaRank':
				this.chinaRankData = res.data || [];
				break;
			case 'getWorldRank':
				this.worldRankData = res.data || [];
				break;
			case 'getChinaDay':
				// todo
				console.info('getChinaDay==>', res.data);
				break;
			default:
				console.log('无效事件接收');
		}
	});
};


export const emitSocket = (eventName, data) => {
	console.info(eventName, data);
	socket.emit(eventName, data);
};
