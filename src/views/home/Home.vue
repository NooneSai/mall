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
    <!-- 监听子组件发射过来的方法，用@ -->
    <better-scroll class="content"
                   ref="content"
                   @scroll="contentScroll"
                   @pullingUp="loadMore"
                   :probeType="3"
                   :pullUpLoad='true'>
      <!-- 将数据传送到子组件，并判断banners是否为空，如果为空就不加载 -->
      <home-swiper :cbanners="banners"
                   v-if="banners"
                   @swiperImgLoad='swiperImgLoad'></home-swiper>
      <home-recommend :crecommends="recommends"></home-recommend>
      <home-feature-view></home-feature-view>
      <tab-control ref="tabControl2"
                   :titles="['流行','新款','精选']"
                   @tabClick="homeTabClick"
                   :class="{fixed:isTabFixed}"></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </better-scroll>

    <!-- 组件的点击，不能直接click，还要加上.native -->
    <back-top v-show="isBackTopShow"
              @click.native="backTopCLick"></back-top>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'
import TabControl from 'components/content/tabcontrol/TabControl.vue'
import GoodsList from 'components/content/goods/GoodsList.vue'

import { getHomeMultiData, getHomeGoodsData } from 'network/home.js'
import { debounce } from 'common/utils.js'
import { itemListenerMixin } from 'common/mixin.js'

import HomeSwiper from './childcomps/HomeSwiper.vue'
import HomeRecommend from './childcomps/HomeRecommend.vue'
import HomeFeatureView from './childcomps/HomeFeatureView.vue'
import BetterScroll from 'components/common/betterscroll/BetterScroll.vue'
import BackTop from 'components/content/backtop/BackTop.vue'

export default {
  name: 'Home',
  components: {
    NavBar,
    TabControl,
    GoodsList,

    HomeSwiper,
    HomeRecommend,
    HomeFeatureView,
    BetterScroll,
    BackTop,
  },
  mixins: [itemListenerMixin],
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
      saveY: 0,
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
    // 获取位置，并当y轴大于-1000时，显示回到顶部的图片
    contentScroll(position) {
      // console.log(position)
      this.isBackTopShow = -position.y > 1000
      this.isTabFixed = -position.y > this.tabOffsetTop
    },
    // 点击回到顶部的图片，跳回到顶部
    backTopCLick() {
      this.$refs.content.scrollTo(0, 0)
    },
    // 上拉加载更多
    loadMore() {
      this.getGoodsData(this.currentType)
    },
    //
    swiperImgLoad() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
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
  mounted() {},
  //当前路由活跃
  activated() {
    // 回到时刷新一下
    this.$refs.content.refresh()
    this.$refs.content.scrollTo(0, this.saveY, 0)
  },
  // 当前路由不活跃
  deactivated() {
    // 离开时保存saveY的值
    this.saveY = this.$refs.content.getScrollY()
    // console.log(this.saveY)
    // 离开时取消全局事件的监听
    this.$bus.$off('itemImgLoad', this.homeItemListener)
    // console.log('home leave')
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    },
  },
  destroyed() {
    // console.log('home destroyed')
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