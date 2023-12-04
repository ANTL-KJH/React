import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import styles from './Product.module.css';
import {Nav} from 'react-bootstrap';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {changeProductDetail} from '../store';
import Loading from "../components/Loading";

function Product(props) {
    let {idx} = useParams();
    let [tab, setTab] = useState(0);
    let serverAddr = useSelector((state) => state.serverAddr.serverAddress);
    let navigate = useNavigate();
    let dispatch = useDispatch();
    const productDetail = useSelector((state) => state.productDetail);
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true); // 로딩 상태를 추가합니다.

    const incrementQuantity = () => {
        setQuantity((prevQuantity) => prevQuantity + 1);
    };

    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity((prevQuantity) => prevQuantity - 1);
        }
    };
    const [showModal, setShowModal] = useState(false); // 모달 상태 추가

    // 장바구니 버튼 클릭 시 모달을 열기 위한 함수
    const handleCartButtonClick = () => {
        setShowModal(true);
        // 모달을 열 때 추가적인 로직이 있다면 여기에 추가할 수 있습니다.
    };
    const handleCloseModal = () => {
        setShowModal(false);
    };
    // 모달을 닫는 함수

    useEffect(() => {
        axios
            .post(`${serverAddr}/api/ProductDetail`, {productid: idx})
            .then((response) => {
                console.log(`${serverAddr}/api/ProductDetail`);
                dispatch(changeProductDetail(response.data));
                console.log(response.data);
                setLoading(false); // 데이터를 받아온 후 로딩 상태 변경
            })
            .catch((error) => {
                if (!axios.isCancel(error)) {
                    navigate('/error');
                }
                setLoading(false); // 에러 발생 시에도 로딩 상태 변경
            });
    }, [dispatch, navigate, idx, serverAddr]);

    if (loading) {
        return <Loading/>; // 로딩 중이면 로딩 컴포넌트를 보여줍니다.
    }

    return (
        <div className={styles.customProductDetailPage}>
            <div className={styles.customRow}>

                <img className={styles.customColImage} src={process.env.PUBLIC_URL + productDetail.imgpath}/>

                <div className={styles.customColContent}>
                    <div className={styles.productDetailTitle}>{productDetail.name}</div>
                    <div className={styles.productDetailDetail}>{productDetail.detail}</div>
                    <div className={styles.productDetailPrice}>{productDetail.price}원</div>
                    <div>
                        <label>상품 갯수 선택: </label>
                        <div>
                            <button onClick={decrementQuantity} className={styles.productQuantityBtn}>
                                <img className={styles.productPlusMinusIcon}
                                     src={process.env.PUBLIC_URL + '/img/minus-icon.png'} alt="Minus"/>
                            </button>
                            <span>{quantity}</span>
                            <button onClick={incrementQuantity} className={styles.productQuantityBtn}>
                                <img className={styles.productPlusMinusIcon}
                                     src={process.env.PUBLIC_URL + '/img/plus-icon.png'} alt="Plus"/>
                            </button>

                        </div>
                    </div>
                    <button className={styles.addCart} onClick={handleCartButtonClick}>장바구니</button>
                    {showModal && <div className={styles.modalBackdrop} onClick={handleCloseModal}></div>}

                    {/* 모달 컴포넌트 */}
                    {showModal && <Modal
                        setShowModal={setShowModal}
                        handleCloseModal={handleCloseModal}
                    />}
                    <Link to={`/checkout/`} onClick={() => {
                        localStorage.setItem('checkoutData', JSON.stringify({productId: idx, amount: quantity}))
                    }}>
                        <button className={styles.btnPurchase}>주문하기</button>
                    </Link>

                </div>
            </div>
            <Nav variant="tabs" defaultActiveKey="link0">
                <Nav.Item>
                    <Nav.Link eventKey="link0" onClick={() => {
                        setTab(0)
                    }}>상품설명</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link1" onClick={() => {
                        setTab(1)
                    }}>리뷰</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link2" onClick={() => {
                        setTab(2)
                    }}>Q&A</Nav.Link>
                </Nav.Item>
            </Nav>
            <TabContent tab={tab} productDetail={productDetail} idx={idx}/>
        </div>

    );
}

function TabContent({tab, productDetail, idx}) {
    return (
        <div>
            {
                [
                    <div className={styles.d1}>
                        <div className={styles.customTabDetailTitle}>{productDetail.name}</div>
                        <div className={styles.customTabDetailDetail}>{productDetail.detail}</div>

                        <img
                            className={styles.productDetailImage} src={process.env.PUBLIC_URL + productDetail.imgpath}
                            width="80%"/>
                    </div>,
                    <div className={styles.d2}>리뷰</div>,
                    <div className={styles.d3}>Q&A</div>
                ][tab]
            }
        </div>
    )
}

function Modal({ setShowModal,handleCloseModal }) {

    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <button className={styles.closeButton} onClick={handleCloseModal}>X</button>
                <div className={styles.modalText}>장바구니에 상품이 추가되었습니다.</div>
                <Link to={'/Cart'}>
                    <button className={styles.toCartButton}>장바구니로 이동</button>
                </Link>
                {/* 추가적인 내용은 여기에 추가할 수 있습니다. */}
            </div>
        </div>
    );
}

export default Product;