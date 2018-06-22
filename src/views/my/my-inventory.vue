<template>		
	<!-- 侧滑导航根容器 -->
	<div id="offCanvasWrapper" class="mui-off-canvas-wrap mui-draggable">
			<!--侧滑菜单部分-->
			<aside id="offCanvasSide" class="mui-off-canvas-left ">
				<div id="offCanvasSideScroll" class="mui-scroll-wrapper">
					<div class="mui-scroll">
						<div class="content">
							<a class="mui-icon-extra mui-icon-extra-sweep" @tap.stop.prevent="scanCode"></a>
							<p style="margin: 10px 5px;">
								<!-- <button id="offCanvasHide" type="button" class="mui-btn mui-btn-danger mui-btn-block" style="padding: 5px 20px;">关闭侧滑菜单</button> -->
							  	<template v-if="inventorySubMenu">
								  	<treeView class="item" :model="inventorySubMenu" :isOpen="true" @MyTapEvent="handleTreeviewTapEvent">
								  	</treeView>
								</template>
								<template v-else>
										正在加载,请稍后...
								</template>
							</p>
						</div>
	
					</div>
				</div>
			</aside>
			<!--主界面部分-->
			<div class="mui-inner-wrap">
				<div id="offCanvasContentScroll" class="mui-content mui-scroll-wrapper">
					<div data-page="my-inventory-list" id="id-my-inventory-list" class="mui-content">
				    	<div class="mui-scroll">
							<ul class="mui-table-view mui-table-view-chevron">
								<li class="mui-table-view-cell mui-media"  v-for="(item, index) in inventoryList" @tap.stop.prevent="gotoDetails(index)">
									<a class="mui-navigate-right">
										<img class="img-size mui-media-object mui-pull-left" v-if="item.photoThumb" :src="item.photoThumb">
										<img class="img-size mui-media-object mui-pull-left" v-else-if="item.photo" :src="item.photo">
										<img class="img-size mui-media-object mui-pull-left" v-else :src="image">
										<div class="mui-media-body">
											{{ item.tfiName }}
											<p class="mui-ellipsis">型号: {{ item.tfiType }}</p>
										</div>
									</a>
								</li>
							</ul>
						</div>
						<!-- <mySubMenu v-bind:ifShowSubMenu="subMenuState" @MyEvent="handleMySubMenuEvent"></mySubMenu> -->
					</div>
				</div>
			</div>
		</div>
</template>
<script>
import { mapGetters } from 'vuex'
import treeView from '../../components/treeview.vue'
import image from "../../imgs/test/cbd.jpg"
import mySubMenu from '../../components/inventory-submenu-component.vue'
export default {
	data() {
		return {
			image:image,
			subMenuState: false,
			pullRefreshInstance: null,
		};
	},
	components:{
		mySubMenu,
		treeView,
	},
	created(){

	},
	mounted(){
		var _this = this;
		this.$store.dispatch("updateNavbarTitle", this.inventoryTitle ? this.inventoryTitle : this.$t('home.inventory'));
		this.$store.dispatch("updateInventoryRightIconState", true);
		if(!this.inventorySubMenu){
			this.$store.dispatch("getInventorySubMenu");
		}
		app.mui.ready(function(){
			app.mui('#offCanvasSideScroll').scroll();
			_this.pullRefreshInstance = app.mui("#id-my-inventory-list").pullRefresh({
				down : {
					"height": 100,
					"range":'200px',
			      	callback : function(){
			        	_this.tabDown(this);
			      	}
			    },
              	up: {
	                height: 500,
	                auto: _this.inventoryList && _this.inventoryList.length>0 ? false : true,
	                contentnomore: '已到底了', //可选，请求完毕若没有更多数据时显示的提醒内容；
	                callback: function () {
	                  	_this.tabUp(this);
	                }
	            }
			});
		});
		app.bus.$on('MyTapEvent', function(msg){
			this.handleTreeviewTapEvent(msg)
		}.bind(_this));
	},
	computed: {
		...mapGetters(['inventoryList', 'inventorySubMenu', 'inventoryTitle']),
	},
    beforeRouteEnter: function(to, from, next) {
		next();
		return true;
	},
	beforeDestroy: function(){
		this.$store.dispatch("updateInventoryRightIconState", false);
	},
	methods: {
		tabDown:function(self){
	        this.$store.dispatch('pullDownLoad', self);
		},

		tabUp:function(self){
	        this.$store.dispatch('pullUpLoadMore', self);
		},

		gotoDetails(idx){
			this.$store.dispatch('updateInventoryLastIndex', idx);
			this.$router.push({name: "myInventoryDetail", params: { content: this.inventoryList[idx] }});
		}, 

		popUp(){
			this.subMenuState = true;
		},

		handleMySubMenuEvent(msg){
    		console.log("输出", msg);
    		this.subMenuState = false;
    	},

    	handleTreeviewTapEvent(msg){
    		if(msg){
    			console.log("treeview输出", msg);
    			this.$store.dispatch("setInventoryList", []);
    			this.$store.dispatch("resetInventoryRange");
    			this.$store.dispatch("setQueryOption", (msg.id == 'root') ? {} : {"tfiSubject": msg.id});
    			this.$store.dispatch("pullDownLoad");
    			this.$store.dispatch("updateNavbarTitle", msg.text);
    			this.$store.dispatch("setTitle", msg.text);
    			// this.pullRefreshInstance.disablePullupToRefresh();
    		} 	
    	},

		scanCode: function(){
        	if(!app.Config.isApp){
        		app.mui.toast(this.$t("message.scanEnvError"));
        		console.log(this.$t("message.scanEnvError"));
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
	#offCanvasSideScroll .item{padding-left: 0.2em !important;}
	#offCanvasSideScroll .parent_style{padding-left: 0;}
</style>
<style lang="less" scoped>

	.img-size{
		height: 42px;
		width: 42px;
	}
	.content{
		text-align: center;
	}
	.content a{
		margin-top: 10px;
		font-size: 60px; 
		color: white;
	}

</style>