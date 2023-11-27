import React, { useState } from 'react';
import styles from "./SignUp.module.css"
import {Link} from "react-router-dom";

const Signup = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleFocus = (e) => {
        e.target.placeholder = '';
    };
    const handleBlur = (e) => {
        const { name } = e.target;
        if (!formData[name]) {
            e.target.placeholder = name === 'username' ? '사용자 이름' : name === 'email' ? '이메일' : '비밀번호';
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // 여기에 회원가입을 처리하는 로직을 추가하세요
        console.log(formData); // 예시로 console에 양식 데이터를 출력합니다.
    };

    return (
        <div className="signup-container">
            <div className="signup-card">
                <Link className="navbarMenuLeft" to={'/'}><img className={styles.signUpImg} src={process.env.PUBLIC_URL + '/img/A-mall2.png'} /></Link>

                <div className={styles.signUpText}>회원정보를 입력해주세요</div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
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
                    <div className="form-group">
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
                    <div className="form-group">
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
                    <div className="form-group">
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
                    <button className={styles.signUpSubmitButton} type="submit">가입하기</button>
                </form>
            </div>
        </div>
    );
};

export default Signup;
