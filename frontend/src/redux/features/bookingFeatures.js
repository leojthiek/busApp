import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";
 export const bookingTicketeAction= createAsyncThunk("ticket/booking",async(data,{rejectWithValue})=>{
    try {
        const response = await api.post('/bus/ticket/booking',data)
        return response.data.message


    } catch (error) {
        return rejectWithValue(error.response.data.errors)
    }
})


const ticketBookingReducer = createSlice({
    name:'bookTicket',
    initialState:{
        ticket:[],
        error:null,
        loading:false
    },
    reducers:{},
    extraReducers: (builder)=>{
        builder
        .addCase(bookingTicketeAction.pending,(state)=>{
            state.loading=true
        })
        .addCase(bookingTicketeAction.fulfilled,(state,action)=>{
            state.ticket=action.payload
            state.loading=false
            state.error=null
        })

        .addCase(bookingTicketeAction.rejected,(state,action)=>{
            state.error=action.payload
            state.loading=false
        })
    }
})

export default ticketBookingReducer.reducer