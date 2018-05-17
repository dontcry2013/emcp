<template>
	<div data-page="my-inventory-detail">
		<div class="page-content">
	<!-- 		<div class="contents">
				小时候，总以为感情会是一场执子之手，白头偕老的约定。长大了，才知道每一段旅行的同路人，都只能走一小段，也只有多年之后回头，相视一笑，点点头
			</div>
			<div class="ending">
				2017-02-23 16:20
			</div> -->

			<div class="contents" v-if="myContent!=undefined">
				<p class="mui-ellipsis">
					<span>id:</span> {{ myContent.id }}
				</p><p class="mui-ellipsis">
					<span>create name:</span> {{ myContent.tfstore.createName }}
				</p>
				<p class="mui-ellipsis">
					<span>user name:</span> {{ myContent.tfstore.tfsUsername }}
				</p>
				<p class="mui-ellipsis">
					<span>store address:</span> {{ myContent.tfstore.tfsStoreaddress }}
				</p>
				<p class="mui-ellipsis">
					<span>store level:</span> {{ myContent.tfstore.tfsStorelevelname }}
				</p>
				<p class="mui-ellipsis">
					<span>create by:</span> {{ myContent.tfstore.createBy }}
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
		myContent(){
			console.log(this.inventoryLastIndex);
			if(this.$route.params.content){
				return this.$route.params.content;
			} else if(this.inventoryLastIndex){
				return this.inventoryList[this.inventoryLastIndex];
			}
			
		},
	},
	data() {
		return {};
	},
	mounted(){
		this.$store.dispatch("updateNavbarTitle", this.$t('component.inventoryDetail'));
	},
	methods: {
		uploadImg(){
			this.$router.push({name: "myUpload", id: this.myContent.id});
		}
	}
}
</script>
<style lang="less" scoped>
	[data-page='my-inventory-detail'] {
		.contents {    
			overflow-x: hidden;
			padding: 20px;
		}
		
		.ending {
			font-size: 10px;
			color: gray;
		    text-align: right;
		    padding: 20px;
		}

		footer {
			width: 100%;
			line-height: 44px;
			height: 44px;
			position: absolute;
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