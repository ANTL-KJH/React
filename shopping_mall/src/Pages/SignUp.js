import React, {useState, useEffect} from 'react';
import styles from "./SignUp.module.css"
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {useSelector} from "react-redux";

const Signup = () => {
    let serverAddr = useSelector((state) => state.serverAddr.serverAddress);

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        address: '',
        phone_number: '',
        gender: ''
    });

    const [isChecked, setIsChecked] = useState(false);
    const [isButtonEnabled, setIsButtonEnabled] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
    const navigate = useNavigate();
    const loginState = localStorage.getItem('loginState'); // loginState 가져오기
    useEffect(() => {
        // 모든 입력값이 채워졌는지 확인
        const isFormFilled =
            formData.username !== '' &&
            formData.email !== '' &&
            formData.password !== '' &&
            formData.confirmPassword !== '' &&
            formData.address !== '' &&
            formData.phone_number !== '' &&
            formData.gender !== '' &&
            formData.password === formData.confirmPassword;
        if (loginState) {
            navigate('/'); // 현재 로그인 상태이면 '/' 페이지로 이동
        }
        // 모든 입력값이 채워졌으면 버튼 활성화
        setIsButtonEnabled(isChecked && isFormFilled);
    }, [isChecked, formData, loginState, navigate]);
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };
    const handleFocus = (e) => {
        e.target.placeholder = '';
    };
    const handleBlur = (e) => {
        const {name} = e.target;
        if (!formData[name]) {
            e.target.placeholder = name === 'username' ? '이름' : name === 'email' ? '아이디(이메일)' : name === 'password' ? '비밀번호' : name === 'confirmPassword' ? '비밀번호 확인' : name === "address" ? '주소' : name === "phone number" ? "연락처" : null;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // 여기에 회원가입을 처리하는 로직을 추가하세요
            // 예시로 axios를 사용하여 POST 요청을 보냅니다.
            console.log(formData)
            const response = await axios.post(`${serverAddr}/api/Join`, formData);

            // 가입이 성공하면 모달 열기 등을 처리할 수 있습니다.
            setIsModalOpen(true);
            console.log(response.data); // 응답 데이터를 확인합니다.
        } catch (error) {
            // 오류가 발생한 경우 에러 핸들링을 할 수 있습니다.
            console.error('Error:', error);
            setIsErrorModalOpen(true);
        }
    };
    const handleSubmitForm = (e) => {
        e.preventDefault(); // 기본 제출 동작 막기
        if (isButtonEnabled) {
            handleSubmit(e); // 가입하기 함수 호출
        }
    };
    const handleCheckboxChange = (e) => {
        setIsChecked(e.target.checked);
    };


    const handleCloseModal = () => {
        setIsModalOpen(false); // 모달 닫기
        localStorage.setItem('loginState', true);
        localStorage.setItem('userEmail', formData.email);
        navigate('/')
    };
    const handleCloseErrorModal = () => {
        setIsErrorModalOpen(false);
    };
    const isPasswordMatch = () => {
        return formData.password === formData.confirmPassword;
    };

    return (
        <div className="signup-container">
            <div className={styles.signupCard}>
                <Link className="navbarMenuLeft" to={'/'}><img className={styles.signUpImg}
                                                               src={process.env.PUBLIC_URL + '/img/A-mall2.png'}/></Link>

                <div className={styles.signUpText}>회원정보를 입력해주세요</div>
                <form onSubmit={handleSubmitForm}>
                    <div className={styles.signUpFormBox}>
                        <div className={styles.iconBox}>
                            <img className={styles.emailIcon} src={process.env.PUBLIC_URL + '/img/Person.png'}/>
                        </div>
                        <div style={{grid: 1}}>
                            <input className={styles.signUpInputBox}
                                   type="text"
                                   id="username"
                                   name="username"
                                   value={formData.username}
                                   onChange={handleChange}
                                   onFocus={handleFocus}
                                   onBlur={handleBlur}
                                   placeholder="이름"
                            />
                        </div>

                    </div>
                    <div className={styles.signUpFormBox}>
                        <div className={styles.iconBox}>
                            <img className={styles.emailIcon} src={process.env.PUBLIC_URL + '/img/Email-icon.png'}/>
                        </div>
                        <div style={{grid: 1}}>
                            <input className={styles.signUpInputBox}
                                   type="email"
                                   id="email"
                                   name="email"
                                   value={formData.email}
                                   onChange={handleChange}
                                   onFocus={handleFocus}
                                   onBlur={handleBlur}
                                   placeholder="아이디(이메일)"
                            />
                        </div>
                    </div>
                    <div className={styles.signUpFormBox}>
                        <div className={styles.iconBox}>
                            <img className={styles.emailIcon}
                                 style={{width: "100%", height: "100%", objectFit: "cover"}}
                                 src={process.env.PUBLIC_URL + '/img/password-icon.png'}/>
                        </div>
                        <div style={{grid: 1}}>
                            <input className={styles.signUpInputBox}
                                   type="password"
                                   id="password"
                                   name="password"
                                   value={formData.password}
                                   onChange={handleChange}
                                   onFocus={handleFocus}
                                   onBlur={handleBlur}
                                   placeholder="비밀번호"
                            />
                        </div>

                    </div>
                    <div className={styles.signUpFormBox}>
                        <div className={styles.iconBox}>
                            <img className={styles.emailIcon}
                                 src={process.env.PUBLIC_URL + '/img/password-confirm.png'}/>
                        </div>
                        <div style={{grid: 1}}>
                            <input className={styles.signUpInputBox}
                                   type="password"
                                   id="confirmPassword"
                                   name="confirmPassword"
                                   value={formData.confirmPassword}
                                   onChange={handleChange}
                                   onFocus={handleFocus}
                                   onBlur={handleBlur}
                                   placeholder="비밀번호 확인"
                            />
                        </div>
                    </div>
                    {formData.password && formData.confirmPassword && !isPasswordMatch() && (
                        <span style={{color: 'red'}}>비밀번호가 일치하지 않습니다.</span>
                    )}
                    {formData.password && formData.confirmPassword && isPasswordMatch() && (
                        <span style={{color: 'green'}}>비밀번호가 일치합니다.</span>
                    )}
                    <div className={styles.signUpFormBox}>
                        <div className={styles.iconBox}>
                            <img className={styles.emailIcon} src={process.env.PUBLIC_URL + '/img/address-icon.png'}/>
                        </div>
                        <div style={{grid: 1}}>
                            <input className={styles.signUpInputBox}
                                   type="text"
                                   id="address"
                                   name="address"
                                   value={formData.address}
                                   onChange={handleChange}
                                   onFocus={handleFocus}
                                   onBlur={handleBlur}
                                   placeholder="주소"
                            />
                        </div>
                    </div>
                    <div className={styles.signUpFormBox}>
                        <div className={styles.iconBox}>
                            <img className={styles.emailIcon} src={process.env.PUBLIC_URL + '/img/phone-icon.png'}/>
                        </div>
                        <div style={{grid: 1}}>
                            <input className={styles.signUpInputBox}
                                   type="text"
                                   id="phone_number"
                                   name="phone_number"
                                   value={formData.phone_number}
                                   onChange={handleChange}
                                   onFocus={handleFocus}
                                   onBlur={handleBlur}
                                   placeholder="연락처"
                            />
                        </div>
                    </div>
                    <div className={styles.signUpFormBox}>
                        <div style={{grid: 1, border: '1px solid #bbbbbb', borderRight: 'none', height: '50px'}}>
                            <img className={styles.emailIcon} src={process.env.PUBLIC_URL + '/img/MF-icon.png'}/>
                        </div>
                        <div style={{grid: 1, placeItems: 'center', width: '500px', border: '1px solid #bbbbbb'}}>
                            <label style={{marginTop: '11px', marginRight: '20px', marginLeft: '20px'}}>
                                <input
                                    type="radio"
                                    name="gender"
                                    value="male"
                                    onChange={handleChange}
                                    onFocus={handleFocus}
                                    onBlur={handleBlur}
                                />
                                남성
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="gender"
                                    value="female"
                                    onChange={handleChange}
                                    onFocus={handleFocus}
                                    onBlur={handleBlur}
                                />
                                여성
                            </label>
                        </div>
                    </div>
                    <CheckBoxExample handleCheckboxChange={handleCheckboxChange}/>
                    <button
                        className={`${styles.signUpSubmitButton} ${
                            isButtonEnabled ? styles.activeButton : styles.disabledButton
                        }`}
                        type="submit"
                        disabled={!isButtonEnabled}
                    >
                        가입하기
                    </button>
                </form>
                {isModalOpen && (
                    <>
                        <div className={styles.modalBackdrop}/>
                        <Modal formData={formData} handleCloseModal={handleCloseModal}/>
                    </>
                )}
                {isErrorModalOpen && (<ErrorModal handleCloseErrorModal={handleCloseErrorModal}/>)}
            </div>
        </div>
    );
};
const CheckBoxExample = ({handleCheckboxChange}) => {
    return (
        <div style={{marginTop: "20px"}}>
            <label>
                <input
                    type="checkbox"
                    onChange={handleCheckboxChange}
                    style={{marginRight: "2px"}}
                />
                모두 확인하였으며, 약관에 동의합니다.
            </label>
        </div>
    );
};

function Modal({formData, handleCloseModal}) {
    return (
        <div className={styles.modalBackdrop}>
            <div className={styles.modal}>
                <div className={styles.closeButton} onClick={() => {
                    handleCloseModal()
                }}>
                    X
                </div>
                <div className={styles.modalContent}>
                    <div><img className={styles.welcomeImg} src={process.env.PUBLIC_URL + '/img/welcome.png'}/></div>
                    <div><img className={styles.modalImg} src={process.env.PUBLIC_URL + '/img/A-mall2.png'}/></div>
                    <div className={styles.modalText0}>
                        <div className={styles.modalText1}>{formData.username}</div>
                        <div className={styles.modalText2}>님</div>
                    </div>
                    <div className={styles.modalText3}>A-Mall 회원가입을 축하합니다.</div>

                </div>
                <div className={styles.madeBy}>A-Mall Made by ANTL</div>
            </div>
        </div>
    );
}

function ErrorModal({handleCloseErrorModal}) {
    return (
        <div className={styles.modalBackdrop}>
        <div className={styles.errormodal}>
            <div className={styles.closeButton} onClick={() => {
                handleCloseErrorModal()
            }}>
                X
            </div>
            <div className={styles.modalContent}>
                <div><img className={styles.modalImg} src={process.env.PUBLIC_URL + '/img/A-mall2.png'}/></div>
                <div className={styles.modalText0}>

                </div>
                <div className={styles.modalText3}>중복된 아이디입니다.</div>

            </div>
            <div className={styles.madeBy}>A-Mall Made by ANTL</div>
        </div>
        </div>
    );
}

export default Signup;
