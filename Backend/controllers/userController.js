import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import { v2 as cloudinary } from 'cloudinary'
import herbalistModel from '../models/herbalistModel.js'
import appointmentModel from '../models/appointmentModel.js'
// import stripe from 'stripe'

// Api to register user
const registerUser = async (req, res) => {

    try {
        
        const { name, email, password} = req.body

        if( !name || !email || !password) {
            return res.json({success:false, message:"Missing Details"})
        }
       
        // validating email format
        if (!validator.isEmail(email)) {
            return res.json({success:false, message:" enter a Valid email"})
        }

        // Validating  strong password
        if (password.length < 8) {
            return res.json({success:false, message:" enter a strong password"})
        }

        // enter user in database first hashed/encrypt the password using bycrypt package 
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        // save the hashed password in database
        const userData = {
            name,
            email,
            password : hashedPassword
        }

        // save the userdata in database
        const newUser = new userModel(userData)
        const user = await newUser.save()

        // using user object get _id property to create a token so user can login
        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET )
        res.json({success:true, token})


    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }

}

// Api for user Login
const loginUser = async ( req,res ) => {

    try {
        
        const {email,password} = req.body
        const user = await userModel.findOne({email})

        if (!user) {
            return res.json({success:false,message:'user does not exist'})  
        }
    //  match the password that save in the database
        const isMatch = await bcrypt.compare(password,user.password)

        if (isMatch) {
            const token = jwt.sign({id:user._id}, process.env.JWT_SECRET)
            res.json({success:true,token})
        }else{
            res.json({success:false,message:"Invalid Credentials"})
        }

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message}) 
    }

}

// API to get user profile detail and display user data
const getProfile = async (req,res) => {

//we will get user id by using authentication and use them we get userdata and provide user data to front-end 
    try {        

        const { userId } = req.body
        const userData = await userModel.findById(userId).select('-password')

        res.json({success:true,userData})
        
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message}) 
    }

}

// API for update user profile
const updateProfile = async (req, res) =>{
        try {
            
            const { userId, name, phone, address, dob, gender } = req.body
            const imageFile = req.file

            if ( !name || !phone || !dob || !gender) {
                return  res.json({success:false,message:"Data Missing"})
            }

            await userModel.findByIdAndUpdate(userId,{name, phone, address:JSON.parse(address),dob,gender})

            if(imageFile){

                // uplaod image to cloudinary and in res we get imgURL and save it in one variable
                const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type:'image'})
                const imageURL = imageUpload.secure_url

                await userModel.findByIdAndUpdate(userId,{image:imageURL})

            }

            res.json({success:true, message:"Profile Updated"})

        } catch (error) {
             console.log(error)
        res.json({success:false,message:error.message}) 
        }
}

// Api to book appointment
const bookAppointment = async (req, res) => {

    try {

        const {userId, herbID, slotDate, slotTime} = req.body //taking data from req

        const herbData = await herbalistModel.findById(herbID).select('-password')

        if (!herbData.available) {
            return res.json({success:false, message:'Herbalist not Available'})
        }

        let slots_booked = herbData.slots_booked

        // Checking for slots Availability
        if (slots_booked[slotDate]) {
            if (slots_booked[slotDate].includes(slotTime)) {
                return res.json({success:false, message:'Slot not Available'})
            } else {
                slots_booked[slotDate].push(slotTime)
            }
        } else {
            slots_booked[slotDate] = []
            slots_booked[slotDate].push(slotTime)
        }
        
        const userData = await userModel.findById(userId).select('-password')

        delete herbData.slots_booked

        const appointmentData = {
            userId,
            herbID,
            userData,
            herbData,
            amount:herbData.fees,
            slotTime,
            slotDate,
            date: Date.now()
        }
        // Save the newapppointment in database
        const newAppointment = new appointmentModel(appointmentData)
        await newAppointment.save()

        // save new slots data in herbData
        await herbalistModel.findByIdAndUpdate(herbID,{slots_booked})

        res.json({success:true,message:'Appointment Booked'})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message}) 
    }

}

// Api to get and display user appointments for the frontend my-appointment page
const listAppointment = async (req,res) => {

    try {
        
        const {userId} = req.body
        const appointments = await appointmentModel.find({userId})

        res.json({success:true,appointments})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message}) 
    }

}

// Api to cancel Appointment
const cancelAppointment = async (req, res) => {

    try {
        
        const {userId, appointmentId} = req.body

        const appointmentData = await appointmentModel.findById(appointmentId)

        // verify appointment user
        if (appointmentData.userId !== userId) {
            return res.json({success:false, message:'Unauthorized action'})
        }

        await appointmentModel.findByIdAndUpdate(appointmentId, {cancelled:true})

        // releasing herbalist slot

        const {herbID, slotDate, slotTime} = appointmentData

        const herbalistData = await herbalistModel.findById(herbID)

        let slots_booked = herbalistData.slots_booked

        slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)

        await herbalistModel.findByIdAndUpdate(herbID, {slots_booked})

        res.json({success:true, message:'Appointment Cancelled'})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message}) 
    }

}

// Get a single appointment by ID
const getAppointmentById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    // Find the appointment by ID and ensure it belongs to the requesting user
    const appointment = await appointmentModel.findOne({ 
      _id: id,
      userId: userId
    });

    if (!appointment) {
      return res.status(404).json({ success: false, message: "Appointment not found" });
    }

    res.json({ success: true, appointment });
  } catch (error) {
    console.error("Error fetching appointment:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export {registerUser, loginUser, getProfile, updateProfile, bookAppointment, listAppointment, cancelAppointment, getAppointmentById}