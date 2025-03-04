import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:5000");

const ChatPage = () => {
  const { appointmentId } = useParams(); // Get appointment ID from URL
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]); // List of previous chats
  const [selectedChat, setSelectedChat] = useState(null);

  useEffect(() => {
    // Fetch all previous chats
    axios.get(`/api/chat/appointments`).then((res) => {
      setChats(res.data);
    });

    if (appointmentId) {
      setSelectedChat(appointmentId);
      socket.emit("joinRoom", { appointmentId });

      // Fetch previous messages
      axios.get(`/api/chat/${appointmentId}`).then((res) => {
        setMessages(res.data.messages);
      });
    }

    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [appointmentId]);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit("sendMessage", {
        appointmentId: selectedChat,
        sender: "Patient",
        message,
      });
      setMessage("");
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Sidebar - Chat List */}
      <div className="w-1/3 bg-gray-100 p-4 border-r">
        <h2 className="text-lg font-semibold">My Chats</h2>
        <button className="bg-blue-500 text-white px-4 py-2 mt-2 rounded">
          New Group Chat +
        </button>
        <div className="mt-4">
          {chats.map((chat) => (
            <div
              key={chat._id}
              className={`p-2 border-b cursor-pointer ${
                selectedChat === chat._id ? "bg-blue-200" : ""
              }`}
              onClick={() => setSelectedChat(chat._id)}
            >
              <strong>{chat.herbalistName}</strong>: {chat.latestMessage}
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="w-2/3 p-4">
        {selectedChat ? (
          <>
            <h2 className="text-xl font-semibold mb-4">Chat with Herbalist</h2>
            <div className="border p-3 h-80 overflow-y-scroll mb-2">
              {messages.map((msg, index) => (
                <p key={index}>
                  <strong>{msg.sender}:</strong> {msg.message}
                </p>
              ))}
            </div>
            <input
              type="text"
              className="border p-2 w-full"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              onClick={sendMessage}
              className="bg-green-500 text-white p-2 mt-2 w-full"
            >
              Send
            </button>
          </>
        ) : (
          <div className="text-center text-gray-500">
            Click on a user to start chatting
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
