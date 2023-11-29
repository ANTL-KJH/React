import React, {useState, useEffect} from 'react';
import styles from "./SignUp.module.css"
import {Link} from "react-router-dom";
import axios from "axios";
const Signup = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        address:'',
        phoneNumber:'',
        gender:''
    });

    const [isChecked, setIsChecked] = useState(false);
    const [isButtonEnabled, setIsButtonEnabled] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        // 모든 입력값이 채워졌는지 확인
        const isFormFilled =
            formData.username !== '' &&
            formData.email !== '' &&
            formData.password !== '' &&
            formData.confirmPassword !== '' &&
            formData.address !== '' &&
            formData.phoneNumber !== '' &&
            formData.gender !== '';

        // 모든 입력값이 채워졌으면 버튼 활성화
        setIsButtonEnabled(isChecked && isFormFilled);
    }, [isChecked, formData]);
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
            const response = await axios.post('127.0.0.1:8080', formData);

            // 가입이 성공하면 모달 열기 등을 처리할 수 있습니다.
            setIsModalOpen(true);
            console.log(response.data); // 응답 데이터를 확인합니다.
        } catch (error) {
            // 오류가 발생한 경우 에러 핸들링을 할 수 있습니다.
            console.error('Error:', error);
        }
    };

    const handleCheckboxChange = (e) => {
        setIsChecked(e.target.checked);
    };


    const handleCloseModal = () => {
        setIsModalOpen(false); // 모달 닫기
    };
    const isPasswordMatch = () => {
        return formData.password === formData.confirmPassword;
    };
    return (
        <div className="signup-container">
            <div className="signupCard">
                <Link className="navbarMenuLeft" to={'/'}><img className={styles.signUpImg}
                                                               src={process.env.PUBLIC_URL + '/img/A-mall2.png'}/></Link>

                <div className={styles.signUpText}>회원정보를 입력해주세요</div>
                <form onSubmit={handleSubmit}>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <div style={{grid: 1, border: "1px solid #bbbbbb", borderRight: 'none', height: "50px"}}>
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
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <div style={{grid: 1, border: "1px solid #bbbbbb", borderRight: 'none', height: "50px"}}>
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
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <div style={{grid: 1, border: "1px solid #bbbbbb", borderRight: 'none', height: "50px"}}>
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
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <div style={{grid: 1, border: "1px solid #bbbbbb", borderRight: 'none', height: "50px"}}>
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
                        <span style={{ color: 'red' }}>비밀번호가 일치하지 않습니다.</span>
                    )}
                    {formData.password && formData.confirmPassword && isPasswordMatch() && (
                        <span style={{ color: 'green' }}>비밀번호가 일치합니다.</span>
                    )}
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <div style={{grid: 1, border: "1px solid #bbbbbb", borderRight: 'none', height: "50px"}}>
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
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <div style={{grid: 1, border: "1px solid #bbbbbb", borderRight: 'none', height: "50px"}}>
                            <img className={styles.emailIcon} src={process.env.PUBLIC_URL + '/img/phone-icon.png'}/>
                        </div>
                        <div style={{grid: 1}}>
                            <input className={styles.signUpInputBox}
                                   type="text"
                                   id="phoneNumber"
                                   name="phoneNumber"
                                   value={formData.phoneNumber}
                                   onChange={handleChange}
                                   onFocus={handleFocus}
                                   onBlur={handleBlur}
                                   placeholder="연락처"
                            />
                        </div>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
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
                        className={`${styles.signUpSubmitButton} ${isButtonEnabled ? styles.activeButton : styles.disabledButton}`}
                        type="submit" disabled={!isButtonEnabled} onClick={handleSubmit}>가입하기
                    </button>
                    {isModalOpen && (
                        <div className={styles.modalBackdrop}>
                            <div className={styles.modal}>
                <span className={styles.close} onClick={handleCloseModal}>
                  &times;
                </span>
                                <div className={styles.modalContent}>
                                    <p>모달 내용</p>
                                </div>
                            </div>
                        </div>
                    )}
                </form>
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


export default Signup;
