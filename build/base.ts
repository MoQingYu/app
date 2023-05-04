import { Configuration, DefinePlugin } from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import WebpackBar from 'webpackbar'
import * as dotenv from 'dotenv'
import path from 'path'

const isDEV = process.env.NODE_ENV === 'development'

const styleBaseLoaders = [
  isDEV ? 'style-loader' : MiniCssExtractPlugin.loader, // 开发环境使用style-loader, 生产环境使用MiniCssExtractPlugin.loader
  {
    loader: 'css-loader',
    options: {
      modules: {
        localIdentName: '[path][name]__[local]--[hash:5]'
      }
    }
  },
  'postcss-loader'
]

const env = dotenv.config({
  path: path.resolve(__dirname, `../env/.env.${process.env.BASE_ENV}`)
}).parsed

const baseConfig: Configuration = {
  entry: path.resolve(__dirname, '../src/index.tsx'), // 入口文件
  // 打包出口文件
  output: {
    filename: 'static/js/[name].[chunkhash:8].js', // 打包后的文件名称
    path: path.resolve(__dirname, '../dist'), // 打包后的目录
    publicPath: '/', // 打包后的资源的访问路径前缀
    clean: true // 清除上一次打包的文件
  },
  // loader配置
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/, // 排除node_modules目录,缩小构建目标
        use: [
          'thread-loader', // 多进程打包
          'babel-loader' // 使用babel-loader处理js或者ts文件
        ]
      },
      {
        test: /\.css$/,
        use: styleBaseLoaders
      },
      {
        test: /\.(scss|sass)$/, // 匹配所有的scss或者sass文件
        use: [...styleBaseLoaders, 'sass-loader']
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/, // 匹配图片文件
        type: 'asset', // 使用资源模块处理图片文件
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024 // 4kb以下的图片转换为base64
          }
        },
        generator: {
          filename: 'static/images/[name].[contenthash:8][ext]' // 打包后的图片文件名称
        }
      },
      {
        test: /\.(eot|ttf|woff2?|otf)(\?.*)?$/i, // 匹配所有的字体文件
        type: 'asset', // 使用资源模块处理字体文件
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024
          }
        },
        generator: {
          filename: 'static/fonts/[name].[contenthash:8][ext]' // 打包后的字体文件名称
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/, // 匹配所有的媒体文件
        type: 'asset', // 使用资源模块处理媒体文件
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024
          }
        },
        generator: {
          filename: 'static/media/[name].[contenthash:8][ext]' // 打包后的媒体文件名称
        }
      },
      {
        test: /\.json$/, // 匹配所有的json文件
        type: 'asset/resource', // 使用资源模块处理json文件
        generator: {
          filename: 'static/json/[name].[contenthash:8][ext]' // 打包后的json文件名称
        }
      }
    ]
  },
  // 插件配置
  plugins: [
    // 生成HTML文件
    new HtmlWebpackPlugin({
      title: 'My App', // HTML文件的title
      filename: 'index.html', // 生成的HTML文件名称
      favicon: path.resolve(__dirname, '../public/favicon.ico'), // favicon路径
      template: path.resolve(__dirname, '../public/index.html'), // 指定模板文件
      inject: true, // script标签位于html文件的 body 底部
      hash: true, // 给生成的 js 文件一个独特的 hash 值
      cache: false, // 不缓存生成的资源
      minify: {
        // 压缩HTML文件
        removeAttributeQuotes: true, // 移除属性的引号
        removeComments: true, // 移除HTML中的注释
        collapseWhitespace: true, // 删除空白符与换行符
        minifyCSS: true, // 压缩内联css
        minifyJS: true // 压缩内联js
      },
      nodeModules: path.resolve(__dirname, '../node_modules') // 避免将node_modules目录下的第三方代码打包进去
    }),
    new DefinePlugin({
      'process.env': JSON.stringify(env),
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.BASE_ENV': JSON.stringify(process.env.BASE_ENV)
    }),
    new WebpackBar({
      color: '#85d', // 进度条颜色
      basic: false, // 隐藏build信息
      profile: true // 显示各个步骤的耗时
    })
  ],
  // 配置模块如何解析
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'], // 支持的文件扩展名
    alias: {
      '@': path.resolve(__dirname, '../src') // @指向src目录
    },
    modules: [path.resolve(__dirname, '../node_modules')] // 指定第三方库目录
  },
  cache: {
    type: 'filesystem' // 使用文件缓存
  }
}

export default baseConfig
