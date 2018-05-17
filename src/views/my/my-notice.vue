<template>
	<div data-page="my-notice">
		<div id="notice-main">
			<div style="height: 40%" v-if="showMsg">
				<p class="loading">{{ msg }}</p>
				<p>{{ $route.params["scan-result"] }}</p>
			</div>
			<div>
				
			</div>
		</div>
	</div>
</template>
<script>
	module.exports = {
		data: function(){
			return {
				msg: "...载入中...",
				showMsg: false,
			}
		},
		beforeDestroy: function(){
		  	this.$store.dispatch("resetBackConfig");
		},
		created: function(){
			console.log("任务列表加载", this.$route.params["scan-result"]);
			console.log($);
			if(this.$route.params["scan-result"]){
				this.showMsg = true;
				this.msg = "notice是:";
			}
			/*this.$store.dispatch("updateBackConfig", {
				callback: function(){
					console.log("重新定义了回退");
				}
			});*/
			this.$store.dispatch("updateBackConfig", {
				name: 'home'
			});
		},
		methods: {
			
		}
	}
</script>