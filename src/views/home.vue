<template>
    <div data-page="home">
    	<div class="page-content">
    		<!-- <div class="mui-row header">
    			<div class="mui-col-xs-12 title" style="position:relative;">
    				<div class="my_center">
    					<span>EMCP</span>	
    				</div>
    				<div class="my_right">
    					<span class="mui-icon mui-icon-email mui-pull-right"><i class="new"></i></span>
    				</div>
    			</div>
		        <div class="mui-col-xs-6 handle-module" @tap.stop.prevent="scanCode">
	            	<span class="mui-icon-extra mui-icon-extra-sweep"></span>
	            	{{ $t("home.scanQr") }}
		        </div>
		        <div class="mui-col-xs-6 handle-module" @tap.stop.prevent="showMemberQrcode(true)">
	            	<span class="mui-icon mui-icon-camera"></span>
	            	{{ $t("home.memberQr") }}
		        </div>
		    </div> -->

    		<div ref="slider" class="mui-slider">
				<div class="mui-slider-group mui-slider-loop">
					<!-- 额外增加的一个节点(循环轮播：第一个节点是最后一张轮播) -->
					<div class="mui-slider-item mui-slider-item-duplicate">
						<a ref="slider1" href="#" @tap.stop.prevent="tapTheSlider">
							<img src="../imgs/test/yuantiao.jpg">
							<p class="mui-slider-title">静静看这世界</p>
						</a>
					</div>
					<div class="mui-slider-item" @tap.stop.prevent="tapTheSlider2">
						<a href="#">
							<img src="../imgs/test/shuijiao.jpg">
							<p class="mui-slider-title">幸福就是可以一起睡觉</p>
						</a>
					</div>
					<div class="mui-slider-item" @tap.stop.prevent="tapTheSlider">
						<a href="#">
							<img src="../imgs/test/muwu.jpg">
							<p class="mui-slider-title">想要一间这样的木屋，静静的喝咖啡</p>
						</a>
					</div>
					<div class="mui-slider-item" @tap.stop.prevent="tapTheSlider">
						<a href="#">
							<img src="../imgs/test/cbd.jpg">
							<p class="mui-slider-title">Color of SIP CBD</p>
						</a>
					</div>
					<div class="mui-slider-item" @tap.stop.prevent="tapTheSlider">
						<a href="#">
							<img src="../imgs/test/yuantiao.jpg">
							<p class="mui-slider-title">静静看这世界</p>
						</a>
					</div>
					<!-- 额外增加的一个节点(循环轮播：最后一个节点是第一张轮播) -->
					<div class="mui-slider-item mui-slider-item-duplicate" @tap.stop.prevent="tapTheSlider">
						<a href="#">
							<img src="../imgs/test/shuijiao.jpg">
							<p class="mui-slider-title">幸福就是可以一起睡觉</p>
						</a>
					</div>
				</div>
				<div class="mui-slider-indicator mui-text-right">
					<div class="mui-indicator mui-active"></div>
					<div class="mui-indicator"></div>
					<div class="mui-indicator"></div>
					<div class="mui-indicator"></div>
				</div>
			</div>
		    <div class="mui-table-view mui-grid-view handle-list">
		    	<div class="mui-table-view-cell mui-col-xs-4" @tap.stop.prevent="listsNotification">
		    		<span class="mui-icon mui-icon-email"></span>
		    		<div class="mui-media-body">{{ $t("home.messageList") }}</div>
		    	</div>
		    	<div class="mui-table-view-cell mui-col-xs-4" @tap.stop.prevent="listsEmployee">
		    		<span class="mui-icon-extra mui-icon-extra-peoples"></span>
		    		<div class="mui-media-body">{{ $t("home.employeeList") }}</div>
		    	</div>
		    	<div class="mui-table-view-cell mui-col-xs-4" @tap.stop.prevent="listsTask">
		    		<span class="mui-icon-extra mui-icon-extra-order"></span>
		    		<div class="mui-media-body">{{ $t("home.taskList") }}</div>
		    	</div>
		 <!--    	<div class="mui-table-view-cell mui-col-xs-4">
		    		<span class="mui-icon mui-icon-chat"></span>
		    		<div class="mui-media-body">在线客服</div>
		    	</div> -->
		    	<div class="mui-table-view-cell mui-col-xs-4" @tap.stop.prevent="listInventory">
		    		<span class="mui-icon mui-icon-map"></span>
		    		<div class="mui-media-body">{{ $t("home.inventory") }}</div>
		    	</div>
		    	<div class="mui-table-view-cell mui-col-xs-4" @tap.stop.prevent="listDepartment">
		    		<span class="mui-icon-extra mui-icon-extra-card"></span>
		    		<div class="mui-media-body">{{ $t("home.structure") }}</div>
		    	</div>
		    	<div class="mui-table-view-cell mui-col-xs-4 not-border-bottom" @tap.stop.prevent="uploadFile">
		    		<span class="mui-icon mui-icon-paperplane"></span>
		    		<div class="mui-media-body">{{ $t("home.fileUpload") }}</div>
		    	</div>
		    </div>
		    <div class="main-footer-pic">
	    		<img src="../imgs/main-footer-pic.jpg" width="100%" height="110"/>
	    	</div>
	    	<memberQrcode v-bind:show="memberQrcodeState" v-on:show="showMemberQrcode"></memberQrcode>
    	</div>
    </div>
</template>
<script>
import memberQrcode from '../components/member-qrcode.vue'
 
module.exports = {
    data: function(){
        return {
        	memberQrcodeState: false,
        }
    },
    components: {
    	memberQrcode, 
	},
	watch:{
		show: function(v, ov){
			console.log("改变", v, ov);
		}
	},
	created: function(){

	},
    mounted: function(){
    	// app.mui.plusReady(function(){
    	// 	var wt=plus.nativeUI.showWaiting();
	    // 	setTimeout(function(){
	    // 		wt.close();
	    // 	}, 1990);	
    	// });
    	app.mui(this.$refs.slider).slider({interval:2000});
    },
    beforeRouteEnter: function(to, from, next) {
		// 在渲染该组件的对应路由被 confirm 前调用
		// 不！能！获取组件实例 `this`
		// 因为当钩子执行前，组件实例还没被创建
		//$e.target.src= require("../imgs/test/232.jpg")
		next();
		return true;
	},
    methods: {
        //显示二维码
        showMemberQrcode(memberQrcodeState){
       	 	this.memberQrcodeState = memberQrcodeState;
        },
        //是否显示扫码
        showBarcode(barcodeState){
        	this.barcodeState = barcodeState;
		},
		//扫码核销
		scanCode: function(){
        	if(!app.Config.isApp){
        		app.mui.toast(this.$t("message.scanEnvError"));
        		return;
        	}
        	this.$store.dispatch("bindBarcodeOnmarkedEvent", this.scanResult);
        	this.$router.push({name: "barcode"});
        },
        listsEmployee(){
    		console.log("进入员工页面");
    		this.$router.push({name: "employeeList"});
        },
        listsTask(){
    		console.log("进入任务页面");
    		this.$router.push({name: "myTaskList"});
        },
        listsNotification(){
        	console.log("进入通知页面");
        	this.$router.push({name: "myMessageList"});
        },

        listDepartment(){
        	this.$router.push({name: "myDepartment"});
        },

        listInventory(){
        	this.$router.push({name: "myInventory"});
        },

        scanResult(type, result){
    		console.log("扫码结果", result);
    		this.$router.push({name: "myScanResult", params: {"scan-result": result}});
        },

        uploadFile(type, result){
    		this.$router.push({name: "myUpload"});
        },

        tapTheSlider(){
        	console.log(123, this.$refs.slider1.getElementsByTagName("p")[0].innerHTML);
        	console.log(234, this.$el);
        },

        tapTheSlider2(event){
        	console.log(event.target);
        },
    },
    beforeRouteLeave: function(to, from, next) {
		// 导航离开该组件的对应路由时调用
		// 可以访问组件实例 `this`
		next();
	},
};
</script>
<style lang="less" scoped>
	[data-page='home'] {
		height: 100%;
		
		.page-content {
			height: 100%;
			
			.header {
				background: #48A5F3;
				background: -ms-linear-gradient(top, #1981D8,  #48A5F3);        /* IE 10 */
				background:-moz-linear-gradient(top,#1981D8,#48A5F3);/*火狐*/ 
				background:-webkit-gradient(linear, 0% 0%, 0% 100%,from(#1981D8), to(#48A5F3));/*谷歌*/ 
				background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#1981D8), to(#48A5F3));      /* Safari 4-5, Chrome 1-9*/
				background: -webkit-linear-gradient(top, #1981D8, #48A5F3);   /*Safari5.1 Chrome 10+*/
				background: -o-linear-gradient(top, #1981D8, #48A5F3);  /*Opera 11.10+*/
				height: 130px;
				color: white;
				
				.title {
					height: 30px;
					position: relative;
			
					.my_center{
						height: 100%;
						position: absolute;
						left: 50%;
						transform: translateX(-50%);
						span {
							line-height: 30px;
						}
					}

					.my_right{
						height: 100%;
						position: absolute;
						right: 5px;
						.mui-icon-email {
						    position:relative;
						    top:50%;
						    transform: translateY(-50%);
						    .new {
						    	display: block;
							    background: #f00;
							    border-radius: 50%;
							    width: 5px;
							    height: 5px;
							    top: 8px;
							    right: 2px;
							    position: absolute;
						    }
						}
					}
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
			}
			
			.handle-list {
				padding: 0;
				
				div.mui-table-view-cell:not(.not-border-bottom){
					border-bottom: 1px solid #efeff4;
				}
				
				div.mui-table-view-cell:nth-child(3n+1), div.mui-table-view-cell:nth-child(3n+2){
					border-right: 1px solid #efeff4;
				}
				
				div.mui-table-view-cell{
					padding: 15px;
					cursor: pointer;
					margin-right: -2px;
					
					span {
						height: 35px;
						width: 35px;
						font-size: 28px;
						color: #48A5F3;
					}
				}
			}
			
			.main-footer-pic {
				bottom: 51px;
    			position: absolute;
    			max-height: 155px;
    			width: 100%;
			}
			
			#barcode {
			    background:#0F0;
				height:480px;
				width:360px;
			}
		}
		/*.mui-table-view-cell {
		    padding: 15px;
		    border: 1px solid #000;
		    cursor: pointer;
		}*/
	}
</style>