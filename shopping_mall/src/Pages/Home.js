import styles from './Home.module.css';
import {useNavigate} from 'react-router-dom';
import {useSelector} from "react-redux";
function ProductCard() {
    let navigate = useNavigate();
    let productData = useSelector((state) => state.productData);
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