function ProductCard(props) {
    return (
        <div className="row">
            {props.productData.map((product, i) => (
                <div className="col-md-4" key={i}>
                    <img src={process.env.PUBLIC_URL + product.imagePath} width="80%" alt={`Product ${i}`} />
                    <h4>{product.title}</h4>
                    <p>{product.price}원</p>
                </div>
            ))}
        </div>
    );
}
export default ProductCard;