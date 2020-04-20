<template>
		<footer>
				<p style="text-align: center">
						&copy; 2020 {{currentYear>2020?' -'+currentYear:''}} design by
						<a href="https://github.com/veaba" target="_blank">@veaba</a>
				</p>
		</footer>
</template>

<script>
	export default {
		name: "Footer",
		setup() {
			return {
				currentYear: new Date().getFullYear()
			};
		}
	};
</script>

<style scoped lang="scss">
		@import "src/assets/styles/var";
		
		footer {
				height: 100px;
				color: $footer_p;
				line-height: 100px;
				background: $back_bg;
				flex: 0 0 auto;
				a {
						color: $a;
				}
		}
</style>
