
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import authenticationReducer from  './authenticationSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        auth: authenticationReducer
    }
})

export default store;