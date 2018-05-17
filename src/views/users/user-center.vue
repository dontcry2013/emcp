<template>
	<div data-page="user-center">
		<div class="page-content">
			<div class="banner mui-row" @tap.stop.prevent="gotoUserInfo">
				<div class="mui-col-xs-6">
		            <div class="mui-table-view-cell head-image-panel">
		                <img class="head-image" src="../../imgs/test/248.jpg">   
		                <div v-if="profile && profile.length>0" class="user-name">{{ profile[0].realName }}</div>
		                <div v-else class="user-name">金鱼小兔子</div>
		            </div>
		        </div>
		        <div class="mui-col-xs-6">
		            <div class="mui-table-view-cell balance-panel">
                		<!-- <span class="balance-label">我的账户余额</span> -->
                		<!-- <span class="balance-amount">300</span> -->
		            </div>
		        </div>
			</div>
			<ul class="mui-table-view mui-table-view-chevron">
<!-- 				<li class="mui-table-view-cell mui-media">
					<a class="mui-navigate-right item">
						<span class="mui-icon-extra mui-icon-extra-gold mui-media-object mui-pull-left item-icon my-profit"></span>
						<div class="item-content">我的收益</div>
					</a>
				</li> -->
				<li class="mui-table-view-cell mui-media" @tap.stop.prevent="gotoMyMessageList">
					<a class="mui-navigate-right item">
						<span class="mui-icon mui-icon-email mui-media-object mui-pull-left item-icon message"></span>
						<div class="item-content">{{ $t("home.messageList") }}</div>
						<span class="mui-badge mui-badge-danger">4</span>
					</a>
				</li>
				<li class="mui-table-view-cell mui-media" @tap.stop.prevent="changeLanguage">
					<a class="mui-navigate-right item">
						<span class="mui-icon mui-icon-info mui-media-object mui-pull-left item-icon message"></span>
						<div class="item-content">{{ $t("user.langSwitch") }}</div>
					</a>
				</li>
				<li class="mui-table-view-cell mui-media" @tap.stop.prevent="gotoResetPassword">
					<a class="mui-navigate-right item">
						<span class="mui-icon mui-icon-locked mui-media-object mui-pull-left item-icon password"></span>
						<div class="item-content">{{ $t("user.changePsw") }}</div>
					</a>
				</li>
			</ul>
			<div class="button-panel">
				<button @tap="logout" type="button" class="mui-btn mui-btn-primary mui-btn-block">{{ $t("user.logout") }}</button>
			</div>
		</div>
	</div>
</template>
<script>
	import { mapGetters, mapActions } from 'vuex'

	export default {
		computed:{
			...mapGetters(['profile']),
		},
		data() {
			return {

			}
		},
		created(){
			if(!this.profile){
				this.getUserInfo();	
			}
	    },
		methods: {
			gotoUserInfo(){
				this.$router.push({name: "userInfo"});
			},
			
			gotoMyMessageList(){
				this.$router.push({name: "myMessageList"});
			},
			
			gotoResetPassword(){
				this.$router.push({name: "resetPassword"});
			},
			changeLanguage(){
				app.vueApp.$i18n.locale = (app.vueApp.$i18n.locale == 'zh' ? 'en' : 'zh');
				app.globalService.setLang(app.vueApp.$i18n.locale);
			},
			logout(){
				var _this = this;
				app.mui.confirm("确定要退出登录吗?", "提示", ["取消", "确定"], function(result){
					if(result.index === 1){
						app.globalService.logOut();
						_this.$store.dispatch("setLoginState", false);
					}
				});
			},
			...mapActions(['getUserInfo']),
		}
	}
</script>
<style lang="less" scoped>
	[data-page='user-center'] {
		.banner {
			width: 100%;
			height: 150px;
			background-image: url(../../imgs/user-center-banner3.jpg);
   			background-size:100% 100%;
   			-moz-background-size:100% 100%;
		   	-webkit-background-size:100% 100%;
		   	-o-background-size:100% 100%;
		   	
		   	.mui-col-xs-6 {
		   		height: 100%;
		   	}
		   	
		   	.head-image-panel {
		   		padding-top: 25px;
		   		padding-left: 40px;
		   		height: 100%;
		   		text-align: center;
		   		
		   		.head-image {
		   			border:solid 1px #fff;
		   			border-radius: 50px;
		   			overflow:hidden;
		   			width: 80px;
		   			height: 80px;
		   		}
		   		
		   		.user-name {
		   			margin: auto;
		   			color:white;
		   			line-height: 1; 
		   			max-width: 90px;
		   			font-size: 16px;
		   			font-weight: 500;
		   			width: 100px; 
		   			overflow: hidden; 
		   			white-space: nowrap; 
		   			text-overflow: ellipsis;
		   		}
		   	}
		   	
		   	.balance-panel {
		   		padding-top: 35px;
			    text-align: right;
			    padding-right: 30px;
			    height: 100%;
			    
			    &:after {
			        right: 5px;
					content: '\e583';
					position: absolute;
				    top: 50%;
				    display: inline-block;
				    font-family: Muiicons;
				    font-size: inherit;
				    font-weight: 600;
				    line-height: 1;
				    color: #fff;
				    text-decoration: none;
				    -webkit-transform: translateY(-50%);
				    transform: translateY(-50%);
				    -webkit-font-smoothing: antialiased;
				}
			    
			    .balance-label {
			    	color: #ffffff;
    				font-size: 15.999999px;
			    }
			    
			    .balance-amount {
			    	display: block;
				    margin-top: -6px;
				    color: #ffffff;
				    font-size: 45.8666638px;
			    }
		   	}
		}
		
		.item {
			
			.item-icon {
				
				&.my-profit {
					color: red;
				}
			
				&.message {
					color: #ff9900;
				}
				
				&.password {
					color: #0000ff;
				}
			}
			
			.item-content {
				width: 40%;
			    height: 44px;
			    white-space: nowrap;
			    float: left;
			    font-size: 16px;
			    line-height: 44px;
			    box-sizing: border-box;
			}
		}
		
		.button-panel {
			padding: 0 10px;
    		margin-top: 40px;
		}
	}
</style>