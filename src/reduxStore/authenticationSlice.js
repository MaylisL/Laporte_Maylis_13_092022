import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const API_BASE_PATH = "http://localhost:3001/api/v1"

export const postLogin = createAsyncThunk('authentication/login', async (loginData, {rejectWithValue}) => {
    // try getting token by login
    try  { 
        const config = { 
            headers:  {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post(`${API_BASE_PATH}/user/login`, loginData, config)
        return data.body;
    } catch (error){
        if(error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message)
        } else {
            return rejectWithValue(error.message)
        }
    }
    
})

export const authenticationSlice = createSlice({
    name: 'authentication',
    initialState: {
        token: null,
        status: 'idle',
        error: null,
    },
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
            state.status = 'succeeded'
        },
        clearToken: (state, action) => {
            state.token = null;
            state.status = 'idle'
            localStorage.removeItem('token');
        }
    },
    extraReducers(builder) {
        builder
        .addCase(postLogin.pending, (state, action) => {
            state.status = 'loading'
        })
        .addCase(postLogin.fulfilled, (state, action) =>  {
            state.status = 'succeeded'
            state.token = action.payload?.token
            state.error = null
        })
        .addCase(postLogin.rejected, (state,  action) => {
            state.status = 'failed'
            state.error = action.payload
        })
    }

})



export const { setToken, clearToken } = authenticationSlice.actions;


export default authenticationSlice.reducer;