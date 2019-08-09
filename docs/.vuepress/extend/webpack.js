const path = require('path')

function resolve(dir) {
  return path.join(__dirname, '../../../', dir)
}

module.exports = (config, isServer) => {
  return {
    performance: {
      hints: false
    },
    resolve: {
      alias: {
        'utils': resolve('utils'),
        'packages': resolve('packages'),
        'sources': resolve('sources'),
        'xdh-go': resolve('packages/index.js'),
        'demo-data': resolve('docs/.vuepress/data/demo-data')
      }
    }
  }
}
