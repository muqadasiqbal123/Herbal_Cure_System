import validator from 'validator'
import bcrypt from 'bcrypt'
import { v2 as cloudinary } from 'cloudinary'
import herbalistModel from '../models/herbalistModel.js'
import jwt from 'jsonwebtoken'
import appointmentModel from '../models/appointmentModel.js'
import userModel from '../models/userModel.js'


//  API for adding Herbalists
const addHerbalist = async (req,res) => {

   try{
      const{name, email, password, speciality, degree, experience, about, fees, address, } = req.body
      const imageFile = req.file

      // checking for all data to add herbalist
      if(!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address ||!imageFile) {
           return res.json({success:false,message: "Missing Details"})
      }

      // validate email format
      if(!validator.isEmail(email)){
         return res.json({success:false,message: "Please enter a valid email"})
      }

   //   validating strong password 
    if(password.length < 8){
      return res.json({success:false,message: "Please enter a strong password"})
      }

      // Hashing doctor Password
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password,salt)

      // uploading image to cloudinary
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type: "image"})
      const imageUrl = imageUpload.secure_url

      const herbalistData = {
         name,
         email,
         password: hashedPassword,
         image: imageUrl,
         speciality,
         degree,
         experience,
         about,
         fees,
         address:JSON.parse(address),
         date: Date.now()
      }

      const newHerbalist = await herbalistModel(herbalistData)
      await newHerbalist.save()

      res.json({success:true,message: "Herbalist Added Successfully"})

   } catch (error) {
       console.log(error)
        res.json({success:false,message:error.message})
   }
}

// Api for admin login
const loginAdmin = async (req,res) => {
   try {

      const {email, password} = req.body

      if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){

         const token = jwt.sign(email+password , process.env.JWT_SECRET)
         res.json({success:true, token})
         
      }else{
         res.json({succes:false,message:"Invalid Credentials"})
      }
      
   } catch (error) {
      console.log(error)
        res.json({success:false,message:error.message})
   }
}

// API to get all herbalists list for admin panel
const allHerbalists = async (req,res) => {
   try {
      const herbalists = await herbalistModel.find({}).select('-password')
      res.json({success:true,herbalists})
      
   } catch (error) {
      console.log(error)
      res.json({success:false,message:error.message})
   }
}

// Api to get all appointments list
const appointmentsAdmin = async (req, res) => {
   try {
      
      const appointments = await appointmentModel.find({})
      res.json({success:true,appointments})

   } catch (error) {
      console.log(error)
      res.json({success:false,message:error.message})
   }
}

// API for appointment cancellation 
const appointmentCancel = async (req, res) => {

   try {
       
       const {appointmentId} = req.body

       const appointmentData = await appointmentModel.findById(appointmentId)


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
// API to get dashboard data for admin Panel
const adminDashboard = async (req,res) => {
   try {
      
      const herbalists = await herbalistModel.find({})
      const users = await userModel.find({})
      const appointments = await appointmentModel.find({})

      const dashData = {
         herbalists: herbalists.length,
         appointments: appointments.length,
         patients: users.length,
         latestAppointments: appointments.reverse().slice(0,5)
      }

      res.json({success:true,dashData})

   } catch (error) {
      console.log(error)
       res.json({success:false,message:error.message}) 
   }
}

// Get a single appointment by ID
const getAppointmentById = async (req, res) => {
  try {
    const { id } = req.params;

    // Admins can access any appointment
    const appointment = await appointmentModel.findById(id);

    if (!appointment) {
      return res.status(404).json({ success: false, message: "Appointment not found" });
    }

    res.json({ success: true, appointment });
  } catch (error) {
    console.error("Error fetching appointment:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export {addHerbalist, loginAdmin, allHerbalists, appointmentsAdmin , appointmentCancel, adminDashboard, getAppointmentById}



