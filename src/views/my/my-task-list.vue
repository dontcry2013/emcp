<template>		
	<div data-page="my-task-list" id="id-my-task-list" class="mui-content">
		<div class="mui-scroll" >
			<ul class="mui-table-view mui-table-view-chevron">
				<!-- <li class="mui-table-view-cell mui-media" v-for="(item, index) in taskList" @tap.stop.prevent="gotoDetails(index)">
				    <a class="mui-navigate-right">
						<div class="item-date">{{ item.createDate }}</div>
						<div class="mui-media-body">
							{{ item.tstTitle }}
							<p class="mui-ellipsis">{{ item.tstDescribe }}</p>
						</div>
						<span v-if="checkIfNew" class="mui-badge mui-badge-danger">新</span>
					</a>
				</li> -->


				<li style="text-align: center;" v-for="(item, index) in taskList" @tap.stop.prevent="gotoDetails(index)">
					<div class="clsCreateDate">{{ item.createDate | formatdate }}</div>
					<div class="mui-card">
						<div class="cardhead mui-card-header">{{ item.tstTitle }}</div>
						<!-- <div class="mui-card-content">{{ item.tstDescribe }}</div> -->
						<div class="cardcontent" v-html="item.tstDescribe"></div>
						<div style="color: #48a5f3" class="mui-card-footer">点击进入查看</div>
					</div>
				</li>
			</ul>
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
		this.$store.dispatch("updateNavbarTitle", this.$t('home.taskList'));
		app.mui.ready(function(){
			app.mui("#id-my-task-list").pullRefresh({
				down : {
					"height": 100, //可选.默认50.触发上拉加载拖动距离
					"range":'200px',
			      	callback : function(){
			      		var self = this;
			        	_this.tabDown(self);
			      	}
			    },
              	up: {
	                height: 100, //可选.默认50.触发上拉加载拖动距离
	                auto: _this.taskList && _this.taskList.length>0 ? false : true, //可选,默认false.自动上拉加载一次
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
		...mapGetters(['taskList']),
	},
    beforeRouteEnter: function(to, from, next) {
		next();
		return true;
	},
	methods: {
		tabDown:function(self){
	        this.$store.dispatch('updateTaskList', self);
		},

		tabUp:function(self){
	        this.$store.dispatch('getTaskList', self);
		},

		gotoDetails(idx){
			if(typeof idx === "number"){
				this.$store.dispatch('updateLastIndex', idx)
				this.$router.push({name: "myDetails", params: { content: this.taskList[idx] }});
			} else{
				this.$router.push({name: "myDetails"});
			}
		}, 

	}
}
</script>
<style lang="less" scoped>
	[data-page='my-task-list'] {
		.item-date {
			font-size: 10px;
			color: gray;
		}
		.clsCreateDate{
			padding: 2px 8px;
			display: inline-block;
			background-color: lightgray;
			margin-top: 10px;
			border-radius: 5px;
			color: white;
		}
		.cardcontent{
			height: 140px;
			text-align: left;
			padding: 15px;
			background-image: url("../../imgs/test/yuantiao.jpg");
			vertical-align: middle;
		}
		.cardhead{
			font-weight: bold;
		    color: cornflowerblue;
		}
	}
</style>