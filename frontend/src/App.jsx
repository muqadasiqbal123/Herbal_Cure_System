import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Herbalists from "./pages/Herbalists";
import Login from "./pages/Login";
import About from "./pages/About";
import Contact from "./pages/Contact";
import MyProfile from "./pages/MyProfile";
import Appointment from "./pages/Appointment";
import MyAppointments from "./pages/MyAppointments";
import NavBar from "./Components/NavBar";
import ViewCategories from "./pages/ViewCategories";
import Header from "./Components/header";
import Footer from "./Components/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Checkout from "./pages/Checkout";
import DiseaseDetailPage from "./pages/DiseaseDetailPage";


const App = () => {
  return (
    <div className="mx-4 sm:mx-[10%]">
      <ToastContainer />
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/herbalists" element={<Herbalists />} />
        <Route path="/herbalists/:speciality" element={<Herbalists />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/my-appointments" element={<MyAppointments />} />
        <Route path="/appointment/:herbID" element={<Appointment />} />
        <Route path="/view-categories" element={<ViewCategories />} />
        <Route path="/view-categories/:disease" element={<DiseaseDetailPage/>} />
        <Route path="/" element={<Header />} />
        <Route path="/checkout/:_id/:amount" element={<Checkout />} />
      </Routes>

      <Footer />
    </div>
  );
};

export default App;
