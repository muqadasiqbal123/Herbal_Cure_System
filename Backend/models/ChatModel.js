import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema({
  appointmentId: { type: mongoose.Schema.Types.ObjectId, ref: "appointment" },
  senderId: { type: String, required: true },
  senderName: { type: String, required: true },
  senderRole: { type: String, required: true, enum: ["user", "herbalist", "admin"] },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const ChatModel = mongoose.models.chat || mongoose.model("chat", ChatSchema);

export default ChatModel;
