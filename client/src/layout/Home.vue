<template>
		<div class="home">
				hello wolrd~
				
				<p>
						<router-link to="/a">/a</router-link>
				</p>
				
				<p>
						<router-link to="/b">/b</router-link>
				</p>
				
				<p>
						<router-link to="/c">/c</router-link>
				</p>
				<p>
						<router-link to="/c">/Home</router-link>
				</p>
				<router-view></router-view>
		</div>
</template>

<script>
	export default {
		name: "Home"
	};
</script>

<style scoped>
		a {
				display: block;
		}
</style>
