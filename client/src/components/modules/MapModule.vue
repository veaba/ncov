<!--
@desc 中间大地图+数字滚动
-->
<template>
		<div class="map-module">
				<div class="map-header">
						<h3>2019新型肺炎疫情地图{{asyncTime?' , 实时同步后台数据【'+scrollObj.lastUpdateTime+'】':""}}</h3>
						<!---数据滚动-->
						<div class="scroll-total">
								<div class="total confirm">
										<strong>
												{{scrollObj.chinaConfirm}}/<span>(世界：{{scrollObj.worldConfirm}})</span>
										</strong>
										<span class="block">确诊</span>
								</div>
								<div class="total heal">
										<strong>
												{{scrollObj.chinaHeal}}/<span>(世界：{{scrollObj.worldHeal}})</span>
										</strong>
										<span class="block">治愈</span>
								</div>
								<div class="total dead">
										<strong>{{scrollObj.chinaDead}}/<span>(世界：{{scrollObj.worldDead}})</span>
										</strong>
										<span class="block">死亡</span>
								</div>
								<div class="total suspect">
										<strong>{{scrollObj.chinaSuspect}}/<span>(世界：{{scrollObj.worldSuspect}})</span>
										</strong>
										<span class="block">疑似</span>
								</div>
						</div>
				</div>
				<div id="map"></div>
				{{chinaDay}}
				<div v-show="goLoading" class="ncov-loading"></div>
		</div>
</template>

<script>
	import {drawMap} from '../../utils/draw';
	import {emitSocket, onSocket} from "../../utils/socketIo";
	import {formatTime, lastWhatDaysList} from "../../utils/utils";
	
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
		},
		data() {
			return {
				updateDataTime: "截止1月24日 9时",
				sourceUrl: "https://news.sina.cn/zt_d/yiqing0121/?wm=3049_0016&from=qudao",
				
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
				asyncTime: 0,
				goLoading: false,
				chinaDay: [],
				last7days: lastWhatDaysList(7),
				chinaMap: null
			}
		},
		watch: {
			// 实现数字滚动消息
			totalObj: {
				handler(val) {
					let intervalConfirm = null;
					let intervalCure = null;
					let intervalDead = null;
					let intervalSuspected = null;
					clearInterval(intervalConfirm);
					if (this.scrollObj.chinaConfirm && val.chinaConfirm && (this.scrollObj.chinaConfirm < this.totalObj.chinaConfirm)) {
						clearInterval(intervalConfirm);
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
						clearInterval(intervalConfirm)
					}
					if (this.scrollObj.chinaHeal && val.chinaHeal && (this.scrollObj.chinaHeal < this.totalObj.chinaHeal)) {
						clearInterval(intervalCure);
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
						clearInterval(intervalCure)
					}
					
					if (this.scrollObj.chinaDead && val.chinaDead && (this.scrollObj.chinaDead < this.totalObj.chinaDead)) {
						clearInterval(intervalDead);
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
						clearInterval(intervalDead)
					}
					
					if (this.scrollObj.chinaSuspect && val.chinaSuspect && (this.scrollObj.chinaSuspect < this.totalObj.chinaSuspect)) {
						clearInterval(intervalSuspected);
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
			worldMapData: {
				handler(val) {
					// drawMap(val, 2);
				},
				deep: true
			},
		},
		computed: {
			options() {
				var allData = {
					"citys": [
						{
							"name": "勃利",
							"value": [130.592171, 45.755063, 1],
							"symbolSize": 2,
							"itemStyle": {"normal": {"color": "#F58158"}}
						}, {
							"name": "长春",
							"value": [125.323544, 43.817072, 8],
							"symbolSize": 2,
							"itemStyle": {"normal": {"color": "#F58158"}}
						}],
					"moveLines": [
						{
							"fromName": "吉林",
							"toName": "西城",
							"coords": [[126.549572, 43.837883], [116.365868, 39.912289]]
						}, {
							"fromName": "四川",
							"toName": "上海",
							"coords": [[104.075931, 30.651652], [121.473701, 31.230416]]
						}, {
							"fromName": "吉林",
							"toName": "咸阳",
							"coords": [[126.549572, 43.837883], [108.708991, 34.329605]]
						}, {
							"fromName": "吉林",
							"toName": "中山",
							"coords": [[126.549572, 43.837883], [113.392782, 22.517646]]
						}, {"fromName": "黑龙江", "toName": "胶州", "coords": [[126.661669, 45.742347], [120.033382, 36.26468]]}]
				};
				
				const options = []
				
				return {
					timeline: {
						data: this.last7days || [],
						axisType: 'category',
						autoPlay: true,
						playInterval: 3000,
						left: '25%',
						right: '10%',
						bottom: '3%',
						width: '50%',
						label: {
							normal: {
								textStyle: {
									color: '#ddd'
								}
							},
							emphasis: {
								textStyle: {
									color: '#fff'
								}
							}
						},
						symbolSize: 10,
						lineStyle: {
							color: '#555'
						},
						checkpointStyle: {
							borderColor: '#777',
							borderWidth: 2
						},
						controlStyle: {
							showNextBtn: true,
							showPrevBtn: true,
							normal: {
								color: '#666',
								borderColor: '#666'
							},
							emphasis: {
								color: '#aaa',
								borderColor: '#aaa'
							}
						},
						
					},
					baseOption: {
						geo: {
							map: 'china',
							label: {
								emphasis: {
									show: false
								}
							},
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
						}
					},
					options: [
						{
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
								map: 'china',
								label: {
									emphasis: {
										show: false
									}
								},
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
							series: [{
								name: '地点',
								type: 'effectScatter',
								coordinateSystem: 'geo',
								zlevel: 2,
								rippleEffect: {
									brushType: 'stroke'
								},
								label: {
									emphasis: {
										show: true,
										position: 'right',
										formatter: '{b}'
									}
								},
								symbolSize: 2,
								showEffectOn: 'render',
								itemStyle: {
									normal: {
										color: '#46bee9'
									}
								},
								data: allData.citys
							}, {
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
								data: allData.moveLines
							}]
						},
						{
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
								map: 'china',
								label: {
									emphasis: {
										show: false
									}
								},
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
							series: [{
								name: '地点',
								type: 'effectScatter',
								coordinateSystem: 'geo',
								zlevel: 2,
								rippleEffect: {
									brushType: 'stroke'
								},
								label: {
									emphasis: {
										show: true,
										position: 'right',
										formatter: '{b}'
									}
								},
								symbolSize: 2,
								showEffectOn: 'render',
								itemStyle: {
									normal: {
										color: '#46bee9'
									}
								},
								data: allData.citys
							}, {
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
								data: allData.moveLines
							}]
						},
						{
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
								map: 'china',
								label: {
									emphasis: {
										show: false
									}
								},
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
							series: [{
								name: '地点',
								type: 'effectScatter',
								coordinateSystem: 'geo',
								zlevel: 2,
								rippleEffect: {
									brushType: 'stroke'
								},
								label: {
									emphasis: {
										show: true,
										position: 'right',
										formatter: '{b}'
									}
								},
								symbolSize: 2,
								showEffectOn: 'render',
								itemStyle: {
									normal: {
										color: '#46bee9'
									}
								},
								data: allData.citys
							}, {
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
								data: allData.moveLines
							}]
						}
					]
				}
			}
		},
		mounted() {
			onSocket.call(this, 'getWorldMap'); // 手动滚动的数据
			onSocket.call(this, 'getChinaDay'); // 时间轴
			this.getWorldMap();
			this.getTotal();
			this.chinaMap = echarts.init(document.querySelector("#map"));
			this.chinaMap.setOption(this.options);
		},
		methods: {
			setChinaMap() {
				this.chinaMap.setOption(this.options)
			},
			// 向socket发起取世界地图数据请求
			getWorldMap() {
				// this.goLoading = true;
				this.goLoading = false;
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
						float: left;
						margin-right: 10px;
						height: 100%;
						text-align: center;
						font-size: 36px;
						background: rgba(2, 16, 25, 0.7);
						padding: 10px;
						border-radius: 10px;
						
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


</style>
