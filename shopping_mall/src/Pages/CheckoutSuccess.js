import styles from './CheckoutSuccess.module.css';
import React, {useEffect, useState} from "react";
import axios from "axios";
import {changeProductDetail} from "../store";
import {useDispatch, useSelector} from "react-redux";
import Loading from "../components/Loading";
import {Link, useNavigate} from 'react-router-dom';

function CheckoutSuccess() {
    let checkoutItemData = localStorage.getItem('checkoutData');
    let serverAddr = useSelector((state) => state.serverAddr.serverAddress);
    const [loading, setLoading] = useState(true); // 로딩 상태를 추가합니다.
    let navigate = useNavigate();
    let dispatch = useDispatch();
    const productDetail = useSelector((state) => state.productDetail);

    useEffect(() => {
        axios
            .post(`${serverAddr}/api/ProductDetail`, { productid: JSON.parse(checkoutItemData).productId })
            .then((response) => {
                console.log(`${serverAddr}/api/ProductDetail`);
                console.log(response.data);
                setLoading(false); // 데이터를 받아온 후 로딩 상태 변경
                dispatch(changeProductDetail(response.data));
            })
            .catch((error) => {
                if (!axios.isCancel(error)) {
                    navigate('/error');
                }
                setLoading(false); // 에러 발생 시에도 로딩 상태 변경
            });
    }, []);
    if (loading) {
        return <Loading/>; // 로딩 중이면 로딩 컴포넌트를 보여줍니다.
    }
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
                    <div className={styles.customCheckoutRow}>
                        <div className={styles.customCheckoutProductPicture}>
                            <img className={styles.productImage} src={process.env.PUBLIC_URL + productDetail.imgpath}/>
                        </div>
                        <div className={styles.customCheckoutProductName}>
                            {productDetail.name}
                        </div>
                        <div className={styles.customCheckoutProductPrice}>
                            {productDetail.price}
                        </div>
                        <div className={styles.customCheckoutProductAmount}>
                            {JSON.parse(checkoutItemData).amount}
                        </div>
                        <div className={styles.customCheckoutProductTotalPrice}>
                            {productDetail.price*JSON.parse(checkoutItemData).amount}
                        </div>
                    </div>
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
                            {JSON.parse(localStorage.getItem('pruchaseInfo')).receiverPhoneNumber}
                        </div>
                    </div>
                </div>
                <Link to={'/'}><button className={styles.gohomeButton}>홈으로 이동</button></Link>

            </div>

        </div>

    );
}


export default CheckoutSuccess;