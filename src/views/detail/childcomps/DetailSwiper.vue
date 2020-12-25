<template>
  <swiper class="swiperItem">
    <swiper-item v-for="item in ctopImages"
                 :key="item.bgc">
      <img :src="item"
           alt="">
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from 'components/common/swiper'
// import Swiper from '../../../components/common/swiper/Swiper.vue'
// import SwiperItem from '../../../components/common/swiper/SwiperItem.vue'
export default {
  components: { Swiper, SwiperItem },
  name: 'DetailSwiper',
  props: {
    ctopImages: {
      type: Array,
      default() {
        return []
      },
    },
  },
  created() {
    // console.log(this.ctopImages)
  },
}
</script>
<style scoped>
.swiperItem {
  height: 300px;
  overflow: hidden;
}
</style>