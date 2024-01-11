/*
* Project Name : React Shopping Mall(A-Mall) Login
* Program Purpose and Basic Features :
    * - A-Mall Login, 로그인 페이지
* Program Author : JHKIM
* Date of original creation : 2023.12.03
* ==========================================================================
* Program History
* ==========================================================================
* Author    	Date		    Version		Content
* JHKIM			2023.12.03	    v1.0	    First Write
* JHKIM			2023.12.04	    v1.01	    서버통신기능 추가
*/
import React, { useState, useEffect } from 'react';
import styles from "./Login.module.css"
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import {useSelector} from 'react-redux';

function Login(){
    const navigate = useNavigate();
    let serverAddr = useSelector((state) => state.serverAddr.serverAddress);
    const loginState = localStorage.getItem("loginState");// loginState 가져오기
    const [formData, setFormData] = useState({
        email: '', password: '',
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    useEffect(() => {
        if (loginState) {
            navigate('/'); // 현재 로그인 상태이면 '/' 페이지로 이동
        }
    }, [loginState, navigate]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(formData)
            // 입력된 정보를 서버에 전송(로그인 시도)
            const response = await axios.post(`${serverAddr}/api/LogIn`,{"email": formData.email,"password":formData.password});
            console.log(response.data); // 응답 데이터 확인
            if (response.data === true) {
                localStorage.clear()
                localStorage.setItem('loginState', true);
                localStorage.setItem('userEmail', formData.email);

                navigate('/'); // 로그인 성공 후 이동할 페이지(Home)
            } else {
                // 로그인 실패
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    return (
        <div className="signup-container">
            <div className="signupCard">
                <Link className="navbarMenuLeft" to={'/'}><img className={styles.signUpImg}
                                                               src={process.env.PUBLIC_URL + '/img/A-mall2.png'}/></Link>
                <div className={styles.signUpText}>회원정보를 입력해주세요</div>
                <form>

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
                                   placeholder="비밀번호"
                            />
                        </div>

                    </div>
                    <div className={styles.buttonContainer}>
                        <button type="submit" onClick={handleSubmit} className={styles.loginButton}>로그인</button>

                        <Link className={styles.signUpButton} to={'/signup'}>
                            <button className={styles.signUpButton}>회원가입</button>
                        </Link>
                    </div>
                </form>

            </div>
        </div>
    );
}

export default Login;
