import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import { useDispatch } from "react-redux";

import { auth } from "../../_actions/user/user_actions";

import Auth from "../../hoc/auth";

function Home() {
  const navigation = useNavigate();
  const dispatch = useDispatch();

  const [login, setLogin] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  const onLogoutSubmitHandler = (event) => {
    event.preventDefault();

    Axios.post("/api/user/logout").then((res) => {
      if (res.data.logoutSuccess) {
        navigation("/user/login");
      }
    });
  };

  useEffect(() => {
    dispatch(auth()).then((res) => {
      if (res.payload) {
        if (res.payload.isLogged) {
          setUserInfo(res.payload.data);
          setLogin(true);
        } else {
          setLogin(false);
        }
      }
    });
  }, [dispatch]);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {login ? (
        <div>
          <button onClick={onLogoutSubmitHandler}>로그아웃</button>
          <Link to={`/user/mypage/${userInfo.name}`} state={{ data: userInfo }}>
            계정
          </Link>
          <Link to={"/study-create"}>만들기</Link>
        </div>
      ) : (
        <div>
          <Link to={"/user/register"}>회원가입</Link>
          <Link to={"/user/login"}>로그인</Link>
        </div>
      )}
    </div>
  );
}

export default Auth(Home, null);
