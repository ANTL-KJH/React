import './App.css';
import {useState} from "react";
import {Routes, Route, Link, useNavigate} from 'react-router-dom';
import ProductCard from "./Pages/Home";
import Product from "./Pages/Product";
import NotFoundPage from "./Pages/NotFoundPage";
import ErrorPage from "./Pages/Error";
import Cart from "./Pages/Cart";
import RegisterPage from "./Pages/SignUp";
import Login from "./Pages/Login";
import Checkout from "./Pages/Checkout"
import CheckoutSuccess from "./Pages/CheckoutSuccess";
import React, {useEffect} from 'react';

function App() {
    let navigate = useNavigate();

    return (
        <div className="App">
            <MainNavbar navigate={navigate}></MainNavbar>
            {/*페이지 라우팅*/}
            <Routes>
                {/* 페이지 개수만큼 선언*/}
                <Route path="/" element={<div><ProductCard></ProductCard></div>}/>
                <Route path="/cart" element={<Cart/>}/>
                <Route path="/product/:idx" element={<div><Product></Product></div>}/>

                <Route path="/error" element={<div><ErrorPage></ErrorPage></div>}></Route>
                <Route path="/login" element={<Login/>}></Route>
                <Route path="/signup" element={<RegisterPage/>}></Route>
                <Route path="/checkout" element={<Checkout/>}></Route>
                <Route path="/checkoutsuccess" element={<CheckoutSuccess/>}></Route>
                <Route path="*" element={<div><NotFoundPage/>찾을 수 없는 페이지입니다.</div>}/>
            </Routes>
        </div>
    );
}

function MainNavbar() {
    const loginState = localStorage.getItem("loginState");
    const userEmail = localStorage.getItem('userEmail');
    const [showMenu, setShowMenu] = useState(false);
    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };
    const [burgerClicked, setBurgerClicked] = useState(false);
    const toggleBurgerClicked = () => {
        setBurgerClicked(!burgerClicked);
    };
    useEffect(() => {
        const hiddenNavbar = document.querySelector('.hiddenNavbar');
        if (hiddenNavbar) {
            // showMenu 값에 따라 네비게이션 바의 표시 여부를 조절
            if (showMenu) {
                // 네비게이션 바를 표시하기 위해 클래스를 변경
                hiddenNavbar.classList.remove('hide'); // 'hide' 클래스 제거
                hiddenNavbar.classList.add('show'); // 'show' 클래스 추가
            } else {
                // 네비게이션 바를 숨기기 위해 클래스를 변경
                hiddenNavbar.classList.remove('show'); // 'show' 클래스 제거
                hiddenNavbar.classList.add('hide'); // 'hide' 클래스 추가
            }
        }
    }, [showMenu]);

    return (
        <div className="navbar">
            <div className="navbarRow">
                <Link className="navImg" to={'/'}>
                    <img className="navImg" src={process.env.PUBLIC_URL + '/img/A-mall2.png'} alt="logo"/>
                </Link>

                {/* 햄버거 아이콘 */}
                <button className="navMenuIcon" onClick={() => {
                    toggleBurgerClicked();
                    toggleMenu();
                }}>
                    {burgerClicked ?
                        <img className='burgerIcon' src={process.env.PUBLIC_URL + '/img/burger-icon-x.png'}/> :
                        <img className='burgerIcon' src={process.env.PUBLIC_URL + '/img/burger-icon.png'}/>}
                </button>

                <div className="navbarMenuRightGroup">
                    {loginState ? <div className="navbarLoginID">{userEmail}님</div> : null}
                    <Link className="navbarMenuRight" to={'/cart'}><img className="cartIcon"
                                                                        src={process.env.PUBLIC_URL + '/img/cart-icon.png'}/></Link>
                    {loginState ? <Link to={'/'}>
                        <button onClick={() => {
                            localStorage.clear()
                        }} className="navbarLogout">로그아웃
                        </button>
                    </Link> : null}
                    {loginState ? null : <Link className="navbarMenuRight" to={'/login'}>로그인</Link>}
                    {loginState ? null : <Link className="navbarMenuRight" to={'/signup'}>회원가입</Link>}
                </div>
            </div>
            {showMenu ? <div className="hiddenNavbar">
                <div className="hiddenNavbarRow">

                    <Link className="hiddenNavbarMenu" to={'/cart'}>장바구니</Link>
                    {loginState ? <Link onClick={() => localStorage.clear()} className="hiddenNavbarMenu"
                                        to={'/'}>로그아웃</Link> : null}
                    {loginState ? null : <Link className="hiddenNavbarMenu" to={'/login'}>로그인</Link>}
                    {loginState ? null : <Link className="hiddenNavbarMenu" to={'/signup'}>회원가입</Link>}

                </div>
            </div> : null}
        </div>
    );
}

export default App;
