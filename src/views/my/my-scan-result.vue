<template>
	<div data-page="my-task-list">
		<div id="task-main">
			<div style="height: 40%" v-if="showMsg">
				<p class="loading">{{ msg }}</p>
				<p>{{ $route.params["scan-result"] }}</p>
			</div>


			<div class="mui-scroll" v-f="inventoryScanned">
				<ul class="mui-table-view mui-table-view-chevron">
					<li class="mui-table-view-cell mui-media" v-for="(item, index) in inventoryScanned">
					    <a class="mui-navigate-right">
							<div class="item-date">{{ item.createDate }}</div>
							<div class="mui-media-body">
								<p class="mui-ellipsis">
									<span>id:</span> {{ item.id }}
								</p>
								<p class="mui-ellipsis">
									<span>tfiNo:</span> {{ item.tfiNo }}
								</p>
								<p class="mui-ellipsis">
									<span>create name:</span> {{ item.tfstore.createName }}
								</p>
								<p class="mui-ellipsis">
									<span>user name:</span> {{ item.tfstore.tfsUsername }}
								</p>
								<p class="mui-ellipsis">
									<span>store address:</span> {{ item.tfstore.tfsStoreaddress }}
								</p>
								<p class="mui-ellipsis">
									<span>store level:</span> {{ item.tfstore.tfsStorelevelname }}
								</p>
								<p class="mui-ellipsis">
									<span>create by:</span> {{ item.tfstore.createBy }}
								</p>
							</div>
							<span v-if="checkIfNew" class="mui-badge mui-badge-danger">新</span>
						</a>
					</li>
				</ul>
			</div>
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
			}
		},
		// beforeDestroy: function(){
		//   	this.$store.dispatch("resetBackConfig");
		// },
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
		computed: {
			...mapGetters(['inventoryScanned']),
		},
		methods: {
			
		}
	}
</script>