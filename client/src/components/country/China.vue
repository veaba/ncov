<template>
		<div>
				<h1>Hello,China</h1>
		</div>
</template>

<script>
	import {defineComponent} from 'vue';
	
	export default defineComponent({
		name: "China"
	});
</script>

<style scoped lang="scss">
		@import "src/assets/styles/var.scss";
		
		h1 {
				font-size: 64px;
				text-align: center;
				color: $footer_p;
		}
</style>
