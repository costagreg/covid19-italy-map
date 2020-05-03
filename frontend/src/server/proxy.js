import {createProxyMiddleware} from 'http-proxy-middleware'

const proxyOptions = {
  target: process.env.GRAPHQL_URL,
  changeOrigin: true
}

export default createProxyMiddleware('/graphql',proxyOptions)