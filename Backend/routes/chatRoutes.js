import express from "express";
import { getMessages } from "../controllers/ChatController.js";

const router = express.Router();
router.get("/:appointmentId", getMessages);

export default router;
