<template>
	<div data-component="sub-menu" v-show="ifShowSubMenu" @tap="clickMethod">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h4 class="modal-title">
						请选择门类
					</h4>
				</div>
				<div class="modal-body">
					<div class="modal-body-con">
						<div class="qrcode-panel">
							<template v-if="inventorySubMenu">
							  	<treeView class="item" :model="inventorySubMenu" :isOpen="true">
							  	</treeView>
							</template>
							<template v-else>
								<div class="qrcode-loading-card">
									<img src="../imgs/loading.gif" class="qrcode-loading-img"/>
									正在加载,请稍后...
								</div>
							</template>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<div class="modal-button button-alert" @tap.stop.prevent="cancel">
						取消
					</div>
				</div>
			</div>
		</div>

		<!-- <treeView id="idSubMenu" class="item" :model="inventorySubMenu">
	  	</treeView> -->
	</div>
</template>

<script>
import treeView from './treeview.vue'
import { mapGetters } from 'vuex'
export default{
	props: ['ifShowSubMenu'],
	components:{
		treeView
	},
	data: function () {
	    return {
	      count: 0,
	    }
	},
	computed: {
		...mapGetters(["inventorySubMenu"]),
	},
	mounted(){
		this.$store.dispatch("getInventorySubMenu");
	},
	methods:{
	  	cancel(){
    		this.$emit('MyEvent', false);
    	},
    	clickMethod(){
    		// app.mui.toast(123)
    		console.log(123)
    		// this.$emit('MyEvent', false);	
    	}
	},
}
</script>
<style lang="less" scoped>
	[data-component = "sub-menu"] {
		position: fixed;
	    z-index: 9998;
	    top: 0;
	    left: 0;
	    width: 100%;
	    height: 100%;
	    background-color: rgba(125,125,125,.4);
	    display: table;
	    transition: opacity .3s ease;
	    
	    #idSubMenu{
			width: 100px;
			height: 100px;
	    }

	    .modal-dialog {
	    	display: table-cell;
    		vertical-align: middle;
    		text-align: center;
    		
    		.modal-content {
    			width: 70%;
    			max-width: 380px;
			    margin: 0 auto;
			    background-color: #fff;
			    border-radius: 7px;
			    transition: all .3s ease;
			    box-sizing: border-box;
			    
			    .modal-header h4 {
				    font-size: 20px;
				    font-weight: 500;
				    color: #333;
				    text-align: center;
				    padding: 30px 0 15px;
				}
				
				.modal-body {
				    position: relative;
				    overflow: hidden;
				    
				    .modal-body-con {
					    padding: 15px 15px 24px;
					    color: #333;
					    
					    .qrcode-panel {
					    	padding: 10px;
					    	text-align: center;
					    	
					    	.qrcode-img {
					    		width: 100%;
					    	}
					    	
					    	.qrcode-loading-card {
					    		padding: 60px 0 60px;
					    		
					    		.qrcode-loading-img {
						    		display: block;
								    margin: 3px auto;
								    width: 50px;
								    height: 50px;
								    overflow: hidden;
						    	}
					    	}
					    	
					    }
					}
				}
			    
			    .modal-footer {
				    height: 42px;
				    line-height: 42px;
				    text-align: center;
				    border-top: 1px solid #e4e4e4;
				    font-size: 14px;
				    color: #d70000;
				}
    		}
	    }

	}
</style>