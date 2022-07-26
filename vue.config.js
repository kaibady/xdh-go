const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: '/xdh-go/',
  pages: {
    index: {
      entry: 'examples/main.js',
      template: 'public/index.html',
      filename: 'index.html'
    }
  },
  chainWebpack: config => {

  },
  configureWebpack: {
    // 不显示文件过大优化建议
    performance: {
      hints: false
    },
    resolve: {
      alias: {
        'utils': resolve('utils'),
        'packages': resolve('packages'),
        'sources': resolve('sources'),
        '@': resolve('src'),
        'vue$': process.env.NODE_ENV === 'production' ? 'vue' : 'vue/dist/vue.esm.js'
      }
    }
  }
}
