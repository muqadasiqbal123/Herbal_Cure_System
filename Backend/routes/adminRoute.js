import express from 'express'
import { addHerbalist } from '../controllers/adminController.js'
import upload from '../middlewares/multer.js';

const adminRouter = express.Router();

adminRouter.post('/add-herbalist', upload.single('image'), addHerbalist);

export default adminRouter;