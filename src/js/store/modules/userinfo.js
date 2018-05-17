const state = {
	profile: null,
}

const actions = {
	getUserInfo({commit, state}){
		var username = app.globalService.getLoginUserInfo().usernameOrEmailAddress;
		if(!username){
			console.error("没用用户名");
			return;
		}
		var param = {
			data:{
				"from": "0", 
				"to": "1000",
				"userName": username,
			},
			success:function(ret){
				commit("updateProfile", ret.data);
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
		commit("com_loading_status", true);
		app.utils.fetch(app.Config.webapiDomain + "rest/userController/", param);
	},

}

const getters = {
	profile: state => state.profile,
}

const mutations = {
	updateProfile(state, profile){
		state.profile = profile;
	},
}

export default {
	state,
	actions,
	getters,
	mutations	
}