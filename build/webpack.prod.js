/*
 * @Author       : luojingzhou
 * @Date         : 2023-05-06 10:40:48
 * @FilePath     : /react-cli/build/webpack.prod.js
 * @Description  : 生产环境
 */
const path = require("path");
const { merge } = require("webpack-merge");
const CopyPlugin = require("copy-webpack-plugin");
const baseConfig = require("./webpack.base.js");

const resolve = (dir) => path.resolve(__dirname, dir);

module.exports = merge(baseConfig, {
  mode: "production", // 生产模式，会开启 tree-shaking 和压缩代码，以及其他优化
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: resolve("../public"), // 复制 public 下的文件
          to: resolve("../dist"), // 复制到 dist 文件夹下
          filter: (source) => !source.includes("index.html"), // 忽略 index.html 文件，因为html-webpack-plugin会以public下的index.html为模板生成一个index.html到dist文件下
        },
      ],
    }),
  ],
});
