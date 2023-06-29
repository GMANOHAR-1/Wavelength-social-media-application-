import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import cors from 'cors'

import AuthRoute from './Routes/AuthRoutes.js'
import UserRoute from './Routes/UserRoutes.js'
import PostRoute from './Routes/PostRoutes.js' 
import UploadRoute from './Routes/UploadRoutes.js'
import ChatRoute from './Routes/ChatRoute.js'
import MessageRoute from './Routes/MessageRoute.js'
// Routes

const app = express()
//to serve images for public 

app.use(express.static('public'))
app.use('/images',express.static("images"))


//middleware
 
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors())
dotenv.config()
mongoose.connect(process.env.MONGO_DB,
    { useNewUrlparser: true, useUnifiedTopology: true }).
    then(() => app.listen(process.env.PORT, () => {
        console.log('listening and connecting')
    })
    ).catch(err => {
        console.log(err)
    }) 


//usage of routes

app.use('/auth',AuthRoute)
app.use('/user',UserRoute)
app.use('/post',PostRoute)
app.use('/upload',UploadRoute)
app.use('/chat',ChatRoute)
app.use('/message',MessageRoute)