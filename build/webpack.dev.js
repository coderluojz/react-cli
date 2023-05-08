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
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");

const resolve = (dir) => path.resolve(__dirname, dir);

const port = process.env.POST || 3000;
const host = process.env.HOST || "localhost";

const devConfig = merge(baseConfig, {
  mode: "development", // 开发模式
  devtool: "eval-cheap-module-source-map", // 源码调试模式：eval 形式执行代码-定位到行代码-展示源代码中的错误位置
  devServer: {
    port,
    host,
    open: true,
    compress: false, // gzip 压缩，开发环境不开启，提升热更新速度
    hot: true, // 开启热更新
    historyApiFallback: true, // 解决 history 路由 404 问题
    client: {
      overlay: true, // 编译出现错误时，将错误直接显示在页面上
    },
    static: {
      directory: resolve("../public"), // 托管静态资源 public 文件夹
    },
  },
  plugins: [
    new ReactRefreshWebpackPlugin(), // 添加热更新插件
  ],
});

devConfig.plugins.push(
  new FriendlyErrorsWebpackPlugin({
    compilationSuccessInfo: {
      messages: [`Your application is running here: http://${host}:${port}`],
    },
  })
);
module.exports = devConfig;
