module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        // @ 就是src的别名,设置路径的别名
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
        'router': '@/router',
      }
    }
  }
}