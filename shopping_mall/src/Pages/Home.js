import styles from './Home.module.css';
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {changeProductData} from "../store";
import React, { useEffect } from "react";
function ProductCard() {
    let navigate = useNavigate();
    let productData = useSelector((state) => state.productData);
    let dispatch = useDispatch()
    useEffect(() => {
        axios.post('http://localhost:8080/api')
            .then((response) => {
                dispatch(changeProductData(response.data));
            })
            .catch(() => navigate("/error"));
    }, [dispatch, navigate]);
    const handleImageClick = (product) => {
        // 특정 주소로 이동하는 로직 구현
        navigate(`/product/${product.id}`); // 예시로 product의 id를 사용하여 이동하도록 설정
    };
    return (
        <div className={styles.customMainRow}>
            {productData.map((product, i) => (
                <div className={styles.customCol} key={i}>
                    <a href={`/product/${product.id}`} onClick={() => handleImageClick(product)}>
                        <img className={styles.customColImg} src={process.env.PUBLIC_URL + product.imagePath} alt={product.title} />
                    </a>
                    <h4>{product.title}</h4>
                    <p>{product.price}원</p>
                </div>
            ))}

        </div>
    );
}
export default ProductCard;