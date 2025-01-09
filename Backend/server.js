import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoute.js'
import herbalistRouter from './routes/herbalistRoute.js'
import userRouter from './routes/userRoute.js'

// app config
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()


// middlewares allow front-end connect with back-end
app.use(express.json())       // request pass using this method
app.use(cors())            //allow to connect with front-end

// api endpoints
app.use('/api/admin',adminRouter)
app.use('/api/herbalist',herbalistRouter)
app.use('/api/user',userRouter)


app.get('/',(req,res)=>{
    res.send('API WORKING')
})

app.listen(port, ()=> console.log("Server Started",port))