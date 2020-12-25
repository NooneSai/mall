<template>
  <div class='detail'>
    <detail-nav-bar @titleClick="titleClick"
                    ref="nav" />

    <better-scroll class="content"
                   ref='content'
                   @scroll="contentScroll"
                   :probeType='3'>
      <!-- <ul>
        <li v-for="item in $store.state.cartList">{{item}}</li>
      </ul> -->
      <!-- 属性ctopImages 传入ing -->
      <detail-swiper :ctopImages='topImages'
                     v-if="topImages.length>0"></detail-swiper>
      <detail-base-info :cgoods=goods></detail-base-info>
      <detail-shop-info :cshopInfo='shopInfo'></detail-shop-info>
      <detail-image-info :cdetailInfo='detailInfo'
                         @detailImageLoad='detailImageLoad'></detail-image-info>
      <detail-param-info ref="params"
                         :cparamInfo='paramInfo'></detail-param-info>
      <detail-comment-info ref="comment"
                           :ccommentInfo='commentInfo'></detail-comment-info>
      <goods-list ref="recommend"
                  :goods="recommends"></goods-list>

    </better-scroll>
    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
    <back-top v-show="isBackTopShow"
              @click.native="backTopCLick"></back-top>

  </div>
</template>

<script>
import DetailNavBar from './childcomps/DetailNavBar.vue'
import { getDetail, goodsInfo, getRecommend } from 'network/detail.js'
import DetailSwiper from './childcomps/DetailSwiper.vue'
import DetailBaseInfo from './childcomps/DetailBaseInfo.vue'
import BetterScroll from 'components/common/betterscroll/BetterScroll.vue'
import DetailShopInfo from './childcomps/DetailShopInfo.vue'
import DetailImageInfo from './childcomps/DetailImageInfo.vue'
import DetailParamInfo from './childcomps/DetailParamInfo.vue'
import DetailCommentInfo from './childcomps/DetailCommentInfo.vue'
import GoodsList from '../../components/content/goods/GoodsList.vue'
import { debounce } from 'common/utils.js'
import { itemListenerMixin } from 'common/mixin.js'
import DetailBottomBar from './childcomps/DetailBottomBar.vue'
import BackTop from '../../components/content/backtop/BackTop.vue'
export default {
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    BetterScroll,
    DetailShopInfo,
    DetailImageInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    BackTop,
  },
  name: 'Detail',
  mixins: [itemListenerMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shopInfo: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopY: null,
      positionY: null,
      currentIndex: null,
      isBackTopShow: false,
    }
  },
  created() {
    // 获取iid
    this.iid = this.$route.params.iid
    // console.log(this.iid)
    //根据iid获取数据
    getDetail(this.iid).then((res) => {
      const data = res.result
      // console.log(res)
      //获取轮播图位置
      this.topImages = res.result.itemInfo.topImages
      // 获取商品信息
      this.goods = new goodsInfo(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      )
      //获取商店信息
      this.shopInfo = data.shopInfo
      //获取详情信息
      this.detailInfo = data.detailInfo
      // 获取参数的信息
      this.paramInfo = data.itemParams
      // 获取评论的数据
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0]
      }
      // 根据最新数据，对应DOM已经被渲染出来了，但是图片还没加载完成
      this.$nextTick(() => {})
    })
    // 请求推荐的数据
    getRecommend().then((res) => {
      // console.log(res)
      this.recommends = res.data.list
    })
    this.getThemeTopY = debounce(() => {
      this.themeTopYs = []
      this.themeTopYs.push(0)
      this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      // 增加一个最大的数值
      this.themeTopYs.push(Number.MAX_VALUE)
      // console.log(this.themeTopYs)
    }, 300)
  },
  mounted() {
    const refresh = debounce(this.$refs.content.refresh, 30)
    this.detailItemListener = () => {
      refresh()
    }
    this.$bus.$on('itemImgLoad', this.detailItemListener)
  },
  updated() {},
  // 取消的地方和home不一样
  destroyed() {
    // console.log('detail destroyed')
    this.$bus.$off('itemImgLoad', this.detailItemListener)
  },
  methods: {
    detailImageLoad() {
      // this.$refs.content.refresh()
      this.refresh()
      this.getThemeTopY()
    },
    titleClick(index) {
      // console.log(index)
      this.$refs.content.scrollTo(0, -this.themeTopYs[index], 200)
    },

    contentScroll(position) {
      // console.log(position)
      this.isBackTopShow = -position.y > 1000
      this.isTabFixed = -position.y > this.tabOffsetTop
      this.positionY = -position.y
      let length = this.themeTopYs.length
      for (let i = 0; i < this.themeTopYs.length; i++) {
        if (
          this.currentIndex !== i &&
          this.positionY > this.themeTopYs[parseInt(i)] &&
          this.positionY < this.themeTopYs[parseInt(i + 1)]
        ) {
          this.currentIndex = i
          // console.log(this.currentIndex)
          // 将获取的currentIndex设置到navbar里面去
          this.$refs.nav.currentIndex = this.currentIndex
          // console.log(this.currentIndex)
        }
      }
    },
    backTopCLick() {
      this.$refs.content.scrollTo(0, 0)
    },
    addToCart() {
      // 获取商品信息
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.realPrice
      // 商品唯一的标识
      product.iid = this.iid
      // 新增到购物车
      // commit是提交到mutations的
      // this.$store.commit('addCart', product)
      // dispatch是提交到actions的
      this.$store.dispatch('addCart', product)
      console.log(this.goods)
    },
  },
}
</script>
<style scoped>
.detail {
  height: 100vh;
  background-color: #fff;
  position: relative;
  z-index: 1;
}
.content {
  background-color: #fff;
  height: calc(100% - 44px - 58px);
}
</style>