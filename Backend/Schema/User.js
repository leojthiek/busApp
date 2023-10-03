import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        },
        age:{
            type:Number,
            required:true
        },
       
        phoneNumber: {
            type:String,
            required:true,
            unique:true
          },
    },
    {
        timestamp:true
    }
)

const User = mongoose.model('User',userSchema)
export default User