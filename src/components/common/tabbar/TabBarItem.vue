<template>
  <div class='tab-bar-item'
       @click="itemClick">
    <div v-if='!isActive'>
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>
    <div :style='isStyleActive'>
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabBar-Item',
  data() {
    return {}
  },
  props: {
    path: String,
    activeStyle: {
      type: String,
      default: 'skyblue',
    },
  },
  computed: {
    isActive() {
      return this.$route.path.includes(this.path)
    },
    isStyleActive() {
      // 通过三元表达式，判断当前tab是否为真，为真则设置字体颜色，
      return this.isActive ? { color: this.activeStyle } : {}
    },
  },
  methods: {
    itemClick() {
      return this.$router.replace(this.path)
    },
  },
}
</script>
<style scoped>
.tab-bar-item {
  flex: 1;
}
.tab-bar-item img {
  width: 24px;
  height: 24px;
  margin-top: 3px;
}
</style>