import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar";
import Account from "./Pages/Account";
import Home from "./Pages/Home";
import Image from "./Pages/Image";
import Images from "./Pages/Images";
import Profile from "./Pages/Profile";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import UploadImage from "./Pages/UploadImage";
import VerifyEmail from "./Pages/VerifyEmail";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/images" element={<Images />} />
          <Route path="image/:id" element={<Image />} />
          <Route path="/image/upload" element={<UploadImage />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/user/profile" element={<Profile />} />
          <Route path="/user/account" element={<Account />} />
          <Route path="/user/verify" element={<VerifyEmail />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
