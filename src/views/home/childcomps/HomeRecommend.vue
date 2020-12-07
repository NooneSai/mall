<template>
  <div class='home-recommend'>
    <div class="home-recommend-item"
         v-for="item in crecommends"
         :key="item.id">
      <a :href="item.link">
        <img :src="item.image"
             alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeRecommend',
  props: {
    crecommends: {
      type: Array,
      default() {
        return []
      },
    },
  },
}
</script>
<style scoped>
.home-recommend {
  display: flex;
  text-align: center;
}
.home-recommend-item {
  flex: 1;
}
.home-recommend-item img {
  width: 70px;
  height: 70px;
  border-radius: 100%;
}
</style>