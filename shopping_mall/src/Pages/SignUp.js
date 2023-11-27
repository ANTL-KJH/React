import React, { useState, useEffect } from 'react';
import styles from "./SignUp.module.css"
import {Link} from "react-router-dom";

const Signup = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [isChecked, setIsChecked] = useState(false);
    const [isButtonEnabled, setIsButtonEnabled] = useState(false);

    useEffect(() => {
        // 모든 체크박스가 선택되었을 때 버튼을 활성화합니다.
        setIsButtonEnabled(isChecked);
    }, [isChecked]);
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
            e.target.placeholder = name === 'username' ? '이름' : name === 'email' ? '아이디(이메일)' : name === 'password'?'비밀번호': name === 'password confirm'? '비밀번호 확인': name ==="address"?'주소': name === "phone number"?"연락처":null;
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // 여기에 회원가입을 처리하는 로직을 추가하세요
        console.log(formData); // 예시로 console에 양식 데이터를 출력합니다.
    };

    const handleCheckboxChange = (e) => {
        setIsChecked(e.target.checked);
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
                        <div style={{grid: 1, border: "1px solid #bbbbbb", borderRight: 'none', height: "50px"} }>
                            <img className={styles.emailIcon} style={{ width: "100%", height: "100%", objectFit: "cover" }} src={process.env.PUBLIC_URL + '/img/password-icon.png'}/>
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
                            <img className={styles.emailIcon} src={process.env.PUBLIC_URL + '/img/password-confirm.png'}/>
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
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <div style={{grid: 1, border: "1px solid #bbbbbb", borderRight: 'none', height: "50px"}}>
                            <img className={styles.emailIcon} src={process.env.PUBLIC_URL + '/img/address-icon.png'}/>
                        </div>
                        <div style={{grid: 1}}>
                            <input className={styles.signUpInputBox}
                                   type="address"
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
                                   type="phone number"
                                   id="phone number"
                                   name="phone number"
                                   value={formData.address}
                                   onChange={handleChange}
                                   onFocus={handleFocus}
                                   onBlur={handleBlur}
                                   placeholder="연락처"
                            />
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <div style={{ grid: 1, border: '1px solid #bbbbbb', borderRight: 'none', height: '50px' }}>
                            <img className={styles.emailIcon} src={process.env.PUBLIC_URL + '/img/MF-icon.png'} />
                        </div>
                        <div style={{ grid: 1, placeItems: 'center', width: '500px', border: '1px solid #bbbbbb'}}>
                            <label style={{ marginTop: '11px', marginRight: '20px', marginLeft: '20px' }}>
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
                    <CheckBoxExample handleCheckboxChange={handleCheckboxChange} />
                    <button className={`${styles.signUpSubmitButton} ${isButtonEnabled ? styles.activeButton : styles.disabledButton}`} type="submit" disabled={!isButtonEnabled}>가입하기</button>
                </form>
            </div>
        </div>
    );
};
const CheckBoxExample = ({ handleCheckboxChange }) => {
    return (
        <div style={{marginTop:"20px"}}>
            <label>
                <input
                    type="checkbox"
                    onChange={handleCheckboxChange}
                    style={{ marginRight: "2px" }}
                />
                모두 확인하였으며, 약관에 동의합니다.
            </label>
        </div>
    );
};

export default Signup;
