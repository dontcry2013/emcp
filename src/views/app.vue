<template>
	<div class="view">
		<myLoading v-bind:show="loadingState" ></myLoading>
		<header class="mui-bar mui-bar-nav" v-show="$store.state.appData.isShowHead">
			<!--<h1 class="mui-title">{{$store.state.appData.navbarTitle}}</h1>
			<button id='setting' class=" mui-pull-right mui-btn-link">设置</button>-->
			<a class="mui-icon mui-icon-left-nav mui-pull-left" @click.stop.prevent="goBack" v-show="$store.state.appData.isShowBack" ref="myBtn"></a>
			<h1 class="mui-title">{{$store.state.appData.navbarTitle}}</h1>

			<template v-if="inventoryRightIcon">
				<a class="mui-icon mui-icon-camera mui-pull-right" @click.stop.prevent="scanCode"></a>
			</template>
			<template v-else>
				<a class="mui-icon mui-pull-right"></a>	
			</template>
		</header>
		<div class="pages" :class="{'mui-content': $store.state.appData.isShowHead, 'toolbar-fixed': $store.state.appData.isShowFoot}">
			<!-- <transition :name="$store.state.routerStatus.transition"> -->
				<!-- 包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们 -->
				<keep-alive v-if="$route.meta.keepAlive">
					<router-view class="page"></router-view>
				</keep-alive>
                <router-view v-if="! $route.meta.keepAlive" class="page"></router-view>
			<!-- </transition> -->
		</div>
		<!--<footer class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item mui-active" :to="{name: 'home'}" exact>
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-item" :to="{name: 'login'}">
				<span class="mui-icon mui-icon-paperplane"></span>
				<span class="mui-tab-label">我的集客</span>
			</router-link>
			<router-link class="mui-tab-item" :to="{name: 'userCenter'}">
				<span class="mui-icon mui-icon-person"></span>
				<span class="mui-tab-label">个人中心</span>
			</router-link>
		</footer>-->
		<footer class="toolbar mui-row" v-show="$store.state.appData.isShowFoot">
			<div class="mui-col-xs-4 toolbar-icon">
	            <router-link :to="{name: 'home'}" class="active toolbar-link" exact>
	            	<span class="mui-icon mui-icon-home"></span>
	            	{{ $t("home.frontPage") }}
	            </router-link>
	        </div>
	        <div class="mui-col-xs-4 toolbar-icon">
	            <router-link :to="{name: 'myCustomerGathers'}" class="toolbar-link">
	            	<span class="mui-icon mui-icon-paperplane"></span>
	            	我的集客
	            </router-link>
	        </div>
	        <div class="mui-col-xs-4 toolbar-icon">
	            <router-link :to="{name: 'userCenter'}" class="toolbar-link">
	            	<span class="mui-icon mui-icon-person"></span>
	            	{{ $t("home.profile") }}
	            </router-link>
	        </div>
	        <!--<div class="mui-col-xs-3 toolbar-icon">
	            <router-link :to="{name: 'register'}" class="toolbar-link">
	            	<span class="mui-icon mui-icon-weixin"></span>
	            	注册
	            </router-link>
	        </div>-->
		</footer>
	</div>
</template>
<script>
	import '../css/mui.css'
	import '../css/icons-extra.css'
	import "../less/app.less" //加载公共样式
	import appRouters from "../js/components/app-routers"
	import myLoading from '../components/loading.vue'
	import {mapGetters} from "vuex"
	export default {
		data: function() {
			return {};
		},
		components:{
	    	myLoading,
		},
		// 在渲染该组件的对应路由被 confirm 前调用
		// 不！能！获取组件实例 `this`
		// 因为当钩子执行前，组件实例还没被创建
		created() {
			
		},
		mounted(){
			this.initApp();
			setTimeout(function(arg){
				this.$store.dispatch("setLoadingState", arg);
			}.bind(this), 600, false);
		},
		computed: {
			...mapGetters(['loadingState', 'loginState', 'enterPage', 'inventoryRightIcon']),
		},
		watch:{
			loginState: function(val, oldVal){
				console.log("loginState改变了", val, oldVal);
				if(val == false){
					app.globalService.logOut();
					this.$router.push({name: "login"});
				}
			}
		},
		methods: {
			initApp: function() {
				// var siteInfo = app.getSiteLocalStorage();
				// app.mui.toast(JSON.stringify(siteInfo));
				var _this = this;
				var isLogin = app.globalService.isLogin();
				if(!isLogin){
					this.$router.push({name: "login"});
				} else{
					this.$store.dispatch("setLoginState", true);
				}

				if(app.Config.isApp || app.mui.os.plus){
					app.mui.back = function(){ //important! remove embeded back button callback
						return false;
					}
					let ws=plus.webview.currentWebview();
					ws.setStyle({scrollIndicator:'none'});
					plus.key.addEventListener('backbutton',function(event){
						// app.mui.toast(location.hash);
			            if(location.hash=="#/" || location.hash=="#/users/login"){
			            	ws && ws.close();
			            } else{
			             	try{
			             		const elem = _this.$refs.myBtn
			             		if(elem){
			             			elem.click();
			             		} else{
			             			app.mui.toast("the back buttun emlemnt does not exist");
			             		}
			             	} catch(e){
			             		app.mui.toast("throw error-" + e.message);
			             	}
			            }
			            return false;
			        }, false);

				    plus.push.addEventListener( "click", function( msg ) {
				        // 判断是从本地创建还是离线推送的消息
				        switch( msg.payload ) {
				            case "LocalMSG":
				                // app.mui.toast( "点击本地创建消息启动：" );
				                console.log( "点击本地创建消息启动：" );
				            break;
				            default:
				                // app.mui.toast( "点击离线推送消息启动：");
				                console.log( "点击离线推送消息启动：");
				            break;
				        }
				        // plus.ui.alert( msg.content );
				        if(isLogin){
				        	_this.$router.push({name: "myMessageList"});
				        } else{
				        	_this.$router.push({name: "login"});
				        }
				    }, false );
					// 监听在线消息事件
					plus.push.addEventListener( "receive", function( msg ) {
					    if ( msg.aps ) {  // Apple APNS message
				            // app.mui.toast( "接收到在线APNS消息：" );
				            console.log( "接收到在线APNS消息：" );
				        } else {
				            // app.mui.toast( "接收到在线透传消息：" );
				            console.log( "接收到在线透传消息：" );
				        }
				        if(msg){
				        	app.mui.toast(`输出message:'${JSON.stringify(msg)}'`);
				        	console.log(`输出message>>>>>>>>>>>>>>${JSON.stringify(msg)}`);
				        	// app.utils.createLocalPushMsg(1);
			        		// plus.push.createMessage("欢迎使用HTML5+创建本地消息！", "LocalMSG", {cover:false} );
				        }
				        _this.$store.dispatch("updateEnterPage", "myMessageList");
				        _this.$router.push({name: "myMessageList"});
				        
					}, false );
				}

			
				
				//1.检查更新
				if(app.Config.isApp) {
//					app.ajax({
//						url: "http://demo.dcloud.net.cn/test/update/check.php",
//						success(result){
//							if(result !== app.Config.innerVersion){
//								//强制更新
//								app.mui.confirm("您的版本需要更新!", null, ["取消", "去下载"], function(result){
//									if(result.index === 1){
//										require(["../js/utils/update"], function(update){
//											update.updateWgt();
//										});
//									} else {
//										plus.runtime.quit();
//									}
//								});
//							} else if(!app.globalService.getStartFlag()){
//								//2.初始化是否启动欢迎页面
//								_this.$router.push({name: "welcome"});
//							}
//						},
//						error(){
//							if(!app.globalService.getStartFlag()){
//								_this.$router.push({name: "welcome"});
//							}
//						}
//					});
				}
				
				//2.初始化是否启动欢迎页面
				if(!app.globalService.getStartFlag()){
//					this.$router.push({name: "welcome"});   //qinz--
				}
//				require(["../js/utils/site-utils.js", "../css/test.css"], function(utils){
//					console.info("app.vue AMD 加载");
//				});
			},
			//返回按钮
			goBack: function(){
				const _this = this, _goBack = function(){
					appRouters.back(function(routerOptions) {
						if(routerOptions && routerOptions.name) {
							//考虑用replace不恰当，浏览器的返回一样是有问题的
							_this.$router.push(routerOptions);
						} else if(routerOptions && routerOptions.url) {
							window.location.href = routerOptions.url;
						} else {
							_this.$router.push({name: 'home'});
						}
					}, JSON.stringify(_this.$store.state.routerStatus.backConfig)=="{}"?null:_this.$store.state.routerStatus.backConfig);
				}
				if(_this.$store.state.routerStatus.direction != "backing"){
					_this.$store.dispatch("updateDirection", "backing");
				}
				if(_this.$store.state.routerStatus.backConfig && typeof(_this.$store.state.routerStatus.backConfig.callback) === "function"){

					_this.$store.state.routerStatus.backConfig.callback(_goBack);
				} else {
					_goBack();
				}
				return true;
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
		},
	};
</script>