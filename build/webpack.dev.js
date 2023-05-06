/*
 * @Author       : luojingzhou
 * @Date         : 2023-05-06 10:40:48
 * @FilePath     : /react-cli/build/webpack.dev.js
 * @Description  : 开发环境
 */
const path = require("path");
const { merge } = require("webpack-merge");
const baseConfig = require("./webpack.base.js");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

const resolve = (dir) => path.resolve(__dirname, dir);

module.exports = merge(baseConfig, {
  mode: "development", // 开发模式
  devtool: "eval-cheap-module-source-map", // 源码调试模式
  devServer: {
    port: 3000,
    compress: false, // gzip 压缩，开发环境不开启，提升热更新速度
    hot: true, // 开启热更新
    historyApiFallback: true, // 解决 history 路由 404 问题
    static: {
      directory: resolve("../public"), // 托管静态资源 public 文件夹
    },
  },
  plugins: [
    new ReactRefreshWebpackPlugin(), // 添加热更新插件
  ],
});
