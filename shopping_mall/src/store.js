// for redux

import {configureStore, createSlice} from '@reduxjs/toolkit'
let loginState=createSlice({
    name:'loginState',
    initialState:{loginState:false},
    reducers:{
        changeLoginState(state, action) {
            state.loginState = action.payload;
        }
    }
})
export let {changeLoginState} = loginState.actions
let userData = createSlice({
    name: 'userData',
    initialState: {},
    reducers:{
        changeUserData(state, action){
            return action.payload;
        }
    }
})
export let{changeUserData}=userData.actions
let productData = createSlice({
    name: 'productData',
    initialState: [],
    reducers: {
        changeProductData(state, action) {
            return action.payload; // API에서 받아온 데이터로 스토어 업데이트
        },
    },
})
export let {changeProductData} = productData.actions
let cartData = createSlice({
    name: 'cart',
    initialState: [
        {
            title: "Raspberry Pi 4B 8GB",
            quantity: 5,
            price: 90000, imagePath: '/img/RaspberryPi_8gb.png'
        },

        {
            title: "ANTL 입장 티켓",
            quantity: 3,
            price: 0, imagePath: '/img/ticket.jpg'
        }
    ]
})

let productDetail = createSlice({
    name: 'productDetail',
    initialState: {}, // 빈 객체로 초기화
    reducers: {
        changeProductDetail(state, action) {
            return action.payload; // API에서 받아온 데이터로 스토어 업데이트
        },
    },
})
export let {changeProductDetail} = productDetail.actions

let serverAddr = createSlice({
    name: 'serverAddr',
    initialState:
        {
            serverAddress: 'https://5d72-165-229-50-48.ngrok-free.app'
        }
})

export default configureStore({
    reducer: {
        userData: userData.reducer,
        productData: productData.reducer,
        cartData: cartData.reducer,
        productDetail: productDetail.reducer,
        serverAddr: serverAddr.reducer,
        loginState:loginState.reducer
    }
})