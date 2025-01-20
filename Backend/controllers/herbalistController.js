import herbalistModel from "../models/herbalistmodel.js"
import bcrypt from'bcrypt'
import jwt from 'jsonwebtoken'
import appointmentModel from "../models/appointmentModel.js"

const changeAvailability = async (req,res) => {

    try {

        const {herbId} = req.body

        const herbData = await herbalistModel.findById(herbId)
        await herbalistModel.findByIdAndUpdate(herbId,{available: !herbData.available})
        res.json({success:true, message: 'Availability Changed'})
  
    } catch (error) {
        console.log(error)
      res.json({success:false,message:error.message})
    }
}

const herbalistList = async ( req,res) => {
    try {
        
        const herbalists = await herbalistModel.find({}).select(['-password','-email'])
        res.json({success:true,herbalists})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

// API for herbalist Login
const loginHerbalist = async (req,res) =>{
    try {
        
        const { email, password } = req.body
        const herbalist = await herbalistModel.findOne({email})

        if (!herbalist) {
            return res.json({success:false,message:'Invalid Credentials'})
        }

        const isMatch = await bcrypt.compare(password, herbalist.password)
        
        if (isMatch) {
            const token = jwt.sign({id:herbalist._id},process.env.JWT_SECRET)
            res.json({success:true,token})
        } else {
            res.json({success:false,message:'Invalid Credentials'})
        }

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

// api to get herbalist appoinments for herbalist panel
const appointmentHerbalist = async (req,res) => {
    try {
        
        const { herbID } = req.body
        const appointments = await appointmentModel.find({ herbID })

        res.json({success:true, appointments})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

// API to make appointment completed for herbalist panel
const appointmentComplete = async (req,res) => {
    try {
        
        const { herbID, appointmentId } = req.body

        const appointmentData = await appointmentModel.findById(appointmentId)

        if (appointmentData && appointmentData.herbID === herbID) {
            
            await appointmentModel.findByIdAndUpdate(appointmentId, {isCompleted: true})
            return res.json({success:true,message:'Appointment Completed'})

        } else {
            return res.json({success:false,message:'Mark Failed'})
        }

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

// API to cancel appointment  for herbalist panel
const appointmentCancel = async (req,res) => {
    try {
        
        const { herbID, appointmentId } = req.body

        const appointmentData = await appointmentModel.findById(appointmentId)

        if (appointmentData && appointmentData.herbID === herbID) {
            
            await appointmentModel.findByIdAndUpdate(appointmentId, {cancelled: true})
            return res.json({success:true,message:'Appointment Cancelled'})

        } else {
            return res.json({success:false,message:'Cancellation Failed'})
        }

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

// API to get dashboard data for herbalist panel
const herbalistDashboard = async (req,res) => {
    try {
        
        const {herbID} = req.body

        const appointments = await appointmentModel.find({herbID})

        let earnings = 0

        appointments.map((item)=>{
            if (item.isCompleted || item.payment) {
                earnings += item.amount
            }
        })

        let patients = []

        appointments.map((item)=>{
            if (!patients.includes(item.userId)) {
                patients.push(item.userId)
            }
        })

        const dashData = {
            earnings,
            appointments: appointments.length,
            patients: patients.length,
            latestAppointments: appointments.reverse().slice(0,5)
        }

        res.json({success:true, dashData})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}
// Api to get herbalist Profile for herbalist Panel
const herbalistProfile = async (req,res) => {
    try {

        const {herbID} = req.body
        const profileData = await herbalistModel.findById(herbID).select('-password')

        res.json({success:true, profileData})
        
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})    
    }
}

// Api to update herbalist profile data from herbalist Panel
const updateHerbalistProfile = async (req,res) => {
    try {
      
        const { herbID, fees, address, available } = req.body 

        await herbalistModel.findByIdAndUpdate(herbID, {fees, address, available})

        res.json({success:true, message:'Profile Updated'})
        
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})   
    }
}

export {
    changeAvailability,
    herbalistList,
    loginHerbalist,
    appointmentHerbalist, 
    appointmentCancel,
    appointmentComplete,
    herbalistDashboard,
    herbalistProfile,
    updateHerbalistProfile,
}