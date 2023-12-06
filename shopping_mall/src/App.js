import './App.css';
import { useState } from "react";
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import ProductCard from "./Pages/Home";
import Product from "./Pages/Product";
import NotFoundPage from "./Pages/NotFoundPage";
import ErrorPage from "./Pages/Error";
import Cart from "./Pages/Cart";
import RegisterPage from "./Pages/SignUp";
import Login from "./Pages/Login";
import Checkout from "./Pages/Checkout"
import CheckoutSuccess from "./Pages/CheckoutSuccess";
import React, { useRef, useEffect } from 'react';

function App() {
    let navigate = useNavigate();

    return (
        <div className="App">
            <MainNavbar navigate={navigate}></MainNavbar>
            <Routes>
                {/* 페이지 개수만큼 선언*/}
                <Route path="/" element={<div><ProductCard></ProductCard></div>} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/product/:idx" element={<div><Product ></Product></div>} />
                <Route path="/event" element={<div><h4>오늘의 이벤트</h4><Outlet></Outlet></div>}>
                    <Route path="one" element={<p>첫 주문시 5000원 할인</p>} />
                </Route>
                <Route path="/about" element={<div></div>}>
                    <Route path="member" element={<About />} />
                    <Route path="location" element={<About />} />
                </Route>
                <Route path="/error" element={<div><ErrorPage></ErrorPage></div>}></Route>
                <Route path="/login" element={<Login />} ></Route>
                <Route path="/signup" element={<RegisterPage />}></Route>
                <Route path="/checkout" element={<Checkout/>}></Route>
                <Route path="/checkoutsuccess" element={<CheckoutSuccess/>}></Route>
                <Route path="*" element={<div><NotFoundPage />찾을 수 없는 페이지입니다.</div>} />

            </Routes>


            {/*<button onClick={()=>{dispatch(changeProductData())}}>change</button>*/}
        </div>
    );
}

function MainNavbar({ navigate }) {
    {/*const loginState = useSelector((state) => state.loginState.loginState); // loginState 가져오기*/}
    const loginState = localStorage.getItem("loginState");
    {/*const userData = useSelector((state)=>state.userData);*/}
    const userEmail = localStorage.getItem('userEmail');
    {/*console.log('Login State:', loginState); // 콘솔에 loginState 출력*/}
    {/*console.log('userData:', userData);*/}
    const [showMenu, setShowMenu] = useState(false);
    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };
    const [burgerClicked, setBurgerClicked] = useState(false);
    const toggleBurgerClicked = () => {
        setBurgerClicked(!burgerClicked);
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 900 && showMenu) {
                setShowMenu(false);
                setBurgerClicked(false);
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [showMenu]);

    useEffect(() => {
        const hiddenNavbar = document.querySelector('.hiddenNavbar');

        if (hiddenNavbar) {
            if (showMenu) {
                hiddenNavbar.classList.remove('hide');
                // Force reflow to apply transition
                void hiddenNavbar.offsetWidth;
                hiddenNavbar.classList.add('show');
            } else {
                hiddenNavbar.classList.remove('show');
                // Force reflow to apply transition
                void hiddenNavbar.offsetWidth;
                hiddenNavbar.classList.add('hide');
            }
        }
    }, [showMenu]);
    return (
        <div className="navbar">
            <div className="navbarRow">
                <Link className="navImg" to={'/'}>
                    <img className="navImg" src={process.env.PUBLIC_URL + '/img/A-mall2.png'} alt="logo" />
                </Link>

                {/* 햄버거 아이콘 */}

                <button className="navMenuIcon" onClick={() => { toggleBurgerClicked(); toggleMenu(); }}>
                    {burgerClicked ? <img className='burgerIcon' src={process.env.PUBLIC_URL + '/img/burger-icon-x.png'} /> : <img className='burgerIcon' src={process.env.PUBLIC_URL + '/img/burger-icon.png'} />}
                </button>

                {/* 메뉴 - 조건부 렌더링 */}
                <div className="navbarMenuGroup">


                </div>

                <div className="navbarMenuRightGroup">
                    {loginState ? <div className="navbarLoginID">{userEmail}님</div>:null}
                    <Link className="navbarMenuRight" to={'/cart'}><img className="cartIcon" src={process.env.PUBLIC_URL + '/img/cart-icon.png'}/></Link>
                    {loginState ? <Link to={'/'}><button onClick={()=>{localStorage.clear()}} className="navbarLogout">로그아웃</button></Link>:null}
                    {loginState ? null : <Link className="navbarMenuRight" to={'/login'}>로그인</Link>}
                    {loginState ? null : <Link className="navbarMenuRight" to={'/signup'}>회원가입</Link>}

                </div>


            </div>
            {showMenu ? <div className = "hiddenNavbar">
                <div className="hiddenNavbarRow">

                    <Link className="hiddenNavbarMenu" to={'/cart'}>장바구니</Link>
                    {loginState ? <Link onClick={()=>localStorage.clear()} className="hiddenNavbarMenu" to={'/'}>로그아웃</Link>:null}
                    {loginState ? null : <Link className="hiddenNavbarMenu" to={'/login'}>로그인</Link>}
                    {loginState ? null : <Link className="hiddenNavbarMenu" to={'/signup'}>회원가입</Link>}

                </div>
            </div>:null}
        </div>
    );
}

function About() {
    return (
        <div></div>
    )
}

export default App;
