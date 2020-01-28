<template>
		<div class="home">
				<h1>【最新更新时间】：{{updateDataTime}}, 来源 <a :href="sourceUrl" target="_blank">新浪新闻</a></h1>
				<div id="map"></div>
				<!--发布模块-->
				<PostModule></PostModule>
				
				<TimelineModule :timelineButtonStatus="timelineButtonStatus" @onShowModule="onShowModule"></TimelineModule>
				
				<DashboardModule :authObj="authObj" :reportButton="reportButton"
				                 @onShowModule="onShowModule"
				></DashboardModule>
				
				<PostModule :reportButton="reportButton" :reportData="reportData"></PostModule>
				
				<ConsoleModule
								@onShowModule="onShowModule"
								:auditButtonStatus="auditButtonStatus"
								:auditList="auditList"
				></ConsoleModule>
		</div>
</template>

<script>
	
	import {onMounted} from 'vue';
	import {drawMap, realtimeDrawMap} from './utils/draw';
	import {onSocket, emitSocket} from './utils/socketIo';
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
		async mounted() {
			onSocket.call(this, 'broadcast');   // 获取广播出来的新闻
			onSocket.call(this, 'console');// todo 待审核推送过来，管理员才需要这个审核
			onSocket.call(this, 'auditStatus');//审核状态
			// todo 定时拉取需要审核的数据
			drawMap();
			window.onresize = function () {
				drawMap();
			};
			setInterval(() => {
				// emitSocket('report', this.reportData);
			}, 10 * 1000)
		},
		data() {
			return {
				auditButtonStatus: false,   //控制台
				authObj: {
					isAuth: false,
					oAuthUrl: "",
				},
				timelineButtonStatus: false, // timeline
				updateDataTime: "截止1月24日 9时",
				sourceUrl: "https://news.sina.cn/zt_d/yiqing0121/?wm=3049_0016&from=qudao",
				reportButton: {
					isOpen: false
				},
				// 发送报告
				reportData: {
					count: 5,
					suspected: 0,
					dead: 0,
					cure: 0,
					name: "",
					age: 0,
					sex: '1',
					profession: '1',
					country: "中国",
					province: "湖北",
					city: "武汉",
					area: "",
					newsUrl: "https://weibo.com/1699432410/IrAAZkfjf?ref=home&rid=1_0_8_3382943987267608154_0_0_0",
					reportDate: "2020-01-28"
				},
				// 推送过来审核的数据
				auditList: []
			}
		},
		methods: {
			onClickMapHideAudit(val) {
				this.auditButtonStatus = val
			},
			onShowModule(module) {
				switch (module) {
					case 'timeline':
						this.timelineButtonStatus = !this.timelineButtonStatus;
						this.auditButtonStatus = false;
						break;
					case 'audit':
						this.auditButtonStatus = !this.auditButtonStatus;
						this.timelineButtonStatus = false;
						break
				}
			}
		}
	};
</script>
<style lang="scss">
		* {
				box-sizing: border-box;
		}
		
		a {
				color: #0366d6;
		}
		
		body, html {
				padding: 0;
				margin: 0;
				width: 100vw;
				height: 100vh;
		}
		
		ul {
				padding-inline-start: 0;
		}
		
		li {
				list-style: none;
		}
		
		#app {
				width: 100%;
				height: 100%;
				overflow: hidden;
		}
		
		.align-center {
				text-align: center;
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
		
		.clear:after {
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
