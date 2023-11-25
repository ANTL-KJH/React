import {useParams} from "react-router-dom";

function ProductDetail(props){
    let {idx} = useParams();
    console.log(idx)
    return(
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <img src={process.env.PUBLIC_URL + props.productData[idx].imagePath} width="80%" />

            </div>
                <div className="col-md-6 mt-4">
                    <h4 className="pt-5">{props.productData[idx].title}</h4>
                    <p>{props.productData[idx].content}</p>
                    <p>{props.productData[idx].price}원</p>
                    <button className="btn-purchase">주문하기</button>
                    </div>
        </div>
        </div>
    )
}
export default ProductDetail;