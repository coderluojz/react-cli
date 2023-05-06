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

const cssUse = ["style-loader", "css-loader", "postcss-loader"];
const generatefileName = (name) => `static/${name}/[name][ext]`;

module.exports = {
  // 入口文件
  entry: resolve("../src/index.tsx"),
  cache: {
    type: "filesystem", // 使用文件缓存
  },
  resolve: {
    // 如果用的是 pnpm 就暂时不要配置这个，会有幽灵依赖的问题，访问不到很多模块。
    modules: [resolve("../node_modules")], // 查找第三方模块只在本项目中的 node_modules 中查找
    extensions: [".js", ".jsx", ".ts", ".tsx"], // 引入模块时不带文件后缀 会找到该配置数组里面依次添加后缀查找文件
    alias: {
      "@": resolve("../src"),
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/, // 匹配 ts，tsx 文件
        include: [resolve("../src")], // 只对 src 文件下进行 loader 解析
        use: ["thread-loader", "babel-loader"],
      },
      {
        test: /\.css$/,
        use: cssUse,
      },
      {
        test: /\.less$/,
        use: [...cssUse, "less-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [...cssUse, "sass-loader"],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        type: "asset", // type 选择 asset
        generator: {
          filename: generatefileName("images"), // 文件输出目录和命名
        },
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于 10kb 转成 base64 位
          },
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/,
        type: "asset",
        generator: {
          filename: generatefileName("fonts"),
        },
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于 10kb 转成 base64 位
          },
        },
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)$/,
        type: "asset",
        generator: {
          filename: generatefileName("media"),
        },
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于 10kb 转成 base64 位
          },
        },
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
