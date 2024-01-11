/*
* Project Name : React Shopping Mall(A-Mall) Home
* Program Purpose and Basic Features :
    * - A-Mall Home, 메인 페이지의 상품을 출력
* Program Author : JHKIM
* Date of original creation : 2023.11.28
* ==========================================================================
* Program History
* ==========================================================================
* Author    	Date		    Version		Content
* JHKIM			2023.11.28	    v1.0	    First Write
* JHKIM			2023.12.01	    v1.01	    서버통신기능 추가
* JHKIM			2023.12.06	    v1.02	    Navbar 디자인 수정, 아이콘 위치 변경
*/
import styles from './Home.module.css';
import {Link, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {changeProductData} from "../store";
import React, {useEffect, useRef, useState} from "react";
import HomeCarousel from "../components/HomeCarousel";
import Loading from "../components/Loading";
function ProductCard() {
    let navigate = useNavigate();
    let productData = useSelector((state) => state.productData);
    let serverAddr = useSelector((state) => state.serverAddr.serverAddress);
    let dispatch = useDispatch();
    const cancelRequest = useRef(null);
    const [loading, setLoading] = useState(true); // 로딩 상태
    useEffect(() => {
        cancelRequest.current = axios.CancelToken.source();
        axios.post(`${serverAddr}/api/Product`)
            .then((response) => {
                dispatch(changeProductData(response.data));console.log(response.data)
                setLoading(false); // 데이터를 받아온 후 로딩 상태 변경
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
    if (loading) {
        return <Loading/>; // 로딩 화면 출력
    }

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