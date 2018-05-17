<template>
	<div data-page="my-department">
		<ul id="demo">
		  <treeView
		    class="item"
		    :model="treeData">
		  </treeView>
		</ul>
	</div>
</template>

<script>
import treeView from '../../components/item.vue'
export default {
	components:{
		treeView
	},
	computed: {

	},
	data() {
		return {
			treeData:{
			  name: 'My Tree',
			  children: [
			    { name: 'hello' },
			    { name: 'wat' },
			    {
			      name: 'child folder',
			      children: [
			        {
			          name: 'child folder',
			          children: [
			            { name: 'hello' },
			            { name: 'wat' }
			          ]
			        },
			        { name: 'hello' },
			        { name: 'wat' },
			        {
			          name: 'child folder',
			          children: [
			            { name: 'hello' },
			            { name: 'wat' }
			          ]
			        }
			      ]
			    }
			  ]
			}
		};
	},
	mounted(){
		this.$store.dispatch("updateNavbarTitle", this.$t('home.structure'));

	},
	methods: {
		
	}
}
</script>
<style lang="less" scoped>
	[data-page='my-department'] {
		overflow-x: hidden;
		padding: 20px;
	    


	}
</style>