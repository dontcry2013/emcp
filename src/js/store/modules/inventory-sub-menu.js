const state = {
	data: null,
}

const actions = {

	getInventorySubMenu: function({state, commit}){
		var param = {
			method:"GET",
			success:function(ret){
	    		if(ret.data && ret.data.length > 0){
	    			commit("set_inventory_sub_menu", ret.data[0]);
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
			}
		};

		app.utils.fetch(app.Config.webapiDomain + "rest/tFInventorySubController/", param)		
	},

}

const getters = {
	inventorySubMenu: function(state){
		return state.data;
	},
}

const mutations = {
	set_inventory_sub_menu: function(state, data){
		state.data = data;
	}
}
module.exports = {state, getters, actions, mutations}