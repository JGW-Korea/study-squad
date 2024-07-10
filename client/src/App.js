// 모듈 import
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";

// Landing Page Import
import LandingPage from "./pages/Home/Home";

// User Pages import
import LoginPage from "./pages/User/Login/Login";
import RegisterPage from "./pages/User/Register/Register";
import FindPasswordPage from "./pages/User/FindPassword/FindPassword";
import ResetPasswordPage from "./pages/User/ResetPassword/ResetPassword";
import MyPage from "./pages/User/MyPage";

// Study Group Created Page
import StudyGroupCategoryPage from "./pages/Study/StudyGroupCategory/StudyGroupCategory";
import StudyCreatePage from "./pages/Study/StudyGroupCreate/StudyGroupCreate";

// Study Room Page
import StudyRooms from "./pages/Study/StudyRooms/StudyRooms";

import QuillEditor from "./components/QuillEditor";

import Header from "./components/Header";
import Discover from "./pages/Discover";

// import Auth from "./hoc/auth";

function HeaderWrapper() {
  const user_id = JSON.parse(localStorage.getItem("user_id"));

  return user_id && <Header user={user_id} />;
}

export default function App() {
  return (
    <BrowserRouter>
      <HeaderWrapper />
      <Routes>
        <Route path="/" element={<LandingPage />} />

        {/* 사용자 관련 페이지 */}
        <Route path="/user/register" element={<RegisterPage />} />
        <Route path="/user/login" element={<LoginPage />} />
        <Route path="/user/help/pwInquiry" element={<FindPasswordPage />} />
        <Route
          path="/user/help/pwInquiry/:name/:email"
          element={<ResetPasswordPage />}
        />
        <Route path="/user/mypage/:name" element={<MyPage />} />

        {/* 스터디 관련 페이지 */}
        <Route path="/study-create" element={<StudyGroupCategoryPage />} />
        <Route path="/study-create/:category" element={<StudyCreatePage />} />
        <Route path="/study/:id" element={<StudyRooms />} />
        <Route path="/studyQuillEditor/:id" element={<QuillEditor />} />

        {/* 스터디 정보 페이지 */}
        <Route path="/discover" element={<Discover />} />
      </Routes>
    </BrowserRouter>
  );
}
