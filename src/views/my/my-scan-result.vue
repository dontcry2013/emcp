<template>
	<div data-page="my-scan-result">
		<div id="result-main">
			<div style="height: 40%" v-if="showMsg">
				<p class="loading">{{ msg }}</p>
				<p>{{ $route.params["scan-result"] }}</p>
			</div>


			<div class="mui-scroll" v-if="inventoryScanned">
				<ul class="mui-table-view mui-table-view-chevron">
					<li class="mui-table-view-cell mui-media" v-for="(item, index) in inventoryScanned">
						<div class="imgholder" v-if="photourl">
							<img :src="photourl">
						</div>
						<div class="mui-media-body">
							<p class="mui-ellipsis">
								<span>id:</span> {{ item.id }}
							</p>
							<p class="mui-ellipsis">
								<span>item name:</span> {{ item.tfiName }}
							</p>
							<p class="mui-ellipsis">
								<span>item type:</span> {{ item.tfiType }}
							</p>
							<p class="mui-ellipsis">
								<span>item unit:</span> {{ item.tfiUnit }}
							</p>
							<p class="mui-ellipsis">
								<span>item available:</span> {{ item.tfiMountAble }}
							</p>
							<p class="mui-ellipsis">
								<span>item price:</span> {{ item.tfiFigure }}
							</p>
							<p class="mui-ellipsis">
								<span>store name:</span> {{ item.tFStore.tfsStoreshortname }}
							</p>
							<p class="mui-ellipsis">
								<span>creator email:</span> {{ item.createBy }}
							</p>
						</div>
					</li>
				</ul>
			</div>
			<h3 v-else>加载数据中...</h3>
		</div>
	</div>
</template>
<script>
	import { mapGetters } from 'vuex'
	module.exports = {
		data: function(){
			return {
				msg: "...载入中...",
				showMsg: false,
				photourl: null,
			}
		},
		// beforeDestroy: function(){
		//   	this.$store.dispatch("resetBackConfig");
		// },
		watch:{
			inventoryScanned: function(val, oldVal){
				console.log("inventoryScanned改变了", JSON.stringify(val), JSON.stringify(oldVal));
				this.photourl = app.Config.webapiDomain + val[0].photo;	
				console.log(this.photourl);
			},
		},
		created: function(){
			console.log("任务列表加载", this.$route.params["scan-result"]);
			if(this.$route.params["scan-result"]){
				this.showMsg = true;
				this.msg = "扫码结果是:";

				this.$store.dispatch('getScanInventory', this.$route.params["scan-result"]);

			}
			this.$store.dispatch("updateBackConfig", {
				name: 'home'
			});
		},
		mounted: function(){
			console.log("mounted输出："+JSON.stringify(this.$store.state.inventory));
		},
		computed: {
			...mapGetters(['inventoryScanned']),
		},
		methods: {
			
		}
	}
</script>
<style lang="less" scoped>
	[data-page="my-scan-result"]{
		.imgholder {
			img {
				width: 100%;
			}
		}
		.mui-scroll{
			margin-left: 0px;
			margin-right: 0px;
			margin-top: 20px;
			margin-bottom: 20px;
		}
	}
		
</style>