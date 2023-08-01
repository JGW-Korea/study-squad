import React from "react";
import { useDispatch } from "react-redux";

import { deleteUserAccount } from "../../../_actions/user_actions";
import { useLocation, useNavigate } from "react-router-dom";

function MyPage() {
  const location = useLocation();
  const navigation = useNavigate();

  const dispatch = useDispatch();

  const onDeleteProfileSubmitHandler = (event) => {
    event.preventDefault();

    let body = {
      id: location.state.data.id,
      email: location.state.data.email,
      name: location.state.data.name,
    };

    dispatch(deleteUserAccount(body)).then((res) => {
      if (res.payload.deleteSuccess) {
        alert("그동안 이용해주셔서 감사합니다.");
        navigation("/");
      }
    });
  };

  return (
    <div>
      <div>계정</div>
      <div>
        <div>
          <span>프로필 이미지</span>
          <button>프로필 변경</button>
        </div>
        <div>
          <span>아이디</span>
          <button>계정 이메일 변경</button>
        </div>
        <div>
          <span>비밀번호</span>
          <button>비밀번호 변경</button>
        </div>
        <form>
          <button onClick={onDeleteProfileSubmitHandler}>회원탈퇴</button>
        </form>
      </div>
    </div>
  );
}

export default MyPage;
