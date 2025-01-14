import express from 'express'
import { addHerbalist, allHerbalists, loginAdmin, appointmentsAdmin, appointmentCancel, adminDashboard } from '../controllers/adminController.js'
import upload from '../middlewares/multer.js';
import authAdmin from '../middlewares/authadmin.js';
import { changeAvailability } from '../controllers/herbalistController.js';

const adminRouter = express.Router();

adminRouter.post('/add-herbalist', authAdmin ,upload.single('image'), addHerbalist);
adminRouter.post('/login',  loginAdmin);
adminRouter.post('/all-herbalists',authAdmin,allHerbalists);
adminRouter.post('/change-availability',authAdmin,changeAvailability);
adminRouter.get('/appointments',authAdmin,appointmentsAdmin);
adminRouter.post('/cancel-appointment',authAdmin,appointmentCancel)
adminRouter.get('/dashboard',authAdmin,adminDashboard)

export default adminRouter;