const state = {
	inventoryList: [],
	inventoryRange: {
		from: 0,
		limit: 10
	},
	inventoryLastIndex: null,
}

const actions = {
	getInventoryList({commit, state}, pull){
		if(state.inventoryList.length != 0){
			commit("set_inventory_range");
		}

		var param = {
			data:{
				"from": state.inventoryRange.from.toString(), 
				"to": (state.inventoryRange.from + state.inventoryRange.limit).toString()
			},
			success:function(ret){
				commit("set_inventory_list", ret.data);
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

		app.utils.fetch(app.Config.webapiDomain + "rest/tFInventoryController/", param)
	},

	updateInventoryList({commit, state}, pull){
		var param = {
			data:{
				"from": "0", 
				"to": state.inventoryRange.limit.toString()
			},
			success:function(ret){
				var temp = ret.data.filter(function(itm, pos){
	    			for (var i = 0; i < state.inventoryList.length; i++) {
						if(state.inventoryList[i].id == itm.id){
							return false;
						}
					}
					return true;
	    		});
	    		if(temp.length > 0){
	    			commit("set_inventory_list", temp.concat(state.inventoryList));
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

		app.utils.fetch(app.Config.webapiDomain + "rest/tFInventoryController/", param)
	},

	updateInventoryLastIndex({commit, state}, idx){
		commit("set_inventory_last_index", idx);
	},
}

const getters = {
	inventoryList: state => state.inventoryList,
	inventoryLastIndex: state => state.inventoryLastIndex,
}

const mutations = {
	set_inventory_list(state, data){
		state.inventoryList = state.inventoryList.concat(data);
	},
	set_inventory_range(state){
		state.inventoryRange.from += state.inventoryRange.limit;
	},
	set_inventory_last_index(state, last){
		state.inventoryLastIndex = last;
	}
}

export default {
	state,
	actions,
	getters,
	mutations	
}