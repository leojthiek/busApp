import mongoose from "mongoose";


const BusSchema = mongoose.Schema(
    {
        busName:{
            type:String,
        },
        busNumber:{
            type:String,
        },
        departureCity:{
            type:String,
        },
        arriveCity:{
            type:String,
        },
        departureTime:{
            type:Date,
        },
        price:{
            type:Number,
        },
        totalSeat:{
            type:Number,
        },
        busImage:{
            type:String,
        },
        availableSeat:{
            type:Number,
        }
    },
    {
        timestamps:true
    }
)

const BusModel = mongoose.model('Bus',BusSchema)
export default BusModel