import styles from './Home.module.css';
import {Link, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {changeProductData} from "../store";
import React, { useEffect, useRef } from "react";
import HomeCarousel from "../components/HomeCarousel";
function ProductCard() {
    let navigate = useNavigate();
    let productData = useSelector((state) => state.productData);
    let serverAddr = useSelector((state) => state.serverAddr.serverAddress);
    let dispatch = useDispatch();
    const cancelRequest = useRef(null);

    useEffect(() => {
        cancelRequest.current = axios.CancelToken.source();
        axios.post(`${serverAddr}/api/Product`)
            .then((response) => {
                dispatch(changeProductData(response.data));console.log(response.data)
            })
            .catch((error) => {
                if (!axios.isCancel(error)) {
                    navigate("/error");
                }
            });
        return () => {
            // 컴포넌트가 언마운트될 때 요청 취소
            if (cancelRequest.current) {
                cancelRequest.current.cancel("Component unmounted");
            }
        };
    }, [dispatch, navigate]);

    return (
        <div>
            <HomeCarousel></HomeCarousel>
            <div className={styles.customMainRow}>

                {productData.map((product, i) => (
                    <div className={styles.customCol} key={i}>
                        <Link to={`/product/${product.productid}`}>
                            <img className={styles.customColImg} src={process.env.PUBLIC_URL + product.imgpath} alt="logo" />
                        </Link>
                        <div className={styles.customColProductText}>
                            <Link to={`/product/${product.productid}`} className={styles.customColProductTitle}>{product.name}</Link>
                            <div className={styles.customColProductPrice}>{product.price}원</div>
                            <div className={styles.customColProductRemainAmount}>남은수량:{product.amount - product.TotalSales}</div>
                        </div>
                    </div>
                ))}

            </div>
        </div>

    );
}


export default ProductCard;