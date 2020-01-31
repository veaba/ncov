<template>
		<div class="left-layout chart-module">
				<div class="total-pie" id="totalPie"></div>
		</div>
</template>

<script>
	import {nCovColorsMap} from "../../utils/enums";
	
	export default {
		name: "Chart",
		props: {
			chartButtonStatus: {
				typ: Boolean
			},
			totalObj: {
				type: Object,
				default() {
					return {
						count: 0,
						cure: 0,
						dead: 0,
						suspected: 0
					}
				}
			},
		},
		
		watch: {
			totalObj(val) {
				let theData = [];
				for (let key in val) {
					if (key === 'treat') {
						theData.push({
							value: val[key] || 0,
							name: "治疗/" + val[key]
						})
					}
					if (key === 'cure') {
						theData.push({
							value: val[key] || 0,
							name: "治愈/" + val[key]
						})
					}
					if (key === 'dead') {
						theData.push({
							value: val[key] || 0,
							name: "死亡/" + val[key]
						})
					}
					if (key === 'suspected') {
						theData.push({
							value: val[key] || 0,
							name: "疑似/" + val[key]
						})
					}
				}
				this.pieTotalData = theData;
				this.goTotalPie()
			}
		},
		computed: {
			pieOptions() {
				return {
					color: nCovColorsMap,
					title: {
						text: '疫情占比情况 / 官方收集数据',
						subtext: '治疗=(确诊-死亡-治愈)',
						left: 'center',
						top: "10px",
						textStyle: {
							color: "#aaa"
						}
					},
					tooltip: {
						trigger: 'item',
						formatter: '{a} <br/>{b} : {c} ({d}%)'
					},
					series: [
						{
							name: '疫情占比',
							type: 'pie',
							radius: '55%',
							center: ['50%', '50%'],
							data: this.pieTotalData,
							emphasis: {
								itemStyle: {
									shadowBlur: 10,
									shadowOffsetX: 0,
									shadowColor: 'rgba(0, 0, 0, 0.5)'
								}
							}
						}
					]
				}
			}
		},
		data() {
			return {
				pieTotalData: [],
			}
		},
		mounted() {
		},
		methods: {
			goTotalPie() {
				const TotalPie = echarts.init(document.querySelector("#totalPie"));
				TotalPie.setOption(this.pieOptions)
			}
		}
	};
</script>

<style scoped lang="scss">
		.total-pie {
				width: 400px;
				height: 320px;
		}
		
		.chart-module {
				color: #fff;
				border-radius: 4px;
		}
</style>
