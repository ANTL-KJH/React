import {Table} from "react-bootstrap";
import './Cart.module.css';
import {useSelector} from "react-redux";
function Cart() {
    let state = useSelector((state)=>{return state})
    return(
        <div>
            <Table>
                <thead>
                <tr>{/*가로 줄*/}
                    <th>#</th>
                    <th>상품명</th>
                    <th>수량</th>
                    <th>가격</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>1</td>
                    <td>2</td>
                    <td>3</td>
                    <td>4</td>
                </tr>
                </tbody>
            </Table>
        </div>
        )

}
export default Cart