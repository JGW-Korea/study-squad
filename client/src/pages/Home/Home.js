import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import { useDispatch } from "react-redux";

import { auth } from "../../_actions/user_actions";

export default function Home() {
  const navigation = useNavigate();
  const dispatch = useDispatch();

  const [login, setLogin] = useState(false);

  const onLogoutSubmitHandler = (event) => {
    event.preventDefault();

    Axios.post("/api/user/logout").then((res) => {
      if (res.data.logoutSuccess) {
        navigation("/login");
      }
    });
  };

  useEffect(() => {
    dispatch(auth()).then((res) => {
      if (res.payload.data.userId) {
        setLogin(true);
      } else {
        setLogin(false);
      }
    });
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {login ? (
        <div>
          <button onClick={onLogoutSubmitHandler}>로그아웃</button>
        </div>
      ) : (
        <div>
          <Link to={"/register"}>회원가입</Link>
          <Link to={"/login"}>로그인</Link>
        </div>
      )}
    </div>
  );
}
