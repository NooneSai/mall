// 直接混入到


import { debounce } from './utils'

export const itemListenerMixin = {
  data () {
    return {
      itemListener: null,
      refresh: null

    }
  },
  mounted () {
    this.refresh = debounce(this.$refs.content.refresh, 30)
    this.itemListener = () => {
      this.refresh()
    }
    this.$bus.$on('itemImgLoad', this.itemListener)
    // console.log('混入的内容');
  },
}