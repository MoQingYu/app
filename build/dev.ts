import path from 'path'
import { merge } from 'webpack-merge'
import { Configuration as WebpackConfiguration } from 'webpack'
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server'
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import baseConfig from './base'

type Configuration = WebpackConfiguration & {
  devServer?: WebpackDevServerConfiguration
}

const host = 'localhost'
const port = 8888

// 开发环境配置, 合并基础配置
const devConfig: Configuration = merge(baseConfig, {
  mode: 'development', // 开发模式
  /**
    开发环境推荐：eval-cheap-module-source-map
    - 本地开发首次打包慢点没关系,因为 eval 缓存的原因, 热更新会很快
    - 开发中,我们每行代码不会写的太长,只需要定位到行就行,所以加上 cheap
    - 我们希望能够找到源代码的错误,而不是打包后的,所以需要加上 module
  */
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    host,
    port,
    open: true, // 自动打开浏览器
    hot: true, // 开启热更新
    compress: false, // 开发环境不启用gzip压缩
    historyApiFallback: true, // 任意的 404 响应都被替代为 index.html
    setupExitSignals: true, // 捕获退出信号
    static: {
      directory: path.resolve(__dirname, '../public') // 静态资源目录
    },
    headers: {
      'Access-Control-Allow-Origin': '*' // 允许跨域
    },
    proxy: {
      '/api': {
        target: 'http://localhost:3001', // 代理到后端的服务地址
        pathRewrite: { '^/api': '' }, // 重写请求, 把/api开头的代理到target上
        changeOrigin: true // 支持跨域
      }
    }
  },
  plugins: [new ReactRefreshWebpackPlugin()]
})

export default devConfig
