const path = require('path')

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
  ? './'
  : '/',
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        // 配置全局scss
        path.resolve(__dirname,"src/style/common.scss")
      ],
    }
  },

  configureWebpack: () => {

  },

  // 使用cdn不打包的项目
  chainWebpack: config => {
    if (process.env.NODE_ENV === "production") {
      config.externals({
        // 'vue': 'vue',
        // 'vue-router': 'VueRouter',
        // 'vuex': 'vuex',
        axios: 'axios',
        echarts: 'echarts',
      })
    }
    //生产环境下
    if (process.env.NODE_ENV === "production") {
      config.plugin('html')
        .tap(args => {
          args[0].cdn = {
            js: ['https://cdn.jsdelivr.net/combine/npm/axios@0.21.4'],
            css: ['https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css']
          }
          return args
        })
    }
  },

  productionSourceMap: false
}