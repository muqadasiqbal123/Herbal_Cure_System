import ChatModel from "../models/ChatModel.js";

export const getMessages = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const messages = await ChatModel.find({ appointmentId }).sort("timestamp");
    res.json({ success: true, messages });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
