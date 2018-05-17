<template>

		<div data-page="employee-list" id="id-employee-list" class="mui-content">
			<div class="mui-scroll" >
				<searchEmp></searchEmp>
				<ul class="mui-table-view mui-table-view-chevron">
					<li class="mui-table-view-cell mui-media" v-for="(item, index) in items" @tap.stop.prevent="gotoDetails(index)">
					    <a class="mui-navigate-right">
							<div class="item-date">{{ item.createDate }}</div>
							<div class="mui-media-body">
								{{ item.lastName }} {{ item.firstName }}
								<p class="mui-ellipsis">{{ item.email }}</p>
							</div>
							<span v-if="checkIfNew" class="mui-badge mui-badge-danger">新</span>
						</a>
					</li>
				</ul>

			</div>
		</div>
</template>
<script>
var currentPage = 0;
var step = 10;
import	searchEmp from "../../components/search-employee"
import { mapGetters } from 'vuex'
export default {
	components:{
		searchEmp
	},
	data() {
		return {
			items: []
		};
	},
	computed:{
		...mapGetters(['employeeList']),
	},
	watch:{
		employeeList: function(val, oldVal){
			this.items = val;
		}
	},
	created(){
		
	},
	mounted(){
		this.$store.dispatch("updateNavbarTitle", this.$t('home.employeeList'));
		var that = this;
		if(this.employeeList.length == 0){
			this.getMessage({"from": "0", "to": step.toString()}, function(mData){
				that.items = mData;
				that.$store.dispatch("updateEmployees", mData);
			});
		} else {
			this.items = this.employeeList;
		}
		app.mui.ready(function(){
			app.mui("#id-employee-list").pullRefresh({
				down : {
					"height": 100, //可选.默认50.触发上拉加载拖动距离
					"range":'200px',
			      	callback : function(){
			      		var self = this;
			        	that.tabDown(self);
			      	}
			    },
              	up: {
              		"height": 100, //可选.默认50.触发上拉加载拖动距离
	                "auto": false, //可选,默认false.自动上拉加载一次
	                callback: function () {
	                  	var self = this
	                  	that.tabUp(self);
	                }
	            }
			});
		})
	},
    beforeRouteEnter: function(to, from, next) {
		next();
		return true;
	},
	methods: {
		tabDown:function(self){
	        var timeID = setTimeout(function () {
	        	app.mui.toast('timeout');
	          	self.endPulldownToRefresh();
	        }, 6500);

	        var that = this;

	        this.getMessage({"from": "0", "to": step.toString()}, function(mData){
	        	if(mData){
	        		clearTimeout(timeID);
	        		self.endPulldownToRefresh();

	        		var temp = mData.filter(function(itm, pos){
	        			var ret =  true;
	        			for (var i = 0; i < that.employeeList.length; i++) {
        					if(that.employeeList[i].id == itm.id){
        						return false;
        					}
        				}
        				return ret;
	        		});
	        		if(temp.length > 0){
	        			currentPage += step;
	        			mData = temp.concat(that.employeeList);
		        		app.vueApp.$store.dispatch("updateEmployees", mData);
		        		that.items = mData;
	        		}
	        	}
	        });
		},
		tabUp:function(self){
	        var timeID = setTimeout(function () {
	        	app.mui.toast('timeout');
	          	self.endPullupToRefresh()
	        }, 6500);

	        var that = this;

	        this.getMessage({"from": (currentPage+1).toString(), "to": (currentPage+step+1).toString()}, function(mData){
	        	if(mData){
	        		clearTimeout(timeID);
	        		self.endPullupToRefresh()

	        		if(mData.length > 0){
	        			currentPage += step;
	        			mData = that.employeeList.concat(mData);
		        		that.items = mData;
		        		app.vueApp.$store.dispatch("updateEmployees", mData);
	        		}
	        	}
	        });
		},
		gotoDetails(idx){
			if(typeof idx === "number"){
				this.$router.push({name: "employeeDetails", params: { content: this.items[idx] }});
			} else{
				this.$router.push({name: "employeeDetails"});
			}
		}, 

		compare(a,b) {
  			if (a.createDate < b.createDate)
		    	return 1;
		  	if (a.createDate > b.createDate)
		    	return -1;
		  	return 0;
		},

		getMessage(param, cb){
			var _this = this;
			app.mui.ajax({
				type: "post",
				headers: {
					'Content-Type':'application/json',
				},
				url: app.Config.webapiDomain + "rest/userController/",
				data: param,
	            timeout: 20000,
	            showLoading: true, //是否显示加载
	            beforeSend: function(xhr){
	            	var _token = app.globalService.getLoginUserInfo().token;
		        	if(_token){
		                xhr.setRequestHeader("X-AUTH-TOKEN", _token);
		            } else{
		            	console.log("token无效");
		            	app.mui.toast("token无效");
	            		xhr.abort();
	            		_this.$router.push({name: "login"});
	            	}
	            },
				success:function(data){
					console.log("网络数据", data);
					if (data) {
						try{
							var ret = JSON.parse(data);
							console.log("data是", ret.data);
							if(ret.respCode == 0){
								ret.data.sort(_this.compare);
								cb(ret.data);
							} else if(ret.respCode == 1000){
								app.mui.toast(ret.message);
								_this.$router.push({name: "login"});			
							}
						}catch(e){
							app.mui.toast("内部错误！");
							console.log("catch报错", e);
						}
					}
				},
				error:function(xhr,type,errorThrown){
					console.log("异常", JSON.stringify(errorThrown), type);
					app.mui.toast(type);
				},
				complete:function(){

				}
			});
		},
	}
}
</script>
<style lang="less" scoped>
	[data-page='employee-list'] {
		.item-date {
			font-size: 10px;
			color: gray;
		}
	}
</style>