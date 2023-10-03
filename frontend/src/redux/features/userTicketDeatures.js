import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";
 export const userTicketAction= createAsyncThunk("bus/details",async(id,{rejectWithValue})=>{
    try {
        const response = await api.get(`/user/ticket/${id}`)
        return response.data.ticket


    } catch (error) {
        return rejectWithValue(error.response.data.errors)
    }
})


const userTicketReducer = createSlice({
    name:'budDetails',
    initialState:{
        ticket:null,
        error:null,
        loading:false
    },
    reducers:{},
    extraReducers: (builder)=>{
        builder
        .addCase(userTicketAction.pending,(state)=>{
            state.loading=true
        })
        .addCase(userTicketAction.fulfilled,(state,action)=>{
            state.ticket=action.payload
            state.loading=false
            state.error=null
        })

        .addCase(userTicketAction.rejected,(state,action)=>{
            state.error=action.payload
            state.loading=false
        })
    }
})

export default userTicketReducer.reducer