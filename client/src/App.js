// 모듈 import
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Landing Page Import
import LandingPage from "./pages/Home/Home";

// User Pages import
import LoginPage from "./pages/User/Login/Login";
import RegisterPage from "./pages/User/Register/Register";
import FindPasswordPage from "./pages/User/FindPassword/FindPassword";
import ResetPasswordPage from "./pages/User/ResetPassword/ResetPassword";
import MyPage from "./pages/User/MyPage/MyPage";

// Study Group Created Page
import StudyGroupCategoryPage from "./pages/Study/StudyGroupCategory/StudyGroupCategory";
import StudyCreatePage from "./pages/Study/StudyGroupCreate/StudyGroupCreate";

// import Auth from "./hoc/auth";

export default function App() {
  // const NewLandingPage = Auth(LandingPage, null);
  // const NewLoginPage = Auth(LoginPage, false);
  // const NewRegisterPage = Auth(RegisterPage, false);
  // const NewFindPasswordPage = Auth(FindPassword, false);
  // const NewResetPasswordPage = Auth(ResetPassword, false);
  // const NewMyPage = Auth(MyPage, true);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/user/register" element={<RegisterPage />} />
        <Route path="/user/login" element={<LoginPage />} />
        <Route path="/user/help/pwInquiry" element={<FindPasswordPage />} />
        <Route
          path="/user/help/pwInquiry/:name/:email"
          element={<ResetPasswordPage />}
        />
        <Route path="/user/mypage/:name" element={<MyPage />} />
        <Route path="/study-create" element={<StudyGroupCategoryPage />} />
        <Route path="/study-create/:category" element={<StudyCreatePage />} />
      </Routes>
    </BrowserRouter>
  );
}
