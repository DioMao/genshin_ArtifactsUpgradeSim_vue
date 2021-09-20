const path = require('path')

module.exports = {
  publicPath: '/',
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: []
    }
  },
  configureWebpack: () => {
    // 生产环境配置
    if (process.env.NODE_ENV === "production") {

    }
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
            js: ['https://cdn.jsdelivr.net/combine/npm/echarts@5.1.2,npm/axios@0.21.4'],
            css: ['https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css']
          }
          return args
        })
    }
  }
}