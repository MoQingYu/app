const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlPlugin = require("html-webpack-plugin");
const autoprofixer = require("autoprefixer");

const projectRoot = process.cwd();

module.exports = {
  mode: "production",
  entry: {
    app: path.join(projectRoot, "src/index.ts")
  },
  output: {
    path: path.join(projectRoot, "dist"),
    filename: "[name]_[chunkhash:8].js"
  }, 
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        include: [path.join(projectRoot, "src")],
        loader: "babel-loader"
      }, {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: () => [
                  autoprofixer({
                    browsers: [
                      'last 2 version',
                      ">1%", 
                      "ios 7"
                    ]
                  })
                ]
              }
            }
          },
          "less-loader"
        ]
      }, {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader"
        ]
      }, {
        test: /\.(jpg|jpeg|png|gif|)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
              name: "[name]_[hash:8].[ext]" 
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "css/[name]_[contenthash:8].css",
    }),
    new HtmlPlugin()
  ],
  devServer: {
    contentBase: path.join(projectRoot, "dist"),
    port: 3000
  }
}