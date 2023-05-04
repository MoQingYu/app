import path from 'path'
import { Configuration } from 'webpack'
import { merge } from 'webpack-merge'
import CopyPlugin from 'copy-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin'
import CompressionPlugin from 'compression-webpack-plugin'
import TerserPlugin from 'terser-webpack-plugin'
import baseConfig from './base'

const glob = require('glob-all')
const { PurgeCSSPlugin } = require('purgecss-webpack-plugin')

const prodConfig: Configuration = merge(baseConfig, {
  mode: 'production', // 生产模式
  plugins: [
    // 拷贝public目录到dist目录
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../public'),
          to: path.resolve(__dirname, '../dist'),
          filter: source => !/\.html$/.test(source) // 过滤html文件
        }
      ]
    }),
    // 抽离css
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[contenthash:5].css', // 打包后的css文件名称
      chunkFilename: 'static/css/[name].[contenthash:5].css' // 打包后的css文件名称
    }),
    // 去除无用的css
    new PurgeCSSPlugin({
      paths: glob.sync(
        [
          `${path.resolve(__dirname, '../src')}/**/*`,
          `${path.resolve(__dirname, '../public')}/index.html`
        ], // 需要做CSS Tree Shaking的路径文件
        { nodir: true } // 不匹配目录,只匹配文件
      ),
      only: ['dist'], // 只对dist目录下的文件进行css tree shaking
      safelist: {
        standard: [/^ant-/] // 保留ant-design的样式
      }
    }),
    // 打包时生成gzip文件
    new CompressionPlugin({
      test: /\.(js|css)$/, // 匹配文件名
      threshold: 10240, // 对超过10kb的数据进行压缩
      algorithm: 'gzip', // 使用gzip压缩
      filename: '[path][base].gz', // 压缩后的文件名称
      minRatio: 0.8 // 压缩率小于0.8才会压缩
    })
  ],
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(), // 压缩css
      new TerserPlugin({
        parallel: true, // 开启多进程压缩
        terserOptions: {
          compress: {
            drop_console: true, // 去除console.log
            drop_debugger: true // 去除debugger
          }
        }
      })
    ],
    runtimeChunk: {
      name: 'runtime'
    },
    splitChunks: {
      cacheGroups: {
        // 抽离第三方模块
        vendor: {
          name: 'vendor', // 模块名称
          test: /[\\/]node_modules[\\/]/, // 匹配规则
          chunks: 'initial', // all表示所有模块都可以使用,async表示只有异步加载的模块才可以使用,initial表示只有入口模块才可以使用
          priority: 1, // 优先级
          minChunks: 1, // 最小引用次数
          minSize: 0 // 最小尺寸
        },
        // 抽离公共模块
        common: {
          name: 'common', // 模块名称
          chunks: 'initial',
          minChunks: 2, // 最小引用次数
          minSize: 0 // 最小尺寸
        }
      }
    }
  },
  performance: {
    hints: false, // 关闭性能提示
    maxAssetSize: 4000000, // 文件最大大小
    maxEntrypointSize: 5000000 // 入口文件最大大小
  }
})

export default prodConfig
