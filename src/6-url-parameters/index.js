import React, { Component } from "react";
import { Link } from "react-router-dom";
import Card from "../2-monsters/components/Card/Card";
import "./index.scss";

class index extends Component {
  // constructor -> render -> componentDidMount (state 업데이트 되면) -> render
  // 맨처음에 빈객체 찍히는 이유는 constructor 가 먼저 찍히면서 유저의 빈 객체 만들면서
  // 바로 렌더로 넘어가 빈객체 찍히고
  // 컴디마가 불리면서 스테이트가 업데이트 되면서
  // 유저가 꽉 찬다
  state = {
    // 들어오는 데이터에 따라 형식 맞춰주기 데이터가 배열이면 []
    user: {},
    currentId: 1,
  };

  // 라이프사이클!!!!!!!!!!!!!
  // 1. constructor -> 2. render -> 3. 컴디마 -> 다시 setState됐을때
  // -> render -> 컴디업 이 순으로
  // 컴포넌트 불렸을때 최초로 한번만 실행
  componentDidMount() {
    fetch(
      // `https://jsonplaceholder.typicode.com/users/${this.props.match.params.id}`
      `https://jsonplaceholder.typicode.com/users/${this.props.match.params.id}`
    )
      // arrow function인데 (res) => {return res.json()} 을 축약한거
      .then((res) => res.json())
      .then((res) => this.setState({ user: res }));
  }

  // 인자를 받는데 이전 props (매번 렌더가 불릴때마다 서로 다른게 있는지 체크한다), 이전 state도 감지 가능
  componentDidUpdate(prevProps, prevState) {
    // 확인용 콘솔
    // console.log(prevProps);
    // 이전 props의 match.params.id가 현재 props 의 match.params.id 와 다르다면
    // if 없으면 setState돼서 무한루프.. setState되면 render가 다시 되기 때문
    if (prevProps.match.params.id !== this.props.match.params.id) {
      // 다시한번 데이터 호출
      fetch(
        // `https://jsonplaceholder.typicode.com/users/${this.props.match.params.id}`
        `https://jsonplaceholder.typicode.com/users/${this.props.match.params.id}`
      )
        .then((res) => res.json())
        .then((res) => this.setState({ user: res }));
    }
  }

  changeM = () => {
    this.setState({ currentId: this.state.currentId - 1 });
  };

  changeP = () => {
    this.setState({ currentId: this.state.currentId + 1 });
  };

  idHandler = (calc) => {
    const { currentId } = this.state;

    if (calc === "+") {
      this.setState({ currentId: currentId + 1 });
      return currentId + 1;
    } else {
      this.setState({ currentId: currentId - 1 });
      return currentId - 1;
    }
  };

  render() {
    // 렌더는 항상 마지막에 돌기떄문에 렌더와 리턴 사이에 콘솔을 찍으면 좋다
    // props에 오는거 routes에 넘어오는 history
    console.log("this.props>>>", this.props);
    console.log("this.state>>>", this.state);
    // console.log("render");
    // console.log(this.state.user);

    // 비구조화 할당 (검색하기 distructure)
    // 이말과 같다
    // const id = this.state.user.id
    // const { id, name, email } = this.state 는 안된다 this.state 에는 id, name, email 키가 없기 때문
    const { id, name, email } = this.state.user;
    return (
      <div className="url-parameters">
        {/* 중괄호 {} 는 이안은 자바스크립트다 */}
        <Card id={id} name={name} email={email} />
        <div className="btn-wrapper">
          {/* <Link to="/abc"> */}
          {/* a태그는 전체 리로드 html 부터 다시 불러오니까, 링크태그는 싱글페이지 어플리케이션, 변하는것처럼 보여주니까 */}
          {/* 브라우저를 리프레쉬하지 않고 데이터 다시 불러오게 하기 위해 */}
          {/* 리프레쉬 하면 다 초기화돼서 모든걸 다시 불러와야 되니까 */}
          <button
            onClick={() => {
              //this.props.history.push(`/url-parameters/${id ? id - 1 : 1}`);
              this.props.history.push(
                `/url-parameters/${
                  this.state.currentId > 0 ? this.idHandler("-") : 1
                }`
              );
              // this.props.history.push(
              //   `/url-parameters/${
              //     this.state.currentId < 1 ? 1 : this.state.currentId
              //   }`
              // );
              // this.changeM();
            }}
          >
            Previous
          </button>
          {/* </Link> */}
          <button
            onClick={() => {
              //this.props.history.push(`/url-parameters/${id ? id + 1 : 1}`);
              this.props.history.push(
                `/url-parameters/${
                  this.state.currentId > 10 ? 10 : this.idHandler("+")
                }`
              );
              // this.props.history.push(
              //   `/url-parameters/${
              //     this.state.currentId > 10 ? 10 : this.state.currentId
              //   }`
              // );
              // this.changeP();
            }}
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}

export default index;
