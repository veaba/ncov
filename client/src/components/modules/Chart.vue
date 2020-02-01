<!--
@desc todo  bug 内容初次无法展示
-->
<template>
		<div :class="'chart-module ' +(chartButtonStatus?'active':'')">
				<div class="total-pie" id="totalPie">
				</div>
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
						chinaConfirm: 0,
						chinaHeal: 0,
						chinaDead: 0,
						chinaSuspect: 0
					}
				}
			},
		},
		data() {
			return {
				totalPie: null
			}
		},
		watch: {
			totalObj(val) {
				let theData = [];
				for (let key in val) {
					if (key === 'chinaConfirm') {
						theData.push({
							value: val[key] || 0,
							name: "确诊/" + val[key]
						})
					}
					if (key === 'chinaHeal') {
						theData.push({
							value: val[key] || 0,
							name: "治愈/" + val[key]
						})
					}
					if (key === 'chinaDead') {
						theData.push({
							value: val[key] || 0,
							name: "死亡/" + val[key]
						})
					}
				}
				this.pieTotalData = theData;
				if (val.chinaConfirm || val.chinaDead || val.chinaHeal || val.chinaSuspect) {
					this.$nextTick(() => {
						this.goTotalPie()
					})
				}
			}
		},
		computed: {
			pieOptions() {
				return {
					color: nCovColorsMap,
					title: {
						text: '国内疫情占比情况 / 官方收集数据',
						// subtext: '治疗=(确诊-死亡-治愈)',
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
			this.totalPie = echarts.init(document.querySelector("#totalPie"));
			this.totalPie.setOption(this.pieOptions)
		},
		methods: {
			goTotalPie() {
				this.totalPie.setOption(this.pieOptions)
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
				position: absolute;
				left: -400px;
				bottom: 90px;
				color: #fff;
				border-radius: 4px;
				transition: all 0.3s ease-in;
		}
		
		.chart-module.active {
				left: 30px;
				transition: all 0.3s ease-in;
		}
</style>
