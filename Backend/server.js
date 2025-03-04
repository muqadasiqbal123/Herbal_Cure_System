import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoute.js'
import herbalistRouter from './routes/herbalistRoute.js'
import userRouter from './routes/userRoute.js'
import paymentRouter from './routes/paymentRouter.js'
// import chatRoutes from "./routes/chatRoutes.js";
// import { Server } from "socket.io";
// import { createServer } from "http";

// app config
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()


// middlewares allow front-end connect with back-end
app.use(express.json())       // request pass using this method
app.use(cors())            //allow to connect with front-end

// api endpoints

app.use('/api/admin',adminRouter)
app.use('/api/herbalist',herbalistRouter)
app.use('/api/user',userRouter);
app.use('/api/payment',paymentRouter);


app.get('/',(req,res)=>{
    res.send('API WORKING')
})

// Socket.io 
// const app = express();
// const server = createServer(app);

// const io = new Server(server, {
//   cors: {
//     origin: "*", // Allow all origins (change this for production)
//   },
// });

// io.on("connection", (socket) => {
//   console.log("A user connected:", socket.id);

//   socket.on("joinRoom", ({ appointmentId }) => {
//     socket.join(appointmentId);
//   });

//   socket.on("sendMessage", async ({ appointmentId, sender, message }) => {
//     const newMessage = new ChatModel({ appointmentId, sender, message });
//     await newMessage.save();
//     io.to(appointmentId).emit("receiveMessage", { sender, message });
//   });

//   socket.on("disconnect", () => {
//     console.log("User disconnected");
//   });
// });

// Use chat routes
// app.use("/api/chat", chatRoutes);

// server.listen(5000, () => {
//   console.log("Server is running on port 5000");
// });


// io.on("connection", (socket) => {
//     console.log("A user connected:", socket.id);
  
//     socket.on("joinRoom", ({ appointmentId }) => {
//       socket.join(appointmentId);
//     });
  
//     socket.on("sendMessage", async ({ appointmentId, sender, message }) => {
//       const newMessage = new ChatModel({ appointmentId, sender, message });
//       await newMessage.save();
//       io.to(appointmentId).emit("receiveMessage", { sender, message });
//     });
  
//     socket.on("disconnect", () => {
//       console.log("User disconnected");
//     });
//   });
  

app.listen(port, ()=> console.log("Server Started",port))