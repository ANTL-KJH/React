import {configureStore, createSlice} from '@reduxjs/toolkit'
let serverAddr = createSlice({
    name: 'serverAddr',
    initialState:
        {
            serverAddress: 'https://8f07-165-229-185-195.ngrok-f ree.app'
        }
})

export default configureStore({
    reducer: {
        serverAddr: serverAddr.reducer
    }
})