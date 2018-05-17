<template>
	<div data-page="login">
		<div class="page-content">
			<!--<div class="login-input-box">
	            <div class="logo">
	                <p>个人日记</p>
	            </div>
	            <div class="line1">
	                <img src="../../imgs/user.png">
	                <input type="text" class="user" value="" placeholder="用户名">
	            </div>
	            <div class="line2">
	                <img src="../../imgs/lock.png">
	                <input type="text" class="lock" value="" placeholder="密码">
	            </div>
	            <div class="chose">
	                <a data-ajax="false" class="register" data-role="none" data-transition="slide">注册</a>
	                <a href="forget.html" data-ajax="false" class="forgive" data-role="none">忘记密码</a>
	                <a class="login" href="index.html" data-ajax="false" data-role="none" data-transition="slide">登陆</a>
	            </div>
	        </div>-->
			<div class="mui-input-group">
				<div class="mui-input-row">
					<label>{{ $t("login.account") }}</label>
					<input type="text" v-model="usernameOrEmailAddress" class="mui-input-clear mui-input" :placeholder="$t('login.inputAccount')">
				</div>
				<div class="mui-input-row">
					<label>{{ $t("login.password") }}</label>
					<input type="password" v-model="password" class="mui-input-clear mui-input" :placeholder="$t('login.inputPassword')">
				</div>
			</div>
			<!--<form class="mui-input-group">
				<ul class="mui-table-view mui-table-view-chevron">
					<li class="mui-table-view-cell">
						自动登录
						<div id="autoLogin" class="mui-switch">
							<div class="mui-switch-handle"></div>
						</div>
					</li>
				</ul>
			</form>-->
			<div class="mui-content-padded">
				<button class="mui-btn mui-btn-block mui-btn-primary" data-loading-icon-position="right" @tap.stop.prevent="sumbit($event)">{{ $t("login.login") }}</button>
				<div class="link-area">
				<!-- 	<a>{{$t("login.register")}}</a> 
					<span class="spliter">|</span>  -->
					<a>{{$t("login.forgetPassword")}}</a>
				</div>
			</div>
			<div class="mui-content-padded oauth-area"></div>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			usernameOrEmailAddress: "",
            password: "",
		}
	},
	created: function(){
		console.log("登录创建")
	   	this.$store.dispatch("setLoginState", false);
	},
	methods: {
		sumbit(e){
			var _this = this;
			if(!_this.usernameOrEmailAddress){
				app.mui.toast(this.$t('login.inputAccount'));
				return;
			}
			if(!_this.password){
				app.mui.toast(this.$t('login.inputPassword'));
				return;
			}
			app.mui(e.target).button('loading');
			
//			app.globalService.setUserInfo({
//						token: "fdfshdjkfhsjdfhksjkl",
//									tenancyName: "helloworld", 
//									usernameOrEmailAddress: "abc@gmail.com", 
//									expiredTime: "1491709490275"
//					});
//			setTimeout(function(){
//				_this.$router.push({name: "home"});
//			}, 1000);
			
//			app.api.user.login({
//				data: {
//					tenancyName: _this.tenancyName,
//					usernameOrEmailAddress: _this.usernameOrEmailAddress,
//					password: _this.password
//				},
//				success(data){
//					app.globalService.setUserInfo({
//						tenancyName: _this.tenancyName, 
//						token: data.token, 
//						usernameOrEmailAddress: _this.usernameOrEmailAddress, 
//						expiredTime: data.expiredTime
//					});
//					_this.go();
//				},
//				complete(){
//					app.mui(e.target).button('reset');
//				}
//			});

			app.mui.ajax({
				type: "post",
				headers: {
					'Content-Type':'application/json',
//					"Access-Control-Allow-Origin":  "http://localhost:8080",
//					"Access-Control-Allow-Methods": "POST",
//					"Access-Control-Allow-Headers": "Content-Type, Authorization"
				},
				url: app.Config.webapiDomain + "rest/tokens",
				data: {
					userName: _this.usernameOrEmailAddress,
					password: _this.password,
					lang: "en"
				},
				crossDomain: true,
				processData: true, //是否自动处理data数据
	            async: true,
	            timeout: 20000,
	            auth: false, //是否验证当前API接口的登录权限
	            authFailCallbackFun: null, // 验证失败的回调函数
	            successFunData: true, //是否验证成功回调函数的数据
	            showLoading: false, //是否显示加载
				success:function(data){
					console.log("网络数据", data);
					if (data) {
						try{
							var ret = JSON.parse(data);		
							if(ret.respCode == 0){
								console.log("token是", ret.data);

								_this.$store.dispatch("setLoginState", true);
								app.globalService.setUserInfo({
									token: ret.data,
									usernameOrEmailAddress: _this.usernameOrEmailAddress, 
									expiredTime: "1491709490275"
								});
								_this.go();
							}
						}catch(e){
							app.mui.toast(_this.$t('message.internalError'));
							console.log("catch报错", JSON.stringify(e));
						}
					}
				},
				error:function(xhr,type,errorThrown){
					console.log("异常", JSON.stringify(errorThrown), type);
					app.mui.toast(_this.$t('message.internalError'));
				}, 
				complete:function(){
					app.mui(e.target).button('reset');
				}
			});




		},
		
		go: function(){
			const [_this, _toName, _current_query] = [this, this.$route.query.toName, this.$route.query];
			if(_toName){
				delete _current_query.toName;
				this.$router.push({name: _toName, query: _current_query});
			} else {
				this.$router.push({name: "home"});
			}
		}
	}
}
</script>
<style lang="less" scoped>
	[data-page='login'] {
		
		/*background-image: url(../../imgs/login-bg.jpg);
		background-size:100% 100%;
		-moz-background-size:100% 100%;
	   	-webkit-background-size:100% 100%;
	   	-o-background-size:100% 100%;
		
		.login-input-box {
			width: 80%;
		    margin: auto;
		    position: fixed;
		    top: 50%;
		    left: 50%;
		    -webkit-transform: translate(-50%,-50%);
		    -moz-transform: translate(-50%,-50%);
		    transform: translate(-50%,-50%);
		    
		    .logo p {
			    font-size: 2.2rem;
			    text-align: center;
			}
			
			.line1, .line2, .line3 {
			    width: 98%;
			    overflow: hidden;
			    border-bottom: 1px solid #aaa;
			    padding-left: 2%;
			    margin-top: 40px;
			}
			
			.line1 img, .line2 img, .line3 img {
			    float: left;
			    padding-top: 0px;
			}
			
			.user, .lock, .mail {
			    float: left;
			    width: 85%;
			    height: 35px;
			    border: none;
			    padding-left: 3%;
			    line-height: 2.4rem;
			    font-size: 1.2rem;
			    outline: none;
			    color: #4d4d4d;
			    background: none;
			    margin-bottom: 0px;
			}
			
			.line1 {
			    margin-top: 80px;
			}
			
			.register, .forgive{
			    margin-top: 20px;
			    color: #4d4d4d !important;
			    font-weight: normal;
			    padding: 0px 2%;
			}
			.register{
			    float: left;
			}
			.forgive{
			    float: right;
			}
			.chose .login{
			    float: left;
			    margin: 40px 0;
			    width: 100%;
			    font-size: 1.2rem;
			    line-height:2.6rem;
			    text-align: center;
			    color: #4d4d4d!important;
			    background:#e5e5e5;
			    border-radius: 20px;
			}
		}*/
		
		.link-area {
			text-align: center;
		}
	}
</style>