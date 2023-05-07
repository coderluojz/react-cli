/*
 * @Author       : luojingzhou
 * @Date         : 2023-05-06 10:40:48
 * @FilePath     : \react-cli\build\webpack.prod.js
 * @Description  : 生产环境
 */
const path = require("path");
const { merge } = require("webpack-merge");
const { PurgeCSSPlugin } = require("purgecss-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const globAll = require("glob-all");
const baseConfig = require("./webpack.base.js");

const resolve = (dir) => path.resolve(__dirname, dir);

module.exports = merge(baseConfig, {
  mode: "production", // 生产模式，会开启 tree-shaking 和压缩代码，以及其他优化
  // 打包文件出口
  output: {
    filename: "static/js/[name].[chunkhash:8].js", // 每个输出 js 的文件名称
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
      filename: "static/css/[name].[contenthash:8].css",
    }),
    // 清理无用的 css
    new PurgeCSSPlugin({
      // 只检测 src 下面所有 tsx 和 public 下面 index.html 中使用的类名和 id 和标签名称
      // 只打包这些文件中用到的样式
      paths: globAll.sync([
        `${path.join(__dirname, "../src")}/**/*.tsx`,
        path.join(__dirname, "../public/index.html"),
      ]),
      safelist: {
        standard: [/^ant-/], // 过滤以ant-开头的类名，哪怕没用到也不删除
      },
    }),
    new CompressionPlugin({
      test: /.(js|css)$/, // 只生成css, js压缩文件
      filename: "[path][base].gz", // 文件命名
      algorithm: "gzip", // 压缩格式,默认是gzip
      test: /.(js|css)$/, // 只生成css, js压缩文件
      threshold: 10240, // 只有大小大于该值的资源会被处理。默认值是 10k
      minRatio: 0.8, // 压缩率,默认值是 0.8
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
    // 分割代码
    splitChunks: {
      cacheGroups: {
        // 提取node_modules代码
        vendors: {
          test: /node_modules/, // 只匹配 node_modules 里面的模块
          name: "vendors", // 提取文件命名为 vendors, js后缀和 chunkhash 会自动加
          minChunks: 1, // 只要使用一次就提取出来
          chunks: "initial", // 只提取初始化就能获取到的模块,不管异步的
          minSize: 0, // 提取代码体积大于0就提取出来
          priority: 1, // 提取优先级为1
        },
        commons: {
          // 提取页面公共代码
          name: "commons", // 提取文件命名为 commons
          minChunks: 2, // 只要使用两次就提取出来
          chunks: "initial", // 只提取初始化就能获取到的模块,不管异步的
          minSize: 0, // 提取代码体积大于0就提取出来
        },
      },
    },
  },
});
