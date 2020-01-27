<!--
@desc 用于标注post 模块、news 模块的真实性录入到Timeline中
@info 同时，支持Python 产生的数据推送过来
@audit 审核模块
-->
<template>
		<div class="console-module" id="console">
		</div>
</template>

<script>
	export default {
		name: "Console",
		props: {
			auditButtonStatus: {
				type: Boolean
			}
		},
		mounted() {
			const body = document.querySelector('body');
			body.addEventListener('click', this.addClick)
		},
		destroyed() {
			const body = document.querySelector('body');
			body.removeEventListener('click', this.addClick)
		},
		methods: {
			addClick(event) {
				const clickClass = event.target.className;
				const self_click = clickClass.indexOf('console-module');
				const click_button = clickClass.indexOf('is-audit-button');
				if (self_click < 0 && !(clickClass.trim()).length && click_button < 0) {
					this.$emit('onClickMapHideAudit', false)
				}
			}
		}
	};
</script>

<style scoped lang="scss">
		.console-module {
				position: absolute;
				left: 0;
				bottom: 0;
				width: calc(100% - 5px);
				height: 400px;
				border: 1px solid red;
				z-index: 1;
		}

</style>
