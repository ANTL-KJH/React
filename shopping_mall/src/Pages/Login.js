import React, { useState, useEffect } from 'react';
import styles from "./Login.module.css"
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';


function Login(){

    const navigate = useNavigate();
    let serverAddr = useSelector((state) => state.serverAddr.serverAddress);
    {/*const loginState = useSelector((state) => state.loginState.loginState); // loginState 가져오기*/}
    const loginState = localStorage.getItem("loginState");
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const dispatch = useDispatch();
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
            // 여기에 회원가입을 처리하는 로직을 추가하세요
            // 예시로 axios를 사용하여 POST 요청을 보냅니다.
            console.log(formData)
            const response = await axios.post(`${serverAddr}/api/LogIn`,{"email": formData.email,"password":formData.password});
            console.log(response.data); // 응답 데이터를 확인합니다.
            if (response.data === true) {
                localStorage.clear()
                localStorage.setItem('loginState', true);
                localStorage.setItem('userEmail', formData.email);

                navigate('/'); // 로그인 성공 후 이동할 페이지
            } else {
                // 로그인 실패 시, 처리 로직 추가
            }
        } catch (error) {
            // 오류가 발생한 경우 에러 핸들링을 할 수 있습니다.
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
};


export default Login;
