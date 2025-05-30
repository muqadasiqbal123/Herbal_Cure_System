import express from "express";
import {
  addHerbalist,
  allHerbalists,
  loginAdmin,
  appointmentsAdmin,
  appointmentCancel,
  adminDashboard,
  getAppointmentById,
} from "../controllers/adminController.js";
import upload from "../middlewares/multer.js";
import authAdmin from "../middlewares/authAdmin.js";
import { changeAvailability } from "../controllers/herbalistController.js";

const adminRouter = express.Router();

adminRouter.post(
  "/add-herbalist",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "certificate", maxCount: 1 },
  ]),
  addHerbalist
);
adminRouter.post("/login", loginAdmin);
adminRouter.post("/all-herbalists", authAdmin, allHerbalists);
adminRouter.post("/change-availability", authAdmin, changeAvailability);
adminRouter.get("/appointments", appointmentsAdmin);
adminRouter.post("/cancel-appointment", authAdmin, appointmentCancel);
adminRouter.get("/dashboard", authAdmin, adminDashboard);
adminRouter.get("/appointment/:id", getAppointmentById);

export default adminRouter;
