import { useState } from 'react';
import './App.css';
import React from 'react';


function App() {
  /*let [a,b]=useState('영남대 맛집 추천')*/
  /*a는 변수 b는 state 변경을 도와주는 함수*/
  /*let a = '영남대 맛집';*/

  let [title, setTitle] = useState(['영남대 맛집', '정보통신공학과', '차세대 네트워킹 연구실', '객체지향프로그래밍', 'ANTL 파이팅'])
  let [heart, setHeart] = useState([0, 0, 0, 0, 0]);
  let [modal, setModal] = useState(false); // false이면 닫힘, true이면 열림
  let [modalTitle, setModalTitle] = useState(0);
  let [inputData, setInputData] = useState('');
  [1, 2, 3].map(function () { })
  {

  }
  return (
    <div className="App">
      <div className="black-nav">
        <h4>ANTL-Blog</h4>
      </div>

      <button className="button1" onClick={() => {
        let copy = [...title];
        copy[0] = '경산맛집 추천';
        setTitle(copy);
      }}>글수정</button>

      <button className="button2" onClick={() => {
        let copy = [...title].sort();
        setTitle(copy);
      }}>sort</button>


      {
        title.map(function (item, i) {
          return (
            <div className="list" key={i}>
              <h4 >
                <span onClick={() => {
                  if ((modal && modalTitle == i) || !modal) {
                    setModal(!modal);
                  }
                  setModalTitle(i);
                }}>{item}</span>
                <button className="button_heart" onClick={() => { let copy = [...heart]; copy[i] = copy[i] + 1; setHeart(copy) }}>❤</button> {heart[i]}
              </h4>
              <p>11월 {i + 1}일 발행</p>
              <button className="deleteButton" onClick={() => {
                let copy = [...title];
                copy.splice(i, 1);
                setTitle(copy);
              }}>
                삭제
              </button>

            </div>
          )
        })}

      {
        modal == true ? <Modal title={title} modalTitle={modalTitle} /> : null
      }
      <input type='text' onChange={(e) => { setInputData(e.target.value) }}></input>
      <button className="buttonInput" onClick={() => {
        let copy = [...title];
        copy.unshift(inputData);
        setTitle(copy);
        let copyHeart = [...heart];
        copyHeart.unshift(0);
        setHeart(copyHeart);
      }}>
        입력</button>

    </div >
  );
}


function Modal(props) {
  return (
    <div className="modal" style={{ background: 'green' }}>
      <h4>{props.title[props.modalTitle]}{props.heart}</h4>
      <p>날짜</p>
      <p>상세내용</p>
    </div>
    /*의미없는 <div></div>대신 <></> 사용 가능 */
  )
}

class Modal2 extends React.Component{
  constructor(){
    super();
    this.state={name:'kim', age:20}
  }
  render(){
    return(
      <div>안녕 {this.state.age}
      <button onClick={()=>{this.setState({age : 21})}}></button>        
      </div>
    )
  }
}

export default App;
