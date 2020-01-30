<!--
@desc 中间大地图+数字滚动
-->
<template>
		<div class="map-module">
				<div class="map-header">
						<h3>2019新型肺炎疫情地图(2019-nCoV)情况{{asyncTime?' , 实时地图同步时间【'+formatTime(asyncTime)+'】':""}}</h3>
						<!---数据滚动-->
						<div class="scroll-total">
								<div class="total count">
										<strong>
												{{scrollObj.count}}
										</strong>
										<span>确诊</span>
								</div>
								<div class="total cure">
										<strong>
												{{scrollObj.cure}}
										</strong>
										<span>治愈</span>
								</div>
								<div class="total dead">
										<strong>{{scrollObj.dead}}</strong>
										<span>死亡</span>
								</div>
								<div class="total suspected">
										<strong>{{scrollObj.suspected}}</strong>
										<span>疑似</span>
								</div>
						</div>
				</div>
				<div id="map"></div>
				
				<div v-show="goLoading" class="ncov-loading"></div>
		</div>
</template>

<script>
	import {drawMap, realtimeDrawMap} from '../../utils/draw';
	import {emitSocket, onSocket} from "../../utils/socketIo";
	import {formatTime} from "../../utils/utils";
	
	export default {
		name: "MapModule",
		data() {
			return {
				updateDataTime: "截止1月24日 9时",
				sourceUrl: "https://news.sina.cn/zt_d/yiqing0121/?wm=3049_0016&from=qudao",
				scrollObj: {
					count: 0,
					cure: 0,
					dead: 0,
					suspected: 0
				},
				totalObj: {
					count: 0,
					cure: 0,
					dead: 0,
					suspected: 0
				},
				worldMapData: [],
				asyncTime: 0,
				goLoading: false
			}
		},
		watch: {
			// 实现数字滚动消息
			totalObj: {
				handler(val) {
					let intervalCount = null;
					let intervalCure = null;
					let intervalDead = null;
					let intervalSuspected = null;
					clearInterval(intervalCount);
					if (this.totalObj.count && (this.scrollObj.count < this.totalObj.count)) {
						clearInterval(intervalCount);
						intervalCount = setInterval(() => {
							this.scrollObj.count++;
							if (this.scrollObj.count >= this.totalObj.count) {
								clearInterval(intervalCount)
							}
						}, 16)
					} else {
						clearInterval(intervalCount)
					}
					if (this.totalObj.cure && (this.scrollObj.cure < this.totalObj.cure)) {
						clearInterval(intervalCure);
						intervalCure = setInterval(() => {
							this.scrollObj.cure++;
							if (this.scrollObj.cure >= this.totalObj.cure) {
								clearInterval(intervalCure)
							}
						}, 16)
					} else {
						clearInterval(intervalCure)
					}
					
					if (this.totalObj.dead && (this.scrollObj.dead < this.totalObj.dead)) {
						clearInterval(intervalDead);
						intervalDead = setInterval(() => {
							this.scrollObj.dead++;
							if (this.scrollObj.dead >= this.totalObj.dead) {
								clearInterval(intervalDead)
							}
						}, 16)
					} else {
						clearInterval(intervalDead)
					}
					
					if (this.totalObj.suspected && (this.scrollObj.suspected < this.totalObj.suspected)) {
						clearInterval(intervalSuspected);
						intervalSuspected = setInterval(() => {
							this.scrollObj.suspected++;
							if (this.scrollObj.suspected >= this.totalObj.suspected) {
								clearInterval(intervalSuspected)
							}
						}, 16)
					} else {
						clearInterval(intervalSuspected)
					}
				},
				deep: true
			},
			worldMapData: {
				handler(val) {
					drawMap(val, 2);
				},
				deep: true
			},
		},
		mounted() {
			drawMap(this.worldMapData);
			window.onresize = function () {
				drawMap(this.worldMapData);
			};
			onSocket.call(this, 'total', this.totalObj); // 手动滚动的数据
			onSocket.call(this, 'worldMap', this.worldMapData); // 手动滚动的数据
			this.getWorldMap();
			this.getTotal()
		},
		methods: {
			// 向socket发起取世界地图数据请求
			getWorldMap() {
				emitSocket('getWorldMap', {date: '2020-01-30'});
			},
			// 向socket发起取地图统计请求
			getTotal() {
				emitSocket('getTotal',);
			},
			formatTime(timeStamp) {
				return formatTime(timeStamp, 'yyyy-MM-dd HH:mm:ss')
			}
		}
	}
</script>

<style scoped lang="scss">
		.map-loading {
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translate(-50%, 50%);
				width: 30px;
				height: 30px;
				border: 1px solid red;
				background: rgba(2, 16, 25, 0.3);
				z-index: 99;
		}
		
		.map-header {
				position: absolute;
				width: 100%;
				top: 0;
				font-family: Arial, Helvetica, sans-serif;
				color: #ffc107;
				text-align: center;
				z-index: 1;
				
				> h2 {
						font-size: 36px;
				}
				
				a {
						color: red
				}
				
		}
		
		#map {
				width: 100%;
				height: 100%;
				
		}
		
		.scroll-total {
				width: 600px;
				height: 100px;
				margin: 0 auto;
				
				.count {
						color: #f44336;
				}
				
				.cure {
						color: green;
				}
				
				.suspected {
						color: #ff5722;
				}
				
				.dead {
						color: #6666;
				}
				
				.total {
						float: left;
						width: 150px;
						height: 100%;
						text-align: center;
						font-size: 36px;
						
						strong {
								line-height: 60px;
						}
						
						span {
								display: block;
								font-size: 14px;
								color: #f7f7f7;
						}
				}
		}
		
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
