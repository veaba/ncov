<!--
@desc todo 弹幕消息系统
@todo 究极版下一次大迭代=>消息动画直接击中武汉地理坐标 2020年1月31日19:08:26
-->
<template>
		<div class="barrage-module">
				
				<div class="display-wrap">
						{{barrageContent}}
						
						{{clickTickTimestamp}}
				</div>
				
				<div class="footer-input clear">
						<button class="input-button out-button" @click="onOutRoom">退出</button>
						<input class="input-text" v-model="inputContent" type="text" @keyup.enter="onEnterInput"
						       placeholder="请输入你出要武汉加油的话！" maxlength="32">
						<button class="input-button" @click="onEnterInput">发送</button>
				</div>
		</div>
</template>

<script>
	import {emitSocket} from "../../utils/socketIo";
	
	export default {
		name: "Barrage",
		data() {
			return {
				clickTickTimestamp: [],
				barrageContent: [],
				inputContent: "武汉加油！",
				clearTimer: null
			}
		},
		mounted() {
			this.clearTimer = setInterval(() => {
				this.clickTickTimestamp.shift()
			}, 3000)
		},
		destroyed() {
			clearInterval(this.clearTimer)
		},
		methods: {
			onOutRoom() {
				console.info('退出~~');
			},
			onEnterInput() {
				if (this.clickTickTimestamp.length < 5) {
					this.clickTickTimestamp.splice(0, 0, new Date().getTime());
				}
				
				if (this.clickTickTimestamp.length > 4) {
					alert('太频繁，请稍后重试');
					return
				}
				if (!this.inputContent.trim()) {
					alert('内容为空，无法发送');
					return false
				}
				emitSocket('talk', this.inputContent);
				console.info(this.inputContent);
			}
		}
	};
</script>

<style scoped lang="scss">
		
		.display-wrap {
				position: absolute;
				left: 50%;
				top: 50%;
				text-align: center;
				transform: translate(-50%, 50%);
				width: 100%;
				max-height: 100%;
				border: 1px solid green;
				color: #fff;
		}
		
		.barrage-module {
				position: absolute;
				border: 1px solid red;
				width: 100%;
				height: 100%;
				left: 0;
				top: 0;
				z-index: 100;
				background: rgba(255, 0, 0, 0.2);
		}
		
		.footer-input {
				position: absolute;
				left: 50%;
				bottom: 20px;
				transform: translateX(-50%);
				width: 30%;
				min-width: 650px;
				
				.input-text {
						display: block;
						float: left;
						width: 450px;
						height: 66px;
						padding: 8px 10px;
						font-size: 18px;
						color: #a4a9b0;
						background-image: none;
						box-shadow: none;
						border: 1px solid #ddd;
						box-sizing: border-box;
						-webkit-appearance: none;
				}
				
				.input-button {
						display: block;
						line-height: 62px;
						width: 100px;
						font-size: 18px;
						background: #4caf50;
						border: 1px solid #4caf50;
						color: #fff;
						border-top-left-radius: 0;
						border-bottom-left-radius: 0;
						
				}
				
				.out-button {
						display: block;
						line-height: 62px;
						float: left;
						width: 100px;
						font-size: 18px;
						background: #FF8626;
						border: 1px solid #FF8626;
						color: #fff;
						border-radius: 8px 0 0 8px;
				}
		}
</style>
