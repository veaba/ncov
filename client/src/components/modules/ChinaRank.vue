<template>
		<div :class="'right-layout rank-module ' +(chinaRankButtonStatus?'active':'')">
				<div id="rank" style="width: 100%;height: 100%;"></div>
		</div>
</template>

<script>
	import {emitSocket, onSocket} from "../../utils/socketIo";
	import {gradientColor} from '../../utils/utils'
	
	export default {
		name: "ChinaRank",
		props: {
			chinaRankButtonStatus: {
				type: Boolean
			}
		},
		data() {
			return {
				chinaRankData: [],
				rankChart: null
			}
		},
		watch: {
			chinaRankData(val) {
				if (val.length) {
					this.rankChart.setOption(this.rankOptions)
				}
			}
		},
		computed: {
			rankColors() {
				return gradientColor('#f44336', '#ffa730', (this.chinaRankData || []).length || 0) || []
			},
			chinaRankDataSet() {
				let dateSet = [];
				for (let item of this.chinaRankData) {
					dateSet.push([item.country, item.confirm, item.province])
				}
				return dateSet
			},
			rankOptions() {
				const w = this;
				return {
					title: [
						{
							text: '国内确诊人数RANK',
							left: 'center',
							top: "20px",
							textStyle: {
								color: '#fff'
							}
						},
					],
					dataset: {
						source: [
							['score', 'confirm', 'province'],
							...this.chinaRankDataSet
						],
					},
					grid: {containLabel: true},
					xAxis: {
						name: '',
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
							data: this.chinaRankDataSet.map(item => {
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
			this.getRank();
			onSocket.call(this, 'getChinaRank'); // 手动滚动的数据
			this.rankChart = echarts.init(document.querySelector("#rank"));
			this.$nextTick(() => {
				this.rankChart.setOption(this.rankOptions)
			})
			
		},
		methods: {
			getRank() {
				emitSocket('getChinaRank');
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
