import { PureComponent } from "react";

// 装饰器为组件添加 age 属性
function addAge(Target: Function) {
  Target.prototype.age = 111;
}
// 使用装饰器
@addAge
export class Class extends PureComponent {
  age?: number;

  render() {
    return <div>类组件：{this.age}</div>;
  }
}

export default Class;
