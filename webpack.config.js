const path = require('path')
const webpack = require('webpack')

module.exports = {
    entry  : {
        index : './src/index.js'
    },
    output : {
        path          : path.resolve(__dirname, 'dist'),
        filename      : '[name].js',
        library       : 'annoUI',
        libraryTarget : 'umd'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'eslint-loader',
                enforce: 'pre',
                include: [ path.join(__dirname, 'src') ],
                exclude: /node_modules/
            }
        ]
    }
  devtool: 'source-map'
}
