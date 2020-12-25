<template>
  <nav-bar class="nav-bar">
    <div slot="left"
         class="back"
         @click="backClick"><img src="~assets/img/common/back.svg"
           alt=""> </div>
    <div slot="center"
         class="titles">
      <div class="titles-item"
           v-for="(item,index) in titles"
           @click="titleClick(index)"
           :class="{active:index===currentIndex}">{{item}}</div>
    </div>
  </nav-bar>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'
export default {
  components: { NavBar },
  name: 'DetailNavBar',
  data() {
    return {
      titles: ['商品', '参数', '评论', '推荐'],
      currentIndex: 0,
    }
  },
  methods: {
    titleClick(index) {
      this.currentIndex = index
      this.$emit('titleClick', index)
    },
    backClick() {
      // 用go(-1)或者back
      // this.$router.go(-1)
      this.$router.back()
    },
  },
}
</script>
<style scoped>
.nav-bar {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.titles {
  display: flex;
}
.titles-item {
  flex: 1;
}
.active {
  color: var(--color-high-text);
}
.back img {
  width: 30px;
  margin-top: 8px;
}
</style>