// 모듈 import
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages import
import Home from "./pages/Home/Home";
import Register from "./pages/User/Register/Register";
import Login from "./pages/User/Login/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
