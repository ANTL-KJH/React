import {Table} from "react-bootstrap";
import styles from './Cart.module.css';
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {changeProductDetail} from "../store";
import Loading from "../components/Loading";
import {Link, useNavigate} from 'react-router-dom';

function Cart() {
    let state = useSelector((state) => state)
    let navigate = useNavigate();
    let dispatch = useDispatch();
    const loginState = localStorage.getItem("loginState");

    let serverAddr = useSelector((state) => state.serverAddr.serverAddress);
    const [cartData, setCartData] = useState([]);
    const [loading, setLoading] = useState(true); // 로딩 상태를 추가합니다.
    useEffect(() => {
        if (!loginState) {
            navigate('/login');
        }
        axios
            .post(`${serverAddr}/api/Cart`, {user_email: localStorage.getItem('userEmail')})
            .then((response) => {
                console.log(response.data);
                setLoading(false); // 데이터를 받아온 후 로딩 상태 변경
                setCartData(response.data);
            })
            .catch((error) => {
                if (!axios.isCancel(error)) {
                    navigate('/error');
                }
                setLoading(false); // 에러 발생 시에도 로딩 상태 변경
            });
    }, [dispatch, navigate, serverAddr]);
    if (loading) {
        return <Loading/>; // 로딩 중이면 로딩 컴포넌트를 보여줍니다.
    }
    return (
        <CartProductCard cartData={cartData} setCartData={setCartData}/>
    )

}

function CartProductCard({cartData, setCartData}) {
    let navigate = useNavigate();
    let dispatch = useDispatch();
    let serverAddr = useSelector((state) => state.serverAddr.serverAddress);

    const [selectAll, setSelectAll] = useState(false);
    const [checkboxStates, setCheckboxStates] = useState(cartData.map(() => false));
    const totalProductPrice = cartData.reduce(
        (total, item, index) => {
            if (checkboxStates[index]) {
                return total + (item.price * item.amount);
            }
            return total;
        },
        0
    );
    const handleSelectAll = () => {
        const newSelectAll = !selectAll;
        setSelectAll(newSelectAll);
        setCheckboxStates(cartData.map(() => newSelectAll));
    };

    const handleSelectSingle = (index) => {
        const newCheckboxStates = [...checkboxStates];
        newCheckboxStates[index] = !newCheckboxStates[index];
        setCheckboxStates(newCheckboxStates);
        setSelectAll(newCheckboxStates.every((state) => state));
    };

    const checkSelectedProducts = (newCheckboxStates) => {
        const hasSelectedProducts = newCheckboxStates.some((state) => state);
        const orderButton = document.querySelector(`.${styles.purchaseBtn}`);
        if (orderButton) {
            orderButton.disabled = !hasSelectedProducts;
        }

    };

    useEffect(() => {
        checkSelectedProducts(checkboxStates); // 체크박스 상태가 변경될 때마다 실행하여 버튼 상태 업데이트
    }, [checkboxStates]);
    const handleSubmit = async (removeData) => {
        try {
            console.log("삭제할상품", removeData);
            const response = await axios.post(`${serverAddr}/api/CartDelete`, removeData)
                .then(response => {
                    setCartData(response.data);
                })
        } catch (error) {
            // 오류가 발생한 경우 에러 핸들링을 할 수 있습니다.
            console.error('Error:', error);
        }
    };
    const handleRemoveAll = () => {
        const removeData = cartData.map((product) => ({
            "user_email": localStorage.getItem('userEmail'),
            "productid": product.productid
        }));
        handleSubmit(removeData);
    };
    const handleRemoveSingle = (productID) => {
        // 개별 상품의 ID를 출력합니다.
        const removeData = [{"user_email": localStorage.getItem('userEmail'), "productid": productID}]
        handleSubmit(removeData)
    };
    const handleOrder = async () => {
        const selectedProducts = cartData.filter((_, index) => checkboxStates[index]);
        const selectedProductIDs = selectedProducts.map((product) => ({
            "productID": product.productid,
            "amount": product.amount
        }));
        localStorage.setItem('checkoutData', JSON.stringify(selectedProductIDs));
        let a = JSON.parse(localStorage.getItem('checkoutData'));
        console.log(a);
        navigate('/checkout')
        {/*try {


            console.log('here:', selectedProductIDs);
            axios.post(`${serverAddr}/api/Products`, selectedProductIDs)
                .then((response) => {
                    console.log('Response Data:', response.data);
                    // 여기에 응답 데이터를 사용하는 로직을 추가하세요
                })
                .catch((error) => {
                    // 에러가 발생한 경우 에러 핸들링을 할 수 있습니다.
                    console.error('Error:', error);
                });

        } catch (error) {
            // 오류가 발생한 경우 에러 핸들링을 할 수 있습니다.
            console.error('Error:', error);
        }*/
        }
    };

    // 배송비는 예시로 0원으로 가정
    const shippingCost = 0;

    // 주문 총액 계산 (상품 총액 + 배송비)
    const totalOrderAmount = totalProductPrice + shippingCost;


    return (
        <div className={styles.customCartRow}>
            <div className={styles.customCartRowHead}>
                <div className={styles.customCartColIndex}>
                    <input type="checkbox" checked={selectAll} onChange={handleSelectAll}/>
                </div>
                <div className={styles.customCartHeadImage}></div>
                <div className={styles.customCartHeadProductName}>상품명</div>
                <div className={styles.customCartHeadProductAmount}>수량</div>
                <div className={styles.customCartHeadProductPrice}>가격</div>
                <div className={styles.customCartHeadProductTotalPrice}>합계</div>
                <div className={styles.customCartHeadProductRemoveAll}>
                    <button className={styles.customCartHeadProductRemoveAllBtn} onClick={handleRemoveAll}>전체삭제</button>
                </div>
            </div>
            {
                cartData.map((item, i) =>
                    <div className={styles.customCartRowHead} key={i}>
                        <div className={styles.customCartColIndex}>
                            <input
                                type="checkbox"
                                checked={checkboxStates[i]}
                                onChange={() => handleSelectSingle(i)}
                            />
                        </div>
                        <div className={styles.customCartColImage}>
                            <img className={styles.cartProductImage}
                                 src={process.env.PUBLIC_URL + cartData[i].imgpath
                                 }/>
                        </div>
                        <div className={styles.customCartColProductName}>{item.name}</div>
                        <div className={styles.customCartColProductAmount}>{item.amount}</div>
                        <div className={styles.customCartColProductPrice}>{item.price}</div>
                        <div className={styles.customCartColProductTotalPrice}>{item.price * item.amount}</div>
                        <div className={styles.customCartColProductRemove}>
                            <button className={styles.customCartColProductRemoveBtn}
                                    onClick={() => handleRemoveSingle(item.productid)}>X
                            </button>
                        </div>
                    </div>
                )
            }
            <div className={styles.customCartEndRow}>
                <div>총 상품 가격: {totalProductPrice} 원</div>
                <div>배송비: {shippingCost} 원</div>
                <div>주문 총액: {totalOrderAmount} 원</div>

            </div>
            <div className={styles.purchaseButtonWrapper}>
                <button
                    className={`${styles.purchaseBtn} ${checkboxStates.some((state) => state) ? '' : styles.disabled}`}
                    onClick={handleOrder}>
                    주문하기
                </button>
            </div>


        </div>

    )

}

export default Cart