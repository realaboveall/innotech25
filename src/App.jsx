import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Preloader from "./Preloader.jsx";
import KIETlogo from "/KIETlogo.png";
import FNav from "./FNav.jsx";
import Footer from "./Footer.jsx";
import Hero from "./Hero.jsx";
import Register from "./Register.jsx";
import Form from "./Form.jsx";
import CompleteProfile from "./CompleteProfile.jsx";
import StudentDashboard from "./StudentDashboard.jsx";
import PersistentBackground from "./PersistentBackground.jsx";

const App = () => {
  return (
    <BrowserRouter>
    <PersistentBackground />
      <Preloader src={KIETlogo}>
        {/* <Navbar /> */}
        <FNav />

        {/* Application routes */}
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/register" element={<Register />} />
          <Route path="/form" element={<Form />}></Route>
          <Route path="/complete-profile" element={<CompleteProfile/>}/>
          <Route path="/dashboard" element={<StudentDashboard/>} />
        </Routes>

        <Footer />
      </Preloader>
    </BrowserRouter>
  );
};

export default App;
