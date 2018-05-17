<template>
	<div class="mui-table-view-cell mui-col-xs-4 not-border-bottom" @click="sendMyEvent"> 
		<span class="mui-icon-extra mui-icon-extra-trend"></span> 
		<div class="mui-media-body">经营数据</div> 
	</div>
</template>

<script>
	
	export default{
		data: function () {
		    return {
		      count: 0
		    }
		  },
	  methods:{
	  	handleMyEvent(){
    		console.log("123");
    		alert("123");

    	},
		sendMyEvent(){
			this.count++
    		console.log(this.count);
    		this.$emit("MyEvent", this.count);
    	},
	  },
	}
</script>