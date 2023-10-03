import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";
 export const createTicketAction= createAsyncThunk("create/ticket",async(busData,{rejectWithValue})=>{
    try {
        const response = await api.post('/bus/create/available',busData)
        return response.data.success


    } catch (error) {
        return rejectWithValue(error.response.data.errors)
    }
})


const createTicketReducer = createSlice({
    name:'createTicket',
    initialState:{
        busTicket:null,
        error:null,
        loading:false
    },
    reducers:{},
    extraReducers: (builder)=>{
        builder
        .addCase(createTicketAction.pending,(state)=>{
            state.loading=true
        })
        .addCase(createTicketAction.fulfilled,(state,action)=>{
            state.busTicket=action.payload
            state.loading=false
            state.error=null
        })

        .addCase(createTicketAction.rejected,(state,action)=>{
            state.error=action.payload
            state.loading=false
        })
    }
})

export default createTicketReducer.reducer