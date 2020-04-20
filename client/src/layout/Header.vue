<template>
		<header>
				<nav>
						<div class="logo">
								<img src="../assets/images/viruses.png" alt="" style="width: 60px;height: 60px;">
						</div>
						<ul class="menu">
								<li>
										<router-link to="/global/world">Global</router-link>
								</li>
								<li>
										<router-link to="/country/china">China</router-link>
								</li>
								<li>
										<router-link to="/country/america">America</router-link>
								</li>
						</ul>
				</nav>
		</header>
</template>

<script>
	export default {
		name: "Header"
	};
</script>

<style scoped lang="scss">
		@import "src/assets/styles/var";
		
		header {
				height: 80px;
				line-height: 80px;
				background: $back_bg;
		}
		
		nav {
				display: flex;
				align-content: space-between;
				padding: 0 24px;
		}
		
		.logo {
				display: flex;
				flex: 1;
				align-items: center;
				line-height: 80px;
		}
		
		.menu {
				color: #fff;
				display: flex;
				
				li {
						flex-direction: row;
						margin-left: 10px;
						padding: 0 10px;
						
						a {
								display: inline-block;
								text-decoration: none;
								color: $a;
						}
				}
		}
</style>
