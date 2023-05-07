/*
 * @Author       : luojingzhou
 * @Date         : 2023-05-06 10:40:48
 * @FilePath     : \react-cli\build\webpack.prod.js
 * @Description  : 生产环境
 */
const path = require("path");
const { merge } = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const baseConfig = require("./webpack.base.js");

const resolve = (dir) => path.resolve(__dirname, dir);

module.exports = merge(baseConfig, {
  mode: "production", // 生产模式，会开启 tree-shaking 和压缩代码，以及其他优化
  // 打包文件出口
  output: {
    filename: "static/js/[name].[hash].js", // 每个输出 js 的文件名称
    path: resolve("../dist"), // 打包结果输出文件路径
    clean: true, // 打包自动删除上一次的 dist 文件，webpack5 内置
    publicPath: "/", // 打包后文件的公共前缀路径
  },
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
    // 抽离 css 插件
    new MiniCssExtractPlugin({
      filename: "static/css/[name].[hash].css",
    }),
  ],
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(), // 压缩 css
      // 压缩 js
      new TerserPlugin({
        parallel: true, // 开启多线程压缩
        terserOptions: {
          compress: {
            pure_funcs: ["console.log"], // 删除 console.log
          },
        },
      }),
    ],
  },
});
