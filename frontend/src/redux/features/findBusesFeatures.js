import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";
 export const findBusesAction= createAsyncThunk("find/buses",async(busData,{rejectWithValue})=>{
    try {
        const response = await api.post('bus/find/buses',busData)
        return response.data.findingBuses


    } catch (error) {
        return rejectWithValue(error.response.data.errors)
    }
})


const findBusesReducer = createSlice({
    name:'findBuses',
    initialState:{
        buses:null,
        error:null,
        loading:false
    },
    reducers:{},
    extraReducers: (builder)=>{
        builder
        .addCase(findBusesAction.pending,(state)=>{
            state.loading=true
        })
        .addCase(findBusesAction.fulfilled,(state,action)=>{
            state.buses=action.payload
            state.loading=false
            state.error=null
        })

        .addCase(findBusesAction.rejected,(state,action)=>{
            state.error=action.payload
            state.loading=false
        })
    }
})

export default findBusesReducer.reducer