import express from 'express'
import { addHerbalist, allHerbalists, loginAdmin } from '../controllers/adminController.js'
import upload from '../middlewares/multer.js';
import authAdmin from '../middlewares/authadmin.js';
import { changeAvailability } from '../controllers/herbalistController.js';

const adminRouter = express.Router();

adminRouter.post('/add-herbalist', authAdmin ,upload.single('image'), addHerbalist);
adminRouter.post('/login',  loginAdmin);
adminRouter.post('/all-herbalists',authAdmin,allHerbalists);
adminRouter.post('/change-availability',authAdmin,changeAvailability);

export default adminRouter;