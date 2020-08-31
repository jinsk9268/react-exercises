import React, { Component } from "react";
import First from "./components/First";
import Second from "./components/Second";
import Third from "./components/Third";
import "./index.scss";

// 객체 활용 클래스 밖에서 선언 상수니까
// 컴포넌트 벨류로 활용 가능
const obj = {
  0: <First />,
  1: <Second />,
  2: <Third />
}

// hover에도 사용 가능
export default class App extends Component {
  state ={
    activeTab: 0
  }

  handleClick = (id) => {
    // 확인용
    // console.log("clicked!");
    // 확인2
    // console.log(id)
    this.setState({activeTab: id})
  }


  render() {
    return (
      <div className="wrapper">
        <ul className="tabs">
          {/* 인자 안넘겨 줘도됨 값을 담아서 보내니까 */}
          {/* 클래스 이름에다가 값줘서 보이기... */}
          <li className={this.state.activeTab === 0 ? "active" : ""} onClick={() => this.handleClick(0)}>First</li>
          <li className={this.state.activeTab === 1 ? "active" : ""} onClick={() => this.handleClick(1)}>Second</li>
          <li className={this.state.activeTab === 2 ? "active" : ""} onClick={() => this.handleClick(2)}>Third</li>
        </ul>
        <div className="contents">
          {/* 객체에서 값 가져오는 방식 활용 */}
          {obj[this.state.activeTab]}
        </div>
      </div>
    );
  }
}

// 아이디 필요 (숫자로)
