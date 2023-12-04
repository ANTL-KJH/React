import {useParams} from "react-router-dom";
import './Product.module.css';
import styles from './Error.module.css';
function ErrorPage(props) {
    return (
        <div className="redirectContainer">
            <div className="contentWrapper">
                <img className={styles.errorImage1} src={process.env.PUBLIC_URL + '/img/WarningSign2.png'}/>
                <img className={styles.errorImage2} src={process.env.PUBLIC_URL + '/img/A-mall2.png'}/>
                <h4 className={styles.errorText1}>요청하신 페이지를 찾을 수 없습니다.</h4>
                <h4 className={styles.errorText2}>입력한 주소가 잘못되었거나, 사용이 일시 중단되어 요청하신 페이지를 찾을 수 없습니다.<br/>서비스 이용에 불편을 드려죄송합니다.</h4>

            </div>
        </div>
    );
}
export default ErrorPage;