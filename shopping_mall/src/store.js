// for redux

import { configureStore,createSlice } from '@reduxjs/toolkit'

let userData = createSlice({
    name:'userData',
    initialState:[
        {
            userId:'antl1234@yu.ac.kr',
            name:'kim'
        }
    ]

})

let productData = createSlice({
    name:'productData',
    initialState:[],
    reducers: {
        changeProductData(state, action) {
            return action.payload; // API에서 받아온 데이터로 스토어 업데이트
        },
    },
})
export  let { changeProductData } = productData.actions
let cartData = createSlice({
    name:'cart',
    initialState:[
        {
            title : "Raspberry Pi 4B 8GB",
            quantity : 5,
            price : 90000, imagePath: '/img/RaspberryPi_8gb.png'
        },

        {
            title : "ANTL 입장 티켓",
            quantity : 3,
            price : 0, imagePath: '/img/ticket.jpg'
        }
    ]

})
export default configureStore({
    reducer: {
        userData : userData.reducer,
        productData:productData.reducer,
        cartData:cartData.reducer
    }
})