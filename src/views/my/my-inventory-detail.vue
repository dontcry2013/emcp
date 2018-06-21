<template>
	<div data-page="my-inventory-detail">
		<div class="page-content">
			<div class="imgholder" v-if="myContent&&myContent.photo" v-bind:style="{ 'background-image': 'url(' + myContent.photo + ')' }"></div>
			<div class="contents" v-if="myContent">
				<h2>{{ myContent.tfiName }}</h2>

				<table>
					<tr>
						<td class="card-title">item number:</td>
						<td class="card-subtitle">{{ myContent.tfiNo }}</td>
					</tr>
					<tr>
						<td class="card-title">item type:</td>
						<td class="card-subtitle">{{ myContent.tfiType }}</td>
					</tr>
					<tr>
						<td class="card-title">item unit:</td>
						<td class="card-subtitle">{{ myContent.tfiUnit }}</td>
					</tr>
					<tr>
						<td class="card-title">item available:</td>
						<td class="card-subtitle">{{ myContent.tfiMountAble }}</td>
					</tr>
					<tr>
						<td class="card-title">item price:</td>
						<td class="card-subtitle">{{ myContent.tfiFigure }}</td>
					</tr>
					<tr>
						<td class="card-title">store name:</td>
						<td class="card-subtitle">{{ myContent.tFStore.tfsStoreshortname }}</td>
					</tr>
					<tr>
						<td class="card-title">creator email:</td>
						<td class="card-subtitle">{{ myContent.createBy }}</td>
					</tr>
				</table>
			</div>
			<div class="ending" v-if="myContent!=undefined">
				<div>
					<span>created by:</span> {{ myContent.createName }}
				</div>
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
			margin: 0 auto;
		    background-position: center center;
		    background-size: cover;
		    background-repeat: no-repeat;
		    width: 100%;
		    height: 300px;
		}
		table {
		    font-family: arial, sans-serif;
		    border-collapse: collapse;
		    width: 100%;
		}
		.card-title{
			color: #999;
		}
		.card-subtitle{
			color: #333;
		}
		.contents {    
			overflow-x: hidden;
			padding: 20px;
		}
		
		.ending {
			font-size: 10px;
			color: gray;
		    text-align: right;
		    padding: 0 44px 65px;
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