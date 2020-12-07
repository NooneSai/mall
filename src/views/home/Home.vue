<template>
  <div id='home'>
    <nav-bar class="home-nav-bar">
      <div slot="center">购物车</div>
    </nav-bar>
    <tab-control ref="tabControl1"
                 class="tab-control"
                 :titles="['流行','新款','精选']"
                 @tabClick="homeTabClick"
                 v-show="isTabFixed"></tab-control>
    <!-- 是监听scroll是否滚动，所以用v-on -->
    <better-scroll class="content"
                   ref="content"
                   :probeType='3'
                   :pullUpLoad='true'
                   @scroll="contentScroll"
                   @pullingUp='loadMore'>
      <!-- 将数据传送到子组件，并判断banners是否为空，如果为空就不加载 -->
      <home-swiper :cbanners="banners"
                   v-if="banners"
                   @swiperImgLoad="swiperImgLoad"></home-swiper>
      <home-recommend :crecommends="recommends"></home-recommend>
      <home-feature-view></home-feature-view>
      <tab-control ref="tabControl2"
                   :titles="['流行','新款','精选']"
                   @tabClick="homeTabClick"
                   :class="{fixed:isTabFixed}"></tab-control>
      <goods-list :goods="goods[currentType].list"></goods-list>
    </better-scroll>
    <!-- 点击组件事件的需要加上native -->
    <back-top @click.native='backClick'
              v-show="isBackTopShow"></back-top>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'
import TabControl from 'components/content/tabcontrol/TabControl.vue'
import GoodsList from 'components/content/goods/GoodsList.vue'
import BetterScroll from 'components/common/betterscroll/BetterScroll.vue'
import BackTop from 'components/content/backtop/BackTop.vue'

import { getHomeMultiData, getHomeGoodsData } from 'network/home.js'
import { debounce } from 'common/utils.js'

import HomeSwiper from './childcomps/HomeSwiper.vue'
import HomeRecommend from './childcomps/HomeRecommend.vue'
import HomeFeatureView from './childcomps/HomeFeatureView.vue'

export default {
  name: 'Home',
  components: {
    NavBar,
    TabControl,
    GoodsList,
    BetterScroll,
    BackTop,

    HomeSwiper,
    HomeRecommend,
    HomeFeatureView,
  },
  data() {
    return {
      banners: null,
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: 'pop',
      isBackTopShow: false,
      tabOffsetTop: 0,
      isTabFixed: false,
    }
  },
  methods: {
    // 点击事件的方法

    homeTabClick(index) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
    },

    contentScroll(position) {
      // 判断backtop是否显示
      this.isBackTopShow = -position.y >= 1000
      // 判断tabcontrol是否吸顶
      this.isTabFixed = -position.y > this.tabOffsetTop
    },
    backClick() {
      this.$refs.content.moveTo(0, 0)
    },
    loadMore() {
      this.getGoodsData(this.currentType)
    },
    swiperImgLoad() {
      // $el用于获取组件中的元素
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      console.log(this.tabOffsetTop)
    },
    // 获取数据的方法
    getMultiData() {
      getHomeMultiData().then((res) => {
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
      })
    },
    getGoodsData(type) {
      const page = this.goods[type].page + 1
      getHomeGoodsData(type, page).then((res) => {
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1

        // 完成上拉加载更多
        this.$refs.content.finishPullUp()
      })
    },
  },
  // 创建完成，可以访问当前this实例
  created() {
    this.getMultiData()
    this.getGoodsData('pop')
    this.getGoodsData('new')
    this.getGoodsData('sell')
  },
  //挂载完成，可以访问DOM元素，this.$refs是DOM元素
  mounted() {
    const refresh = debounce(this.$refs.content.refresh, 50)
    this.$bus.$on('itemImgLoad', () => {
      refresh()
    })
  },
}
</script>
<style scoped>
#home {
  /* vh是视口高度 */
  height: 100vh;
  position: relative;
}
.home-nav-bar {
  background-color: var(--color-tint);
  color: #fff;
  font-size: 16px;
  /* z-index: 11; */
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0; */
}
/* .tab-control {
  position: sticky;
  top: 44px;
  background-color: #fff;
} */

.content {
  /* margin-top: 44px; */
  height: calc(100% - 93px);
  overflow: hidden;
}
.fixed {
  position: fixed;
  left: 0;
  right: 0;
  top: 44px;
}
</style>