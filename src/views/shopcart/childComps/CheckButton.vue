<template>
  <div class='check-button'
       :class="{active:isChecked}">
    <img src="~assets/img/cart/tick.svg"
         alt="">
  </div>
</template>

<script>
export default {
  name: 'CheckButton',
  props: {
    isChecked: {
      type: Boolean,
      default: true,
    },
  },
}
</script>
<style scoped>
.check-button {
  height: 15px;
  width: 15px;
  border-radius: 20px;
  border: 1px solid rgb(230, 227, 227);
}
.check-button img {
  width: 15px;
}
.active {
  background-color: red;
}
</style>