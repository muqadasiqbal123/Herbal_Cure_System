import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema({
  appointmentId: { type: mongoose.Schema.Types.ObjectId, ref: "Appointment" },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  message: String,
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model("Chat", ChatSchema);
