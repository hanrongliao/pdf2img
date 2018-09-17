const path = require('path')
const express = require('express')
const webpack = require('webpack')
const webpackDevMiddileware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')

const webpackConfig = require('./dev.js')

const app = express()
const compiler = webpack(webpackConfig)
const hotMiddleware = webpackHotMiddleware(compiler, {
    log: false,
    heartbeat: 2000,
})

app.use(webpackDevMiddileware(compiler, {
    publicPath: webpackConfig.output.publicPath,
}))

app.use(hotMiddleware)

// 静态资源服务
const staticPath = path.posix.join('/', 'demo')
app.use(staticPath, express.static('./demo'))

app.listen(8002, () => {
    console.log('develop server is running on port 8002.\n')
})