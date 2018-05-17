const state = {
	taskList: [],
	range: {
		from: 0,
		limit: 10
	},
	lastIndex: null,
}

const actions = {
	getTaskList({commit, state}, pull){
		if(state.taskList.length != 0){
			commit("set_message_range");
		}

		var param = {
			data:{
				"from": state.range.from.toString(), 
				"to": (state.range.from + state.range.limit).toString()
			},
			success:function(ret){
				commit("set_task_list", ret.data);
			},
			failed:function(msg){
				app.mui.toast(msg);
				commit("com_login_status", false);
			},
			error:function(msg){
				app.mui.toast(msg);
			},
			complete:function(){
				commit("com_loading_status", false);
				pull.endPullupToRefresh();
			}
		};

		app.utils.fetch(app.Config.webapiDomain + "rest/tSTaskController/", param)
	},

	updateTaskList({commit, state}, pull){
		var param = {
			data:{
				"from": "0", 
				"to": state.range.limit.toString()
			},
			success:function(ret){
				var temp = ret.data.filter(function(itm, pos){
	    			for (var i = 0; i < state.taskList.length; i++) {
						if(state.taskList[i].id == itm.id){
							return false;
						}
					}
					return true;
	    		});
	    		if(temp.length > 0){
	    			commit("set_task_list", temp.concat(state.taskList));
	    		}
			},
			failed:function(msg){
				app.mui.toast(msg);
				commit("com_login_status", false);
			},
			error:function(msg){
				app.mui.toast(msg);
			},
			complete:function(){
				commit("com_loading_status", false);
				pull.endPulldownToRefresh();
			}
		};

		app.utils.fetch(app.Config.webapiDomain + "rest/tSTaskController/", param)
	},

	updateLastIndex({commit, state}, idx){
		commit("set_last_index", idx);
	},
}

const getters = {
	taskList: state => state.taskList,
	getLastIndex: state => state.lastIndex,
}

const mutations = {
	set_task_list(state, data){
		state.taskList = state.taskList.concat(data);
	},
	set_message_range(state){
		state.range.from += state.range.limit;
	},
	set_last_index(state, last){
		state.lastIndex = last;
	}
}

export default {
	state,
	actions,
	getters,
	mutations	
}