import styles from './CheckoutSuccess.module.css';
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Loading from "../components/Loading";
import {Link, useNavigate} from 'react-router-dom';

function CheckoutSuccess() {
    let checkoutItemData = JSON.parse(localStorage.getItem('checkoutData'));
    let receiverData = JSON.parse(localStorage.getItem('pruchaseInfo'));
    let serverAddr = useSelector((state) => state.serverAddr.serverAddress);
    const [loading, setLoading] = useState(true); // 로딩 상태를 추가합니다.
    let navigate = useNavigate();
    let dispatch = useDispatch();
    const [productDetail, setproductDetail] = useState(JSON.parse(sessionStorage.getItem('purchaseProductData')));

    //console.log("ffff", checkoutItemData)
    //console.log("rrrr",receiverData)
    const calculateTotalPrice = () => {
        let totalPrice = 0;
        productDetail.forEach((item, idx) => {
            totalPrice += item.price * checkoutItemData[idx].amount;
        });
        return totalPrice;
    };


// 총 주문 가격 계산
    const totalOrderPrice = calculateTotalPrice();
    return (
        <div className={styles.successPage}>
            <div><img className={styles.aMallLogo} src={process.env.PUBLIC_URL + '/img/A-mall2.png'}/></div>
            <div className={styles.thankyouText}>
                구매해주셔서 감사합니다.
            </div>
            <div className={styles.deliveryText}>
                구매하신 상품은 빠른 시일 내에 배송하겠습니다.
            </div>
            <div className={styles.productData}>
                <div className={styles.checkoutData}>상품정보</div>
                <div className={styles.checkoutCustomerDataBox}>
                    {
                        productDetail.map((item, idx) => (

                            <div className={styles.customCheckoutRow} key={idx}>
                                <div
                                    className={`${styles.customCheckoutProductPicture} ${
                                        idx === productDetail.length - 1 ? styles.customCheckoutProductPictureLast : ''
                                    }`}
                                >
                                    <img className={styles.productImage} src={process.env.PUBLIC_URL + item.imgpath}/>
                                </div>
                                <div
                                    className={`${styles.customCheckoutProductName} ${
                                        idx === productDetail.length - 1 ? styles.customCheckoutProductNameLast : ''
                                    }`}
                                >
                                    {item.name}
                                </div>
                                <div
                                    className={`${styles.customCheckoutProductPrice} ${
                                        idx === productDetail.length - 1 ? styles.customCheckoutProductPriceLast : ''
                                    }`}
                                >
                                    {item.price}
                                </div>
                                <div
                                    className={`${styles.customCheckoutProductAmount} ${
                                        idx === productDetail.length - 1 ? styles.customCheckoutProductAmountLast : ''
                                    }`}
                                >
                                    {checkoutItemData[idx].amount}
                                </div>
                                <div
                                    className={`${styles.customCheckoutProductTotalPrice} ${
                                        idx === productDetail.length - 1 ? styles.customCheckoutProductTotalPriceLast : ''
                                    }`}
                                >
                                    {item.price * checkoutItemData[idx].amount}
                                </div>
                            </div>
                        ))
                    }


                </div>
            </div>
            <div className={styles.receiver}>
                <div className={styles.receiverData}>
                    <div className={styles.checkoutReceiverData}>받는분 정보</div>

                </div>
                <div className={styles.checkoutCustomerDataBox}>
                    <div className={styles.customCheckoutRow}>
                        <div className={styles.customCheckoutColLeft}>
                            이름
                        </div>
                        <div className={styles.customCheckoutReceiverRight}>
                            {JSON.parse(localStorage.getItem('pruchaseInfo')).receiverName}
                        </div>
                    </div>

                    <div className={styles.customCheckoutRow}>
                        <div className={styles.customCheckoutColLeft}>
                            배송주소
                        </div>
                        <div className={styles.customCheckoutReceiverRight}>
                            {JSON.parse(localStorage.getItem('pruchaseInfo')).receiverAddr}
                        </div>
                    </div>
                    <div className={styles.customCheckoutRow}>
                        <div className={styles.customCheckoutColLeftLast}>
                            연락처
                        </div>
                        <div className={styles.customCheckoutReceiverRightLast}>
                            {JSON.parse(localStorage.getItem('pruchaseInfo')).phoneNumber}
                        </div>
                    </div>
                </div>


            </div>
            <div className={styles.totalPrice}>
                <div className={styles.totalPriceText}>
                    결제금액
                </div>

                <div className={styles.totalPriceVal}>
                    {totalOrderPrice} 원
                </div>
            </div>
            <Link to={'/'}>
                <button className={styles.gohomeButton}>홈으로 이동</button>
            </Link>
        </div>

    );
}


export default CheckoutSuccess;