<template>
		<div :class="'right-layout rank-module ' +(rankButtonStatus?'active':'')">
				<div id="rank" style="width: 100%;height: 100%;"></div>
		</div>
</template>

<script>
	import {emitSocket, onSocket} from "../../utils/socketIo";
	import {gradientColor} from '../../utils/utils'
	
	export default {
		name: "Rank",
		props: {
			rankButtonStatus: {
				type: Boolean
			}
		},
		data() {
			return {
				rankData: [],
				// rankColors:
			}
		},
		watch: {
			rankData() {
				this.goRank();
			}
		},
		computed: {
			rankColors() {
				return gradientColor('#ffa730', '#f44336', (this.rankData || []).length || 0) || []
			},
			rankDataSet() {
				let dateSet = [];
				for (let item of this.rankData) {
					dateSet.push([item.country, item.count, item.province])
				}
				return dateSet
			},
			rankOptions() {
				const w = this;
				return {
					title: [{
						text: '国内确诊人数Rank',
						left: 'center',
						textStyle: {
							color: '#fff'
						}
					},
					],
					dataset: {
						source: [
							['score', 'count', 'province'],
							...this.rankDataSet
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
					yAxis: [{
						type: 'category',
						axisLabel: {
							inside: false,
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
							show: true,
							data: this.rankDataSet.map(item => {
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
								x: 'count',
								y: 'province'
							},
							barWidth: 30,
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
			this.getRank();
			this.goRank();
			onSocket.call(this, 'rank'); // 手动滚动的数据
		},
		methods: {
			goRank() {
				const rankChart = echarts.init(document.querySelector("#rank"));
				rankChart.setOption(this.rankOptions)
			},
			getRank() {
				emitSocket('getRank');
			}
		}
	}
</script>

<style scoped lang="scss">
		.rank-module {
				height: 100%;
				right: -500px;
				z-index: 1;
				transition: all 0.3s ease-in;
		}
		
		.rank-module.active {
				right: 0;
				transition: all 0.3s ease-in;
		}
</style>
