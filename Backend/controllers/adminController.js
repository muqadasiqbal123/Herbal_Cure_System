import validator from 'validator'
import bcrypt from 'bcrypt'
import { v2 as cloudinary } from 'cloudinary'
import herbalistModel from '../models/herbalistmodel.js'
import jwt from 'jsonwebtoken'
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
export {addHerbalist, loginAdmin, allHerbalists}



