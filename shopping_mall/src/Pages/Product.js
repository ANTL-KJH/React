import './Product.module.css';
import {useParams} from "react-router-dom";
import styles from './Product.module.css';
import {Nav} from "react-bootstrap";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";

function Product(props){
    let {idx} = useParams();
    let [tab, setTab] = useState(0);
    return(
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <img src={process.env.PUBLIC_URL + props.productData[idx].imagePath} width="80%" />
            </div>
                <div className="col-md-6 mt-4">
                    <h4 className="pt-5">{props.productData[idx].title}</h4>
                    <p>{props.productData[idx].content}</p>
                    <p>{props.productData[idx].price}원</p>
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
            <TabContent tab={tab} productData={props.productData} idx={idx}/>
        </div>

    )
}
function TabContent({tab, productData, idx}){
    return(
        <div>
            {
                [
                    <div className={styles.d1}><h4>상품명:{productData[idx].title}<p/>상세설명:{productData[idx].content}<p/><img className= {styles.productDetailImage} src={process.env.PUBLIC_URL + productData[idx].imagePath} width="80%"/></h4></div>,
                    <div className={styles.d2} >리뷰</div>,
                    <div className={styles.d3}>Q&A</div>
                ][tab]
            }
        </div>
    )
}

export default Product;