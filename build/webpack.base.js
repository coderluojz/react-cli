/*
 * @Author       : luojingzhou
 * @Date         : 2023-05-06 10:40:48
 * @FilePath     : /react-cli/build/webpack.base.js
 * @Description  : 基础配置
 */
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const resolve = (dir) => path.resolve(__dirname, dir);

module.exports = {
  // 入口文件
  entry: resolve("../src/index.tsx"),
  // 打包文件出口
  output: {
    filename: "static/js/[name].js", // 每个输出 js 的文件名称
    path: resolve("../dist"), // 打包结果输出文件路径
    clean: true, // 打包自动删除上一次的 dist 文件，webpack5 内置
    publicPath: "/", // 打包后文件的公共前缀路径
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"], // 引入模块时不带文件后缀 会找到该配置数组里面依次添加后缀查找文件
    alias: {
      "@": resolve("../src"),
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/, // 匹配 ts，tsx 文件
        use: "babel-loader",
        // 已经迁移至 babel.config.js
        // use: {
        //   loader: "babel-loader",
        //   options: {
        //     presets: [
        //       [
        //         "@babel/preset-react",
        //         {
        //           runtime: "automatic", // 配置后无需手动引入 React 即可使用 JSX
        //         },
        //       ],
        //       "@babel/preset-typescript",
        //     ],
        //   },
        // },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "postcss-loader", "less-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve("../public/index.html"),
      inject: true, // 自动注入静态资源
    }),
    new webpack.DefinePlugin({
      "process.env.BASE_ENV": JSON.stringify(process.env.BASE_ENV),
    }),
  ],
};
