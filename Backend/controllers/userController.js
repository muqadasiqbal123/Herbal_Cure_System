import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'

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

export {registerUser, loginUser, getProfile}