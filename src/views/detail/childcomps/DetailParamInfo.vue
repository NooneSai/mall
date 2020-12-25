<template>
  <div class='param-info'
       v-if="Object.keys(cparamInfo).length!==0">
    <table v-for="(table,index) in cparamInfo.rule.tables">
      <!-- {{table}} -->
      <tr v-for="(tr,indey) in table">
        <!-- {{tr}} -->
        <td v-for="(td,indez) in tr">
          {{td}}
        </td>
      </tr>
    </table>
    <table class="info-param">
      <tr v-for="(info,index) in cparamInfo.info.set">
        <td class="info-param-key">{{info.key}}</td>
        <td class="param-value">{{info.value}}</td>
      </tr>
    </table>
    <div class="info-img"
         v-if="cparamInfo.info.image">
      <img :src="cparamInfo.info.image[0]"
           alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailParamInfo',
  props: {
    cparamInfo: {
      type: Object,
      default() {
        return {}
      },
    },
  },
}
</script>
<style scoped>
.param-info {
  padding: 20px 15px;
  font-size: 14px;
  border-bottom: 5px solid #f2f5f8;
  background-color: #fff;
}
.param-info table {
  width: 100%;
  border-collapse: collapse;
}
.param-info table tr {
  height: 42px;
}
.param-info table tr td {
  border-bottom: 1px solid rgba(100, 100, 100, 0.1);
}
.info-param-key {
  width: 95px;
}
.info-param {
  border-top: 1px solid rgba(100, 100, 100, 0.1);
}
.param-value {
  color: #eb4868;
}
.info-img img {
  width: 100%;
}
</style>