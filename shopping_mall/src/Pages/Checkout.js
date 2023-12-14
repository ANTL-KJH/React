import styles from "./Checkout.module.css";
import React, {useEffect, useRef} from "react";
import {useState} from "react";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from 'react-router-dom';
import Loading from "../components/Loading";

function Checkout() {

    return (
        <CheckoutPage></CheckoutPage>
    );

}

function CheckoutPage() {
    let checkoutItemData = JSON.parse(localStorage.getItem('checkoutData'));
    console.log("aaaa", checkoutItemData)

    // checkoutData에서 id만 추출하여 ID 배열 생성
    const productIDs = checkoutItemData.map(item => ({productID: item.productID}));
    console.log("bbbb", productIDs)


    const [productDetail, setproductDetail] = useState([]);
    const [loading, setLoading] = useState(true); // 로딩 상태를 추가합니다.
    const [addressIndex, setaddressIndex] = useState(0);
    let navigate = useNavigate();
    let dispatch = useDispatch();
    let serverAddr = useSelector((state) => state.serverAddr.serverAddress);
    const [customerData, setCustomerData] = useState({
        name: '',
        email: '',
        phoneNumber: ''
    });
    const [showModal, setShowModal] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState(""); // 상태값 추가
    const cancelRequest = useRef(null);
    const [receiverInfo, setReceiverInfo] = useState([{
        deliveryid: '',
        name: '',
        address: '',
        phoneNumber: ''
    }]);


    useEffect(() => {

        cancelRequest.current = axios.CancelToken.source();
        axios.post(`${serverAddr}/api/UserInfo`, {user_email: localStorage.getItem('userEmail')})
            .then((response) => {
                console.log("qqqq",response.data);

                setCustomerData({
                    name: response.data.username,
                    email: localStorage.getItem('userEmail'),
                    phoneNumber: response.data.phoneNumber

                });
            })
            .catch((error) => {
                if (!axios.isCancel(error)) {
                    navigate("/error");
                }
            });
        axios.post(`${serverAddr}/api/GetAddr`, {user_email: localStorage.getItem('userEmail')})
            .then((response) => {
                console.log(response.data);
                const receiverData = response.data.map(item => ({
                    deliveryid: item.deliveryid,
                    name: item.name,
                    address: item.address,
                    phoneNumber: item.phoneNumber
                }));
                setReceiverInfo(receiverData);

            })
            .catch((error) => {
                if (!axios.isCancel(error)) {
                    navigate("/error");
                }
            });
        axios
            .post(`${serverAddr}/api/Products`, productIDs)
            .then((response) => {
                console.log("cccc", response.data);
                setproductDetail(response.data);
                sessionStorage.setItem('purchaseProductData', JSON.stringify(response.data));
                setLoading(false); // 데이터를 받아온 후 로딩 상태 변경
            })
            .catch((error) => {
                if (!axios.isCancel(error)) {
                    navigate('/error');

                }
                setLoading(false); // 에러 발생 시에도 로딩 상태 변경
            });
    }, [dispatch, navigate]);

    if (loading) {
        return <Loading/>; // 로딩 중이면 로딩 컴포넌트를 보여줍니다.
    }
    // 라디오 버튼 선택 시 처리하는 함수
    const handlePaymentMethodChange = (e) => {
        setPaymentMethod(e.target.value);
    };



    const handleOpenModal = () => {
        setShowModal("1111", true);
    };

    const handleCloseModal = (index) => {
        console.log(index);
        setaddressIndex(index); // addressIndex 업데이트
        setShowModal(false);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userEmail = localStorage.getItem('userEmail');
            const data = checkoutItemData.map(item => ({
                "user_email": userEmail,
                "deliveryid": receiverInfo[addressIndex].deliveryid,
                "productID": item.productID,
                "amount": item.amount
            }));
            console.log("dddd", data)
            const response = await axios.post(`${serverAddr}/api/Order`, data);
            if (response.data === true) {
                await localStorage.setItem(
                    'pruchaseInfo',
                    JSON.stringify({
                        "receiverName": receiverInfo[addressIndex].name,
                        "receiverAddr": receiverInfo[addressIndex].address,
                        "phoneNumber": receiverInfo[addressIndex].phoneNumber
                    })
                );
                console.log("eeee",{
                    "receiverName": receiverInfo[addressIndex].name,
                    "receiverAddr": receiverInfo[addressIndex].address,
                    "phoneNumber": receiverInfo[addressIndex].phoneNumber
                })

                navigate('/checkoutsuccess'); // 로그인 성공 후 이동할 페이지

            } else {
                navigate('/error');
            }
        } catch (error) {
            // 오류가 발생한 경우 에러 핸들링을 할 수 있습니다.
            console.error('Error:', error);
        }
    };
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

        <div className={styles.customCheckoutPage}>
            <div className={styles.customCheckoutTitle}>
                주문&frasl;결제
            </div>
            <div className={styles.checkoutCustomerData}>구매자 정보</div>
            <div className={styles.checkoutCustomerDataBox}>
                <div>
                    <div className={styles.customCheckoutRow}>
                        <div className={styles.customCheckoutColLeft}>
                            이름
                        </div>
                        <div className={styles.customCheckoutColRight}>
                            {customerData.name}
                        </div>
                    </div>
                    <div className={styles.customCheckoutRow}>
                        <div className={styles.customCheckoutColLeft}>
                            이메일
                        </div>
                        <div className={styles.customCheckoutColRight}>
                            {customerData.email}
                        </div>
                    </div>

                    <div className={styles.customCheckoutRow}>
                        <div className={styles.customCheckoutColLeftLast}>
                            연락처
                        </div>
                        <div className={styles.customCheckoutColRightLast}>
                            {customerData.phoneNumber}
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.receiver}>
                <div className={styles.checkoutReceiverData}>받는분 정보</div>
                <div className={styles.receiverChangeButtonWrapper}>
                    <button className={styles.receiverChangeButton} onClick={handleOpenModal}>변경하기</button>
                </div>
            </div>
            <Modal
                isOpen={showModal}
                handleClose={handleCloseModal} // 수정된 부분
                receiverInfo={receiverInfo}
                addressIndex={addressIndex}
            />
            <div className={styles.checkoutCustomerDataBox}>
                <div className={styles.customCheckoutRow}>
                    <div className={styles.customCheckoutColLeft}>
                        이름
                    </div>
                    <div className={styles.customCheckoutReceiverRight}>
                        {receiverInfo[addressIndex].name}
                    </div>
                </div>

                <div className={styles.customCheckoutRow}>
                    <div className={styles.customCheckoutColLeft}>
                        배송주소
                    </div>
                    <div className={styles.customCheckoutReceiverRight}>
                        {receiverInfo[addressIndex].address}
                    </div>
                </div>
                <div className={styles.customCheckoutRow}>
                    <div className={styles.customCheckoutColLeftLast}>
                        연락처
                    </div>
                    <div className={styles.customCheckoutReceiverRightLast}>
                        {receiverInfo[addressIndex].phoneNumber}
                    </div>
                </div>
            </div>


            <div className={styles.checkoutData}>상품정보</div>
            <div className={styles.checkoutCustomerDataBox}>
                <div className={styles.customCheckoutRow}>
                    <div className={styles.customCheckoutProductPicture}>
                        제품 사진
                    </div>
                    <div className={styles.customCheckoutProductName}>
                        제품명
                    </div>
                    <div className={styles.customCheckoutProductPrice}>
                        가격
                    </div>
                    <div className={styles.customCheckoutProductAmount}>
                        수량
                    </div>
                    <div className={styles.customCheckoutProductTotalPrice}>
                        총상품가격
                    </div>
                </div>
                {productDetail.map((item, idx) => (
                    <div className={styles.customCheckoutRow} key={idx}>
                        <div
                            className={`${styles.customCheckoutProductPicture} ${
                                idx === productDetail.length - 1 ? styles.customCheckoutProductPictureLast : ''
                            }`}
                        >
                            <img className={styles.productImage} src={process.env.PUBLIC_URL + item.imgpath} alt={`Product ${idx + 1}`} />
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
                ))}


            </div>
    <div className={styles.checkoutData}>결제정보</div>
    <div className={styles.checkoutCustomerDataBox}>
        <div className={styles.customCheckoutRow}>
            <div className={styles.customCheckoutColLeft}>
                총 상품가격
            </div>
            <div className={styles.customCheckoutColRight}>
                {totalOrderPrice}원
            </div>
        </div>
        <div className={styles.customCheckoutRow}>
            <div className={styles.customCheckoutColLeft}>
                즉시할인
            </div>
            <div className={styles.customCheckoutColRight}>
                0원
            </div>
        </div>
        <div className={styles.customCheckoutRow}>
            <div className={styles.customCheckoutColLeft}>
                할인 쿠폰
            </div>
            <div className={styles.customCheckoutColRight}>
                적용 가능한 할인쿠폰이 없습니다.
            </div>
        </div>
        <div className={styles.customCheckoutRow}>
            <div className={styles.customCheckoutColLeft}>
                총결제금액
            </div>
            <div className={styles.customCheckoutColRight}>
                {totalOrderPrice}원
            </div>
        </div>
        <div className={styles.customCheckoutRow}>
            <div className={styles.customCheckoutColLeftLast}>
                결제 방법
            </div>
            <div className={styles.customCheckoutColRightLast}>
                <label style={{marginRight: "20px"}}>
                    <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={paymentMethod === "card"} // 현재 선택된 값 확인
                        onChange={handlePaymentMethodChange}
                    />
                    카드
                </label>
                {/* 휴대폰 */}
                <label style={{marginRight: "20px"}}>
                    <input
                        type="radio"
                        name="paymentMethod"
                        value="mobile"
                        checked={paymentMethod === "mobile"} // 현재 선택된 값 확인
                        onChange={handlePaymentMethodChange}
                    />
                    휴대폰
                </label>
                {/* 무통장 입금 */}
                <label>
                    <input
                        type="radio"
                        name="paymentMethod"
                        value="bankTransfer"
                        checked={paymentMethod === "bankTransfer"} // 현재 선택된 값 확인
                        onChange={handlePaymentMethodChange}
                    />
                    무통장 입금
                </label>
            </div>
        </div>
    </div>
    <button className={styles.customCheckoutPurchaseButton} onClick={handleSubmit}>결제하기</button>

</div>
)
}

function Modal({isOpen, handleClose, receiverInfo, addressIndex}) {
    if (!isOpen || !receiverInfo || receiverInfo.length === 0) {
        return null;
    }

    if (receiverInfo && receiverInfo.length > 0) {
        return (
            <div className={styles.modal}>
                {receiverInfo.map((receiver, index) => (
                    <div key={index}
                         className={`${styles.modalContent} ${index === receiverInfo.length - 1 ? styles.lastModalContent : ''}`}>
                        <div className={styles.modalLeft}>
                            <div>Name: {receiver.name}</div>
                            <div>Address: {receiver.address}</div>
                            <div>Phone Number: {receiver.phoneNumber}</div>
                        </div>
                        <div className={styles.modalRight}>
                            {/* handleCloseModal을 호출하도록 수정 */}
                            <button onClick={() => handleClose(index)}>변경하기</button>
                        </div>
                    </div>
                ))}
                <button onClick={() => handleClose(addressIndex)}>Close</button>
            </div>
        );
    }
}

export default Checkout;