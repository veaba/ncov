<!--
@desc 仪表盘，控制页面显示
-->
<template>
		<div class="dashboard-module" v-show="!reportButton.isOpen">
				
				<div class="dashboard-button">
						
						<span class="button-span" @click.native="onClickShowMenu">仪表盘
							<span v-show="isShowMenu">x</span>
						</span>
						
						<ul v-show="isShowMenu">
								<li @click.native="onClickReportButton()">录入</li>
								<li>爱心</li>
								<li>紧急</li>
								<li>帮助</li>
						</ul>
				</div>
		</div>
</template>

<script>
	export default {
		name: "Dashboard",
		props: {
			reportButton: {
				type: Object
			}
		},
		setup() {
			return {
				isShowMenu: false
			};
		},
		
		methods: {
			onClickShowMenu() {
				this.isShowMenu = !this.isShowMenu;
				console.info(this.isShowMenu);
			},
			onClickReportButton() {
				console.info(this.reportButton);
				this.reportButton.isOpen = !this.reportButton.isOpen;
			}
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
