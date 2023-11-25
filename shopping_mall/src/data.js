let a= 10;
let b = 20;

let shoesData = [
    {
      id : 0,
      title : "YU Mall",
      content : "Made by JHKim, JHSun",
      price : 999999999, imagePath: '/img/YU Shop.png'
    },
  
    {
      id : 1,
      title : "Raspberry Pi 4B 8GB",
      content : "Raspberry Pi 4B 8GB Embedded Develop Board",
      price : 90000, imagePath: '/img/RaspberryPi_8gb.png'
    },
  
    {
      id : 2,
      title : "ANTL 입장 티켓",
      content : "하나, 둘, 셋, ANTL 파이팅!",
      price : 0, imagePath: '/img/ticket.jpg'
    }
  ] 
export default shoesData;
// 여러개의 변수 export 하면 export {a,b};
// 하나의 변수만 export 하면 export default a;