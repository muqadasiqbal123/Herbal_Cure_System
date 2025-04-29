import express from 'express'
import { herbalistList, loginHerbalist, appointmentHerbalist, appointmentCancel, appointmentComplete ,herbalistDashboard, herbalistProfile, updateHerbalistProfile, getAppointmentById} from '../controllers/herbalistController.js'
import authHerbalist from '../middlewares/authHerbalist.js'

const herbalistRouter = express.Router()

// Create Endpoint to get all herbalist list
herbalistRouter.get('/list', herbalistList)
herbalistRouter.post('/login', loginHerbalist)
herbalistRouter.get('/appointments',authHerbalist,appointmentHerbalist)
herbalistRouter.post('/complete-appointment',authHerbalist,appointmentComplete)
herbalistRouter.post('/cancel-appointment',authHerbalist,appointmentCancel)
herbalistRouter.get('/dashboard',authHerbalist,herbalistDashboard)
herbalistRouter.get('/profile',authHerbalist,herbalistProfile)
herbalistRouter.post('/update-profile',authHerbalist,updateHerbalistProfile)
herbalistRouter.get('/appointment/:id', authHerbalist, getAppointmentById)

export default herbalistRouter