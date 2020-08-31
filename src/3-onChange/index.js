import React, { Component } from "react";
import "./index.scss";

class index extends Component {
  state = {
    email: "",
    password: ""
  }

  changeHandler = (e) => {
    //input 태그에 이름(name)줘서 state key랑 똑같이주기
    // 이벤트 객체 안에 내가 지은 이름있음
    // console.log(e.target.name)
    // 객체의 속성을 이용해서 업데이트 객체에 []를 사용하면 변수, 계산 넣을수있음
    // 계산된 속성명 (검색 해보기)
    this.setState({[e.target.name]: e.target.value})
  }

  render() {
    return (
      <div className="onchange-wrapper">
        <div className="top">
          email: <input name="email" onChange={this.changeHandler}/>
          password: <input name="password" onChange={this.changeHandler} />
          <button>SUBMIT</button>
        </div>
        <div className="contents">
          <div>email</div>
          <div>password</div>
        </div>
      </div>
    );
  }
}

export default index;
