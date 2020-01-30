<template>
		<div :class="'right-layout rank-module ' +(rankButtonStatus?'active':'')">
				<div id="rank" style="width: 100%;height: 100%;"></div>
		</div>
</template>

<script>
	export default {
		name: "Rank",
		props: {
			rankButtonStatus: {
				type: Boolean
			}
		},
		computed: {
			rankOptions() {
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
							['score', 'amount', 'product'],
							[89.3, 58212, 'Matcha Latte'],
							[57.1, 78254, 'Milk Tea'],
							[74.4, 41032, 'Cheese Cocoa'],
							[50.1, 12755, 'Cheese Brownie'],
							[89.7, 20145, 'Matcha Cocoa'],
							[68.1, 79146, 'Tea'],
							[19.6, 91852, 'Orange Juice'],
							[10.6, 101852, 'Lemon Juice'],
							[10.6, 101852, 'Le1mon Juice'],
							[10.6, 101852, 'Le2mon Juice'],
							[10.6, 101852, 'Le3mon Juice'],
							[10.6, 101852, 'Lemon Juice'],
							[10.6, 101852, 'L4emon Juice'],
							[10.6, 101852, 'Le5mon Juice'],
							[10.6, 101852, 'Lemon Juice'],
							[10.6, 101852, 'Lem5on Juice'],
							[10.6, 101852, 'Le6mon Juice'],
							[10.6, 101852, 'Le7mon Juice'],
							[10.6, 101852, 'Lemon Juice'],
							[10.6, 101852, 'Lem7on Juice'],
							[10.6, 101852, 'Le2mon Juice'],
							[32.7, 20112, 'Walnut Brownie']
						]
					},
					grid: {containLabel: true},
					xAxis: {name: 'amount'},
					yAxis: {type: 'category'},
					visualMap: {
						orient: 'horizontal',
						left: 'center',
						min: 10,
						max: 100,
						dimension: 0,
						inRange: {
							color: ['#D7DA8B', '#E15457']
						}
					},
					series: [
						{
							type: 'bar',
							encode: {
								x: 'amount',
								y: 'product'
							}
						}
					]
				}
			}
		},
		mounted() {
			this.goRank()
		},
		methods: {
			goRank() {
				const rankChart = echarts.init(document.querySelector("#rank"));
				rankChart.setOption(this.rankOptions)
			}
		}
	}
</script>

<style scoped lang="scss">
		.rank-module {
				height: 100%;
				background: rgba(0, 0, 0, .7);
				right: -500px;
				z-index: 1;
				transition: all 0.3s ease-in;
		}
		
		.rank-module.active {
				right: 0;
				transition: all 0.3s ease-in;
		}
</style>
