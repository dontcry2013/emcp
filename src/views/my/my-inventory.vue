<template>		
	<div data-page="my-inventory-list" id="id-my-inventory-list" class="mui-content">
		<div class="mui-scroll" >
			<!-- <ul class="mui-table-view mui-table-view-chevron">
				<li class="mui-table-view-cell mui-media" v-for="(item, index) in inventoryList" @tap.stop.prevent="gotoDetails(index)">
				    <a class="mui-navigate-right">
						<div class="item-date">{{ item.createDate }}</div>
						<div class="mui-media-body">
							<p class="mui-ellipsis">
								<span>id:</span> {{ item.id }}
							</p>
							<p class="mui-ellipsis">
								<span>item number:</span> {{ item.tfiNo }}
							</p>
							<p class="mui-ellipsis">
								<span>item name:</span> {{ item.tfiName }}
							</p>
							<p class="mui-ellipsis">
								<span>item type:</span> {{ item.tfiType }}
							</p>
							<p class="mui-ellipsis">
								<span>create name:</span> {{ item.createName }}
							</p>
							<p class="mui-ellipsis">
								<span>item amount:</span> {{ item.tfiMount }} {{ item.tfiUnit }}
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
								<span>store level:</span> {{ item.tfstore.tfsStorelevelname }}
							</p>
							<p class="mui-ellipsis">
								<span>create by:</span> {{ item.createName }}
							</p>
							<p class="mui-ellipsis">
								<span>creator email:</span> {{ item.createBy }}
							</p>
						</div>
						<span v-if="checkIfNew" class="mui-badge mui-badge-danger">新</span>
					</a>
				</li>
			</ul> -->

			<ul class="mui-table-view mui-table-view-chevron">
				<li class="mui-table-view-cell mui-media"  v-for="(item, index) in inventoryList" @tap.stop.prevent="gotoDetails(index)">
					<a class="mui-navigate-right">
						<!-- <img class="mui-media-object mui-pull-left" :src="image"> -->
						<img class="mui-media-object mui-pull-left" :src="getimgurl(index)">
						<div class="mui-media-body">
							{{ item.tfiName }}
							<p class="mui-ellipsis">型号: {{ item.tfiType }}</p>
						</div>
					</a>
				</li>
			</ul>

		</div>
	</div>	
</template>
<script>
import { mapGetters } from 'vuex'
import image from "../../imgs/test/cbd.jpg"
export default {
	data() {
		return {
			image:image
		};
	},
	created(){

	},
	mounted(){
		var _this = this;
		this.$store.dispatch("updateNavbarTitle", this.$t('home.inventory'));
		app.mui.ready(function(){
			app.mui("#id-my-inventory-list").pullRefresh({
				down : {
					"height": 100, //可选.默认50.触发上拉加载拖动距离
					"range":'200px',
			      	callback : function(){
			      		var self = this;
			        	_this.tabDown(self);
			      	}
			    },
              	up: {
	                height: 100, //可选.默认50.触发上拉加载拖动距离
	                auto: _this.inventoryList && _this.inventoryList.length>0 ? false : true, //可选,默认false.自动上拉加载一次
	                contentnomore: '已到底了', //可选，请求完毕若没有更多数据时显示的提醒内容；
	                callback: function () {
	                  	var self = this
	                  	_this.tabUp(self);
	                }
	            }
			});
		})
	},
	computed: {
		...mapGetters(['inventoryList']),
	},
    beforeRouteEnter: function(to, from, next) {
		next();
		return true;
	},
	methods: {
		tabDown:function(self){
	        this.$store.dispatch('updateInventoryList', self);
		},

		tabUp:function(self){
	        this.$store.dispatch('getInventoryList', self);
		},

		gotoDetails(idx){
			// if(typeof idx === "number"){
				this.$store.dispatch('updateInventoryLastIndex', idx)
				this.$router.push({name: "myInventoryDetail", params: { content: this.inventoryList[idx] }});
			// }
		}, 
		getimgurl(idx){
			if(this.inventoryList && this.inventoryList[idx] && this.inventoryList[idx].photo){
				return app.Config.webapiDomain + this.inventoryList[idx].photo;	
			} else{
				return this.image;
			}
		},

	}
}
</script>
<style lang="less" scoped>
	[data-page='my-inventory-list'] {
		.item-date {
			font-size: 10px;
			color: gray;
		}
	}
</style>