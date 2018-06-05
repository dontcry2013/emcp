<template>
	<div data-page="my-details">
		<div class="page-content">
			<div class="contents" v-if="myContent!=undefined">
				<h1>{{myContent.tstTitle}}</h1>
				<!-- <div style="margin-top:15px;">{{ myContent.tstDescribe }}</div> -->
				<div style="margin-top:15px;" v-html="myContent.tstDescribe"></div>
				<div v-if="myContent.tstUrl"><a @tap.stop.prevent="openAnother">task url</a></div>
			</div>
			<div class="ending" v-if="myContent!=undefined">
				<div><span>created by:</span> {{ myContent.createName }}</div>
				{{ myContent.createDate }}
			</div>
		</div>
	</div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
	computed: {
		...mapGetters(['taskList', 'getLastIndex']),
		myContent(){
			if(!this.$route.params.content){
				return this.taskList[this.getLastIndex];
			}
			return this.$route.params.content;
		},
		taskUrl(){
			return app.Config.webapiDomain + this.myContent.tstUrl;
		}
	},
	data() {
		return {};
	},
	mounted(){
		this.$store.dispatch("updateNavbarTitle", this.$t('component.taskDetail'));
	},
	methods: {
		openAnother(){
			if(!app.Config.isApp){
				app.mui.toast("请在手机中查看")
			}else{
				// plus.webview.open(this.taskUrl);
				this.$router.push({name: "webview", params:{url: this.taskUrl}});
			}
		}
	}
}
</script>
<style lang="less" scoped>
	[data-page='my-details'] {
		.contents {    
			overflow-x: hidden;
			padding: 20px;
		}
		
		.ending {
			font-size: 10px;
			color: gray;
		    text-align: right;
		    padding: 20px;
		}
	}
</style>