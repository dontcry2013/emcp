<template>
	<div data-component="embededWebview">
		<header class="mui-bar mui-bar-nav">
			<a class="mui-icon mui-icon-left-nav mui-pull-left" @tap.stop.prevent="back"></a>
			<h1 class="mui-title">Webview</h1>
		</header>
	</div>

</template>

<script>
	module.exports = {
		data(){
			return {
				url: this.$route.params.url,
				ws: null,
				embed: null,
			}
		},
		methods:{
			plusReady(){
				this.ws=plus.webview.currentWebview();
				this.createEmbed();
			},
			createEmbed(){
				if(!this.url){
					app.mui.toast("没有链接地址");
					return;
				}
				var topoffset='45px';
				plus.nativeUI.showWaiting('',{style:'black',modal:false,background:'rgba(0,0,0,0)'});
				this.embed=plus.webview.create(this.url,'embed',{top:topoffset,bottom:'0px',position:'dock',dock:'bottom',bounce:'vertical'});
				this.ws.append(this.embed);
				this.embed.addEventListener('loaded',function(){
					plus.nativeUI.closeWaiting();
				},false);
				this.embed.addEventListener('loading',function(){
					plus.nativeUI.showWaiting('',{style:'black',modal:false,background:'rgba(0,0,0,0)'});
				},false);
			},
			back(){
				if(window.plus){
					plus.nativeUI.closeWaiting();
					this.ws.remove(this.embed);
					app.vueApp.goBack();
				}
			},

		},
		mounted(){
			if(window.plus){
				this.plusReady();
			} else{
				app.mui.toast(this.$t("message.appError"))
			}
		},
	}

</script>

<style lang="less" scoped>
	[data-component='embededWebview']{
		#header{
			width: 100%;
			height: 45px;
		}
	}	

</style>