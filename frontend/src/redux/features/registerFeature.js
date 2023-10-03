import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";
 export const userRegisterAction= createAsyncThunk("user/register",async(userData,{rejectWithValue})=>{
    try {
        const response = await api.post('/user/register',userData)
        return response.data.userSave


    } catch (error) {
        return rejectWithValue(error.response.data.errors)
    }
})


const registerReducer = createSlice({
    name:'auth',
    initialState:{
        userRegister:null,
        error:null,
        loading:false
    },
    reducers:{},
    extraReducers: (builder)=>{
        builder
        .addCase(userRegisterAction.pending,(state)=>{
            state.loading=true
        })
        .addCase(userRegisterAction.fulfilled,(state,action)=>{
            state.userRegister=action.payload
            state.loading=false
            state.error=null
        })

        .addCase(userRegisterAction.rejected,(state,action)=>{
            state.error=action.payload
            state.loading=false
        })
    }
})

export default registerReducer.reducer