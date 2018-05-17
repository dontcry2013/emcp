const state = {
	employees: [],
	picked: "userName",
	searchText: null
}

const actions = {
	searchEmployee({commit, state}){
		if(!state.picked || !state.searchText){
			app.mui.toast("数值不合法");
			return;
		}
		var param = {
			data:{
				"from": "0", 
				"to": "1000",
			},
			success:function(ret){
				commit("updateEmployees", ret.data);
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
		param.data[state.picked] = state.searchText,
		commit("com_loading_status", true);
		app.utils.fetch(app.Config.webapiDomain + "rest/userController/", param);

	},	
	updateEmployees({commit, state}, employees){
		commit("updateEmployees", employees);
	},
	updatePicked({commit}, picked){
		commit("updatePicked", picked);
	},
	updateSearchText({commit}, searchText){
		commit("updateSearchText", searchText);
	},

}

const getters = {
	employeeList: state => state.employees,
	getPicked: state => state.picked,
	getSearchText: state => state.searchText,
}

const mutations = {
	updateEmployees(state, employees){
		state.employees = employees;
	},
	updatePicked(state, picked){
		state.picked = picked;
	},
	updateSearchText(state, searchText){
		state.searchText = searchText.trim();
	},
}

export default {
	state,
	actions,
	getters,
	mutations	
}