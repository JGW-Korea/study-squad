import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { loginUser } from "../../../_actions/user/user_actions";

import Auth from "../../../hoc/auth";

function Login() {
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const handleIdInput = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordInput = (event) => {
    setPassword(event.target.value);
  };

  const onLoginSubmitHandler = (event) => {
    event.preventDefault();

    if (email === "") {
      setErrorMessage("idError");
    } else if (password === "") {
      setErrorMessage("pwdError");
    } else {
      let body = {
        email: email,
        password: password,
      };

      dispatch(loginUser(body)).then((res) => {
        if (res.payload.loginSuccess) {
          setErrorMessage("");
          localStorage.setItem(
            "user_id",
            JSON.stringify(res.payload.data.userId)
          );
          navigation("/");
        } else {
          setErrorMessage("loginError");
        }
      });
    }
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
        {errorMessage === "idError" ? (
          <span>아이디를 입력해주세요</span>
        ) : errorMessage === "pwdError" ? (
          <span>비밀번호를 입력해주세요</span>
        ) : errorMessage === "loginError" ? (
          <div>
            <span>이메일 또는 비밀번호를 잘못 입력했습니다.</span>
            <span>입력하신 내용을 다시 확인해주세요.</span>
          </div>
        ) : null}
      </div>
      <div>
        <button onClick={onLoginSubmitHandler}>로그인</button>
        <Link to={"/user/help/pwInquiry"}>
          <button>비밀번호 찾기</button>
        </Link>
      </div>
    </form>
  );
}

export default Auth(Login, false);
