import {configureStore} from '@reduxjs/toolkit'
import registerUserReducer from './features/registerFeature'
import createTicketReducer from './features/createTicketFeatures'
import findBusesReducer from './features/findBusesFeatures'
import busDetailsReducer from "./features/busDetailFetures"
import userLoginReducer from './features/loginFeatures'
import ticketBookingReducer from './features/bookingFeatures'
import userTicketReducer from "./features/userTicketDeatures"


const store = configureStore({
   reducer:{
     registerUser:registerUserReducer,
     createTicket:createTicketReducer,
     findBuses:findBusesReducer,
     busDetails:busDetailsReducer,
     userLogin:userLoginReducer,
     ticketBooking:ticketBookingReducer,
     userTicket:userTicketReducer,
   }
})

export default store