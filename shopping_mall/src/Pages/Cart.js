import {Table} from "react-bootstrap";
import styles from './Cart.module.css';
import {useSelector} from "react-redux";
import React, { useState } from "react";
function Cart() {
    let state = useSelector((state) => state)

    return (
        <CartProductCard/>
    )

}

function CartProductCard() {
    let state = useSelector((state) => {
        return state
    })
    const [selectAll, setSelectAll] = useState(false);
    if (!state || !state.cartData) {
        return <div>카트에 상품이 없습니다.</div>;

    }
    const handleSelectAll = () => {
        setSelectAll(!selectAll);
    };
    const totalProductPrice = state.cartData.reduce(
        (total, item) => total + (item.price * item.quantity),
        0
    );

    // 배송비는 예시로 3000원으로 가정
    const shippingCost = 3000;

    // 주문 총액 계산 (상품 총액 + 배송비)
    const totalOrderAmount = totalProductPrice + shippingCost;
    return (

        <div className={styles.customCartRow}>
            <div className={styles.customCartRowHead}>
                <div className={styles.customCartColIndex}><input type="checkbox" checked={selectAll}
                                                                  onChange={handleSelectAll}/></div>
                <div className={styles.customCartColImage}></div>
                <div className={styles.customCartColProductName}>상품명</div>
                <div className={styles.customCartColProductAmount}>수량</div>
                <div className={styles.customCartColProductPrice}>가격</div>
                <div className={styles.customCartColProductTotalPrice}>합계</div>
            </div>
            {
                state.cartData.map((item, i) =>
                    <div className={styles.customCartRowHead}>
                        <div className={styles.customCartColIndex}><input type="checkbox" checked={selectAll}/></div>
                        <div className={styles.customCartColImage}>
                            <img className={styles.cartProductImage}
                                 src={process.env.PUBLIC_URL + state.cartData[i].imagePath}/>
                        </div>

                        <div className={styles.customCartColProductName}>{item.title}</div>
                        <div className={styles.customCartColProductAmount}>{item.quantity}</div>
                        <div className={styles.customCartColProductPrice}>{item.price}</div>
                        <div className={styles.customCartColProductTotalPrice}>{item.price * item.quantity}</div>
                    </div>
                )
            }
            <div className={styles.customCartEndRow}>
                <div >총 상품 가격: {totalProductPrice}원</div>
                <div>배송비: {shippingCost}원</div>
                <div>주문 총액: {totalOrderAmount}원</div>
            </div>

        </div>

    )

}

export default Cart