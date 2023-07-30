// 모듈 import
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages import
import LandingPage from "./pages/Home/Home";
import RegisterPage from "./pages/User/Register/Register";
import LoginPage from "./pages/User/Login/Login";
import Auth from "./hoc/auth";
import FindPassword from "./pages/User/FindPassword/FindPassword";
import ResetPassword from "./pages/User/ResetPassword/ResetPassword";

export default function App() {
  const NewLandingPage = Auth(LandingPage, null);
  const NewLoginPage = Auth(LoginPage, false);
  const NewRegisterPage = Auth(RegisterPage, false);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NewLandingPage />} />
        <Route path="/register" element={<NewRegisterPage />} />
        <Route path="/login" element={<NewLoginPage />} />
        <Route path="/findpassword" element={<FindPassword />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>
  );
}
