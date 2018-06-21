const state = {
	inventoryList: [],
	inventoryRange: {
		from: 0,
		limit: 10
	},
	inventoryLastIndex: null,
	inventoryScanned: null,
	inventoryShowRightIcon: null,
	queryOption: null,
	needLoadMore: true,
}

const actions = {
	getInventoryList({commit, state}, pull){
		if(state.inventoryList.length != 0 && state.needLoadMore){
			commit("set_inventory_range");
		}

		var mData = Object.assign({
			"from": state.inventoryRange.from.toString(), 
			"to": (state.inventoryRange.from + state.inventoryRange.limit).toString()
		}, state.queryOption);

		var param = {
			data: mData,
			success:function(ret){
				for(let obj of ret.data){
					if(obj.photo){
						obj.photo = app.Config.webapiDomain + obj.photo;
						commit('getImgUrl', obj);
					}
					if(obj.photoThumb){
						obj.photoThumb = app.Config.webapiDomain + obj.photoThumb;
						commit('getThumbImgUrl', obj);
					}
				}
				commit("concat_inventory_list", ret.data);
				// commit("set_load_more_flag", ret.data.length > 0 ? true : false);
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
				pull && pull.endPullupToRefresh();
			}
		};

		app.utils.fetch(app.Config.webapiDomain + "rest/tFInventoryController/", param)
	},

	updateInventoryList({commit, state}, pull){
		var mData = Object.assign({
			"from": "0", 
			"to": state.inventoryRange.limit.toString()
		}, state.queryOption);

		var param = {
			data: mData,
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
	    			commit("concat_inventory_list", temp.concat(state.inventoryList));
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
				pull && pull.endPulldownToRefresh();
			}
		};

		app.utils.fetch(app.Config.webapiDomain + "rest/tFInventoryController/", param)
	},

	getSubInventoryList({commit, state}, subjectId){
		var param = {
			data:{
				"from": "0", 
				"to": "1000",
				"tfiSubject": subjectId,
			},
			success:function(ret){
				console.log("dfsdfjskdfjslkdfjsldkfjsdl;fjsdfk;jsl");
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
			}
		};

		app.utils.fetch(app.Config.webapiDomain + "rest/tFInventoryController/", param)
	},

	getScanInventory({commit, state}, tfiNo){
		var param = {
			data:{
				"from": "0", 
				"to": "100",
				"tfiNo": tfiNo,
			},
			success:function(ret){
	    		if(ret.data){
	    			commit("set_inventory_scanned", ret.data);
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

		app.utils.fetch(app.Config.webapiDomain + "rest/tFInventoryController/", param)
	},

	setScanInventory({commit, state}, data){
		commit("set_inventory_scanned", data);
	},

	updateInventoryLastIndex({commit, state}, idx){
		commit("set_inventory_last_index", idx);
	},

	updateInventoryRightIconState({commit, state}, status){
		commit("set_inventory_righticon", status);
	},

	resetInventoryRange({commit, state}){
		commit("reset_inventory_range");
	},

	setQueryOption({commit, state}, option){
		commit("set_query_option", option);
	},

	setInventoryList({commit, state}, data){
		commit("set_inventory_list", data);
	},

}

const getters = {
	inventoryList: state => state.inventoryList,
	inventoryLastIndex: state => state.inventoryLastIndex,
	inventoryScanned: state => state.inventoryScanned,
	inventoryRightIcon: state => state.inventoryShowRightIcon,
}

const mutations = {
	set_inventory_list(state, data){
		state.inventoryList = data;
	},
	concat_inventory_list(state, data){
		state.inventoryList = state.inventoryList.concat(data);
	},
	set_inventory_range(state){
		state.inventoryRange.from += state.inventoryRange.limit;
	},
	reset_inventory_range(state){
		state.inventoryRange = {
			from: 0,
			limit: 10
		};
	},
	set_inventory_last_index(state, last){
		state.inventoryLastIndex = last;
	},
	set_inventory_scanned(state, data){
		state.inventoryScanned = data;
	},
	set_inventory_righticon(state, data){
		state.inventoryShowRightIcon = data;
	},
	set_query_option(state, option){
		state.queryOption = option;
	},
	set_load_more_flag(state, flag){
		state.needLoadMore = flag;
	},
	getImgUrl(state, obj){
		app.mui.plusReady(function(){
        	// 判断本地是否存在该文件，存在就就直接使用，否则就下载
        	let local_image_url = '_downloads/image/' + obj.id + '.jpg';
        	plus.io.resolveLocalFileSystemURL(local_image_url, function( entry ) {
	            if(entry){
	                obj.photo = plus.io.convertLocalFileSystemURL(local_image_url);
	                console.log("photo是" + obj.photo);
	            }else{
	            	download_img(obj.photo, local_image_url);
	            	app.utils.download_img(obj.photo, local_image_url, local_photo_str=>obj.photo = local_photo_str);
	            }
	        }, function (error) {
	            console.log(JSON.stringify(error));
	            app.utils.download_img(obj.photo, local_image_url, local_photo_str=>obj.photo = local_photo_str);
	        });
        });
	},
	getThumbImgUrl(state, obj){
		app.mui.plusReady(function(){
        	// 判断本地是否存在该文件，存在就就直接使用，否则就下载
        	let local_thumb_image_url = '_downloads/image/thumb_' + obj.id + '.jpg';
        	plus.io.resolveLocalFileSystemURL(local_thumb_image_url, function( entry ) {
	            if(entry){
	                obj.photoThumb = plus.io.convertLocalFileSystemURL(local_thumb_image_url);
	                console.log("photoThumb是" + obj.photoThumb);
	            }else{
	            	download_img(obj.photoThumb, local_thumb_image_url);
	            	app.utils.download_img(obj.photoThumb, local_thumb_image_url, local_photo_str=>obj.photoThumb = local_photo_str);
	            }
	        }, function (error) {
	            console.log(JSON.stringify(error));
	            app.utils.download_img(obj.photoThumb, local_thumb_image_url, local_photo_str=>obj.photoThumb = local_photo_str);
	        });
        });
	},
}

export default {
	state,
	actions,
	getters,
	mutations	
}