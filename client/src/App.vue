<template>
		<div>
				<h1 style="text-align: center"> I am App component ~~~~~~</h1>
				
				<div class="center">
						<router-link to="/a">/a</router-link>
						
						<router-link to="/b">/b</router-link>
						
						<router-link to="/c">/c</router-link>
						
						<router-link to="/c">/Home</router-link>
						
						<router-link to="/country">/country</router-link>
						
						<router-link to="/country/china">/country/china</router-link>
						
						<router-view/>
				</div>
		
		
		</div>
</template>

<script>
	import {defineComponent} from 'vue';
	
	export default defineComponent({
		name: "App"
	});
</script>
<style lang="scss" scoped>
		* {
				box-sizing: border-box;
		}
		
		a {
				color: #0366d6;
				display: block;
		}
		
		body, html {
				padding: 0;
				margin: 0;
				width: 100vw;
				height: 100vh;
		}
		
		ul {
				padding-inline-start: 0;
		}
		
		li {
				list-style: none;
		}
		
		.center {
				width: 400px;
				margin: 0 auto;
		}
		
		#app {
				width: 100%;
				height: 100%;
				overflow: hidden;
		}
		
		.align-center {
				text-align: center;
		}
		
		.left-layout {
				position: absolute;
				top: 0;
				left: 0;
				width: 400px;
				z-index: 1;
		}
		
		.right-layout {
				position: absolute;
				top: 0;
				right: 0;
				width: 500px;
				z-index: 1;
		}
		
		.must-be {
				position: relative;
				
		}
		
		.clear:after {
				display: block;
				content: "";
				clear: both;
		}
		
		input[type="button"], input[type="submit"], input[type="reset"] {
				-webkit-appearance: none;
		}
		
		button {
				cursor: pointer;
				color: #2d8cf0;
				border: 1px solid #2d8cf0;
				border-radius: 4px;
		}
		
		
		button + .primary {
				background: #2d8cf0;
				color: #fff;
		}
		
		button:disabled {
				user-select: none;
				color: #c5c8ce;
				background-color: #f7f7f7;
				border-color: #dcdee2;
				cursor: not-allowed;
		}
		
		/*loading*/
		.ncov-loading {
				height: 100%;
				width: 100%;
				position: fixed;
				top: 0;
				left: 0;
				z-index: 9999;
				background: rgba(0, 0, 0, 0.7);
				transition: all 3s;
		}
		
		.ncov-loading:before {
				position: absolute;
				content: '';
				width: 20px;
				height: 20px;
				border-top: 4px solid rgba(235, 115, 80, 1);
				border-left: 4px solid rgba(235, 115, 80, .8);
				border-right: 4px solid rgba(235, 115, 80, .6);
				border-bottom: 4px solid rgba(235, 115, 80, .4);
				border-radius: 100%;
				margin-left: -30px;
				-webkit-animation: ncov-loading 1s linear infinite;
				-o-animation: ncov-loading 1s linear infinite;
				animation: ncov-loading 1s linear infinite;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				-webkit-transform: translate(-50%, -50%);
				
		}
		
		.ncov-loading:after {
				position: absolute;
				content: 'Loading...';
				color: rgb(235, 115, 80);
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				-webkit-transform: translate(-50%, -50%);
				margin-top: 15px;
				padding-left: 91px;
				font-size: 16px;
		}
		
		/*旋转*/
		@keyframes ncov-loading {
				0% {
						-webkit-transform: rotate(0deg);
						-moz-transform: rotate(0deg);
						transform: rotate(0deg);
				}
				100% {
						-webkit-transform: rotate(360deg);
						-moz-transform: rotate(360deg);
						transform: rotate(360deg);
				}
		}
		
		@-webkit-keyframes ncov-loading {
				0% {
						-webkit-transform: rotate(0deg);
						-moz-transform: rotate(0deg);
						transform: rotate(0deg);
				}
				100% {
						-webkit-transform: rotate(360deg);
						-moz-transform: rotate(360deg);
						transform: rotate(360deg);
				}
		}
</style>
<style lang="scss" scoped>
		.home {
				position: relative;
				width: 100%;
				height: 100%;
				overflow: hidden;
		}
		
		.tip-barrage {
				cursor: pointer;
				padding: 0 10px;
		}
		
		.in-button {
				position: absolute;
				left: 50%;
				transform: translateX(-50%);
				bottom: 20px;
				display: block;
				line-height: 62px;
				float: left;
				font-size: 18px;
				background: #FF8626;
				border: 1px solid #FF8626;
				color: #fff;
				border-radius: 8px;
				z-index: 100;
				
				a {
						text-decoration: none;
				}
		}


</style>
