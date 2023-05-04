import SpeedMeasurePlugin from 'speed-measure-webpack-plugin'
import { merge } from 'webpack-merge'
import prodConfig from './prod'

const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

const smp = new SpeedMeasurePlugin({
  pluginNames: {
    /**
     * 解决 MiniCssExtractPlugin 和 speed-measure-webpack-plugin 冲突问题
     * 两个插件同时使用会报错：
     * Error: You forgot to add 'mini-css-extract-plugin' plugin (i.e. `{ plugins: [new MiniCssExtractPlugin()] }`),
     * please read https://github.com/webpack-contrib/mini-css-extract-plugin#getting-started
     */
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    MiniCssExtractPlugin: false
  }
})

const analyConfig = smp.wrap(
  merge(prodConfig, {
    plugins: [
      new BundleAnalyzerPlugin() // 打包分析
    ]
  })
)

export default analyConfig
