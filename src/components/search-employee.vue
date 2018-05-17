<template>
	<div class="seach-employee">
		<input v-model="searchText" @input="update" type="text" placeholder="edit me">
		<div>
			<label for="id-user">用户名</label>
			<input id="id-user" type="radio" value="userName" v-model="picked" name="con">
			<label for="id-dept">部门</label>
			<input id="id-dept" type="radio" value="orgIds" v-model="picked" name="con">

		
		</div>
	</div>
	
</template>

<script>
	import { mapGetters, mapActions } from 'vuex'
	import debounce from 'lodash.debounce'
	export default{
		data(){
			return {
				picked: "",
				searchText: "",
			}
		},
		computed:{
			...mapGetters(['employeeList', 'getPicked', 'getSearchText']),
		},
		mounted(){
			this.picked = this.getPicked;
			this.searchText = this.getSearchText;
		},
		watch:{
			picked(val, oldVal){
				this.updatePicked(val);
			}
		},
		methods:{
			update: debounce(function (e) {
		      	this.updateSearchText(e.target.value);
		      	this.searchEmployee();
		    }, 1000),

			...mapActions(['updatePicked', 'updateSearchText', 'searchEmployee']),
		}
	}
</script>
<style scoped>
	.seach-employee {
	    z-index: 2001;
	    width: 100%;
	    height: 10%;
	    text-align: center;
	    color:#999;
	    background: rgba(255,255,255,1);
	    padding: 5px;
	}
	[type="button"]{
	    /*margin-bottom: 5px;*/
	}
</style>