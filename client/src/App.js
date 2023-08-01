// 모듈 import
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// User Pages import
import LoginPage from "./pages/User/Login/Login";
import RegisterPage from "./pages/User/Register/Register";
import FindPassword from "./pages/User/FindPassword/FindPassword";
import ResetPassword from "./pages/User/ResetPassword/ResetPassword";
import MyPage from "./pages/User/MyPage/MyPage";

import LandingPage from "./pages/Home/Home";
import Auth from "./hoc/auth";

export default function App() {
  const NewLandingPage = Auth(LandingPage, null);
  const NewLoginPage = Auth(LoginPage, false);
  const NewRegisterPage = Auth(RegisterPage, false);
  const NewFindPasswordPage = Auth(FindPassword, false);
  const NewResetPasswordPage = Auth(ResetPassword, false);
  const NewMyPage = Auth(MyPage, true);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NewLandingPage />} />
        <Route path="/user/register" element={<NewRegisterPage />} />
        <Route path="/user/login" element={<NewLoginPage />} />
        <Route path="/user/help/pwInquiry" element={<NewFindPasswordPage />} />
        <Route
          path="/user/help/pwInquiry/:name/:email"
          element={<NewResetPasswordPage />}
        />
        <Route path="/user/mypage/:name" element={<NewMyPage />} />
      </Routes>
    </BrowserRouter>
  );
}
