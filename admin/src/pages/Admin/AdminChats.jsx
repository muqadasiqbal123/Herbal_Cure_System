import React, { useContext, useEffect, useState } from 'react';
import { AdminContext } from '../../context/AdminContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AdminChats = () => {
  const { aToken, backendUrl } = useContext(AdminContext);
  const navigate = useNavigate();
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Format time
  const formatTime = (timeString) => {
    return timeString;
  };

  // Get all chats
  useEffect(() => {
    const fetchChats = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${backendUrl}/api/chat/admin/chats`, {
          headers: { token: aToken }
        });

        if (data.success) {
          setChats(data.chats);
        } else {
          toast.error('Failed to load chats');
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching chats:', error);
        toast.error('Something went wrong');
        setLoading(false);
      }
    };

    if (aToken) {
      fetchChats();
    }
  }, [aToken, backendUrl]);

  return (
    <div className="p-5 w-full">
      <h1 className="text-2xl font-semibold mb-6">All Conversations</h1>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : chats.length === 0 ? (
        <div className="bg-white p-6 rounded-lg shadow-sm text-center">
          <p className="text-gray-500">No conversations available</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {chats.map((chat) => (
            <div
              key={chat._id}
              onClick={() => navigate(`/admin-chat/${chat._id}`)}
              className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer border-l-4 border-primary"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">
                    {chat.userName} with {chat.herbalistName}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Appointment: {chat.date.replace(/_/g, "/")} at {formatTime(chat.time)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">{formatDate(chat.timestamp)}</p>
                  <p className="text-sm mt-1 text-gray-700 max-w-xs truncate">
                    {chat.latestMessage}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminChats; 