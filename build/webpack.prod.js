/*
 * @Author       : luojingzhou
 * @Date         : 2023-05-06 10:40:48
 * @FilePath     : /react-cli/build/webpack.prod.js
 * @Description  : 生产环境
 */
const { merge } = require("webpack-merge");
const baseConfig = require("./webpack.base.js");
module.exports = merge(baseConfig, {
  mode: "production", // 生产模式，会开启 tree-shaking 和压缩代码，以及其他优化
});
