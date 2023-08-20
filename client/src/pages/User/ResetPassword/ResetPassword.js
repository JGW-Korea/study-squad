import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { userPasswordReset } from "../../../_actions/user/user_actions";

import { useNavigate, useParams } from "react-router-dom";

function ResetPassword() {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const params = useParams();

  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");

  const [passwordMessage, setPasswordMessage] = useState("");
  const [passworConfirmdMessage, setPassworConfirmdMessage] = useState("");

  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);

  const activeBtn = isPassword && isPasswordConfirm;

  const onPassword = (event) => {
    setNewPassword(event.target.value);
  };

  const onPasswordConfirm = (event) => {
    setNewPasswordConfirm(event.target.value);
  };

  const onPasswordCheck = (event) => {
    const passwordRegExp =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;

    if (!passwordRegExp.test(newPassword)) {
      setPasswordMessage(
        "숫자, 영문자, 특수문자 조합으로 8자리 이상 입력해주세요."
      );
      setIsPassword(false);
    } else {
      setPasswordMessage("사용 가능한 비밀번호 입니다.");
      setIsPassword(true);
    }
  };

  const onPasswordConfirmCheck = () => {
    if (newPassword === newPasswordConfirm) {
      setPassworConfirmdMessage("비밀번호가 같습니다.");
      setIsPasswordConfirm(true);
    } else {
      setPassworConfirmdMessage("비밀번호가 틀립니다. 다시 확인해주세요");
      setIsPasswordConfirm(false);
    }
  };

  const onPasswordResetBtnHandler = (event) => {
    event.preventDefault();

    let body = {
      email: params.email,
      name: params.name,
      password: newPassword,
    };

    dispatch(userPasswordReset(body)).then((res) => {
      if (res.payload.userPasswordResetSuccess) {
        navigation("/user/login");
      }
    });
  };

  return (
    <div>
      <div>비밀번호 재설정</div>

      <form>
        <div>
          <span>아이디: {params.email}</span>
        </div>
        <div>
          <input
            value={newPassword}
            onChange={onPassword}
            onBlur={onPasswordCheck}
            placeholder="새 비밀번호"
          />
          <span>{passwordMessage}</span>
        </div>
        <div>
          <input
            value={newPasswordConfirm}
            onChange={onPasswordConfirm}
            onBlur={onPasswordConfirmCheck}
            placeholder="새 비밀번호 확인"
          />
          <span>{passworConfirmdMessage}</span>
        </div>
        <div>
          <button disabled={!activeBtn} onClick={onPasswordResetBtnHandler}>
            확인
          </button>
        </div>
      </form>
    </div>
  );
}

export default ResetPassword;
