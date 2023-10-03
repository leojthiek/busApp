import express from 'express';
import dotenv from 'dotenv'
import ConnectDatabase from './Database/DBconnect.js';
import busRoute from "./Route/Busroute.js"
import userRoute from "./Route/userRoute.js"
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cors())
dotenv.config()
ConnectDatabase()

app.get('/',(req,res)=>{
    res.send('hello')
})

app.use('/api/bus/',busRoute)
app.use('/api/user',userRoute)

app.listen(5000,()=> console.log('server is up and running'))

