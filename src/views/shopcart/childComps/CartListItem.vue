<template>
  <div class="shop-info">
    <div class="item-selector">
      <check-button :is-checked='product.checked'
                    @click.native='checkClick'></check-button>
    </div>
    <div class="cart-list-item">
      <div class="item-img">
        <img :src="product.image"
             alt="">
      </div>
      <div class="item-info">{{product.title}}</div>
      <div class="item-desc">{{product.desc}}</div>
      <div class="item-bottom">
        <div class="left">￥{{product.price}}</div>
        <div class="right">×{{product.count}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import CheckButton from './CheckButton.vue'
export default {
  name: 'CartListItem',
  components: {
    CheckButton,
  },
  props: {
    product: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  methods: {
    checkClick() {
      this.$store.commit('checkClick', this.product)
    },
  },
}
</script>
<style scoped>
.shop-info {
  border-bottom: 2px solid rgb(226, 223, 223);
}
.cart-list-item {
  height: 120px;
  overflow: hidden;
  margin-bottom: 2px;
  /* border-bottom: 2px solid rgb(226, 223, 223); */
  margin-left: 20px;
  /* color: black; */
}
.item-img {
  height: 100%;
  float: left;
}
.item-img img {
  margin-top: 2px;
  margin-right: 5px;
  width: 78px;
  height: 115px;
  border-radius: 5px;
}
.item-info,
.item-desc {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.item-info {
  height: 23px;
  font-size: 21px;
  margin: 10px 0;
  line-height: 23px;
}
.item-desc {
  height: 25px;
  font-size: 15px;
  line-height: 25px;
}
.item-bottom {
  height: 20px;
  margin-top: 18px;
}
.left {
  color: rgba(250, 154, 9, 0.952);
}
.right {
  margin-right: 8px;
  font-weight: bold;
}
.item-selector {
  float: left;
  position: relative;
  top: 50px;
}
</style>