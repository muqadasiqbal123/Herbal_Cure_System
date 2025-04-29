import ChatModel from "../models/ChatModel.js";
import appointmentModel from "../models/appointmentModel.js";

export const getMessages = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const messages = await ChatModel.find({ appointmentId }).sort("timestamp");
    res.json({ success: true, messages });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getUserChats = async (req, res) => {
  try {
    // Use req.userId which is set by the authUser middleware
    const userId = req.userId;
    
    if (!userId) {
      return res.status(401).json({ success: false, message: "User not authenticated" });
    }
    
    // Find all appointments for this user
    const appointments = await appointmentModel.find({ 
      userId, 
      payment: true,
      cancelled: false
    });
    
    // Get the latest message for each appointment
    const chats = await Promise.all(
      appointments.map(async (appointment) => {
        const latestMessage = await ChatModel.findOne({ 
          appointmentId: appointment._id 
        }).sort({ timestamp: -1 });
        
        return {
          _id: appointment._id,
          herbalistName: appointment.herbData.name,
          herbalistId: appointment.herbID,
          date: appointment.slotDate,
          time: appointment.slotTime,
          latestMessage: latestMessage ? latestMessage.message : "No messages yet",
          timestamp: latestMessage ? latestMessage.timestamp : appointment.date
        };
      })
    );
    
    // Sort by latest message
    chats.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
    res.json({ success: true, chats });
  } catch (error) {
    console.error("Error fetching user chats:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getHerbalistChats = async (req, res) => {
  try {
    // Use req.herbalistId which is set by the authHerbalist middleware
    const herbalistId = req.herbalistId;
    
    if (!herbalistId) {
      return res.status(401).json({ success: false, message: "Herbalist not authenticated" });
    }
    
    // Find all appointments for this herbalist
    const appointments = await appointmentModel.find({ 
      herbID: herbalistId, 
      payment: true,
      cancelled: false
    });
    
    // Get the latest message for each appointment
    const chats = await Promise.all(
      appointments.map(async (appointment) => {
        const latestMessage = await ChatModel.findOne({ 
          appointmentId: appointment._id 
        }).sort({ timestamp: -1 });
        
        return {
          _id: appointment._id,
          userName: appointment.userData.name,
          userId: appointment.userId,
          date: appointment.slotDate,
          time: appointment.slotTime,
          latestMessage: latestMessage ? latestMessage.message : "No messages yet",
          timestamp: latestMessage ? latestMessage.timestamp : appointment.date
        };
      })
    );
    
    // Sort by latest message
    chats.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
    res.json({ success: true, chats });
  } catch (error) {
    console.error("Error fetching herbalist chats:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAdminChats = async (req, res) => {
  try {
    // Find all appointments with payment completed
    const appointments = await appointmentModel.find({ 
      payment: true,
      cancelled: false
    });
    
    // Get the latest message for each appointment
    const chats = await Promise.all(
      appointments.map(async (appointment) => {
        const latestMessage = await ChatModel.findOne({ 
          appointmentId: appointment._id 
        }).sort({ timestamp: -1 });
        
        return {
          _id: appointment._id,
          userName: appointment.userData.name,
          userId: appointment.userId,
          herbalistName: appointment.herbData.name,
          herbalistId: appointment.herbID,
          date: appointment.slotDate,
          time: appointment.slotTime,
          latestMessage: latestMessage ? latestMessage.message : "No messages yet",
          timestamp: latestMessage ? latestMessage.timestamp : appointment.date
        };
      })
    );
    
    // Sort by latest message
    chats.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
    res.json({ success: true, chats });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
