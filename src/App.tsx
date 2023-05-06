import bigImg from "@/assets/images/22kb.png";
import smallImg from "@/assets/images/5kb.png";
import "@/assets/styles/app.css";
import "@/assets/styles/app.less";
import "@/assets/styles/app.scss";
import Class from "@/components/Class";

const App = () => {
  return (
    <div className="app">
      <h2>react-cli</h2>
      <h3>scss</h3>
      <Class />
      <img src={smallImg} alt="小于10kb的图片" />
      <img src={bigImg} alt="大于于10kb的图片" />
      <div className="smallImg"></div> {/* 小图片背景容器 */}
      <div className="bigImg"></div> {/* 大图片背景容器 */}
    </div>
  );
};

export default App;
