import {ioServer} from "../config";
import {randomColor, sid_obj} from "./utils";
import {getCoorDinates} from '../chartLib/mapv_data';
import {geo} from "../chartLib/map_geo";

const socket = io(ioServer + '/broadcast', {reconnectionAttempts: 10});
export const onSocket = function (eventName) {
	socket.on('connect', () => {
		const {id} = socket;
		const {channel, sid} = sid_obj(id);
		if (this.authObj) {
			if (sid) {
				this.authObj.oAuthUrl = 'https://github.com/login/oauth/authorize?client_id=e3df94dac858a9eeed1d&redirect_uri=https://2019-ncov.datav.ai/redirect/github/' + sid;
			} else this.authObj.isAuth = false;
		}
		
	});
	socket.on(eventName, (res) => {
		switch (eventName) {
			case 'auth':
				if (res && res.code === 2403) {
					this.authObj.isAuth = false;
				} else if (res.code === 0) {
					this.authObj.isAuth = true;
				}
				break;
			case 'online':
				this.online = res.data || 0;
				break;
			case 'talk':
				if (Array.isArray(res.data)) {
					this.barrageContent = (res.data || []).map(item => {
						item.color = randomColor();
						return item;
					});
				} else {
					let talkItem = JSON.parse(JSON.stringify(res.data || {}));
					talkItem.color = randomColor();
					this.barrageContent.push(talkItem);
					talkItem = null;
				}
				break;
			case 'getTotal':
				if (res.msg === 'push') {
					this.playWarning.status = true;
				}
				this.totalObj = res.data || {};
				break;
			case 'getWorldMap':
				const lineWorldMapData = [];
				const localWorldMapData = [];
				// 转换格式
				for (let item of res.data) {
					let coordinateArray = getCoorDinates(item.city, mapv) || geo[item.city];
					if (!coordinateArray[0]) {
						coordinateArray = getCoorDinates(item.province, mapv) || geo[item.province];
					}
					if (!coordinateArray[0]) {
						coordinateArray = getCoorDinates(item.country, mapv) || geo[item.country];
					}
					
					lineWorldMapData.push({
						fromName: "武汉",
						toName: item.city || item.province || item.country,
						coords: [[115.65875349263533, 30.53695878561894], coordinateArray]
					});
					localWorldMapData.push({
						name: item.city || item.province || item.country,
						value: [...coordinateArray, item.confirm],
						symbolSize: 2,
						itemStyle: {"normal": {"color": "#F58158"}}
					});
				}
				this.localWorldMapData = localWorldMapData;
				this.moveLineWorldMapData = lineWorldMapData;
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
				this.chinaDay = res.data || [];
				break;
			default:
				console.log('无效事件接收');
		}
	});
};


export const emitSocket = (eventName, data) => {
	socket.emit(eventName, data);
};
