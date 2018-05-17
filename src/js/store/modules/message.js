const state = {
	messageList: [],
	range: {
		from: 0,
		limit: 2
	}
}

const actions = {
	getMessageList({commit, state}, pull){
		if(state.messageList.length != 0){
			commit("set_message_range");
		}

		var param = {
			data:{
				"from": state.range.from.toString(), 
				"to": (state.range.from + state.range.limit).toString()
			},
			success:function(ret){
				commit("set_message_list", ret.data);
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

		app.utils.fetch(app.Config.webapiDomain + "rest/tFNoticeController/", param)
	},

	updateMessageList({commit, state}, pull){
		var param = {
			data:{
				"from": "0", 
				"to": state.range.limit.toString()
			},
			success:function(ret){
				var temp = ret.data.filter(function(itm, pos){
	    			for (var i = 0; i < state.messageList.length; i++) {
						if(state.messageList[i].id == itm.id){
							return false;
						}
					}
					return true;
	    		});
	    		if(temp.length > 0){
	    			commit("set_message_list", temp.concat(state.messageList));
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

		app.utils.fetch(app.Config.webapiDomain + "rest/tFNoticeController/", param)
	},
}

const getters = {
	messageList: state => state.messageList,
}

const mutations = {
	set_message_list(state, data){
		state.messageList = state.messageList.concat(data);
	},
	set_message_range(state){
		state.range.from += state.range.limit;
	}
}

export default {
	state,
	actions,
	getters,
	mutations	
}