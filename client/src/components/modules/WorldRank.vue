<!--
@desc  todo 延时进入展开装饰地图
-->
<template>
		<div :class="'worldRank-module ' +(worldRankButtonStatus?'active':'')">
				<div id="worldRank" style="width: 100%;height: 100%;"></div>
		</div>
</template>

<script>
	import {emitSocket, onSocket} from "../../utils/socketIo";
	import {gradientColor} from '../../utils/utils'
	
	export default {
		name: "WorldRank",
		props: {
			worldRankButtonStatus: {
				type: Boolean
			}
		},
		data() {
			return {
				worldRankData: [],
			}
		},
		watch: {
			worldRankData() {
				this.getWorldRank();
			}
		},
		computed: {
			rankColors() {
				return gradientColor('#f44336', '#ffa730', (this.worldRankData || []).length || 0) || []
			},
			worldRankDataSet() {
				let dateSet = [];
				for (let item of this.worldRankData) {
					dateSet.push([item.country, item.confirm, item.province])
				}
				return dateSet
			},
			rankOptions() {
				const w = this;
				return {
					title: [
						{
							text: '全世界确诊人数RANK',
							left: 'center',
							top: "20px",
							textStyle: {
								color: '#fff'
							}
						},
					],
					dataset: {
						source: [
							['score', 'confirm', 'country'],
							...this.worldRankDataSet
						],
					},
					grid: {containLabel: true},
					xAxis: {
						name: '人数',
						splitLine: {
							show: false
						},
						axisLine: {
							lineStyle: {
								color: "#f44336"
							}
						}
					},
					yAxis: [
						{
							type: 'category',
							inverse: true,
							axisLabel: {
								textStyle: {
									color: '#fff',
									fontWeight: 'normal',
									fontSize: '12',
								},
							},
							axisLine: {
								show: false
							},
						},
						{
							type: 'category',
							inverse: true,
							show: true,
							data: this.worldRankDataSet.map(item => {
								return item[1]
							}),
							axisLabel: {
								textStyle: {
									color: function (value, index) {
										let colors = w.rankColors ? w.rankColors : [];
										return colors[index]
									}
								}
							},
							axisLine: {
								show: false
							},
							splitLine: {
								show: false
							},
							axisTick: {
								show: false
							},
							
						}],
					series: [
						{
							type: 'bar',
							encode: {
								x: 'confirm',
								y: 'province'
							},
							barGap: '10px',// 柱子间距
							itemStyle: {
								normal: {
									color: function (params) {
										let colors = w.rankColors ? w.rankColors : [];
										return colors[params.dataIndex];
									},
								}
							}
						}
					]
				}
			}
		},
		mounted() {
			this.emitWorldRank();
			this.getWorldRank();
			onSocket.call(this, 'getWorldRank'); // 手动滚动的数据
		},
		methods: {
			getWorldRank() {
				const worldRankChart = echarts.init(document.querySelector("#worldRank"));
				worldRankChart.setOption(this.rankOptions)
			},
			emitWorldRank() {
				emitSocket('getWorldRank');
			}
		}
	}
</script>

<style scoped lang="scss">
		.worldRank-module {
				position: absolute;
				top: 0;
				height: 60%;
				width: 500px;
				left: -500px;
				z-index: 1;
				transition: all 0.3s ease-in;
		}
		
		.worldRank-module.active {
				left: 0;
				transition: all 0.3s ease-in;
		}
</style>
