<template>
		<div class="home">
				<div id="map"></div>
				<img src="./assets/images/viruses.png" alt="">
		</div>
</template>

<script>
	import {ref, onMounted, reactive} from 'vue';
	import {infectedCountData, origin_city} from '../public/data';
	import {today} from './utils/date';
	import {drawMap} from './utils/draw'
	
	export default {
		setup() {
			onMounted(() => {
				drawMap();
				window.onresize = function () {
					drawMap();
				};
			});
			return {
			
			};
		},
		methods: {
			xx() {
				console.info(11);
			}
		}
	};
</script>
<style>
		body, html {
				padding: 0;
				margin: 0
		}
</style>
<style scoped>
		#map {
				width: 100%;
				height: 100%;
		}
		
		img {
				width: 200px;
		}
		
		h1 {
				font-family: Arial, Helvetica, sans-serif;
		}
</style>
