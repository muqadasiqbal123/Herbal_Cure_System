import express from 'express'
import { registerUser,loginUser, getProfile, updateProfile, bookAppointment } from '../controllers/userController.js'
import authUser from '../middlewares/authUser.js'
import upload from '../middlewares/multer.js'  

const userRouter = express.Router()

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)

userRouter.get('/get-profile',authUser,getProfile)
// use two middleware first for passing formData and other for authUser and get userid
userRouter.post('/update-profile',upload.single('image'),authUser,updateProfile)
userRouter.post('/book-appointment', authUser,bookAppointment)



export default userRouter