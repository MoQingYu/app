const { merge } = require("webpack-merge");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
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
      }),
      new BundleAnalyzerPlugin()
    ]
  }
}


module.exports = merge(baseConfig, prodConfig);