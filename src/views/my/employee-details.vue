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


				

				<div class="mui-card">
					<div class="mui-card-header mui-card-media">
						<img :src="logoImg">
						<div class="mui-media-body" style="line-height: 34px">
							{{ myContent.lastName }} {{ myContent.firstName }}
						</div>
					</div>
					<div class="mui-card-content records">
						<div class="record-item"><label for="">用户名:</label> {{ myContent.lastName }} {{ myContent.firstName }}</div>
						<div class="record-item"><label for="">登录名/邮箱:</label> {{ myContent.userName }}</div>
						<div class="record-item"><label for="">岗位:</label> {{ myContent.userKey }}</div>
						<div class="record-item"><label for="">国家:</label> {{ countryName }}</div>
						<div class="record-item"><label for="">Skype账号:</label> {{ myContent.skypeUsername }}</div>
						<div class="record-item"><label for="">手机号:</label> {{ myContent.mobilePhone }}</div>
						<div class="record-item"><label for="">微信账号:</label> {{ myContent.weixin }}</div>
					</div>
					<div class="mui-card-footer">{{ myContent.createDate }}</div>
				</div>

			</div>
			<!-- <div class="ending" v-if="myContent!=undefined">
				{{ myContent.createDate }}
			</div> -->
		</div>
	</div>
</template>
<script>
import logoImg from "../../../logo/logo.png"
export default {
	computed: {
		myContent(){
			console.log(this.$route.params.content);
			return this.$route.params.content;	
		},
		countryName(){
			let name = null;
			if(!this.myContent){
				return name;
			}
			switch(this.myContent.regionId){
				case "1":
				name = "中国";
				break;
				case "2":
				name = "澳大利亚";
				break;
				default:
				name = "其他";
			}
			return name;
		},
	},
	data() {
		return {
			logoImg,
		};
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
		.records {
			padding: 10px;
		}
		.record-item {
			padding: 2px;
		}

	}
</style>