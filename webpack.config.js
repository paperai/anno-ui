const path = require('path')
const webpack = require('webpack')
const LiveReloadPlugin = require('webpack-livereload-plugin')


const distTarget = path.resolve(__dirname, process.env.DIST_TARGET || 'dist');
console.log('distTarget:', distTarget)

module.exports = {
  entry: {
    'anno-ui' : './src/anno-ui.js'
  },
  output: {
    // path : path.resolve(__dirname, 'dist'),
    path :  distTarget,
    filename : '[name].bundle.js',
    // library       : 'PDFAnnoCore',
    // libraryTarget : 'umd'
  },
  // module: {
  //   loaders: [
  //     {
  //       test: /\.js$/,
  //       exclude: /node_modules/,
  //       loader: 'babel-loader',
  //       query: {
  //         presets: ['es2015', 'stage-1'],
  //         plugins: ['add-module-exports']
  //       }
  //     }
  //   ]
  // },
  // plugins: [
  //   // LiveReload(watchの時のみ有効)
  //   new LiveReloadPlugin({
  //     // LiveReloadのオプション（なんか必要あれば）
  //     // https://www.npmjs.com/package/webpack-livereload-plugin
  //   })
  // ],
  plugins: [
    function () {
      this.plugin('watch-run', (watching, callback) => {
        console.log('##### Begin compile at ' + new Date() + '#####')
        callback()
      })
    },
    // LiveReload(watchの時のみ有効)
    new LiveReloadPlugin({
      // LiveReloadのオプション（なんか必要あれば）
      // https://www.npmjs.com/package/webpack-livereload-plugin
    })
  ],

  devtool: 'source-map'
};
