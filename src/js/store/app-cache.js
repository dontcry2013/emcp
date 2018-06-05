export default {
  state: {
    products: {},
  },
  mutations: {
    get_product: function (state, products) {
        //商品列表
        state.products = products;
        for(let i = 0; i < state.products.length; i++){
            if(state.products[i]['image'] != null){
                this.commit('imgCache', state.products[i]);
            }else{
                state.products[i]['image'] = require("../../imgs/loading.gif");
            }
        }
    },
    /*imgCache: function (state, obj) {
        mui.plusReady(function(){
            // 1. 转换网络图片地址为本地缓存图片路径，判断该图片是否存在本地缓存
            // http://...jpg -> md5 
            // 缓存目录 _downloads/image/(md5).jpg
            // let image_url           = imgObj.image;
            // let image_md5           = md5(image_url);
            // let image_md5 = imgObj.id

            // 缓存本地图片url
            let local_image_url     = '_downloads/image/'+obj.id+'.jpg';
            // 平台绝对路径
            let absolute_image_path = plus.io.convertLocalFileSystemURL(local_image_url);
            console.log("平台绝对路径:" + absolute_image_path);
            // 判断本地是否存在该文件，存在就就直接使用，否则就下载
            plus.io.resolveLocalFileSystemURL( absolute_image_path, function( entry ) {
                if(entry){
                    obj.image = plus.io.convertLocalFileSystemURL(local_image_url);
                }else{
                    app.utils.download_img(image_url, local_image_url, function(u){
                        obj.image = u;
                    });
                }
            }, function ( e ) {
                console.log("Resolve file URL failed: ");
                app.utils.download_img(image_url, local_image_url, function(u){
                    obj.image = u;
                });
            } );       
        });
    }*/
  },
  actions: {

  }
}