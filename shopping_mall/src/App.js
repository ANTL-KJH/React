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
                    <Nav.Link onClick={()=>navigate("/cart")}>Cart</Nav.Link>
                    <Nav.Link onClick={()=>navigate("/event")}>Event</Nav.Link>
                    <Nav.Link onClick={()=>navigate("/about")}>About</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
        <Routes>
            {/* 페이지 개수만큼 선언*/}
            <Route path="/" element={<div><ProductCard></ProductCard></div>}/>
            <Route path="/cart" element={<Cart/>}/>
            <Route path="/product/:idx" element={<div><Product productData={productData}></Product></div>}/>
            <Route path="/event" element={<div><h4>오늘의 이벤트</h4><Outlet></Outlet></div>}>
                <Route path="one" element={<p>첫 주문시 5000원 할인</p>}/>
            </Route>
            <Route path="/about" element={<div></div>}>
                <Route path="member" element={<About/>}/>
                <Route path="location" element={<About/>}/>
            </Route>
            <Route path="/error" element={<div><ErrorPage></ErrorPage></div>}></Route>
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

function About(){
    return(
        <div>
            <h4>회사정보</h4>
            <Outlet></Outlet>
        </div>
    )
}


export default App;
