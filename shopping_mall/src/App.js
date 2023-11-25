import logo from './logo.svg';
import './App.css';
import {Button, Container, Nav,Navbar, Row, Col} from 'react-bootstrap';
import {useState} from "react";
//import {a,b} from './data.js';
import shoesData from './data';
import {Routes, Route, Link, useNavigate, Outlet} from 'react-router-dom';
import ProductCard from "./Pages/Home";
import ProductDetail from "./Pages/ProductDetail";

function App() {
  let [productData] = useState(shoesData);
  let navigate = useNavigate();
  return (
    <div className="App">


        <Navbar bg="light" data-bs-theme="light">
            <Container>
                <Navbar.Brand href="/"><img src ={process.env.PUBLIC_URL + '/img/Amall-logo3.png'} width="100px" /></Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link onClick={()=>navigate("/")}>Home</Nav.Link>
                    <Nav.Link onClick={()=>navigate("/productDetail")}>1</Nav.Link>
                    <Nav.Link onClick={()=>navigate("/cart")}>Cart</Nav.Link>
                    <Nav.Link onClick={()=>navigate("/event")}>Event</Nav.Link>
                    <Nav.Link onClick={()=>navigate("/about")}>About</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
        <Routes>
            {/* 페이지 개수만큼 선언*/}
            <Route path="/" element={<div><ProductCard productData={productData}></ProductCard></div>}/>
            <Route path="/cart" element={<div>cart</div>}/>
            <Route path="/productDetail/:idx" element={<div><ProductDetail productData={productData}></ProductDetail></div>}/>
            <Route path="/event" element={<div><h4>오늘의 이벤트</h4><Outlet></Outlet></div>}>
                <Route path="one" element={<p>첫 주문시 5000원 할인</p>}/>
            </Route>
            <Route path="/about" element={<div></div>}>
                <Route path="member" element={<About/>}/>
                <Route path="location" element={<About/>}/>
            </Route>
            <Route path="*" element={<div>찾을 수 없는 페이지입니다.</div>}/>
        </Routes>

    </div>
  );
}

function About(){
    return(
        <div>
            <h4>회사정보</h4>
            <Outlet></Outlet>
        </div>
    )
}


export default App;
