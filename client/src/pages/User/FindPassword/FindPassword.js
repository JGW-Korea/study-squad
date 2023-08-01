import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { findUserPassword } from "../../../_actions/user_actions";
import { useNavigate } from "react-router-dom";

function FindPassword() {
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const onEmailHandler = (event) => {
    setEmail(event.target.value);
  };

  const onNameHandler = (event) => {
    setName(event.target.value);
  };

  const onFindPasswordSubmitHandler = (event) => {
    event.preventDefault();

    let body = {
      email: email,
      name: name,
    };

    dispatch(findUserPassword(body)).then((res) => {
      if (res.payload.findUserEmail) {
        navigation(`/user/help/pwInquiry/${body.name}/${body.email}`, {
          state: res.payload.data,
        });
      } else {
        alert("입력하신 아이디를 찾을 수 없습니다.");
        setEmail("");
        setName("");
      }
    });
  };

  return (
    <div>
      <div>비밀번호를 찾고자하는 이메일과 이름을 적어주세요.</div>

      <form>
        <div>
          <span>이메일</span>
          <input
            value={email}
            onChange={onEmailHandler}
            placeholder="아이디를 입력해주세요."
          />
        </div>
        <div>
          <span>이름</span>
          <input
            value={name}
            onChange={onNameHandler}
            placeholder="이름을 입력해주세요."
          />
        </div>
        <div>
          <button onClick={onFindPasswordSubmitHandler}>비밀번호 재설정</button>
        </div>
      </form>
    </div>
  );
}

export default FindPassword;
