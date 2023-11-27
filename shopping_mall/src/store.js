// for redux

import { configureStore,createSlice } from '@reduxjs/toolkit'

let user = createSlice({
    name:'user',
    initialState:'kim'

})

let productData = createSlice({
    name:'productData',
    initialState:[
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

})
export default configureStore({
    reducer: {
        user : user.reducer,
        productData:productData.reducer
    }
})