const state = {
	inventoryList: [],
	inventoryRange: {
		from: 0,
		limit: 10
	},
	inventoryLastIndex: null,
	inventoryScanned: null,
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
				for(let obj of ret.data){
					if(obj.photo){
						obj.photo = app.Config.webapiDomain + obj.photo;
						commit('getImgUrl', obj);
					}
				}
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
}

const getters = {
	inventoryList: state => state.inventoryList,
	inventoryLastIndex: state => state.inventoryLastIndex,
	inventoryScanned: state => state.inventoryScanned,
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
	},
	set_inventory_scanned(state, data){
		state.inventoryScanned = data;
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
	            }
	        }, function (error) {
	            console.log(JSON.stringify(error));
	            download_img(obj.photo, local_image_url);
	        });
        	function download_img(image_url, local_image_url){
            	console.log("启动下载" + image_url);
                // filename:下载任务在本地保存的文件路径
                let download_task = plus.downloader.createDownload(image_url, {filename: local_image_url}, function(download, status) {
                    // 下载失败,删除本地临时文件
                    if(status != 200){
                        console.log('下载失败,status'+status);
                        if(local_image_url != null){
                            plus.io.resolveLocalFileSystemURL(local_image_url, function(entry) {
                                entry.remove(function(entry) {
                                    console.log("临时文件删除成功" + local_image_url);
                                    // 重新下载图片
                                    // download_img();
                                }, function(e) {
                                    console.log("临时文件删除失败" + local_image_url);
                                });
                            });
                        }
                    } else{
                        // 把下载成功的图片显示
                        // 将本地URL路径转换成平台绝对路径
                        console.log("下载成功" + local_image_url);
                        obj.photo = plus.io.convertLocalFileSystemURL(local_image_url);
                    }
                });
                download_task.start();
            }
        });
	},
}

export default {
	state,
	actions,
	getters,
	mutations	
}