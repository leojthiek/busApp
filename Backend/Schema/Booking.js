import mongoose from 'mongoose'

const bookingSchema = mongoose.Schema(
    {
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            required:true
        },
        bus:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Bus',
            required:true
        },

        seatNumber:{
            type:Number,
            required:true
        }
    },
    {
        timestamps:true
    }
)


const Booking = mongoose.model('Booking',bookingSchema)
export default  Booking