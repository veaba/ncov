<template>
		<div class="left-layout chart-module">
				22
				<!---->2
		</div>
</template>

<script>
	export default {
		name: "Chart",
		props: {
			chartButtonStatus: {
				typ: Boolean
			}
		},
		data() {
			return {
				rankData: []
			}
		}
	};
</script>

<style scoped lang="scss">
.chart-module{
		border: 1px solid red;
}
</style>
