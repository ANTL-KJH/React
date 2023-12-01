import './Product.module.css';
import {useNavigate, useParams} from "react-router-dom";
import styles from './Product.module.css';
import {Nav} from "react-bootstrap";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {changeProductDetail} from "../store";
function Product(props){
    let {idx} = useParams();
    let [tab, setTab] = useState(0);
    let serverAddr = useSelector((state) => state.serverAddr.serverAddress);
    let navigate = useNavigate();
    let dispatch = useDispatch()
    const productDetail = useSelector((state) => state.productDetail);
    useEffect(() => {
        axios.post(`${serverAddr}/api/ProductDetail`, { "productid": idx })
            .then((response) => {
                console.log(`${serverAddr}/api/ProductDetail`);
                dispatch(changeProductDetail(response.data));
                console.log(response.data);
            })
            .catch((error) => {
                if (!axios.isCancel(error)) {
                    navigate("/error");
                }
            });
    }, [dispatch, navigate, idx, serverAddr]);
    return(

        <div className="container">
            <div className={styles.customRow}>
                <div className={styles.customColImage}>
                    <img src={process.env.PUBLIC_URL + productDetail.imgpath} width="80%" />
                </div>
                <div className={styles.customColContent}>
                    <h4 className="pt-5">{productDetail.name}</h4>
                    <p>{productDetail.detail}</p>
                    <p>{productDetail.price}원</p>
                    <button className={styles.addCart}>장바구니</button>
                    <button className={styles.btnPurchase}>주문하기</button>
                </div>
            </div>
            <Nav variant="tabs" defaultActiveKey ="link0">
                <Nav.Item>
                    <Nav.Link  eventKey="link0" onClick={() => { setTab(0) }}>상품설명</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link1" onClick={()=>{setTab(1)}}>리뷰</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link2" onClick={()=>{setTab(2)}}>Q&A</Nav.Link>
                </Nav.Item>
            </Nav>
            <TabContent tab={tab} productDetail={productDetail} idx={idx}/>
        </div>

    )
}
function TabContent({tab, productDetail, idx}){
    return(
        <div>
            {
                [
                    <div className={styles.d1}><h4>상품명:{productDetail.name}<p/>상세설명:{productDetail.content}<p/><img className= {styles.productDetailImage} src={process.env.PUBLIC_URL + productDetail.imgpath} width="80%"/></h4></div>,
                    <div className={styles.d2} >리뷰</div>,
                    <div className={styles.d3}>Q&A</div>
                ][tab]
            }
        </div>
    )
}

export default Product;