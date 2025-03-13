import express from "express";
import {
  allMessages,
  sendMessage,
} from "../controllers/messageControllers.js";
import { protect } from "../middlewares/authMiddleware.js";

const messageRoutes = express.Router();

messageRoutes.route("/:chatId").get(protect, allMessages);
messageRoutes.route("/").post(protect, sendMessage);

export default messageRoutes;
