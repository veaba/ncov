<template>
		<div class="home">
				<h1>【最新更新时间】：{{updateDataTime}}, 来源 <a :href="sourceUrl" target="_blank">新浪新闻</a></h1>
				<div id="map"></div>
				<!--发布模块-->
				<PostModule></PostModule>
				
				<DashboardModule :reportButton="reportButton"></DashboardModule>
				
				<PostModule :reportButton="reportButton" :reportData="reportData"></PostModule>
		</div>
</template>

<script>
	
	import {onMounted} from 'vue';
	import {drawMap, realtimeDrawMap} from './utils/draw';
	import {onSocket, emitSocket, socket} from './utils/socketIo';
	import BarrageModule from "./components/modules/Barrage.vue";             // todo 弹幕
	import ConsoleModule from "./components/modules/Console.vue";             // todo 确认消息控制台，需要授权
	import DashboardModule from "./components/modules/Dashboard.vue";         // todo 仪表盘，控制页面显示
	import MessageModule from "./components/modules/Message.vue";             // todo 一旦新消息发布，则显示，单条消息发送Modal
	import NewsModule from "./components/modules/News.vue";                   // todo 滚动播报新闻，来源权威机构，后续需要确认机构名单
	import PostModule from './components/modules/Post.vue';                   // todo 人工，发布消息
	import TimelineModule from "./components/modules/Timeline.vue";           // todo 时间轴
	import MapModule from "./components/modules/Map.vue";                     // todo 地图
	
	export default {
		components: {
			BarrageModule,
			ConsoleModule,
			DashboardModule,
			MessageModule,
			MapModule,
			NewsModule,
			PostModule,
			TimelineModule,
		},
		setup() {
			onMounted(async () => {
				drawMap();
				realtimeDrawMap(socket('asyncChannel'));
				// onSocket('asyncChannel', 'worldMap')
				// 	.then(x => {
				// 		console.info(x);
				// 	});
				const x = await onSocket('broadcast', 'sendData');
				console.info(x);
				// await onSocket('my_message');
				// await onSocket('emit_broadcast');
				//
				
				setInterval(() => {
					// emitSocket('broadcast', 'sendData', 'hi');
					// 前端推送报告到后端
					// emitSocket('report', 'report', {
					// 	name: '无名之人',
					// 	country: '中国',
					// 	province: "北京",
					// 	city: "北京",
					// 	area: "海淀区",
					// 	newsUrl: "https://weibo.com/2656274875/IrfW6AWVC?from=page_1002062656274875_profile&wvr=6&mod=weibotime",
					// 	reportDate: 1580022981616,//todo 这是一个number类型
					// 	count: 5,
					// });
				}, 2000);
				window.onresize = function () {
					drawMap();
				};
			});
			return {
				updateDataTime: "截止1月24日 9时",
				sourceUrl: "https://news.sina.cn/zt_d/yiqing0121/?wm=3049_0016&from=qudao",
				reportButton: {
					isOpen: false
				},
				reportData: {
					count: 0,
					suspected: 0,
					dead: 0,
					cure: 0,
					name: "",
					age: 0,
					sex: '1',
					profession: '1',
					country: "",
					province: "",
					city: "",
					area: "",
					newsUrl: "",
					reportDate: ""
				}
			};
		},
	};
</script>
<style lang="scss">
		body, html {
				padding: 0;
				margin: 0;
				width: 100vw;
				height: 100vh;
		}
		ul{
				padding-inline-start: 0;
		}
		
		#app {
				width: 100%;
				height: 100%;
		}
		
		.left-layout {
				position: absolute;
				top: 0;
				left: 0;
				width: 400px;
				/*height: 100%;*/
				border: 1px solid red;
				z-index: 1;
		}
		
		.right-layout {
				position: absolute;
				top: 0;
				right: 0;
				width: 500px;
				z-index: 1;
		}
		
		.must-be {
				position: relative;
				
		}
		
		.clear {
				display: block;
				content: "";
				clear: both;
		}
		
		button {
				cursor: pointer;
				color: #2d8cf0;
				border: 1px solid #2d8cf0;
				border-radius: 4px;
		}
		
		
		button + .primary {
				background: #2d8cf0;
				color: #fff;
		}
		
		button:disabled {
				user-select: none;
				color: #c5c8ce;
				background-color: #f7f7f7;
				border-color: #dcdee2;
				cursor: not-allowed;
		}
</style>
<style lang="scss" scoped>
		.home {
				position: relative;
				
				h1 {
						position: absolute;
						width: 100%;
						top: 0;
						font-family: Arial, Helvetica, sans-serif;
						color: #ffc107;
						text-align: center;
						z-index: 1;
						
						a {
								color: red
						}
						
				}
		}
		
		#map {
				width: 100%;
				height: 100%;
				
		}

</style>
