const path = require('path')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// https://stefanbauer.me/tips-and-tricks/autocompletion-for-webpack-path-aliases-in-phpstorm-when-using-laravel-mix
module.exports = {
  target: ['web', 'es2020'],
  plugins: [new BundleAnalyzerPlugin()], 
  output: { chunkFilename: 'js/[name].js?id=[chunkhash]' },
  resolve: {
    alias: {
      '@': path.resolve('./resources/js'),
    },
    extensions: ['.js', '.jsx', '.json'],
    fallback: { "buffer": false }
  },
  devServer: {
    allowedHosts: 'all',
  },
}
