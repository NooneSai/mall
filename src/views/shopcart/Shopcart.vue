<template>
  <div class='shopcart'>
    <nav-bar class="nav-bar">
      <!-- 直接从大管家里面拿数据 -->
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>

    <!-- 商品的列表 -->
    <better-scroll class="content"
                   ref="content">
      <cart-list></cart-list>
    </better-scroll>

    <!-- 底部汇总 -->
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
import NavBar from '../../components/common/navbar/NavBar.vue'
import { mapGetters } from 'vuex'
import CartList from './childComps/CartList.vue'
import BetterScroll from '../../components/common/betterscroll/BetterScroll.vue'
import CartBottomBar from './childComps/CartBottomBar.vue'
export default {
  name: 'Shopcart',
  components: {
    NavBar,
    CartList,
    BetterScroll,
    CartBottomBar,
  },
  computed: {
    // 数组形式 ...mapGetters(['cartLength','cartList'])
    // 对象形式 ...mapGetters({cartLength:'cartLength',cartList:'cartList'})
    ...mapGetters({
      cartLength: 'cartLength',
      cartList: 'cartList',
    }),
  },
  activated() {
    this.$refs.content.refresh()
  },
}
NavBar
</script>
<style scoped>
.shopcart {
  height: 100vh;
}
.content {
  height: calc(100% - 49px - 44px - 40px);
  overflow: hidden;
}
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
  font-weight: 400;
  font-size: 20px;
}
</style>