<template>
	<div data-page="my-department">
		  <treeView v-if="treeData"
		    class="item"
		    :model="treeData">
		  </treeView>
	</div>
</template>

<script>
import treeView from '../../components/treeview.vue'
import { mapGetters } from 'vuex'
export default {
	components:{
		treeView
	},
	computed: {
		...mapGetters(["inventorySubMenu"]),
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
			},
		};
	},
	mounted(){
		this.$store.dispatch("updateNavbarTitle", this.$t('home.structure'));
		/*this.treeData = {
			name: "Inventory",
			children:[{"id":"f2f0e84b63384fdc01633873254a0025","name":"办公设备","children":[{"id":"f2f0e84b63384fdc01633876cd05002f","name":"电脑设备","children":[{"id":"f2f0e84b63384fdc01633884a275003d","name":"笔记本电脑","children":[]},{"id":"f2f0e84b63384fdc01633884f99d003f","name":"电脑显示器","children":[]},{"id":"f2f0e84b63384fdc016338858e570041","name":"电脑主机","children":[]},{"id":"f2f0e84b63384fdc01633885e6b40043","name":"移动硬盘","children":[]},{"id":"f2f0e84b63384fdc016343fe395a0251","name":"其他","children":[]}]},{"id":"f2f0e84b63384fdc016338776f3b0031","name":"打印设备","children":[{"id":"f2f0e84b63384fdc016338869d900045","name":"打印机","children":[]},{"id":"f2f0e84b63384fdc01633886f8070047","name":"复印机","children":[]},{"id":"f2f0e84b63384fdc016338874fe50049","name":"扫描仪","children":[]},{"id":"f2f0e84b63384fdc01633887af8b004b","name":"碎纸机","children":[]}]},{"id":"f2f0e84b63384fdc01633877dbbd0033","name":"通信设备","children":[{"id":"f2f0e84b63384fdc0163388839250052","name":"电话机","children":[]},{"id":"f2f0e84b63384fdc01633888975f0055","name":"传真机","children":[]},{"id":"f2f0e84b63384fdc0163388900260057","name":"手机","children":[]}]},{"id":"f2f0e84b63384fdc0163387830050035","name":"影像设备","children":[{"id":"f2f0e84b63384fdc016338898291005a","name":"照相机","children":[]},{"id":"f2f0e84b63384fdc01633889ccc4005c","name":"摄像机","children":[]},{"id":"f2f0e84b63384fdc0163388a24d0005e","name":"投影仪","children":[]}]}]},{"id":"f2f0e84b63384fdc01633873dc710027","name":"电器","children":[{"id":"f2f0e84b63384fdc0163387efa9c003b","name":"家用电器","children":[{"id":"f2f0e84b63384fdc01633891102a0069","name":"电视","children":[]},{"id":"f2f0e84b63384fdc0163389248df006b","name":"空调","children":[]},{"id":"f2f0e84b63384fdc01633892bba4006d","name":"微波炉","children":[]},{"id":"f2f0e84b63384fdc01633892f7f9006f","name":"咖啡机","children":[]},{"id":"f2f0e84b63384fdc016338933c3e0071","name":"饮水机","children":[]},{"id":"f2f0e84b63384fdc016338937cd10073","name":"电风扇","children":[]},{"id":"f2f0e84b63384fdc01633893c6f50075","name":"冰箱","children":[]},{"id":"f2f0e84b63384fdc01633893fbfd0077","name":"洗衣机","children":[]},{"id":"f2f0e84b63384fdc0163389437f70079","name":"电水壶","children":[]},{"id":"f2f0e84b63384fdc016338946fe10080","name":"咖啡壶","children":[]},{"id":"f2f0e84b63384fdc01633894ad5e0082","name":"保温壶","children":[]}]}]},{"id":"f2f0e84b63384fdc01633874adf50029","name":"家具","children":[{"id":"f2f0e84b63384fdc0163387abc880039","name":"家具类","children":[{"id":"f2f0e84b63384fdc0163389576240084","name":"桌子","children":[]},{"id":"f2f0e84b63384fdc01633895bd890086","name":"沙发","children":[]},{"id":"f2f0e84b63384fdc016338961c440088","name":"椅子","children":[]},{"id":"f2f0e84b63384fdc016338965acf008f","name":"柜子","children":[]},{"id":"f2f0e84b63384fdc01633896989a0091","name":"镜子","children":[]},{"id":"f2f0e84b63384fdc01633896f2090093","name":"前台","children":[]},{"id":"f2f0e84b63384fdc016338973fd70095","name":"整体厨房","children":[]},{"id":"f2f0e84b63384fdc0163389786ad0097","name":"员工工位","children":[]}]}]},{"id":"f2f0e84b63384fdc01633874fdd8002b","name":"汽车","children":[{"id":"f2f0e84b63384fdc016338a3c2af00b9","name":"汽车类型","children":[]}]},{"id":"f2f0e84b63384fdc01633898c5ff0099","name":"物资","children":[{"id":"f2f0e84b63384fdc01633899f1b3009d","name":"礼品","children":[{"id":"f2f0e84b63384fdc0163389c809300a1","name":"酒水","children":[]},{"id":"f2f0e84b63384fdc0163389cd86000a3","name":"香烟","children":[]},{"id":"f2f0e84b63384fdc0163389d3e8800a5","name":"茶叶","children":[]}]},{"id":"f2f0e84b63384fdc0163389a4aea009f","name":"工艺品","children":[{"id":"f2f0e84b63384fdc0163389dc90600a7","name":"文玩","children":[]},{"id":"f2f0e84b63384fdc0163389e1d5500a9","name":"字画","children":[]}]}]},{"id":"f2f0e84b63384fdc01633899787c009b","name":"办公用品","children":[{"id":"f2f0e84b63384fdc0163389ee04400ab","name":"文具/耗材","children":[{"id":"f2f0e84b63384fdc016338a609e700bb","name":"纸张","children":[]},{"id":"f2f0e84b63384fdc016338a6605b00bd","name":"笔","children":[]},{"id":"f2f0e84b63384fdc016338a6c29000bf","name":"订书钉","children":[]},{"id":"f2f0e84b63384fdc016338a70a0a00c1","name":"曲别针","children":[]},{"id":"f2f0e84b63384fdc016338a7635e00c3","name":"夹子","children":[]},{"id":"f2f0e84b63384fdc016338a7c11a00c5","name":"文件夹","children":[]},{"id":"f2f0e84b63384fdc016338a82c6400c7","name":"印刷品","children":[]},{"id":"f2f0e84b63384fdc016338a883d600c9","name":"胶棒","children":[]},{"id":"f2f0e84b63384fdc016338a8dd2300cb","name":"尺子","children":[]},{"id":"f2f0e84b63384fdc016338a938ac00cd","name":"修正液","children":[]},{"id":"f2f0e84b63384fdc016338b04a1500cf","name":"橡皮","children":[]},{"id":"f2f0e84b63384fdc016338b0b6f600d1","name":"起钉器","children":[]},{"id":"f2f0e84b63384fdc016338b0f72100d3","name":"转笔刀","children":[]},{"id":"f2f0e84b63384fdc016338b1a88300d5","name":"裁纸刀","children":[]},{"id":"f2f0e84b63384fdc016338b26eae00d7","name":"计算器","children":[]},{"id":"f2f0e84b63384fdc016338b2b7d500d9","name":"订书器","children":[]},{"id":"f2f0e84b63384fdc016338b2fe6300db","name":"硒鼓墨盒","children":[]},{"id":"f2f0e84b63384fdc016338b33a3b00dd","name":"档案盒","children":[]},{"id":"f2f0e84b63384fdc016338b38b1200df","name":"黑板","children":[]},{"id":"f2f0e84b63384fdc016338b3d3e700e1","name":"胶带","children":[]}]},{"id":"f2f0e84b63384fdc0163389f982700ad","name":"电脑/电视配件","children":[{"id":"f2f0e84b63384fdc016338b52c0500e3","name":"接线器（插线板）","children":[]},{"id":"f2f0e84b63384fdc016338b59bbb00e5","name":"鼠标","children":[]},{"id":"f2f0e84b63384fdc016338b5eb1600ec","name":"键盘","children":[]},{"id":"f2f0e84b63384fdc016338b698b500ef","name":"电视支架","children":[]}]},{"id":"f2f0e84b63384fdc0163389fe51e00af","name":"办公用纸","children":[{"id":"f2f0e84b63384fdc016338b7675100f1","name":"A4纸","children":[]},{"id":"f2f0e84b63384fdc016338b7de3e00f3","name":"彩纸","children":[]},{"id":"f2f0e84b63384fdc016338b8510400f5","name":"其他型号纸张","children":[]}]},{"id":"f2f0e84b63384fdc016338a084e800b1","name":"生活用品","children":[{"id":"f2f0e84b63384fdc016338b8da0400f7","name":"湿纸巾","children":[]},{"id":"f2f0e84b63384fdc016338b92e8d00f9","name":"卫生纸","children":[]},{"id":"f2f0e84b63384fdc016338b9e77d00fb","name":"餐巾纸","children":[]},{"id":"f2f0e84b63384fdc016338ba366e00fd","name":"杯子","children":[]},{"id":"f2f0e84b63384fdc016338ba91a300ff","name":"盘子","children":[]},{"id":"f2f0e84b63384fdc016338bae3350101","name":"勺","children":[]},{"id":"f2f0e84b63384fdc016338bb30770103","name":"碗","children":[]},{"id":"f2f0e84b63384fdc016338bc64bd0105","name":"托盘","children":[]},{"id":"f2f0e84b63384fdc016338bc9d630107","name":"刀子","children":[]},{"id":"f2f0e84b63384fdc016338bce690010e","name":"垃圾桶","children":[]},{"id":"f2f0e84b63384fdc016338bd3a5a0110","name":"垃圾袋","children":[]},{"id":"f2f0e84b63384fdc016338bd82020112","name":"衣服架","children":[]}]},{"id":"f2f0e84b63384fdc016338a2048a00b5","name":"其他","children":[]}]}]
		}*/
		this.$store.dispatch("getInventorySubMenu");
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