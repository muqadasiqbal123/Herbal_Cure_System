import express from "express";
import { getMessages, getUserChats, getHerbalistChats, getAdminChats } from "../controllers/ChatController.js";
import authUser from "../middlewares/authUser.js";
import authHerbalist from "../middlewares/authHerbalist.js";
import authAdmin from "../middlewares/authAdmin.js";

const router = express.Router();

// Get messages for a specific appointment
router.get("/messages/:appointmentId", getMessages);

// Get all chats for a user
router.get("/user/chats", authUser, getUserChats);

// Get all chats for a herbalist
router.get("/herbalist/chats", authHerbalist, getHerbalistChats);

// Get all chats for admin
router.get("/admin/chats", authAdmin, getAdminChats);

export default router;
