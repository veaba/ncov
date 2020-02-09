<!--
@desc 中间大地图+数字滚动
-->
<template>
		<div class="map-module">
				<div class="map-header">
						<h3>新型冠状病毒肺炎NCP(2019-nCoV)疫情地图{{asyncTime?' , 实时同步后台数据【'+scrollObj.lastUpdateTime+'】':""}}
								{{online?"当前在线人数：（"+online+"）":""}}</h3>
						<video id="playWarning" src="warning.wav" loop style="display: none">
								your browser does not support the video tag
						</video>
						<!---数据滚动-->
						<div class="scroll-total">
								<div :class="'total confirm '+(scrollAnimate.confirm?'active':'')">
										<strong>
												{{scrollObj.chinaConfirm}}/<span>(世界：{{scrollObj.worldConfirm}})</span>
										</strong>
										<span class="block">确诊</span>
								</div>
								<div :class="'total heal '+(scrollAnimate.heal?'active':'')">
										<strong>
												{{scrollObj.chinaHeal}}/<span>(世界：{{scrollObj.worldHeal}})</span>
										</strong>
										<span class="block">治愈</span>
								</div>
								<div :class="'total dead '+(scrollAnimate.dead?'active':'')">
										<strong>{{scrollObj.chinaDead}}/<span>(世界：{{scrollObj.worldDead}})</span>
										</strong>
										<span class="block">死亡</span>
								</div>
								<div :class="'total suspect '+(scrollAnimate.suspect?'active':'')">
										<strong>{{scrollObj.chinaSuspect}}/<span>(世界：{{scrollObj.worldSuspect}})</span>
										</strong>
										<span class="block">疑似</span>
								</div>
						</div>
				</div>
				<div id="map"></div>
				<div v-show="goLoading" class="ncov-loading"></div>
		</div>
</template>

<script>
	import {drawMap} from '../../utils/draw';
	import {emitSocket, onSocket} from "../../utils/socketIo";
	import {formatTime, lastWhatDaysList} from "../../utils/utils";
	import {geo} from '../../chartLib/map_geo'
	
	export default {
		name: "MapModule",
		props: {
			totalObj: {
				type: Object,
				default() {
					return {
						chinaConfirm: 0,
						chinaHeal: 0,
						chinaDead: 0,
						chinaSuspect: 0,
						lastUpdateTime: "",
						worldConfirm: 0,
						worldHeal: 0,
						worldDead: 0,
						worldSuspect: 0,
					}
				}
			},
			playWarning: {
				type: Object,
				default() {
					return {
						status: false
					};
				}
			}
		},
		data() {
			return {
				online: 0,
				updateDataTime: "截止1月24日 9时",
				sourceUrl: "https://news.sina.cn/zt_d/yiqing0121/?wm=3049_0016&from=qudao",
				scrollAnimate: {
					confirm: false,
					heal: false,
					dead: false,
					suspect: false
				},
				scrollObj: {
					chinaConfirm: 0,
					chinaHeal: 0,
					chinaDead: 0,
					chinaSuspect: 0,
					worldConfirm: 0,
					worldHeal: 0,
					worldDead: 0,
					worldSuspect: 0,
				},
				worldMapData: [],
				moveLineWorldMapData: [],// 飞行线的数据
				localWorldMapData: [],   // 地点数据
				asyncTime: 0,
				goLoading: false,
				chinaDay: [],
				last7days: lastWhatDaysList(7),
				chinaMap: null,
				options: {
					backgroundColor: '#101f33',
					legend: {
						show: false,
						orient: 'vertical',
						top: 'bottom',
						left: 'right',
						data: ['地点', '线路'],
						textStyle: {
							color: '#fff'
						}
					},
					geo: {
						map: 'world',
						// map: 'china',
						zoom: 2,
						label: {
							emphasis: {
								show: false
							}
						},
						center: [115.65875349263533, 30.53695878561894],
						roam: true,
						itemStyle: {
							normal: {
								areaColor: '#323c48',
								borderColor: '#404a59'
							},
							emphasis: {
								areaColor: '#2a333d'
							}
						}
					},
					series: [
						{
							name: '地点',
							type: 'effectScatter',
							coordinateSystem: 'geo',
							zlevel: 2,
							rippleEffect: {
								brushType: 'stroke'
							},
							label: {
								normal: {
									show: true,
									position: "right", //显示位置
									offset: [5, 0], //偏移设置
									formatter: (params) => {
										const {name} = params;
										if (geo[name]) {
											return name
										}
										return ''
									}
								},
								emphasis: {
									show: true
								}
							},
							symbolSize: 2,
							showEffectOn: 'render',
							itemStyle: {
								normal: {
									color: '#46bee9'
								}
							},
							data: []
						},
						{
							name: '线路',
							type: 'lines',
							coordinateSystem: 'geo',
							zlevel: 2,
							large: true,
							effect: {
								show: true,
								constantSpeed: 30,
								symbol: 'pin',
								symbolSize: 3,
								trailLength: 0,
							},
							lineStyle: {
								normal: {
									color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
										offset: 0, color: '#58B3CC'
									}, {
										offset: 1, color: '#F58158'
									}], false),
									width: 1,
									opacity: 0.2,
									curveness: 0.1
								}
							},
							data: []
						},
					]
				}
			}
		},
		watch: {
			
			// todo,播放声音
			playWarning: {
				handler(val) {
				},
				deep: true
			},
			// 实现数字滚动消息
			totalObj: {
				handler(val) {
					let intervalConfirm = null;
					let intervalCure = null;
					let intervalDead = null;
					let intervalSuspected = null;
					clearInterval(intervalConfirm);
					this.scrollAnimate.confirm = false;
					this.scrollAnimate.heal = false;
					this.scrollAnimate.dead = false;
					this.scrollAnimate.suspect = false;
					if (this.scrollObj.chinaConfirm && val.chinaConfirm && (this.scrollObj.chinaConfirm < this.totalObj.chinaConfirm)) {
						clearInterval(intervalConfirm);
						this.scrollAnimate.confirm = true;
						intervalConfirm = setInterval(() => {
							this.scrollObj.chinaConfirm++;
							if (this.scrollObj.chinaConfirm >= this.totalObj.chinaConfirm) {
								clearInterval(intervalConfirm)
							}
						}, 16)
					} else {
						if (!this.scrollObj.chinaConfirm) {
							this.scrollObj.chinaConfirm = val.chinaConfirm
						}
						this.scrollAnimate.confirm = false;
						clearInterval(intervalConfirm)
					}
					if (this.scrollObj.chinaHeal && val.chinaHeal && (this.scrollObj.chinaHeal < this.totalObj.chinaHeal)) {
						clearInterval(intervalCure);
						this.scrollAnimate.heal = true;
						intervalCure = setInterval(() => {
							this.scrollObj.chinaHeal++;
							if (this.scrollObj.chinaHeal >= this.totalObj.chinaHeal) {
								clearInterval(intervalCure)
							}
						}, 16)
					} else {
						if (!this.scrollObj.chinaHeal) {
							this.scrollObj.chinaHeal = val.chinaHeal
						}
						this.scrollAnimate.heal = false;
						clearInterval(intervalCure)
					}
					
					if (this.scrollObj.chinaDead && val.chinaDead && (this.scrollObj.chinaDead < this.totalObj.chinaDead)) {
						clearInterval(intervalDead);
						this.scrollAnimate.dead = true;
						intervalDead = setInterval(() => {
							this.scrollObj.chinaDead++;
							if (this.scrollObj.chinaDead >= this.totalObj.chinaDead) {
								clearInterval(intervalDead)
							}
						}, 16)
					} else {
						if (!this.scrollObj.chinaDead) {
							this.scrollObj.chinaDead = val.chinaDead
						}
						this.scrollAnimate.dead = false;
						clearInterval(intervalDead)
					}
					
					if (this.scrollObj.chinaSuspect && val.chinaSuspect && (this.scrollObj.chinaSuspect < this.totalObj.chinaSuspect)) {
						clearInterval(intervalSuspected);
						this.scrollAnimate.suspect = true;
						intervalSuspected = setInterval(() => {
							this.scrollObj.chinaSuspect++;
							if (this.scrollObj.chinaSuspect >= this.totalObj.chinaSuspect) {
								clearInterval(intervalSuspected)
							}
						}, 16)
					} else {
						if (!this.scrollObj.chinaSuspect) {
							this.scrollObj.chinaSuspect = val.chinaSuspect
						}
						this.scrollAnimate.suspect = false;
						clearInterval(intervalSuspected)
					}
					
					this.scrollObj.worldConfirm = this.totalObj.worldConfirm;
					this.scrollObj.worldHeal = this.totalObj.worldHeal;
					this.scrollObj.worldDead = this.totalObj.worldDead;
					this.scrollObj.worldSuspect = this.totalObj.worldSuspect;
					this.scrollObj.lastUpdateTime = this.totalObj.lastUpdateTime
				},
				deep: true
			},
			localWorldMapData: {
				handler(val) {
					if (this.chinaMap && val.length) {
						this.options.series[0].data = this.localWorldMapData;
						this.setChinaMap();
					}
				},
				deep: true
			},
			moveLineWorldMapData: {
				handler(val) {
					if (this.chinaMap && val.length) {
						this.options.series[0].data = this.localWorldMapData;
						this.options.series[1].data = this.moveLineWorldMapData;
						this.setChinaMap();
					}
				},
				deep: true
			},
		},
		computed: {
			/**
			 * @desc 转换地图数据
			 * [
			 * 	{
							"name": "勃利",
							"value": [130.592171, 45.755063, 1],
							"symbolSize": 2,
							"itemStyle": {"normal": {"color": "#F58158"}}
						}
			 * ]
			 * [
			 *  {
			 *      "fromName": "吉林",
			 *      "toName": "上海"，
			 *      "coords": [[126.549572, 43.837883], [116.365868, 39.912289]]
			 *  }
			 * ]
			 * */
		},
		mounted() {
			onSocket.call(this, 'getWorldMap'); // 手动滚动的数据
			onSocket.call(this, 'getChinaDay'); // 时间轴
			onSocket.call(this, 'online');      // 获取在线人数
			emitSocket('getChinaDay');
			this.getWorldMap();
			this.getTotal();
			this.chinaMap = echarts.init(document.querySelector("#map"));
			this.$nextTick(() => {
				this.chinaMap.setOption(this.options);
			});
			// todo bug  不起作用
			window.onresize = () => {
				this.chinaMap.resize()
			};
		},
		methods: {
			setChinaMap() {
				this.$nextTick(() => {
					this.chinaMap.setOption(this.options)
				})
			},
			// 向socket发起取世界地图数据请求
			getWorldMap() {
				// todo
				// this.goLoading = true;
				emitSocket('getWorldMap');
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
		.map-module {
				background: #000;
		}
		
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
				display: flex;
				justify-content: center;
				margin: 0 auto;
				border-radius: 10px;
				
				.confirm {
						color: #f44336;
				}
				
				.heal {
						color: #4caf50;
				}
				
				.suspected {
						color: #ffa730;
				}
				
				.dead {
						color: #9c27b0
				}
				
				.total {
						position: relative;
						float: left;
						margin-right: 10px;
						height: 100%;
						text-align: center;
						font-size: 36px;
						background: rgba(2, 16, 25, 0.7);
						padding: 10px;
						border-radius: 10px;
						/*overflow: hidden;*/
						
						strong {
								line-height: 70px;
								
								span {
										font-size: 14px;
								}
						}
						
						.block {
								display: block;
						}
						
						> span {
								font-size: 14px;
								color: #f7f7f7;
						}
				}
		}
		
		
		/*滚动动画*/
		.total.active {
				&:before {
						position: absolute;
						display: block;
						content: "";
						left: 0;
						top: 0;
						width: 100%;
						height: 100%;
						background: rgba(255, 255, 255, 0.16);
						transition: all 4s;
						border-radius: 4px;
				}
				
		}
		
		.total.confirm.active {
				&:before {
						animation: leftToRightConfirm 3s linear infinite;
						border: 1px solid #F6362B
				}
				
		}
		
		.total.heal.active {
				&:before {
						animation: leftToRightHeal 3s linear infinite;
						border: 1px solid #708C40
				}
				
		}
		
		.total.dead.active {
				&:before {
						animation: leftToRightDead 3s linear infinite;
						border: 1px solid #B01F8D
				}
				
		}
		
		.total.suspect.active {
				&:before {
						animation: leftToRightSuspect 3s linear infinite;
						border: 1px solid #FF9A06
				}
				
		}
		
		
		@keyframes leftToRightConfirm {
				0% {
						
						border: 1px solid #F6362B
				}
				25% {
						border: 1px solid rgba(246, 54, 43, 0.56)
				}
				50% {
						border: 1px solid #F6362B
				}
				75% {
						border: 1px solid rgba(246, 54, 43, 0.56)
				}
		}
		
		@keyframes leftToRightHeal {
				0% {
						
						border: 1px solid #708C40
				}
				25% {
						border: 1px solid rgba(112, 140, 64, 0.56)
				}
				50% {
						border: 1px solid #708C40
				}
				75% {
						border: 1px solid rgba(112, 140, 64, 0.56)
				}
		}
		
		@keyframes leftToRightDead {
				0% {
						
						border: 1px solid #B01F8D
				}
				25% {
						border: 1px solid rgba(176, 31, 141, 0.56)
				}
				50% {
						border: 1px solid #B01F8D
				}
				75% {
						border: 1px solid rgba(176, 31, 141, 0.56)
				}
		}
		
		@keyframes leftToRightSuspect {
				0% {
						
						border: 1px solid #FF9A06
				}
				25% {
						border: 1px solid rgba(255, 154, 6, 0.56)
				}
				50% {
						border: 1px solid #FF9A06
				}
				75% {
						border: 1px solid rgba(255, 154, 6, 0.56)
				}
		}

</style>
