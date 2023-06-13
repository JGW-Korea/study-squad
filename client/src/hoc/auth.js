import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { auth } from "../_actions/user_actions";

export default function (SpecificComponent, option, adminRoute = null) {
  function AuthenticationCheck(props) {
    const dispatch = useDispatch();
    const navigation = useNavigate();

    useEffect(() => {
      // option === null     =>  아무나 출입이 가능한 페이지
      // option === true     =>  로그인한 유저만 출입이 가능한 페이지
      // option === false    =>  로그인한 유저는 출입 불가능한 페이지

      dispatch(auth()).then((res) => {
        // 로그인 하지 않은 상태
        if (!res.payload.data.userId) {
          if (option) {
            navigation("/login");
          }
        } else {
          // 로그인 한 상태
          if (adminRoute && !res.payload.data.userId.isAdmin) {
            // admin만 접근할 수 있는 페이지이지만, 사용자가 admin이 아닐 경우
            navigation("/");
          } else {
            // 로그인한 유저가 출입 불가능한 페이지
            if (!option) {
              navigation("/");
            }
          }
        }
      });
    }, []);
    return <SpecificComponent />;
  }
  return AuthenticationCheck;
}
