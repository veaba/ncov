<template>
		<div class="home">
				hello world~
				<router-view></router-view>
		</div>
</template>

<script>
	import {defineComponent} from 'vue';
	
	export default defineComponent({
		name: "Home"
	});
</script>
