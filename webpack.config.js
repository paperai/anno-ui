const path = require('path')
const webpack = require('webpack')
const LiveReloadPlugin = require('webpack-livereload-plugin')


let entry = {
  'index' : './src/index.js'
}

if (process.env.NODE_ENV === 'development') {
  Object.assign(entry, {
    'test' : './test.js'
  });
}

module.exports = {
  entry,
  output: {
    path : path.resolve(__dirname, 'dist'),
    filename : '[name].js',
    library       : 'annoUI',
    libraryTarget : 'umd'
  },
  devServer: {
    contentBase: '.',
    inline : true,
  },
  devtool: 'source-map'
};
