<template>
		<div class="home">
				<MapModule @emitPlayStatus="emitPlayStatus" :playWarning="playWarning" :totalObj="totalObj"></MapModule>
				<BarrageModule
								:isBarrageMode="isBarrageMode"
								:authObj="authObj"
								@emitBarrageHide="emitBarrageHide"></BarrageModule>
				<!--				<ChartModule :totalObj="totalObj" :chartButtonStatus="chartButtonStatus"></ChartModule>-->
				
				<!--				<PostModule-->
				<!--								:reportButtonStatus="reportButtonStatus"-->
				<!--								@onShowModule="onShowModule"></PostModule>-->
				
				<!--				<TimelineModule :timelineButtonStatus="timelineButtonStatus"-->
				<!--				                :newsButtonStatus="newsButtonStatus"-->
				<!--				                @onShowModule="onShowModule"></TimelineModule>-->
				
				<!--				<DashboardModule :reportButtonStatus="reportButtonStatus" :authObj="authObj"-->
				<!--				                 @onShowModule="onShowModule"></DashboardModule>-->
				<WorldRankModule :worldRankButtonStatus="worldRankButtonStatus"></WorldRankModule>
				<ChinaRankModule :chinaRankButtonStatus="chinaRankButtonStatus"></ChinaRankModule>
				<!--				<ConsoleModule-->
				<!--								@onShowModule="onShowModule"-->
				<!--								:auditButtonStatus="auditButtonStatus"-->
				<!--								:auditList="auditList"-->
				<!--				></ConsoleModule>-->
				
				<div v-if="!isBarrageMode" class="tip-barrage in-button">
						
						
						<span @click="onInRoom" v-if="authObj.isAuth">
								已登录，可进入弹幕模式
						</span>
						
						<a target="_blank" :href="authObj.oAuthUrl" v-else>
								点击授权，弹幕支持
								<img style="width: 24px;
										     height: 24px;
										     top: 4px;
												 position: relative;"
								     src="./assets/images/github-logo.png" alt="">
						</a>
				</div>
		
		</div>
</template>

<script>
	
	import {onMounted} from 'vue';
	import {onSocket} from './utils/socketIo';
	import BarrageModule from "./components/modules/Barrage.vue";                // 弹幕
	// import ConsoleModule from "./components/modules/Console.vue";             // todo 确认消息控制台，需要授权
	// import DashboardModule from "./components/modules/Dashboard.vue";         // todo 仪表盘，控制页面显示
	// import MessageModule from "./components/modules/Message.vue";             // todo 一旦新消息发布，则显示，单条消息发送Modal
	// import PostModule from './components/modules/Post.vue';                   // todo 人工，发布消息
	// import TimelineModule from "./components/modules/Timeline.vue";           // todo 时间轴
	import ChartModule from "./components/modules/Chart.vue";                 // 饼图
	import MapModule from './components/modules/WorldMap.vue'                // 世界地图
	import ChinaRankModule from './components/modules/ChinaRank.vue'          // 国内省份排行
	import WorldRankModule from './components/modules/WorldRank.vue'          // 世界排行
	import {formatTime} from "./utils/utils";
	
	export default {
		components: {
			BarrageModule,
			ChartModule,
			MapModule,
			ChinaRankModule,
			WorldRankModule,
		},
		mounted() {
			onSocket.call(this, 'getTotal');  // 手动滚动的数据
			onSocket.call(this, 'auth');      // 授权
			setTimeout(() => {
				this.chinaRankButtonStatus = true;
				this.worldRankButtonStatus = true;
				this.chartButtonStatus = true
			}, 1000)
		},
		data() {
			return {
				auditButtonStatus: false,       // 控制台
				reportButtonStatus: false,      // 录入
				timelineButtonStatus: false,    // timeline
				chartButtonStatus: false,       // 图表
				newsButtonStatus: false,        // 消息窗口
				chinaRankButtonStatus: false,   // rank
				worldRankButtonStatus: false,   //
				isBarrageMode: true,
				playWarning: {
					status: false
				},
				authObj: {
					isAuth: false,
					oAuthUrl: "",
				},
				// 推送过来审核的数据
				auditList: [],
				totalObj: {
					chinaConfirm: 0,
					chinaHeal: 0,
					chinaDead: 0,
					chinaSuspect: 0,
					lastUpdateTime: "",
					worldConfirm: 0,
					worldHeal: 0,
					worldDead: 0,
					worldSuspect: 0,
				},
			}
		},
		methods: {
			onInRoom() {
				this.isBarrageMode = true
			},
			emitBarrageHide(val) {
				this.isBarrageMode = false
			},
			emitPlayStatus(val) {
				this.playWarning.status = false
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
		
		input[type="button"], input[type="submit"], input[type="reset"] {
				-webkit-appearance: none;
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
		
		/*loading*/
		.ncov-loading {
				height: 100%;
				width: 100%;
				position: fixed;
				top: 0;
				left: 0;
				z-index: 9999;
				background: rgba(0, 0, 0, 0.7);
				transition: all 3s;
		}
		
		.ncov-loading:before {
				position: absolute;
				content: '';
				width: 20px;
				height: 20px;
				border-top: 4px solid rgba(235, 115, 80, 1);
				border-left: 4px solid rgba(235, 115, 80, .8);
				border-right: 4px solid rgba(235, 115, 80, .6);
				border-bottom: 4px solid rgba(235, 115, 80, .4);
				border-radius: 100%;
				margin-left: -30px;
				-webkit-animation: ncov-loading 1s linear infinite;
				-o-animation: ncov-loading 1s linear infinite;
				animation: ncov-loading 1s linear infinite;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				-webkit-transform: translate(-50%, -50%);
				
		}
		
		.ncov-loading:after {
				position: absolute;
				content: 'Loading...';
				color: rgb(235, 115, 80);
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				-webkit-transform: translate(-50%, -50%);
				margin-top: 15px;
				padding-left: 91px;
				font-size: 16px;
		}
		
		/*旋转*/
		@keyframes ncov-loading {
				0% {
						-webkit-transform: rotate(0deg);
						-moz-transform: rotate(0deg);
						transform: rotate(0deg);
				}
				100% {
						-webkit-transform: rotate(360deg);
						-moz-transform: rotate(360deg);
						transform: rotate(360deg);
				}
		}
		
		@-webkit-keyframes ncov-loading {
				0% {
						-webkit-transform: rotate(0deg);
						-moz-transform: rotate(0deg);
						transform: rotate(0deg);
				}
				100% {
						-webkit-transform: rotate(360deg);
						-moz-transform: rotate(360deg);
						transform: rotate(360deg);
				}
		}
</style>
<style lang="scss" scoped>
		.home {
				position: relative;
				width: 100%;
				height: 100%;
				overflow: hidden;
		}
		
		.tip-barrage {
				cursor: pointer;
				padding: 0 10px;
		}
		
		.in-button {
				position: absolute;
				left: 50%;
				transform: translateX(-50%);
				bottom: 20px;
				display: block;
				line-height: 62px;
				float: left;
				font-size: 18px;
				background: #FF8626;
				border: 1px solid #FF8626;
				color: #fff;
				border-radius: 8px;
				z-index: 100;
				
				a {
						text-decoration: none;
				}
		}


</style>
