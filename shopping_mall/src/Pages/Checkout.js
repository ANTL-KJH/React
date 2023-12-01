import styles from "./Checkout.module.css";
import React from "react";
import {useState} from "react";
import {Button} from "react-bootstrap";

function Checkout() {

    return (
        <CheckoutPage></CheckoutPage>
    );

}

function CheckoutPage() {
    const [paymentMethod, setPaymentMethod] = useState(""); // 상태값 추가

    // 라디오 버튼 선택 시 처리하는 함수
    const handlePaymentMethodChange = (e) => {
        setPaymentMethod(e.target.value);
    };
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
                            김안틀
                        </div>
                    </div>
                    <div className={styles.customCheckoutRow}>
                        <div className={styles.customCheckoutColLeft}>
                            이메일
                        </div>
                        <div className={styles.customCheckoutColRight}>
                            antl1234@antl.com
                        </div>
                    </div>

                    <div className={styles.customCheckoutRow}>
                        <div className={styles.customCheckoutColLeftLast}>
                            연락처
                        </div>
                        <div className={styles.customCheckoutColRightLast}>
                            01099887766
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.checkoutReceiverData}>받는분 정보</div>
            <div className={styles.checkoutCustomerDataBox}>
                <div className={styles.customCheckoutRow}>
                    <div className={styles.customCheckoutColLeft}>
                        이름
                    </div>
                    <div className={styles.customCheckoutColRight}>
                        김안틀
                    </div>
                </div>


                <div className={styles.customCheckoutRow}>
                    <div className={styles.customCheckoutColLeft}>
                        배송주소
                    </div>
                    <div className={styles.customCheckoutColRight}>
                        경상북도 경산시 대학로 280, 영남대학교 IT관(E21) 304호 차세대 네트워킹 연구실
                    </div>
                </div>
                <div className={styles.customCheckoutRow}>
                    <div className={styles.customCheckoutColLeftLast}>
                        연락처
                    </div>
                    <div className={styles.customCheckoutColRightLast}>
                        01099887766
                    </div>
                </div>
            </div>
            <div className={styles.checkoutReceiverData}>결제정보</div>
            <div className={styles.checkoutCustomerDataBox}>
                <div className={styles.customCheckoutRow}>
                    <div className={styles.customCheckoutColLeft}>
                        총 상품가격
                    </div>
                    <div className={styles.customCheckoutColRight}>
                        150000원
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
                        15000원
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
            <button className={styles.customCheckoutPurchaseButton}>결제하기</button>

        </div>
    )
}

export default Checkout;