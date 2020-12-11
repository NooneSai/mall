<template>
  <div class='detail'>
    {{iid}}
    <detail-nav-bar></detail-nav-bar>
    <detail-swiper></detail-swiper>

  </div>
</template>

<script>
import DetailNavBar from './childcomps/DetailNavBar.vue'
import DetailSwiper from './childcomps/DetailSwiper.vue'
import { getDetail } from 'network/detail.js'
export default {
  name: 'Detail',
  components: { DetailNavBar, DetailSwiper },
  data() {
    return {
      iid: null,
    }
  },
  created() {
    // 获取iid
    this.iid = this.$route.params.iid
    //请求详情页的数据
    getDetail(this.iid).then((res) => {
      console.log(res)
      //从res中获取轮播图的数据
    })
  },
}
</script>
<style scoped>
</style>