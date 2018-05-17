const state = {
	loadingState: true,
	loginState: true,
}

const actions = {
	setLoadingState({ commit }, status) {
        commit("com_loading_status", status)
    },
    setLoginState({ commit }, status){
		commit("com_login_status", status);
	}
}

const getters = {
	loadingState: state => state.loadingState,
	loginState: state => state.loginState,
}

const mutations = {
	com_loading_status(state, status){
		state.loadingState = status;
	},
	com_login_status(state, status){
		state.loginState = status;
	}
}

export default {
	state,
	actions,
	getters,
	mutations	
}