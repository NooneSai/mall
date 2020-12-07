<template>
  <div class='wrapper'
       ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: 'BetterScroll',
  data() {
    return {
      scroll: null,
    }
  },
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
  },
  // mounted 组件创建完成后，可以访问DOM元素
  mounted() {
    // 创建scroll实例对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      // 让滚动里面的内容可以进行点击
      click: true,
      // 触发scroll事件
      probeType: this.probeType,
      //要将pullUpLoad设置为真 才可以开启上拉加载
      pullUpLoad: this.pullUpLoad,
    })
    // 监听滚动事件
    this.scroll.on('scroll', (position) => {
      this.$emit('scroll', position)
    })
    // 监听加载更多
    this.scroll.on('pullingUp', () => {
      this.$emit('pullingUp')
    })
  },
  methods: {
    moveTo(x, y, time = 300) {
      this.scroll && this.scroll.scrollTo(x, y, time)
    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp()
    },
    refresh() {
      this.scroll && this.scroll.refresh()
    },
  },
}
</script>
<style scoped>
</style>