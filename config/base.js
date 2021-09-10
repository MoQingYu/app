const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlPlugin = require("html-webpack-plugin");
const autoprofixer = require("autoprefixer");

const projectRoot = process.cwd();

module.exports = {
  entry: {
    app: path.join(projectRoot, "src/index")
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
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ]
      }, {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader"
        ]
      }, {
        test: /\.(jpg|jpeg|png|gif|)$/,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name]_[hash:8][ext]'
        },
        loader: "image-webpack-loader"
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "css/[name]_[contenthash:8].css",
    }),
    new HtmlPlugin({
      cache: true,
      favicon: false,
      template: path.join(projectRoot, "public/index.html")
    })
  ],
  resolve: {
    alias: {
      "@api": path.join(projectRoot, "src/api"),
      "@components": path.join(projectRoot, "src/components"),
      "@utils": path.join(projectRoot, "src/utils"),
      "@store": path.join(projectRoot, "src/store"),
      "@models": path.join(projectRoot, "src/models"),
      "@config": path.join(projectRoot, "src/config"),
    },
    extensions: [".js", ".jsx", ".ts", ".tsx", ".d.ts"]
  }
}