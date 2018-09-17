const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, '../src', 'main.js'),
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../demo', 'index.html')
        })
    ],
    output: {
        filename: 'pdf2img.min.js',
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/',
        library: 'pdf2img',
        libraryTarget: 'umd',
        libraryExport: 'default',
    }
}


