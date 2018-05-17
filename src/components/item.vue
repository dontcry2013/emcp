<template>
    <li>
        <div
          :class="{parent_style: isFolder, child_style: !isFolder}"
          @click="toggle"
          @dblclick="changeType">
          {{ model.name }}
          <span v-if="isFolder">[{{ open ? '-' : '+' }}]</span>
        </div>
        <ul v-show="open" v-if="isFolder">
          <item
            class="item"
            v-for="(model, index) in model.children"
            :key="index"
            :model="model">
          </item>
          <!-- <li class="add" @click="addChild">+</li> -->
        </ul>
    </li>
</template>
<script>
module.exports = {
    props: {
        model: Object
    },
    name: 'item',
    data: function () {
        return {
          open: false
        }
    },
    computed: {
        isFolder: function () {
          return this.model.children &&
            this.model.children.length
        }
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
      background-color: darkseagreen;
    }
    .parent_style {
        font-weight: bold;
        height: 40px;
        text-align: left;
        line-height: 40px;
        padding-left: 10px;
    }
    .child_style {
        background-color: darkcyan;
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
