import { useContext, useEffect, useState, useRef } from 'react';
import { HerbalistContext } from '../../context/HerbalistContext';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import io from 'socket.io-client';

// Create socket connection
const socket = io('http://localhost:4000');

const HerbalistChatRoom = () => {
  const { appointmentId } = useParams();
  const { dToken, backendUrl, profileData, getProfileData } = useContext(HerbalistContext);
  const navigate = useNavigate();
  
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const messagesEndRef = useRef(null);
  
  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Load profile data once when component mounts
  useEffect(() => {
    if (dToken) {
      getProfileData();
    }
  }, [dToken]);

  // Fetch appointment details and messages
  useEffect(() => {
    if (!dToken) {
      navigate('/');
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Get appointment details
        const appointmentRes = await axios.get(
          `${backendUrl}/api/herbalist/appointment/${appointmentId}`,
          { headers: { dtoken: dToken } }
        );
        
        if (!appointmentRes.data.success) {
          toast.error('Failed to load appointment details');
          navigate('/herbalist-chats');
          return;
        }
        
        setAppointment(appointmentRes.data.appointment);
        
        // Get chat messages
        const messagesRes = await axios.get(
          `${backendUrl}/api/chat/messages/${appointmentId}`
        );
        
        if (messagesRes.data.success) {
          setMessages(messagesRes.data.messages);
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Something went wrong. Please try again.');
        setLoading(false);
      }
    };

    fetchData();
  }, [appointmentId, dToken, backendUrl, navigate]);

  // Socket.io connection
  useEffect(() => {
    if (!appointmentId || !profileData) return;
    
    // Join the chat room
    socket.emit('joinRoom', { appointmentId });
    
    // Listen for incoming messages
    socket.on('receiveMessage', (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });
    
    // Cleanup on unmount
    return () => {
      socket.off('receiveMessage');
    };
  }, [appointmentId, profileData]);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Send message
  const sendMessage = (e) => {
    e.preventDefault();
    
    if (!message.trim()) {
      toast.error('Message cannot be empty');
      return;
    }
    
    if (!profileData) {
      toast.error('Herbalist profile data not loaded');
      return;
    }
    
    socket.emit('sendMessage', {
      appointmentId,
      senderId: profileData._id,
      senderName: profileData.name,
      senderRole: 'herbalist',
      message: message.trim(),
    });
    
    setMessage('');
  };

  // Format timestamp
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="p-5 w-full">
      {appointment && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Chat header */}
          <div className="bg-green-600 text-white p-4">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => navigate('/herbalist-chats')}
                className="text-white hover:text-gray-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
              <div>
                <h2 className="text-xl font-semibold">
                  Chat with {appointment.userData.name}
                </h2>
                <p className="text-sm opacity-80">
                  Appointment: {appointment.slotDate.replace(/_/g, "/")} at {appointment.slotTime}
                </p>
              </div>
            </div>
          </div>
          
          {/* Chat messages */}
          <div className="p-4 h-[60vh] overflow-y-auto bg-gray-50">
            <div className="flex flex-col gap-3">
              {/* System message */}
              <div className="text-center text-sm text-gray-500 my-2">
                <p>This conversation includes the patient, you, and admin</p>
                <p>Messages are saved for appointment records</p>
              </div>
              
              {messages.length === 0 ? (
                <div className="text-center text-gray-500 my-8">
                  <p>No messages yet in this conversation.</p>
                </div>
              ) : (
                messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`max-w-[80%] ${
                      msg.senderRole === 'herbalist' && msg.senderId === profileData._id
                        ? 'ml-auto bg-green-600 text-white'
                        : msg.senderRole === 'admin'
                        ? 'bg-primary text-white'
                        : 'bg-gray-200'
                    } rounded-lg p-3 shadow-sm ${
                      msg.senderRole === 'herbalist' && msg.senderId === profileData._id ? 'ml-auto' : ''
                    }`}
                  >
                    <div className="flex justify-between items-start gap-2">
                      <span className="font-medium text-sm">
                        {msg.senderRole === 'herbalist' && msg.senderId === profileData._id
                          ? 'You'
                          : msg.senderName}
                      </span>
                      <span className="text-xs opacity-70">
                        {formatTime(msg.timestamp)}
                      </span>
                    </div>
                    <p className="mt-1">{msg.message}</p>
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>
          
          {/* Message input */}
          <form onSubmit={sendMessage} className="p-4 border-t">
            <div className="flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                disabled={!message.trim()}
              >
                Send
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default HerbalistChatRoom;