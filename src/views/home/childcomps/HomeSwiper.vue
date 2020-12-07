<template>
  <div class='home-swiper'>
    <swiper>
      <swiper-item v-for="item in cbanners"
                   :key="item.id">
        <a :href="item.link">
          <img :src="item.image"
               alt=""
               @load="itemLoad">
        </a>

      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperItem } from 'components/common/swiper'
export default {
  name: 'HomeSwiper',
  components: { Swiper, SwiperItem },
  props: {
    cbanners: {
      type: Array,
      default() {
        return []
      },
    },
  },
  data() {
    return {
      isLoad: false,
    }
  },
  methods: {
    itemLoad() {
      // 只需要发射一次就可以了，这个只是计算图片的高度,通过isLoad的值来判断，只有有一张通过了，就不再执行发射
      if (!this.isLoad) {
        this.$emit('swiperImgLoad')
        this.isLoad = true
      }
    },
  },
}
</script>
<style scoped>
</style>