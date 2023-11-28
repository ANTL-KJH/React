import React, { useState, useEffect } from 'react';
import styles from "./Login.module.css"
import {Link} from "react-router-dom";

const Login = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [isChecked, setIsChecked] = useState(false);

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
            e.target.placeholder = name === 'username' ? '사용자 이름' : name === 'email' ? '이메일' : '비밀번호';
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
                            <img className={styles.emailIcon} src={process.env.PUBLIC_URL + '/img/password-icon.png'}/>
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

                </form>
                <div className={styles.buttonContainer}>
                    <button className={styles.loginButton}>로그인</button>
                    <Link className={styles.signUpButton} to={'/signup'}>
                        <button className={styles.signUpButton}>회원가입</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};


export default Login;
