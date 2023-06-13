import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";

export default function Home() {
  const navigation = useNavigate();
  const onLogoutSubmitHandler = (event) => {
    event.preventDefault();

    Axios.post("/api/user/logout").then((res) => {
      if (res.data.logoutSuccess) {
        navigation("/login");
      }
    });
  };

  const onClick = (event) => {
    event.preventDefault();

    Axios.get("/api/session").then((res) => {
      console.log(res.data);
    });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Link to={"/register"}>회원가입</Link>
      <Link to={"/login"}>로그인</Link>
      <div>
        <button onClick={onLogoutSubmitHandler}>로그아웃</button>
        <button onClick={onClick}>session</button>
      </div>
    </div>
  );
}
