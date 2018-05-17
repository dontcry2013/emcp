<template>
	<div data-page="message-details">
		<div class="page-content">
			<div class="contents" v-if="myContent!=undefined">
				<div v-html="myContent.tfnContent"></div>
			</div>
			<div class="ending" v-if="myContent!=undefined">
				{{ myContent.createDate }}
			</div>
		</div>
	</div>
</template>
<script>
export default {
	computed: {
		myContent(){
			console.log(this.$route.params.content);

			return this.$route.params.content;	
			
			
		}
	},
	data() {
		return {};
	},
	mounted(){
		this.$store.dispatch("updateNavbarTitle", this.$t('component.messageDetail'));
	},
	methods: {
		
	}
}
</script>
<style lang="less" scoped>
	[data-page='message-details'] {
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
	}
</style>