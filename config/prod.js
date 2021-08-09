const { merge } = require("webpack-merge");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const baseConfig = require("./base");

const prodConfig = {
  mode: "production",
  devtool: 'source-map',
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin({
        parallel: 4
      }),
      new TerserPlugin({
        parallel: 4,
        extractComments: false,
      })
    ]
  }
}


module.exports = merge(baseConfig, prodConfig);