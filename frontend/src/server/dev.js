import express from 'express'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackHotServerMiddleware from 'webpack-hot-server-middleware'
import proxy from './proxy'
import config from './../../webpack.dev.config.js'

const app = express()
const compiler = webpack(config)
const port = process.env.PORT | 8080

app.use(proxy)
app.use(
  webpackDevMiddleware(compiler, {
    serverSideRender: true,
  })
)
app.use(
  webpackHotMiddleware(
    compiler.compilers.find((compiler) => compiler.name === 'client')
  )
)
app.use(webpackHotServerMiddleware(compiler, { chunkName: 'm' }))

app.listen(port)