import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

 export const userLoginAction= createAsyncThunk("user/login",async(userData,{rejectWithValue})=>{
    try {
        const response = await api.post('/user/login',userData)
        const user = response.data

        localStorage.setItem("userBus",JSON.stringify(user))
        return user


    } catch (error) {
        return rejectWithValue(error.response.data.errors)
    }
})


const userLocalstore = JSON.parse(localStorage.getItem("userBus"))

const userLoginReducer = createSlice({
    name:'auth',
    initialState:{
        user:userLocalstore ? userLocalstore : null,
        error:null,
        loading:false
    },
    reducers:{
        logoutUserAction:(state)=>{
            localStorage.removeItem("userBus")
            state.user=null
        }
    },
    extraReducers: (builder)=>{
        builder
        .addCase(userLoginAction.pending,(state)=>{
            state.loading=true
        })
        .addCase(userLoginAction.fulfilled,(state,action)=>{
            state.user=action.payload
            state.loading=false
            state.error=null
        })

        .addCase(userLoginAction.rejected,(state,action)=>{
            state.error=action.payload
            state.loading=false
        })
    }
})
export const {logoutUserAction} = userLoginReducer.actions
export default userLoginReducer.reducer