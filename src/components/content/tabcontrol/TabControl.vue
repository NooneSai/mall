<template>
  <div class='tab-control'>
    <div class="tab-control-item"
         v-for="(item,index) in titles"
         @click="itemClick(index)"
         :class="{active:currentIndex==index}">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabControl',
  data() {
    return {
      currentIndex: 0,
    }
  },
  props: {
    titles: {
      type: Array,
      default() {
        return []
      },
    },
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index
      // 将点击事件传到父组件  $emit('传输的事件名称'，传输的索引号)
      this.$emit('tabClick', index)
    },
  },
}
</script>
<style scoped>
.tab-control {
  display: flex;
  text-align: center;
  height: 40px;
  line-height: 40px;
  z-index: 3;
}
.tab-control-item {
  flex: 1;
}
.tab-control-item span {
  padding: 5px;
}
.active {
  color: var(--color-high-text);
}
.active span {
  border-bottom: 3px solid var(--color-high-text);
}
</style>