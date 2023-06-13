import React, { useState } from "react";
import Axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleIdInput = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordInput = (event) => {
    setPassword(event.target.value);
  };

  const onClick = (event) => {
    event.preventDefault();

    Axios.post("/api/user/login", {
      email: email,
      password: password,
    }).then((res) => {
      console.log(res);
    });
  };

  const showCookie = (event) => {
    event.preventDefault();

    Axios.get("/api/cookie").then((res) => {
      console.log(res);
    });
  };

  const showSession = (event) => {
    event.preventDefault();

    Axios.get("/api/session").then((res) => {
      console.log(res);
    });
  };

  const logout = (event) => {
    event.preventDefault();

    Axios.post("/api/user/logout").then((res) => {
      console.log(res);
    });
  };

  return (
    <form>
      <div>
        <span>아이디</span>
        <input
          value={email}
          onChange={handleIdInput}
          placeholder="아이디를 입력해주세요."
        />
      </div>
      <div>
        <span>비밀번호</span>
        <input
          value={password}
          onChange={handlePasswordInput}
          placeholder="비밀번호를 입력해주세요."
        />
      </div>
      <div>
        <button onClick={onClick}>로그인</button>
      </div>

      <div>
        <button onClick={showCookie}>cookie</button>
        <button onClick={showSession}>get session</button>
      </div>

      <div>
        <button onClick={logout}>로그아웃</button>
      </div>
    </form>
  );
}
