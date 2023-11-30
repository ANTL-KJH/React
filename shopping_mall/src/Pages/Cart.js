import {Table} from "react-bootstrap";
import styles from './Cart.module.css';
import {useSelector} from "react-redux";

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
    if (!state || !state.cartData) {
        return <div>카트에 상품이 없습니다.</div>;
    }
    return (

        <div className={styles.customCartRow}>
            <div className={styles.customCartRowHead}>
                <div>#</div>
                <div>상품명</div>
                <div>수량</div>
                <div>가격</div>
            </div>
            {
                state.cartData.map((item, i) =>
                    <tr key={i}>
                        <td>{i + 1}</td>
                        <img className={styles.cartProductImage}
                             src={process.env.PUBLIC_URL + state.cartData[i].imagePath}/>
                        <td>{item.title}</td>
                        <td>{item.quantity}</td>
                        <td>{item.price}</td>
                    </tr>
                )
            }
            <Table>
                <thead>

                <th>#</th>
                <th>상품명</th>
                <th>수량</th>
                <th>가격</th>

                </thead>

                <tbody>{
                    state.cartData.map((item, i) =>
                        <tr key={i}>
                            <td>{i + 1}</td>
                            <img className={styles.cartProductImage}
                                 src={process.env.PUBLIC_URL + state.cartData[i].imagePath}/>
                            <td>{item.title}</td>
                            <td>{item.quantity}</td>
                            <td>{item.price}</td>
                        </tr>
                    )
                }
                </tbody>


            </Table>
        </div>

    )

}

export default Cart