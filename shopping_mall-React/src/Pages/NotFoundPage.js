/*
* Project Name : React Shopping Mall(A-Mall) Not Found
* Program Purpose and Basic Features :
    * - A-Mall Not Found, 페이지를 찾을 수 없음을 출력
* Program Author : JHKIM
* Date of original creation : 2023.11.29
* ==========================================================================
* Program History
* ==========================================================================
* Author    	Date		    Version		Content
* JHKIM			2023.11.29	    v1.0	    First Write
*/
function NotFoundPage(props) {
    return (
        <div className="redirectContainer">
            <div className="contentWrapper">
                <img className="redirectImage1" src={process.env.PUBLIC_URL + '/img/WarningSign.png'}/>
                <img className="redirectImage2" src={process.env.PUBLIC_URL + '/img/Amall-logo3.png'} alt="새로고침 이미지" />
                <h4 className="redirectText">요청하신 상품을 찾을 수 없습니다.</h4>
            </div>
        </div>
    );
}
export default NotFoundPage;