import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { auth } from "../_actions/user/user_actions";

export default function (SpecificComponent, option, adminRoute = null) {
  function AuthenticationCheck() {
    const dispatch = useDispatch();
    const navigation = useNavigate();

    const user_id = JSON.parse(localStorage.getItem("user_id"));

    useEffect(() => {
      // option === null     =>  아무나 출입이 가능한 페이지
      // option === true     =>  로그인한 유저만 출입이 가능한 페이지
      // option === false    =>  로그인한 유저는 출입 불가능한 페이지

      if (!user_id) {
        if (option) {
          navigation("/login");
        }
      } else {
        if (adminRoute && !user_id.isAdmin) {
          navigation("/");
        } else {
          if (!option) {
            navigation("/");
          }
        }
      }

      // dispatch(auth()).then((res) => {

      // if (res.payload) {
      //   // 로그인 하지 않은 상태
      //   if (res.payload.isLogged === false) {
      //     if (option === true) {
      //       navigation("/login");
      //     }
      //   } else {
      //     // 로그인 한 상태
      //     if (adminRoute && !res.payload.data.isAdmin) {
      //       // admin만 접근할 수 있는 페이지이지만, 사용자가 admin이 아닐 경우
      //       navigation("/");
      //     } else {
      //       // 로그인한 유저가 출입 불가능한 페이지
      //       if (!option) {
      //         navigation("/");
      //       }
      //     }
      //   }
      // }
      // });
    }, []);
    return <SpecificComponent />;
  }
  return AuthenticationCheck;
}
