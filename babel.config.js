module.exports = {
  // 预设执行顺序由右到左，所以先处理 ts，在处理 jsx
  presets: [
    [
      "@babel/preset-env",
      {
        // 设置兼容目标浏览器版本,这里可以不写,babel-loader会自动寻找上面配置好的文件.browserslistrc
        // "targets": {
        //  "chrome": 35,
        //  "ie": 9
        // },
        useBuiltIns: "usage", // 根据 .browserslistrc 配置的浏览器兼容，以及代码中用到的 API 来进行 polyfill，实现了按需添加
        corejs: 3, // 使用 core-js 3版本
      },
    ],
    [
      "@babel/preset-react",
      {
        runtime: "automatic", // 配置后无需手动引入 React 即可使用 JSX
      },
    ],
    "@babel/preset-typescript",
  ],
  plugins: [["@babel/plugin-proposal-decorators", { legacy: true }]],
};
