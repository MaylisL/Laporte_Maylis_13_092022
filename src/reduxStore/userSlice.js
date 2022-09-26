import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_PATH = "http://localhost:3001/api/v1"

export const loadUser = createAsyncThunk('user/load', async (token, {rejectWithValue}) => {    
    // get profile info using the token
    try  { 
        const { data } = await axios({
            method: 'POST',
            url:`${API_BASE_PATH}/user/profile`,
            headers:  {
                'Authorization': `Bearer ${token}`
            }
        })
        return data.body;
    } catch (error){
        if(error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message)
        } else {
            return rejectWithValue(error.message)
        }
    }

})

export const updateUser = createAsyncThunk('user/update', async (userData, {getState, rejectWithValue}) => {    
    // userData contains token, and user object with firstname and lastname
    try  { 
        const { auth } = getState()
        const config =  {
            headers:  {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth.token}`
            }
        }
        const { data } = await axios.put(`${API_BASE_PATH}/user/profile`, userData.user, config)
        return data.body;
    } catch (error){
        if(error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message)
        } else {
            return rejectWithValue(error.message)
        }
    }
})

const initialState = {
    loading: false,
    firstName: null,
    lastName: null,
    success: false,
    error: null,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        clearUser:  (state) => {
            state.firstName = null
            state.lastName = null
            state.error = null
            state.loading = false
            state.success = false
        }
    },
    extraReducers: {
        [loadUser.pending]: (state) => {
            state.loading = true
            state.error = null
        },
        [loadUser.fulfilled]: (state, action) =>  {
            state.loading = false
            state.success = true
            state.firstName = action.payload?.firstName
            state.lastName = action.payload?.lastName
        },
        [loadUser.rejected]: (state, action) => {
            state.loading = false
            state.success = false
            state.error = action.payload
        },
        [updateUser.pending]: (state) => {
            state.loading = true
            state.error = null
        },
        [updateUser.fulfilled]: (state, action) =>  {
            state.loading = false
            state.success = true
            state.firstName = action.payload?.firstName
            state.lastName = action.payload?.lastName
        },
        [updateUser.rejected]: (state,  action) => {
            state.loading = false
            state.success = false
            state.error = action.payload
        }
    }
})

export const { clearUser } = userSlice.actions;

export default userSlice.reducer