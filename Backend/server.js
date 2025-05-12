import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import adminRouter from "./routes/adminRoute.js";
import herbalistRouter from "./routes/herbalistRoute.js";
import userRouter from "./routes/userRoute.js";
import paymentRouter from "./routes/paymentRouter.js";
import chatRoutes from "./routes/chatRoutes.js";
import { Server } from "socket.io";
import { createServer } from "http";
import ChatModel from "./models/ChatModel.js";
import appointmentModel from "./models/appointmentModel.js";

// app config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

// Create HTTP server
const server = createServer(app);

// Socket.io setup
const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://herbal-cure-system-admin.vercel.app",
      "https://herbal-cure-system-client.vercel.app",
    ], // Allow all origins (change this for production)
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  },
});

// middlewares allow front-end connect with back-end
app.use(express.json()); // request pass using this method
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://herbal-cure-system-admin.vercel.app",
      "https://herbal-cure-system-client.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  })
); //allow to connect with front-end

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to Herbal Cure System" });
});

// api endpoints
app.use("/api/admin", adminRouter);
app.use("/api/herbalist", herbalistRouter);
app.use("/api/user", userRouter);
app.use("/api/payment", paymentRouter);
app.use("/api/chat", chatRoutes);

app.get("/", (req, res) => {
  res.send("API WORKING");
});

// Socket.io connection handling
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Join a chat room based on appointment ID
  socket.on("joinRoom", ({ appointmentId }) => {
    socket.join(appointmentId);
    console.log(`User joined room: ${appointmentId}`);
  });

  // Handle sending messages
  socket.on(
    "sendMessage",
    async ({ appointmentId, senderId, senderName, senderRole, message }) => {
      try {
        // Save message to database
        const newMessage = new ChatModel({
          appointmentId,
          senderId,
          senderName,
          senderRole,
          message,
        });
        await newMessage.save();

        // Broadcast message to all users in the room
        io.to(appointmentId).emit("receiveMessage", {
          _id: newMessage._id,
          senderId,
          senderName,
          senderRole,
          message,
          timestamp: newMessage.timestamp,
        });

        console.log(
          `Message sent in room ${appointmentId} by ${senderRole} ${senderName}`
        );
      } catch (error) {
        console.error("Error sending message:", error);
        socket.emit("error", { message: "Failed to send message" });
      }
    }
  );

  // Handle admin joining all rooms
  socket.on("adminJoinAllRooms", async (adminData) => {
    try {
      // Get all active appointment IDs
      const appointments = await appointmentModel
        .find({
          payment: true,
          cancelled: false,
        })
        .select("_id");

      // Join all appointment rooms
      appointments.forEach((appointment) => {
        socket.join(appointment._id.toString());
      });

      console.log(`Admin ${adminData.name} joined all chat rooms`);
    } catch (error) {
      console.error("Error joining admin to rooms:", error);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Start the server
server.listen(port, () => console.log(`Server started on port ${port}`));
