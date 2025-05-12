import React, { useContext } from "react";
import Login from "./pages/Login";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Admin/Dashboard";
import AllAppointments from "./pages/Admin/AllAppointments";
import AddHerbalist from "./pages/Admin/AddHerbalist";
import HerbalistsList from "./pages/Admin/HerbalistsList";
import { AdminContext } from "./context/AdminContext";
import { HerbalistContext } from "./context/HerbalistContext";
import HerbalistDashboard from "./pages/Herbalist/HerbalistDashboard";
import HerbalistAppointments from "./pages/Herbalist/HerbalistAppointments";
import HerbalistProfile from "./pages/Herbalist/HerbalistProfile";
import AdminChats from "./pages/Admin/AdminChats";
import AdminChatRoom from "./pages/Admin/AdminChatRoom";
import HerbalistChats from "./pages/Herbalist/HerbalistChats";
import HerbalistChatRoom from "./pages/Herbalist/HerbalistChatRoom";

const App = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(HerbalistContext);

  return (
    <div className="bg-[#F8F9FD]">
      <ToastContainer />
      <Navbar />
      {aToken || dToken ? (
        <div className="flex items-start">
          <Sidebar />
          <Routes>
            {/* Admin Route */}
            <Route path="/" element={<></>} />
            <Route path="/admin-dashboard" element={<Dashboard />} />
            <Route path="/all-appointment" element={<AllAppointments />} />
            <Route path="/add-Herbalist" element={<AddHerbalist />} />
            <Route path="/herbalist-list" element={<HerbalistsList />} />
            <Route path="/admin-chats" element={<AdminChats />} />
            <Route
              path="/admin-chat/:appointmentId"
              element={<AdminChatRoom />}
            />

            {/* Herbalist Route */}
            <Route
              path="/herbalist-dashboard"
              element={<HerbalistDashboard />}
            />
            <Route
              path="/herbalist-appointments"
              element={<HerbalistAppointments />}
            />
            <Route path="/herbalist-profile" element={<HerbalistProfile />} />
            <Route path="/herbalist-chats" element={<HerbalistChats />} />
            <Route
              path="/herbalist-chat/:appointmentId"
              element={<HerbalistChatRoom />}
            />
          </Routes>
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default App;
