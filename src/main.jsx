import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // ✅ import Routes and Route

import Preloader from "./Preloader.jsx";
import KIETlogo from "/KIETlogo.png";
import Navbar from "./Navbar.jsx";
import Hero from "./Hero.jsx";
import Register from "./Register.jsx"; // ✅ import your Register component
import Footer from "./Footer.jsx";
import LoginPage from "./LoginPaage.jsx";
import Form from "./Form.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Preloader src={KIETlogo}>
        <Navbar />

        {/* ✅ Define your routes here */}
        <Routes>
          <Route path="/" element={<Hero />} /> {/* Home Page */}
          <Route path="/register" element={<Register />} />{" "}
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/form" element={<Form />}></Route>
          {/* Register Page */}
        </Routes>
        <Footer />
      </Preloader>
    </BrowserRouter>
  </StrictMode>
);
