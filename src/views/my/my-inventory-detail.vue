<template>
	<div data-page="my-inventory-detail">
		<div class="page-content">
	<!-- 		<div class="contents">
				小时候，总以为感情会是一场执子之手，白头偕老的约定。长大了，才知道每一段旅行的同路人，都只能走一小段，也只有多年之后回头，相视一笑，点点头
			</div>
			<div class="ending">
				2017-02-23 16:20
			</div> -->

			<div class="imgholder" v-if="myContent!=undefined">
				<img v-if="myContent.photo" :src="myContent.photo">
			</div>
			<div class="contents" v-if="myContent!=undefined">
				<p class="mui-ellipsis">
					<span>item name:</span> {{ myContent.tfiName }}
				</p>
				<p class="mui-ellipsis">
					<span>item number:</span> {{ myContent.tfiNo }}
				</p>
				<p class="mui-ellipsis">
					<span>item type:</span> {{ myContent.tfiType }}
				</p>
				<p class="mui-ellipsis">
					<span>item unit:</span> {{ myContent.tfiUnit }}
				</p>
				<p class="mui-ellipsis">
					<span>item available:</span> {{ myContent.tfiMountAble }}
				</p>
				<p class="mui-ellipsis">
					<span>item price:</span> {{ myContent.tfiFigure }}
				</p>
				<p class="mui-ellipsis">
					<span>store name:</span> {{ myContent.tFStore.tfsStoreshortname }}
				</p>
				<p class="mui-ellipsis">
					<span>creator email:</span> {{ myContent.createBy }}
				</p>
			</div>
			<div class="ending" v-if="myContent!=undefined">
				<div><span>created by:</span> {{ myContent.createName }}</div>
				{{ myContent.createDate }}
			</div>
			
			<footer>
				<div class="fbt" @tap.stop.prevent="uploadImg">{{ $t("component.imgUpload") }}</div>
			</footer>

		</div>
	</div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
	computed: {
		...mapGetters(['inventoryList', 'inventoryLastIndex']),

		photourl : function(){
			if(this.myContent && this.myContent.photo){
				return app.Config.webapiDomain + this.myContent.photo;
			} else{
				return null;
			}
		},
	},
	data() {
		return {
			myContent: null,
		};
	},
	mounted(){
		this.$store.dispatch("updateNavbarTitle", this.$t('component.inventoryDetail'));
		
		if(this.$route.params.content){
			this.myContent = this.$route.params.content;
		} else if(typeof this.inventoryLastIndex == 'number' && this.inventoryLastIndex >= 0){
			this.myContent = this.inventoryList[this.inventoryLastIndex];
		}			

		console.log("detail的photo"+JSON.stringify(this.myContent))
	},
	methods: {
		uploadImg(){
			this.$router.push({name: "myUpload", params:{id: this.myContent.id}});
		}
	}
}
</script>
<style lang="less" scoped>
	[data-page='my-inventory-detail'] {
		.imgholder {
			img {
				width: 100%
			}
		}
		.contents {    
			overflow-x: hidden;
			padding: 20px;
		}
		
		.ending {
			font-size: 10px;
			color: gray;
		    text-align: right;
		    padding: 44px;
		}

		footer {
			width: 100%;
			line-height: 44px;
			height: 44px;
			position: fixed;
			bottom: 0px;
			text-align: center;
			color: #FFF;
			z-index: 999999;

			.fbt {
				width: 100%;
				height: 100%;
				background-color: #FFCC33;
				float: left;
			}
			.fbt:active {
			  	-webkit-box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.5);
				box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.5);
			}
		}
	}
</style>