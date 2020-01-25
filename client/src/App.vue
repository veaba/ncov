<template>
		<div class="home">
				<h1>【最新更新时间】：{{updateDataTime}}, 来源 <a :href="sourceUrl" target="_blank">新浪新闻</a></h1>
				<div id="map"></div>
				<!--发布模块-->
				<PostModule></PostModule>
		</div>
</template>

<script>
	
	import {onMounted} from 'vue';
	import {drawMap} from './utils/draw';
	import {onSocket, emitSocket, onAll} from './utils/socketIo';
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
			// let commitList = ref(null);
			// // 获取Repo Commit 时间,这个有权限控制403
			// // 2020-01-22T12:58:47Z
			// watch(() => {
			// 	fetch('https://api.github.com/repos/veaba/ncov/commits', {
			// 		headers: {
			// 			'Accept': 'application/json/vnd.github.cloak-preview',
			// 		}
			// 	})
			// 		.then(res => res.json())
			// 		.then(json => {
			// 			commitList.value = reactive(json[0]);
			// 		});
			// });
			onMounted(async () => {
				drawMap();
				await onAll('all');
				await onSocket('broadcast');
				// await onSocket('my_message');
				// await onSocket('emit_broadcast');
				setInterval(() => {
					emitSocket('broadcast', 'sendData', 'hi');
				}, 2000);
				window.onresize = function () {
					drawMap();
				};
			});
			
			return {
				updateDataTime: "截止1月24日 9时",
				sourceUrl: "https://news.sina.cn/zt_d/yiqing0121/?wm=3049_0016&from=qudao"
			};
		},
	};
</script>
<style>
		body, html {
				padding: 0;
				margin: 0;
				width: 100vw;
				height: 100vh;
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
				/*height: 100%;*/
				border: 1px solid green;
				z-index: 1;
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
						z-index: 99;
						
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
