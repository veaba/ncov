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
								<li v-if="authObj.isAuth" @click="onClickWhatButton('report')">录入</li>
								<li v-if="authObj.isAuth">爱心</li>
								<li v-if="authObj.isAuth">紧急</li>
								<!--<li @click="onClickHelp">帮助</li>-->
								<li v-if="authObj.isAuth" @click="onClickWhatButton('audit')" class="is-audit-button">审核</li>
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
				console.info(this.isShowMenu);
			},
			onClickWhatButton(button) {
				switch (button) {
					case 'report':
						this.$emit('onShowModule', 'report');
						break;
					case 'timeline':
						this.$emit('onShowModule', 'timeline');
						break;
					case 'audit':
						this.$emit('onShowModule', 'audit');
						break;
					case 'help':
						alert('todo');
						break
				}
			},
		}
	};
</script>

<style scoped lang="scss">
		.dashboard-module {
				position: absolute;
				right: 0;
				top: 0;
				color: #f44336;
				border-left: 10px solid #f44336;
				border-bottom: 10px solid #f44336;
				border-bottom-left-radius: 150px;
				font-size: 24px;
				padding: 30px;
				background: #03A9F4;
				z-index: 100;
				box-shadow: 2px 9px 12px #03a9f49c;
				
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
