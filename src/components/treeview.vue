<template>
  <ul id="demo">
    <li>
      <div
        :class="{ parent_style: isFolder, child_style: !isFolder}"
        @tap="toggle"
        @dblclick="changeType">
        <span :class="clsParentOrChild"></span>
        {{ model.name }}
        <span v-if="isFolder" :class="clsObj"></span>
      </div>
    <ul v-show="open" v-if="isFolder">
      <treeview
        class="item"
        v-for="(model, index) in model.children"
        :key="index"
        :model="model">
      </treeview>
    <!-- <li class="add" @click="addChild">+</li> -->
    </ul>
  </li>
</ul>
</template>
<script>
  module.exports = {
    props: {
      model: Object,
      isOpen: Boolean,
    },
    name: 'treeview',
    data: function () {
      return {
        open: (this.isOpen == true ) ? true : false,
      }
    },
    computed: {
      isFolder: function () {
        return this.model.children &&
        this.model.children.length
      },
      clsObj: function(){
        return { 
          "mui-icon mui-icon-arrowdown": this.open, 
          "mui-icon mui-icon-arrowright": !this.open
        }
      },
      clsParentOrChild: function(){
        return { 
          "mui-icon mui-icon-paperplane": this.isFolder, 
          "mui-icon mui-icon-star": !this.isFolder,
        }
      },
    },
    methods: {
      toggle: function (e) {
        if (this.isFolder) {
          this.open = !this.open
        }
        app.mui.toast(e.target.innerText);
      },
      changeType: function () {
        if (!this.isFolder) {
          app.vueApp.$set(this.model, 'children', [])
          this.addChild()
          this.open = true
        }
      },
      addChild: function () {
        this.model.children.push({
          name: 'new stuff'
        })
      }
    }
  }
</script>

<style scoped>
.item {
  cursor: pointer;
  /*background-color: darkseagreen;*/
}
.parent_style {
  font-weight: bold;
  height: 40px;
  text-align: left;
  line-height: 40px;
  padding-left: 10px;
}
.child_style {
  /*background-color: darkcyan;*/
  height: 40px;
  text-align: left;
  line-height: 40px;
  padding-left: 10px;
}
ul {
  padding-left: 1em;
  line-height: 1.5em;
  list-style-type: none;
}
</style>
