<template>
  <div class='cart-bottom-bar'>
    <div class='check-content'>
      <check-button :is-checked="isSelectAll"
                    @click.native="checkClick"
                    class="button"></check-button>
      <div>全选</div>
    </div>
    <div class="price">
      合计：{{totalPrice}}
    </div>
    <div class="calc">
      去结算({{checkLength}})
    </div>
  </div>
</template>

<script>
import CheckButton from './CheckButton.vue'
export default {
  name: 'CartBottomBar',
  components: {
    CheckButton,
  },
  computed: {
    totalPrice() {
      return (
        '￥' +
        this.$store.state.cartList
          .filter((item) => {
            return item.checked
          })
          .reduce((preValue, item) => {
            return preValue + item.price * item.count
          }, 0)
          .toFixed(2)
      )
    },
    checkLength() {
      return this.$store.state.cartList.filter((item) => item.checked).length
    },
    isSelectAll() {
      if (this.$store.state.cartList.length === 0) return false
      return !this.$store.state.cartList.find((item) => !item.checked)
    },
  },
  methods: {
    checkClick() {
      if (this.isSelectAll) {
        this.$store.state.cartList.forEach((item) => (item.checked = false))
      } else {
        this.$store.state.cartList.forEach((item) => (item.checked = true))
      }
    },
  },
}
</script>
<style scoped>
.cart-bottom-bar {
  display: flex;

  line-height: 40px;
  height: 40px;
  /* position: relative; */
  /* bottom: 40px; */
}
.check-content {
  display: flex;
  align-items: center;
  margin-left: 10px;
  width: 60px;
}
.button {
  line-height: 20px;
  margin-right: 5px;
}
.price {
  margin-left: 30px;
  flex: 1;
}
.calc {
  color: #fff;
  text-align: center;
  width: 90px;
  background-color: red;
}
</style>