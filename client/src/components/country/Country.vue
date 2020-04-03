<template>
		<div>
				Country component
				<router-view></router-view>
		</div>
</template>

<script>
	import {defineComponent} from 'vue';
	
	export default defineComponent({
		name: "Country"
	});
</script>

<style scoped>

</style>
