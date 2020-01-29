<template>
		<div :class="'news-module ' +(newsButtonStatus?'active':'')"></div>
</template>

<script>
	export default {
		name: "News",
		props: {
			newsButtonStatus: {
				type: Boolean
			}
		}
	};
</script>

<style scoped lang="scss">
		.news {
				position: absolute;
				left: -402px;
				top: 1px;
				width: 400px;
				height: calc(100% - 10px);
				background: rgba(0, 0, 0, .6);
				transition: all 0.3s ease-in;
				opacity: 0.66;
				padding: 0 40px 0 20px;
				
				
				h2 {
						text-align: center;
						color: #4d79f3;
				}
		}
		
		.timeline-module.active {
				left: 0;
				transition: all 0.3s ease-in;
				opacity: 0.66;
		}
		
		.close-news {
				cursor: pointer;
				position: absolute;
				right: 20px;
				top: 50%;
				transform: translateX(50%);
				color: #03a9f4;
				width: 24px;
				height: 24px;
				border: 1px solid #03a9f4;
				text-align: center;
				border-radius: 50%;
		}

</style>
