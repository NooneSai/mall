<template>
  <div class='goods-list-item'
       @click="itemClick">

    <img :src="showImage"
         @load="imgLoad"
         alt="">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>

  </div>
</template>

<script>
export default {
  name: 'GoodsListItem',
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  computed: {
    showImage() {
      return this.goodsItem.image || this.goodsItem.show.img
    },
  },

  methods: {
    imgLoad() {
      this.$bus.$emit('itemImgLoad')
      // if (this.$route.path.indexOf('/home')) {
      //   // 从子组件将方法传出给爷爷级别或大于爷爷级别的，可以通过vuex或者原形的总线
      //   this.$bus.$emit('itemImgLoad')
      // } else if (this.$route.path.indexOf('/detail')) {
      //   this.$bus.$emit('detailItemImageLoad')
      // }
    },
    itemClick() {
      // 设置路由地址
      if (this.$route.path.indexOf('home') !== -1) {
        // console.log('11')
        this.$router.push('/detail/' + this.goodsItem.iid)
      } else {
        return false
      }
    },
  },
}
</script>
<style scoped>
.goods-list-item {
  position: relative;
  padding-bottom: 40px;
  width: 48%;
}
.goods-list-item img {
  width: 100%;
  border-radius: 5px;
}
.goods-info {
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  text-align: center;
}
.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}
.goods-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}
.goods-info .collect {
  position: relative;
}
.goods-info .collect::before {
  /* 一定要有content属性 */
  content: '';
  position: absolute;
  left: -15px;
  right: -1px;
  width: 14px;
  height: 14px;
  background: url('~assets/img/common/collect.svg') 0 0/14px 14px;
}
</style>