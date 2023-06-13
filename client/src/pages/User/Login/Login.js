import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { loginUser } from "../../../_actions/user_actions";

export default function Login() {
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleIdInput = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordInput = (event) => {
    setPassword(event.target.value);
  };

  const onLoginSubmitHandler = (event) => {
    event.preventDefault();

    let body = {
      email: email,
      password: password,
    };

    dispatch(loginUser(body)).then((res) => {
      if (res.payload.loginSuccess) {
        navigation("/");
      } else {
        console.log("error");
      }
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
        <button onClick={onLoginSubmitHandler}>로그인</button>
      </div>
    </form>
  );
}
