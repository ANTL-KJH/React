import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css';
function Home() {
    const navigate = useNavigate(); // useNavigate 훅을 이용해 경로 변경 함수를 가져옵니다.

    const handleClick = () => {
        navigate('/buttonControl'); // 버튼을 클릭했을 때 '/buttonControl' 경로로 이동합니다.
    };

    return (
        <div>
            <div className={styles.homeText}>[지방대학 활성화 사업단]2024 Java 응용 시스템 프로그래밍 특강</div>
            <button className={styles.btnControlButton} onClick={handleClick}>버튼제어</button> {/* 버튼 클릭 시 handleClick 함수 호출 */}
        </div>
    );
}

export default Home;
