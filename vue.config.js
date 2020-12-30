
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin


module.exports = {
    configureWebpack: config => {
        if (!process.env.VUE_APP_TITLE) {
          return {
            plugins: [
              new BundleAnalyzerPlugin()
            ]
          }
        }
    }
}
