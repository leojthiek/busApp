import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";
 export const busDetailsAction= createAsyncThunk("bus/details",async(id,{rejectWithValue})=>{
    try {
        const response = await api.get(`/bus/details/${id}`)
        return response.data.bus


    } catch (error) {
        return rejectWithValue(error.response.data.errors)
    }
})


const busDetailsReducer = createSlice({
    name:'budDetails',
    initialState:{
        busDetail:null,
        error:null,
        loading:false
    },
    reducers:{},
    extraReducers: (builder)=>{
        builder
        .addCase(busDetailsAction.pending,(state)=>{
            state.loading=true
        })
        .addCase(busDetailsAction.fulfilled,(state,action)=>{
            state.busDetail=action.payload
            state.loading=false
            state.error=null
        })

        .addCase(busDetailsAction.rejected,(state,action)=>{
            state.error=action.payload
            state.loading=false
        })
    }
})

export default busDetailsReducer.reducer