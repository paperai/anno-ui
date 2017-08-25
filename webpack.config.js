const path = require('path')
const webpack = require('webpack')
const LiveReloadPlugin = require('webpack-livereload-plugin')

function resolve (dir) {
  return path.join(__dirname, dir)
}

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
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'eslint-loader',
                enforce: 'pre',
                include: [resolve('src')],
                exclude: /node_modules/,
                options: {
                    // formatter: require('eslint-friendly-formatter')
                }
            },
            // {
            //     test: /\.js$/,
            //     loader: 'babel-loader',
            //     include: [resolve('src')]
            // }
        ]
    },
  devServer: {
    contentBase: '.',
    inline : true,
  },
  devtool: 'source-map'
};
