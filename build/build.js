const path = require('path')
const webpack = require('webpack')

process.env.NODE_ENV = 'production'

const webpackConfig = {
    mode: 'production',
    entry: path.resolve(__dirname, '../src', 'main.js'),
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
            }
        ]
    },
    externals: {
        'pdfjs-dist': 'pdfjsLib',
    },
    output: {
        filename: 'pdf2img.min.js',
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/',
        library: 'pdf2img',
        libraryTarget: 'umd',
        libraryExport: 'default',
    }
}

console.log('build start!\n')

webpack(webpackConfig, () => {
    console.log('build complete!\n')
})