/*
 * @Author       : luojz
 * @Date         : 2023-05-06 17:15:58
 * @FilePath     : /react-cli/build/webpack.analy.js
 * @Description  : 构建分析配置
 */
const { merge } = require("webpack-merge");
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const prodConfig = require("./webpack.prod.js");

const smp = new SpeedMeasurePlugin();

// 使用 smp.wrap 方法,把生产环境配置传进去,由于后面可能会加分析配置,所以先留出合并空位
module.exports = smp.wrap(merge(prodConfig, {}));
