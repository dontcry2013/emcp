<template>
	<div data-page="barcode">
		<div id="barcode-panel">
			<!-- <div style="height:40%" v-if="!barcode"></div>
			<p class="tip" v-if="!barcode">...{{$t("message.loading")}}...</p> -->
		</div>
	<!-- 	<footer>
			<div class="fbt" @tap.stop.prevent="back">{{$t("message.cancel")}}</div>
		</footer> -->
	</div>
</template>
<script>
	export default {
	    data: function(){
	        return {
	        	barcode: null,
	        	ws: null,
	        	wo: null
	        }
	    },
	    mounted() {
	    	this.listener = (event) => {
		    	console.log('document clicked');
		    	this.back();
		    }
		  	// document.addEventListener('click', this.listener);

	    	//不知道为什么非得要延时，用$nextTick都解决不了
	    	setTimeout(()=>this.startScan(), 10);
	    	// this.startScan();
	    	// this.$nextTick(()=>this.startScan());


	    },
	    methods: {
	    	//扫码核销
	        startScan(){
	        	var _this = this;
	        	if(!app.Config.isApp){
	        		app.mui.toast(_this.$t("message.scanEnvError"));
	        		return;
	        	}
        		_this.barcode = new plus.barcode.Barcode("barcode-panel");
        		_this.barcode.onmarked = function(type, result){
        			console.log("onmarked回调", result);
        			// app.mui.toast(_this.$t("message.scanCheckError"));
        			if(_this.$store.state.appEvent.barcodeOnmarkedEvent && _this.$store.state.appEvent.barcodeOnmarkedEvent(type, result) === false){
        				setTimeout(()=>_this.barcode.start(), 2000);
        			}
        		}
        		_this.barcode.onerror = function(type, result){
        			app.mui.toast(_this.$t("message.internalError"));
        		}
		        _this.barcode.start();

		        // _this.myFunction();
	        },
	        	        
	        closeScan(){
	        	if(this.barcode){
	        		this.barcode.close();
	        		this.barcode = null;
	        	}
	        	this.$store.dispatch("deleteBarcodeOnmarkedEvent");
	        },
	        
	        myFunction(){
			    var node = document.createElement("input");
				node.type = "button";
			    node.value = "my button";
			    node.style.color = "#FFCC33";
			    node.className = "at-bottom";
			    node.id = "aaa";
				node.addEventListener("click", function(){
					console.log(this.id);
			    })
			    document.getElementById("barcode-panel").appendChild(node);
	        },

	        back(){
	        	this.closeScan();
	        	app.vueApp.goBack();
	        	// this.$router.push({name: "home"});
	        }
	   	},
	   	beforeDestroy(){
	   		this.closeScan();
	   	}
	}
</script>
<style lang="less" scoped>
	[data-page='barcode'] {
	    background-color: #000000;
		position: relative;

	    .mui-bar {
	    	background-color: #000;
	    	
	    	a.mui-icon {
	    		color: #fff;
	    	}
	    }
	    
	    #barcode-panel {
			width: 100%;
			position: absolute;
			top: 44px;
			bottom: 0px;
			text-align: center;
			background-color: #000;

			.tip {
			    color: #FFFFFF;
			    font-weight: bold;
			    text-shadow: 0px -1px #103E5C;
			}
		}

		footer {
			width: 100%;
			line-height: 44px;
			height: 44px;
			position: absolute;
			bottom: 0px;
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
		.at-bottom{
			z-index: 9999;
			width: 100%;
			height: 44px;
			position: absolute;
			bottom: 0px;
		}
	}
</style>
