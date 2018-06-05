<template>		
	<div data-page="my-message-list" id="id-message-list" class="mui-content">
		<div class="mui-scroll" >
			<ul class="mui-table-view mui-table-view-chevron">
<!-- 				<li class="mui-table-view-cell mui-media" @tap.stop.prevent="gotoDetails">
					<a class="mui-navigate-right">
						<div class="mui-media-object mui-pull-left item-date">02.14</div>
						<div class="mui-media-body">
							消息一
							<p class="mui-ellipsis">烤炉模式的城，到黄昏，如同打翻的调色盘一般.</p>
						</div>
					</a>
				</li>
				<li class="mui-table-view-cell mui-media">
					<a class="mui-navigate-right" href="javascript:;">
						<div class="mui-media-object mui-pull-left item-date">01.14</div>
						<div class="mui-media-body">
							消息二
							<p class="mui-ellipsis">静静的看这个世界，最后终于疯了</p>
						</div>
					</a>
				</li>
				<li class="mui-table-view-cell mui-media">
					<a class="mui-navigate-right">
						<div class="mui-media-object mui-pull-left item-date">01.04</div>
						<div class="mui-media-body">
							消息三
							<p class="mui-ellipsis">能和心爱的人一起睡觉，是件幸福的事情；可是，打呼噜怎么办？</p>
						</div>
					</a>
				</li> -->

				<li class="mui-table-view-cell mui-media" v-for="(item, index) in messageList" @tap.stop.prevent="gotoDetails(index)">
				    <a class="mui-navigate-right">
				    	<div class="mui-media-body" style="display: inline-block;">
				    		<span class="mui-icon mui-icon-flag"></span>
							<span>{{ item.tfnTitle }}</span>
						</div>
						<div class="item-date">{{ item.createDate | formatdate }}</div>
						
						<span v-if="checkIfNew" class="mui-badge mui-badge-danger">新</span>
					</a>
				</li>
			</ul>
			<!-- <div>{{messageList}}</div> -->
		</div>
	</div>	
</template>

<script>
import { mapGetters } from 'vuex'
export default {
	data() {
		return {

		};
	},
	created(){

	},
	mounted(){
		var _this = this;
		this.$store.dispatch("updateNavbarTitle", this.$t('home.messageList'));
		app.mui.ready(function(){
			app.mui("#id-message-list").pullRefresh({
				down : {
			      range:'200px',
			      callback : function(){
			      	var self = this;
			        _this.tabDown(self);
			      }
			    },
              	up: {
	                height: 50, //可选.默认50.触发上拉加载拖动距离
	                auto: _this.messageList && _this.messageList.length>0 ? false : true, //可选,默认false.自动上拉加载一次
	                contentnomore: '已到底了', //可选，请求完毕若没有更多数据时显示的提醒内容；
	                callback: function () {
	                  	var self = this
	                  	_this.tabUp(self);
	                }
	            }
			});
		})
	},
	computed: {
		...mapGetters(['messageList'])
	},
	methods: {
		tabDown:function(self){
	        this.$store.dispatch('updateMessageList', self);
		},

		tabUp:function(self){
	        this.$store.dispatch('getMessageList', self);
		},

		gotoDetails(idx){
			if(typeof idx === "number"){
				this.$router.push({name: "messageDetails", params: { content: this.messageList[idx] }});
			} else{
				this.$router.push({name: "messageDetails"});
			}
		},
	}
}
</script>
<style lang="less" scoped>
	[data-page='my-message-list'] {
		.item-date {
			font-size: 10px;
			color: gray;
		}
	}
</style>