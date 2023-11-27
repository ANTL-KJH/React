import './App.css';
import {Container, Nav,Navbar} from 'react-bootstrap';
import {useState} from "react";
import shoesData from './data';
import {Routes, Route, Link, useNavigate, Outlet} from 'react-router-dom';
import ProductCard from "./Pages/Home";
import Product from "./Pages/Product";
import NotFoundPage from "./Pages/NotFoundPage";
import axios from "axios";
import Error from "./Pages/Error";
import ErrorPage from "./Pages/Error";
import Cart from "./Pages/Cart";
import RegisterPage from "./Pages/SignUp";

function App() {
  let [productData] = useState(shoesData);
  let navigate = useNavigate();
  return (
    <div className="App">
        <MainNavbar navigate={navigate}></MainNavbar>


        <Routes>
            {/* 페이지 개수만큼 선언*/}
            <Route path="/" element={<div><ProductCard></ProductCard></div>}/>
            <Route path="/cart" element={<Cart/>}/>
            <Route path="/product/:idx" element={<div><Product ></Product></div>}/>
            <Route path="/event" element={<div><h4>오늘의 이벤트</h4><Outlet></Outlet></div>}>
                <Route path="one" element={<p>첫 주문시 5000원 할인</p>}/>
            </Route>
            <Route path="/about" element={<div></div>}>
                <Route path="member" element={<About/>}/>
                <Route path="location" element={<About/>}/>
            </Route>
            <Route path="/error" element={<div><ErrorPage></ErrorPage></div>}></Route>
            <Route path="/login" element={<div>login</div>}></Route>
            <Route path="/signup" element={<RegisterPage/>}></Route>
            <Route path="*" element={<div><NotFoundPage/>찾을 수 없는 페이지입니다.</div>}/>
        </Routes>

        {/*<button onClick={()=>{
            axios.get('C:\\Users\\ANTL\\Desktop\\GitHub\\React\\shopping_mall\\public\\data.json')
                .then((applecodingData)=>{console.log(applecodingData.data)})
                .catch(()=>navigate("/error"))
        }}>버튼</button>*/}

    </div>
  );
}
function  MainNavbar({navigate}){
    return(
        <div>
            <div className="navbar">
                <img className="navImg" src={process.env.PUBLIC_URL + '/img/A-mall2.png'} />
                <div className="navbarMenuGroup">
                    <Link className="navbarMenuLeft" to={'/'}>Home</Link>
                    <Link className="navbarMenuLeft" to={'/cart'}>Cart</Link>
                    <Link className="navbarMenuLeft" to={'/cart'}>Event</Link>
                    <Link className="navbarMenuLeft" to={'/cart'}>About</Link>
                </div>
                <div className="navbarMenuRightGroup">
                    <Link className="navbarMenuRight" to={'/login'}>로그인</Link>
                    <Link className="navbarMenuRight" to={'/signup'}>회원가입</Link>
                </div>
            </div>
        </div>

    )
}
function About(){
    return(
        <div></div>
    )
}


export default App;
