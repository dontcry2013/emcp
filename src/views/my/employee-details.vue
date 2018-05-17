<template>
	<div data-page="message-details">
		<div class="page-content">
			<div class="contents" v-if="myContent!=undefined">
				<!-- <h1>{{ myContent.lastName }} {{ myContent.firstName }}</h1>
				<div>{{ myContent.realName }}</div>
				<div>{{ myContent.id }}</div>
				<div>{{ myContent.email }}</div>
				<div>{{ myContent.skypeUsername }}</div>
				<div>{{ myContent.idNumber }}</div>
				<div>{{ myContent.ethnicGroup }}</div>
				<div>{{ myContent.placeOfBirth }}</div>
				<div>{{ myContent.homeAddress }}</div>
				<div>{{ myContent.emergencyContactPerson }}</div>
				<div>{{ myContent.emergencyContactRelation }}</div>
				<div>{{ myContent.emergencyContactPhone }}</div>
				<div>{{ myContent.passportNumber }}</div>
				<div>{{ myContent.mobilePhone }}</div>
				<div>{{ myContent.userName }}</div>
				<div>{{ myContent.userKey }}</div> -->


				<div><label for="">用户名:</label> {{ myContent.lastName }} {{ myContent.firstName }}</div>
				<div><label for="">登录名/邮箱:</label> {{ myContent.userName }}</div>
				<div><label for="">岗位:</label> {{ myContent.userKey }}</div>
				<div><label for="">国家:</label> {{ myContent.regionId }}</div>
				<div><label for="">Skype账号:</label> {{ myContent.skypeUsername }}</div>
				<div><label for="">微信账号:</label> {{ myContent.weixin }}</div>

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
		this.$store.dispatch("updateNavbarTitle", this.$t('component.employeeDetail'));
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