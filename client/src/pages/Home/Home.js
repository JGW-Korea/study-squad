import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Link to={"/register"}>회원가입</Link>
      <Link to={"/login"}>로그인</Link>
    </div>
  );
}
