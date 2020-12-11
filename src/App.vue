<template>
  <div id="app">
    <!-- 将Detail页面排除在外，不用Keep-alive -->
    <keep-alive exclude="Detail">
      <router-view />
    </keep-alive>
    <main-tab-bar />
  </div>
</template>

<script>
import MainTabBar from 'components/content/maintabbar/MainTabBar.vue'

export default {
  name: 'app',
  components: {
    MainTabBar,
  },
}
</script>

<style>
@import 'assets/css/base.css';
</style>
