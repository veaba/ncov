<template>
		<div class="home">
				<MapModule></MapModule>
				<ChartModule :chartButtonStatus="chartButtonStatus"></ChartModule>
				
<!--				<h1 style="position: absolute;-->
<!--				color: red;-->
<!--left: 20%;top: 200px;">{{-->
<!--						'newsButtonStatus=>'+newsButtonStatus-->
<!--						}}-->
<!--						||-->
<!--						{{'timelineButtonStatus=>'+timelineButtonStatus}}</h1>-->
				<!--发布模块-->
				<PostModule :reportButtonStatus="reportButtonStatus" @onShowModule="onShowModule"></PostModule>
				
				<TimelineModule :timelineButtonStatus="timelineButtonStatus"
				                :newsButtonStatus="newsButtonStatus"
				                @onShowModule="onShowModule"></TimelineModule>
				<!--				<NewsModule :newsButtonStatus="newsButtonStatus" @onShowModule="onShowModule"></NewsModule>-->
				
				<DashboardModule :reportButtonStatus="reportButtonStatus" :authObj="authObj"
				                 @onShowModule="onShowModule"
				></DashboardModule>
				
				<PostModule :reportButtonStatus="reportButtonStatus" :reportData="reportData"></PostModule>
				
				<ConsoleModule
								@onShowModule="onShowModule"
								:auditButtonStatus="auditButtonStatus"
								:auditList="auditList"
				></ConsoleModule>
		</div>
</template>

<script>
	
	import {onMounted} from 'vue';
	import {onSocket, emitSocket} from './utils/socketIo';
	import BarrageModule from "./components/modules/Barrage.vue";             // todo 弹幕
	import ConsoleModule from "./components/modules/Console.vue";             // todo 确认消息控制台，需要授权
	import DashboardModule from "./components/modules/Dashboard.vue";         // todo 仪表盘，控制页面显示
	import MessageModule from "./components/modules/Message.vue";             // todo 一旦新消息发布，则显示，单条消息发送Modal
	import NewsModule from "./components/modules/News.vue";                   // todo 滚动播报新闻，来源权威机构，后续需要确认机构名单
	import PostModule from './components/modules/Post.vue';                   // todo 人工，发布消息
	import TimelineModule from "./components/modules/Timeline.vue";           // todo 时间轴
	import ChartModule from "./components/modules/Chart.vue";                 // todo 地图
	import MapModule from './components/modules/MapModule.vue'
	import {formatTime} from "./utils/utils";
	
	export default {
		components: {
			BarrageModule,
			ConsoleModule,
			DashboardModule,
			MapModule,
			MessageModule,
			ChartModule,
			NewsModule,
			PostModule,
			TimelineModule,
		},
		mounted() {
			onSocket.call(this, 'auth');   // 获取广播出来的新闻
			onSocket.call(this, 'broadcast');   // 获取广播出来的新闻
			onSocket.call(this, 'console');// todo 待审核推送过来，管理员才需要这个审核
			onSocket.call(this, 'auditStatus');//审核状态
			// onSocket.call(this, 'report');//接受报告结果
			// onSocket.call(this, 'report');//接受报告结果
		},
		data() {
			return {
				auditButtonStatus: false,       // 控制台
				reportButtonStatus: false,      // 录入
				timelineButtonStatus: false,    // timeline
				chartButtonStatus: false,       // 图表
				newsButtonStatus: false,
				authObj: {
					isAuth: false,
					oAuthUrl: "",
				},
				// 发送报告
				reportData: {
					count: 1,
					suspected: 0,
					dead: 0,
					cure: 0,
					name: "",
					age: 0,
					sex: '1',
					profession: '1',
					country: "中国",
					province: "",
					city: "",
					area: "",
					newsUrl: "",
					desc: "",
					reportDate: formatTime(new Date),
				},
				// 推送过来审核的数据
				auditList: []
			}
		},
		methods: {
			// 以下代码是可以再简写的
			onShowModule(module, other) {
				switch (module) {
					case 'report':
						this.reportButtonStatus = !this.reportButtonStatus;
						this.auditButtonStatus = false;
						this.timelineButtonStatus = false;
						this.chartButtonStatus = false;
						break;
					case 'timeline':
						this.timelineButtonStatus = !this.timelineButtonStatus;
						this.newsButtonStatus = false;
						this.auditButtonStatus = false;
						this.reportButtonStatus = false;
						this.chartButtonStatus = false;
						break;
					case 'audit':
						this.auditButtonStatus = !this.auditButtonStatus;
						this.timelineButtonStatus = false;
						this.reportButtonStatus = false;
						this.chartButtonStatus = false;
						break;
					case 'news':
						this.newsButtonStatus = !this.newsButtonStatus;
						this.timelineButtonStatus = false;
						this.timelineButtonStatus = false;
						this.reportButtonStatus = false;
						this.chartButtonStatus = false;
						break;
					case 'chart':
						this.chartButtonStatus = !this.chartButtonStatus
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
				
				
		}


</style>
