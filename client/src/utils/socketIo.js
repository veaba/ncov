// export const socket = require('socket.io-client')('', {
// 	reconnectionAttempts: 10 //自动重连
// });
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
	// 系统首次广播判断授权
	// socket.on('auth', res => {
	// 	if (res && res.code === 2403) {
	// 		this.authObj.isAuth = false;
	// 		console.info(this.authObj, '未授权');
	// 	} else if (res.code === 0) {
	// 		this.authObj.isAuth = true;
	// 		console.info(this.authObj, '授权');
	// 	}
	// });
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
			case 'report':
				if (res.code === 0) {
					alert(res.msg);
					console.info(this);
					this.onCloseReportModal();
				}
				break;
			case 'console':
				// 小于5条才操作
				if (this.auditList.length < 5) {
					this.auditList.splice(0, 0, res.data);
				}
				break;
			// 审核通过或者已被审核，前端得到标记位
			case 'auditStatus':
				this.auditList.map((item, index) => {
					if (item._id === res.data._id) {
						this.auditList.splice(index, 1);//关闭
					}
				});
				break;
			case 'broadcast':
				break;
			case 'timeline':
				this.timelineData.splice(0, 0, ...res.data);
				break;
			case 'getTimeline':
				this.timelineData = res.data || [];
				break;
			case 'news':
				this.newsData.splice(0, 0, ...res.data);
				break;
			case 'getNews':
				console.info('getNew', res);
				this.newsData = res.data || [];
				break;
			case 'total':
				// 统计地图中间滚动
				this.totalObj = res.data || {};
				break;
			// 后端主动推送
			case 'worldMap':
				this.goLoading = true;
				this.worldMapData = res.data || {};
				this.asyncTime = res.msg || 0;
				setTimeout(() => {
					this.goLoading = false;
				}, 300);
				break;
			default:
				console.log('无效事件接收');
		}
	});
};


export const emitSocket = (eventName, data) => {
	socket.emit(eventName, data);
};
