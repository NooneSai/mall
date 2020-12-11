<template>
  <div class='wrapper'
       ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScorll from 'better-scroll'
export default {
  name: 'BetterScroll',
  data() {
    return {
      scroll: null,
    }
  },
  props: {
    probeType: 0,
    pullUpLoad: false,
  },
  //挂载完成后，可以访问DOM元素
  mounted() {
    // 因为BScroll需要用DOM，所以要放在mounted里
    this.scroll = new BScorll(this.$refs.wrapper, {
      click: true,
      probeType: this.probeType,
      // pullUpLoad设置为true时，才会启动上拉加载更多，并且设置probeType为3
      pullUpLoad: this.pullUpLoad,
    })
    //监听滚动
    this.scroll.on('scroll', (position) => {
      this.$emit('scroll', position)
    })
    // 监听上拉加载
    this.scroll.on('pullingUp', () => {
      this.$emit('pullingUp')
    })
  },
  methods: {
    scrollTo(x, y, time = 300) {
      this.scroll && this.scroll.scrollTo(x, y, time)
    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp()
    },
    refresh() {
      console.log('---')
      this.scroll && this.scroll.refresh()
    },
  },
}
</script>
<style scoped>
</style>