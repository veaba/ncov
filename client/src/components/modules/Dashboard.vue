<!--
@desc 仪表盘，控制页面显示
-->
<template>
		<div class="dashboard-module">
				<div class="dashboard-button">
						<span class="button-span" @click.native="onClickShowMenu">仪表盘
							<span v-show="isShowMenu">x</span>
						</span>
						<ul v-show="isShowMenu">
								<!--todo v-if="authObj.isAuth"-->
								<li @click="onClickWhatButton('report')">录入</li>
								<li v-if="authObj.isAuth">爱心</li>
								<!--								<li v-if="authObj.isAuth">紧急</li>-->
								<!--<li @click="onClickHelp">帮助</li>-->
								<!--								<li v-if="authObj.isAuth" @click="onClickWhatButton('audit')" class="is-audit-button">审核</li>-->
								<!--								<li @click="onClickWhatButton('news')">新闻</li>-->
								<li @click="onClickWhatButton('timeline')">时间轴</li>
								<li v-if="showAuthButton">
										<a :href="authObj.oAuthUrl" target="_blank">
												<img src="../../assets/images/github-logo.png"
												     style="width: 24px;
										     height: 24px;
										     top: 4px;
												 position: relative;" alt="">
										</a>
								</li>
						</ul>
				</div>
		</div>
</template>

<script>
	import {axios} from '../../utils/axios'
	
	export default {
		name: "Dashboard",
		props: {
			authObj: {
				type: Object,
			}
		},
		data() {
			return {
				isShowMenu: false,
			}
		},
		setup() {
			return {};
		},
		mounted() {
		
		},
		computed: {
			showAuthButton() {
				return !!(!this.authObj.isAuth && this.authObj.oAuthUrl)
			}
		},
		methods: {
			onClickShowMenu() {
				this.isShowMenu = !this.isShowMenu;
				this.$emit('onShowModule', {module: 'dashboard', "other": this.isShowMenu})
			},
			onClickWhatButton(button) {
				switch (button) {
					case 'report':
						this.isShowMenu = false;
						this.$emit('onShowModule', {module: 'report'});
						break;
					case 'timeline':
						this.isShowMenu = false;
						this.$emit('onShowModule', {module: 'timeline'});
						break;
					case 'audit':
						this.isShowMenu = false;
						this.$emit('onShowModule', {module: 'audit'});
						break;
					case 'help':
						alert('todo');
						break;
					case 'news':
						this.isShowMenu = false;
						this.$emit('onShowModule', {module: 'news'});
						break
				}
			},
		}
	};
</script>

<style scoped lang="scss">
		.dashboard-module {
				position: absolute;
				bottom: 0;
				left: 50%;
				transform: translateX(-50%);
				color: #f44336;
				border-top-left-radius: 150px;
				border-top-right-radius: 150px;
				font-size: 16px;
				padding: 30px;
				background: #03A9F4;
				z-index: 3;
				box-shadow: 2px 9px 12px #03a9f49c;
				transition: all 0.3s ease-in;
				opacity: 0.66;
				
				li {
						width: 100%;
						text-align: center;
						display: block;
						list-style: none;
						cursor: pointer;
						line-height: 32px;
						
						&:hover {
								opacity: 0.6;
						}
				}
				
				.button-span {
						cursor: pointer;
						border: 1px solid red;
						border-radius: 4px;
						position: relative;
						padding: 0 10px;
						z-index: 100;
						
				}
		}
</style>
