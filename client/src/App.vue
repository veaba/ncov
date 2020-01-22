<template>
		<div class="home">
				<h1 v-if="commitList">【最新更新时间】：{{commitList?fmtTime(commitList.commit.committer.date):""}}</h1>
				<div id="map"></div>
		</div>
</template>

<script>
	import {onUpdated, watch, ref, onMounted, reactive} from 'vue';
	import {drawMap} from './utils/draw';
	import {fmtTime} from './utils/date';
	
	export default {
		setup() {
			let commitList = ref(null);
			// 获取Repo Commit 时间,这个有权限控制403
			// 2020-01-22T12:58:47Z
			watch(() => {
				fetch('https://api.github.com/repos/veaba/ncov/commits', {
					headers: {
						'Accept': 'application/json/vnd.github.cloak-preview',
					}
				})
					.then(res => res.json())
					.then(json => {
						commitList.value = reactive(json[0]);
					});
			});
			onMounted(() => {
				drawMap();
				window.onresize = function () {
					drawMap();
				};
			});
			onUpdated(() => {
				// console.info(this);
			});
			return {
				commitList:commitList||{},
				fmtTime
			};
		},
	};
</script>
<style>
		body, html {
				padding: 0;
				margin: 0;
				width: 100vw;
				height: 100vh;
		}
		
		#app {
				width: 100%;
				height: 100%;
		}
</style>
<style lang="scss" scoped>
		.home {
				position: relative;
				
				h1 {
						position: absolute;
						width: 100%;
						top: 0;
						font-family: Arial, Helvetica, sans-serif;
						color: #ffc107;
						text-align: center;
						z-index: 99;
						
				}
		}
		
		#map {
				width: 100%;
				height: 100%;
				
		}


</style>
