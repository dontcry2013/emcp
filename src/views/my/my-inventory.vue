<template>		
	<div data-page="my-inventory-list" class="mui-content">
		<div class="mui-row">
	        <div class="mui-col-xs-6 handle-module" @tap.stop.prevent="scanCode">
            	<span class="mui-icon-extra mui-icon-extra-sweep"></span>
            	{{ $t("home.scanQr") }}
	        </div>
	        <div class="mui-col-xs-6 handle-module">
            	<span class="mui-icon mui-icon-camera"></span>
            	{{ $t("home.memberQr") }}
	        </div>
	    </div>
	    <div style="position: relative; height: 100%;">
		    <div id="id-my-inventory-list" class="mui-scroll-wrapper">
		    	<div class="mui-scroll" >
					<!-- <input v-model="searchText" @click="popUp" type="text" placeholder="edit me"> -->
					<ul class="mui-table-view mui-table-view-chevron">
						<li class="mui-table-view-cell mui-media"  v-for="(item, index) in inventoryList" @tap.stop.prevent="gotoDetails(index)">
							<a class="mui-navigate-right">
								<img class="mui-media-object mui-pull-left" v-if="item.photo" :src="item.photo">
								<img class="mui-media-object mui-pull-left" v-else :src="image">
								<div class="mui-media-body">
									{{ item.tfiName }}
									<p class="mui-ellipsis">型号: {{ item.tfiType }}</p>
								</div>
							</a>
						</li>
					</ul>
				</div>
		    </div>
	    </div>
		<!-- <mySubMenu v-bind:ifShowSubMenu="subMenuState" @MyEvent="handleMySubMenuEvent"></mySubMenu> -->
	</div>
</template>
<script>
import { mapGetters } from 'vuex'
import image from "../../imgs/test/cbd.jpg"
import mySubMenu from '../../components/inventory-submenu-component.vue'
export default {
	data() {
		return {
			image:image,
			subMenuState: false,
		};
	},
	components:{
		mySubMenu,
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

		popUp(){
			this.subMenuState = true;
		},

		handleMySubMenuEvent(msg){
    		console.log("输出", msg);
    		this.subMenuState = false;
    	},

		scanCode: function(){
        	if(!app.Config.isApp){
        		app.mui.toast(this.$t("message.scanEnvError"));
        		return;
        	}
        	this.$store.dispatch("bindBarcodeOnmarkedEvent", this.scanResult);
        	this.$router.push({name: "barcode"});
        },

        scanResult(type, result){
    		console.log("扫码结果", result);
    		this.$router.push({name: "myScanResult", params: {"scan-result": result}});
        },

	}
}
</script>
<style>
	[data-page='my-inventory-list'] #id-my-inventory-list > .mui-pull-top-pocket{
		top: 0px !important;	
	}
</style>
<style lang="less" scoped>

	[data-page='my-inventory-list'] {
		.mui-row {

		}
		.handle-module {
			height: 100px;
			text-align: center;
			
			span {
				display: block;
				font-size: 55px;
			    margin: 10px auto 0;
			    width: 65px;
			    height: 65px;
			    overflow: hidden;
			}
		}
		#id-my-inventory-list > .mui-pull-top-pocket{
			top: 0px !important;
		}
	}
</style>