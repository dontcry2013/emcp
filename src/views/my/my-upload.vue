<template>
	<div data-page="my-upload">
		<div id="dcontent" class="dcontent">
			<p class="heading">上传文件列表：</p>
			<ul id="files" style="text-align:center;">
				<p v-if="isEmpty" id="empty" style="font-size:12px;color:#C6C6C6;">无上传文件</p>
				<li v-for="fName in fileNameList">{{fName}}</li>
			</ul>
			<table style="width:100%;">
				<tbody>
					<tr>
						<td style="width:40%"><div class="button button-select" @tap.stop.prevent="appendByCamera()">拍照</div></td>
						<td style="width:40%"><div class="button button-select" @tap.stop.prevent="appendByGallery()">相册选取</div></td>
					</tr>
				</tbody>
			</table>
			<br/>
			<div class="button" @tap.stop.prevent="upload()">上 传</div>
			<br/>
		</div>
		<div id="output" scrollTop="1">
			{{ msg }}
		</div>
	</div>
</template>
<script>
	// var server="http://10.0.0.112:8089/mupload.php";
	// var server= "http://10.0.0.112:8080/maven-web-demo/rest/commonController";
	module.exports = {
		data: function(){
			return {
				"index": 1,
				"msg": "Uploader用于管理文件的上传，用于从本地上传各种文件到网络服务器，支持跨域访问操作。",
				"isEmpty": true,
				"fileNameList": [],
				"files": [],
				// "server": app.Config.webapiDomain + "rest/commonController",
				"server": app.Config.webapiDomain + "rest/tFInventoryController",
				"id": this.$route.params.id,
			}
		},
		beforeDestroy: function(){
		  	
		},
		mounted: function(){
			console.log("id是" + this.$route.params.id);
		},
		methods: {
			// 拍照添加文件
			appendByCamera(){
				if(!app.Config.isApp){
	        		app.mui.toast("只能在app环境中扫码!");
	        		return;
	        	}
				plus.camera.getCamera().captureImage(function(p){
					this.appendFile(p);
				}.bind(this));	
			},
			// 从相册添加文件
			appendByGallery(){
				if(!app.Config.isApp){
	        		app.mui.toast("只能在app环境中扫码!");
	        		return;
	        	}
				plus.gallery.pick(function(p){
			        this.appendFile(p);
			    }.bind(this));
			},
			// 添加文件
			appendFile(p){
				console.log("路径是", p);
				var n=p.substr(p.lastIndexOf('/')+1);
				this.fileNameList.push(n);
				this.files.push({name:"uploadkey"+this.index,path:p});
				this.index++;
				this.isEmpty = false;
			},
			// 产生一个随机数
			getUid(){
				return Math.floor(Math.random()*100000000+10000000).toString();
			},
			// 上传文件
			upload(){
				console.log("文件上传了哦。。。");
				if(!app.Config.isApp){
	        		app.mui.toast("只能在app环境中扫码!");
	        		return;
	        	}
				if(this.files.length<=0){
					plus.nativeUI.alert("没有添加上传文件！");
					return;
				}
				this.msg = "开始上传：";
				var wt=plus.nativeUI.showWaiting();
				var task=plus.uploader.createUpload(this.server,
					{method:"POST"},
					function(t,status){ //上传完成
						console.log(status, t.responseText);
						if(status==200){
							wt.close();
							this.msg = "上传成功："+t.responseText;
							plus.storage.setItem("uploader",t.responseText);
						}else{
							this.msg = "上传失败："+status;
							wt.close();
						}
					}.bind(this)
				);
				task.setRequestHeader("X-AUTH-TOKEN", app.globalService.getLoginUserInfo().token);
				task.addData("uid",this.getUid());
				// task.addData("id", "40288c976351f33001635229444b0025");
				task.addData("id", this.id);
				for(var i=0;i<this.files.length;i++){
					var f=this.files[i];
					task.addFile(f.path,{key:f.name});
				}
				task.start();
			}

		}
	}
</script>
<style lang="less">
	[data-page="my-upload"] {
		margin: 0;
		padding: 0;
		width: 100%;
		height: 100%;
		font-family: Arial;
		font-size:16px;
		color: #6c6c6c;
		-webkit-touch-callout:none;
		-webkit-tap-highlight-color:rgba(0,0,0,0);
		-webkit-text-size-adjust:none;

		.heading {
			margin:0 1em;
			text-align:left;
		}
		.dcontent {
			text-align: center;
			padding-top: 14px;
			padding-bottom: 80px;
		}
		.button {
			font-size: 18px;
			font-weight: normal;
			text-decoration: none;
			display: block;
			text-align: center;
			overflow:hidden;
			text-overflow:ellipsis;
			white-space:nowrap;
			color: #FFF;
			background-color: #FFCC33;
			border: 1px solid #ECB100;
			padding: .5em 0em;
			margin: .5em .7em;
			-webkit-border-radius: 5px;
			border-radius: 5px;
		}
		.button:active {
			outline: 0;
		  	-webkit-box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
			box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
		}
		.button-waring {
			color: #666;
			background-color: #ebebeb;
			border-color: #e0e0e0;
		}
		.button-select {
			font-size: 14px;
			background-color: #CCCCCC;
			border: 0;
			-webkit-border-radius: 2px;
			border-radius: 2px;
		}
		#output {
			height: 164px;
			position: fixed;
			left: 0;
			right: 0;
			bottom: 0;
			color: #f00;
			background: #FFF;
			font-size: 12px;
			line-height: 16px;
			word-break: break-all;
			z-index: 6666;
			padding: 8px 16px;
			overflow-x: hidden;
			overflow-y: scroll;
			border-top: 2px solid #AAA;
			-webkit-overflow-scrolling: touch;
		}
	}
</style>