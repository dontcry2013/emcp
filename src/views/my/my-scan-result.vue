<template>
	<div data-page="my-scan-result">
		<div class="page-content" id="result-main">
			<div style="margin-bottom: 10px;" v-if="showMsg">
				<p class="loading">{{ msg }}</p>
				<p>{{ $route.params["scan-result"] }}</p>
			</div>

			<template v-if="inventoryScanned && inventoryScanned.length>0">
				<div class="mui-scroll">
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
					<footer>
						<div class="fbt" @tap.stop.prevent="uploadImg(inventoryScanned[0].id)">{{ $t("component.imgUpload") }}</div>
					</footer>
				</div>
			</template>
			<h3 v-else>{{ serverMsg }}</h3>
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
				serverMsg:"加载数据中..."
			}
		},
		watch:{
			inventoryScanned: function(val, oldVal){
				let type = typeof val;
				console.log("inventoryScanned改变了", type, val.length, JSON.stringify(val), JSON.stringify(oldVal));
				if(val && val.length > 0 && val[0].photo){
					this.photourl = app.Config.webapiDomain + val[0].photo;
				}
				if(!val || val.length == 0){
					this.serverMsg = "没有获取到数据";
					this.$store.dispatch("setScanInventory", null);
				}
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
			if(this.inventoryScanned && this.inventoryScanned.length > 0 && this.inventoryScanned[0].photo){
				this.photourl = app.Config.webapiDomain + this.inventoryScanned[0].photo;
			}
		},
		beforeDestroy: function(){
			//   	this.$store.dispatch("resetBackConfig");
		},
		computed: {
			...mapGetters(['inventoryScanned']),
		},
		methods: {
			uploadImg(itemId){
				console.log("itemId是"+ itemId);
				this.$router.push({name: "myUpload", params:{id: itemId}});
			}	
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
		.mui-table-view{
			margin-left: 0px;
			margin-right: 0px;
			margin-top: 20px;
			margin-bottom: 20px;
		}
		footer {
			width: 100%;
			line-height: 44px;
			height: 44px;

			text-align: center;
			color: #FFF;
			z-index: 999999;

			.fbt {
				width: 100%;
				height: 100%;
				background-color: #FFCC33;
				float: left;
			}
			.fbt:active {
			  	-webkit-box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.5);
				box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.5);
			}
		}
	}
		
</style>