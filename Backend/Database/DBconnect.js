import mongoose from "mongoose";

const ConnectDatabase = async()=>{
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI,{
            useUnifiedTopology:true,
            useNewUrlParser:true,
        })
        console.log(`MongoDB connected ${connect.connection.host}`)
    } catch (error) {
        console.log(`MongoDb connection error ${error}`)
    }
}

export default ConnectDatabase