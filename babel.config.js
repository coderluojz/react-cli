module.exports = {
  // 预设执行顺序由右到左，所以先处理 ts，在处理 jsx
  presets: [
    [
      "@babel/preset-react",
      {
        runtime: "automatic", // 配置后无需手动引入 React 即可使用 JSX
      },
    ],
    "@babel/preset-typescript",
  ],
};
