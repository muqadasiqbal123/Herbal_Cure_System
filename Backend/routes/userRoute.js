import express from 'express'
import { registerUser,loginUser, getProfile, updateProfile, bookAppointment, listAppointment, cancelAppointment, getAppointmentById} from '../controllers/userController.js'
import authUser from '../middlewares/authUser.js'
import upload from '../middlewares/multer.js'  

const userRouter = express.Router()

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)

userRouter.get('/get-profile',authUser,getProfile)
// use two middleware first for passing formData and other for authUser and get userid
userRouter.post('/update-profile',upload.single('image'),authUser,updateProfile)
userRouter.post('/book-appointment', authUser,bookAppointment)
userRouter.get('/appointments',authUser,listAppointment)  //  use header to get userid add middleware
userRouter.post('/cancel-appointment',authUser,cancelAppointment)
// userRouter.post('/payment-stripe',authUser,paymentStripe)
userRouter.get('/appointment/:id', authUser, getAppointmentById)

export default userRouter