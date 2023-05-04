const isDEV = process.env.NODE_ENV === 'development'

module.exports = {
  // 预设执行顺序从右到左，从下到上，所以先执行typescript，再执行react，最后执行env
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage', // 按需引入需要使用polyfill的地方
        corejs: 3, // 指定corejs的版本
        targets: {
          // 指定兼容的浏览器版本
          browsers: [
            '> 1%', // 全球超过1%的浏览器
            'last 2 versions', // 每个浏览器的最后两个版本
            'not ie <= 8' // 排除不支持es6的浏览器
          ]
        },
        loose: true // 开启宽松模式，使用非严格模式的代码
      }
    ], // 转换js的语法
    [
      '@babel/preset-react',
      {
        runtime: 'automatic' // 自动引入jsx的转换函数
      }
    ], // 转换react的语法
    '@babel/preset-typescript' // 转换typescript的语法
  ],
  plugins: [
    ['@babel/plugin-proposal-decorators', { legacy: true }], // 装饰器
    isDEV && 'react-refresh/babel' // 开发环境下，热更新
  ].filter(Boolean)
}
