<!--
@desc 弹幕消息系统，简单实现动画效果
@todo 究极版下一次大迭代=>消息动画直接击中武汉地理坐标 2020年1月31日19:08:26
@fix history 和 当前的区分开
@todo 如何不遮挡字幕
-->
<template>
		<div class="barrage-module" :style="!isBarrageMode?{'z-index':'-1'}:{'z-index':'100'}">
				
				
				<div class="display-wrap">
						<!--当前-->
						<transition-group
										class="ul"
										tag="ul"
										@before-enter="beforeEnterSingle"
										@enter="enterSingle"
						>
								
								<li
												:class="'animate-to-left ' +(enterIds.includes(item._id)?'active':'')"
												:_id="item._id"
												:style="{
													top:index*66+'px',
													}"
												v-for="(item,index) in currentList"
												:key="index+Math.random()"
								>
										<img :src="item.avatarUrl||''" :alt="item.name||''">
										<span v-show="item.name">{{item.name}}：</span>
										<span :style="{color:item.color}">{{item.message||""}}  ==>{{item.random}}</span>
								</li>
						</transition-group>
						
						<!--history-->
						<transition-group name="list" tag="ul"
						                  class="ul"
						                  @before-enter="beforeEnter"
						                  @enter="enter"
						>
								<li class="animate-to-left"
								    :style="{top:index*66+'px'}"
								    v-for="(item,index) in historyList"
								    :key="index+Math.random()"
								>
										<img :src="item.avatarUrl||''" :alt="item.name||''">
										<span v-show="item.name">{{item.name}}：</span>
										<span :style="{color:item.color}">{{item.message||""}}</span>
								</li>
						</transition-group>
				</div>
				
				<div class="footer-input clear">
						<button class="input-button out-button" @click="onOutRoom">退出弹幕</button>
						<input class="input-text" v-model="inputContent" type="text" @keyup.enter="onEnterInput"
						       :disabled="!authObj.isAuth"
						       placeholder="请输入你要喊武汉加油的话！" maxlength="32">
						<button v-if="authObj.isAuth" class="input-button" :disabled="repostLimitSecond>3" @click="onEnterInput">发送
								{{repostLimitSecond>3?repostLimitSecond-3+'s':''}}
						</button>
						<a :href="authObj.oAuthUrl||''" target="_blank">
								<button v-if="!authObj.isAuth" class="input-button">
										授权
										<img style="width: 24px;
																     height: 24px;
																     top: 4px;
																		 position: relative;"
										     src="../../assets/images/github-logo.png" alt="">
								</button>
						
						</a>
				</div>
		</div>
</template>

<script>
	import {emitSocket, onSocket} from "../../utils/socketIo";
	
	export default {
		name: "Barrage",
		props: {
			authObj: {
				type: Object
			},
			isBarrageMode: {
				type: Boolean,
				default() {
					return true
				}
			}
		},
		data() {
			return {
				clickTickTimestamp: [],
				barrageList: [],//当前
				barrageHistory: [],//历史数据
				inputContent: "武汉加油!",
				clearTimer: null,
				historyTimer: null,
				width: window.innerWidth,
				enterIds: [],
				pageData: {
					size: 10,
					page: 1,
					count: 0
				},
			}
		},
		computed: {
			currentList() {
				return this.barrageList.slice(0, 10)
			},
			historyList() {
				return this.barrageHistory.slice(0, 10)
			},
			repostLimitSecond() {
				
				return this.clickTickTimestamp.length
			}
		},
		mounted() {
			onSocket.call(this, 'talk');
			onSocket.call(this, 'getTalk');
			this.getHistoryBarrage();
			this.clearTimer = setInterval(() => {
				this.clickTickTimestamp.shift()
			}, 3000);
			
			// 定时拉取历史数据
			clearInterval(this.historyTimer);
			this.historyTimer = setInterval(() => {
				this.getHistoryBarrage(1)
			}, 10 * 1000)
			
		},
		destroyed() {
			clearInterval(this.clearTimer)
		},
		methods: {
			getCurrentList() {
				return this.barrageList.slice(0, 10)
			},
			beforeEnter(el) {
				el.style.transitionDuration = 0
				el.style.transform = 'translateX(600px)';
			},
			enter(el) {
				const randomX = 8 + Math.random() + Math.floor(Math.random() * 4);
				el.style.transform = `translateX(${-this.width}px)`;
				el.style.transitionDuration = randomX + 's';
				el.style.transitionTimingFunction = 'linear'
			},
			beforeEnterSingle(el) {
				console.info('beforeEnterSingle=>');
				el.style.transform = 'translateX(600px)';
			},
			enterSingle(el) {
				console.info('enterSingle=>');
				console.info('===>', el.getAttribute('_id'));
				const el_id = el.getAttribute('_id');
				if (el_id && this.enterIds.includes(el_id)) {
					const randomX = 8 + Math.random() + Math.floor(Math.random() * 4);
					el.style.transform = `translateX(${-this.width}px)`;
					el.style.transitionDuration = randomX + 's';
					el.style.transitionTimingFunction = 'linear'
				}
				
			},
			/**
			 * @desc 获取历史弹幕记录
			 * @todo 什么时候去拉取？？
			 * */
			getHistoryBarrage(page) {
				// 循环拉取弹幕
				if (this.pageData.count) {
					if (this.pageData.page >= this.pageData.count) {
						this.pageData.page = 0
					}
				}
				if (page) {
					this.pageData.page++;
					this.barrageHistory = [];
					emitSocket('getTalk', this.pageData);
				} else emitSocket('getTalk', this.pageData);
			},
			/**
			 * @desc 简单实现弹幕效果
			 * @todo 互不干扰的自增
			 * @bug 这种方式可能不行了~
			 * */
			onOutRoom() {
				this.$emit('emitBarrageHide', false)
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
				this.$nextTick(() => {
					this.inputContent = '武汉加油' + new Date()
				});
				emitSocket('talk', this.inputContent);
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
				transform: translate(-50%, -50%);
				width: 100%;
				height: 700px;
				mix-height: 100%;
				color: #fff;
				overflow: hidden;
		}
		
		.barrage-module {
				position: absolute;
				width: 100%;
				height: 100%;
				left: 0;
				top: 0;
				z-index: 100;
				background: rgba(255, 0, 0, 0.2);
		}
		
		.animate-to-left {
				position: absolute;
				font-size: 18px;
				line-height: 64px;
				font-weight: bold;
				width: 600px;
				right: 0;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				transition-property: all;
				
				img {
						border-radius: 50%;
						vertical-align: middle;
						margin-right: 10px;
						width: 60px;
						height: 60px;
				}
		}
		
		.footer-input {
				position: absolute;
				left: 50%;
				bottom: 20px;
				transform: translateX(-50%);
				width: 30%;
				min-width: 650px;
				
				a {
						text-decoration: none;
				}
				
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
						
						&:disabled {
								cursor: not-allowed;
						}
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
		
		.ul {
				position: relative;
				min-height: 660px;
		}


</style>
