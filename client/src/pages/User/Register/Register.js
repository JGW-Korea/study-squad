import React, { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

import { YEAR } from "../../../constants/Register/YEAR";
import { MONTH } from "../../../constants/Register/MONTH";
import { DAY } from "../../../constants/Register/DAY";

import { useDispatch } from "react-redux";
import { registerUser } from "../../../_actions/user/user_actions";

export default function Register() {
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
    name: "",
    year: "",
    month: "",
    day: "",
  });

  const { email, password, name, year, month, day } = userInput;

  const [emailMessage, setEmailMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [nameMessage, setNameMessage] = useState("");

  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isNmae, setIsName] = useState(false);
  const isBirth = Boolean(year && month && day);

  const activeBtn = isEmail && isPassword && isNmae && isBirth;

  const handleInput = (event) => {
    const { name, value } = event.target;
    setUserInput({ ...userInput, [name]: value });
  };

  const onRegisterSubmitHandler = (event) => {
    event.preventDefault();

    let body = {
      email: email,
      password: password,
      name: name,
      birth: `${year}-${month}-${day}`,
    };

    dispatch(registerUser(body)).then((res) => {
      if (res.payload.registerSuccess) {
        navigation("/user/login");
      }
    });
  };

  const onEmailCheck = () => {
    const emailRegExp =
      /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/;

    if (!emailRegExp.test(email)) {
      setEmailMessage("이메일의 형식이 올바르지 않습니다.");
      setIsEmail(false);
    } else {
      Axios.post("/api/user/idCheck", {
        email: email,
      }).then((res) => {
        if (!res.data.duplicate) {
          setEmailMessage("사용 가능한 이메일 입니다.");
          setIsEmail(true);
        } else {
          setEmailMessage("중복된 이메일 입니다.");
          setIsEmail(false);
        }
      });
    }
  };

  const onPasswordCheck = () => {
    const passwordRegExp =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;

    if (!passwordRegExp.test(password)) {
      setPasswordMessage(
        "숫자, 영문자, 특수문자 조합으로 8자리 이상 입력해주세요."
      );
      setIsPassword(false);
    } else {
      setPasswordMessage("사용 가능한 비밀번호 입니다.");
      setIsPassword(true);
    }
  };

  const onNameCheck = () => {
    if (name.length < 2 || name.length > 15) {
      setNameMessage("닉네임은 2글자 이상 15글자 이하로 입력해주세요");
      setIsName(false);
    } else {
      setNameMessage("사용 가능한 닉네임 입니다.");
      setIsName(true);
    }
  };

  return (
    <form>
      <header>회원가입</header>
      <div>
        <div>
          <span>이메일</span>
          <input
            type="email"
            name="email"
            onChange={handleInput}
            onBlur={onEmailCheck}
            placeholder={"이메일"}
          />
          <span>{emailMessage}</span>
        </div>
        <div>
          <span>비밀번호</span>
          <input
            type="password"
            name="password"
            onChange={handleInput}
            onBlur={onPasswordCheck}
            placeholder={"비밀번호"}
          />
          <span>{passwordMessage}</span>
        </div>
        <div>
          <span>이름</span>
          <input
            type="text"
            name="name"
            onChange={handleInput}
            onBlur={onNameCheck}
            placeholder={"이름"}
          />
          <span>{nameMessage}</span>
        </div>
        <div>
          <span>생년월일</span>
          <select name="year" onChange={handleInput}>
            {YEAR.map((y) => {
              return <option key={y}>{y}</option>;
            })}
          </select>
          <select name="month" onChange={handleInput}>
            {MONTH.map((m) => {
              return <option key={m}>{m}</option>;
            })}
          </select>
          <select name="day" onChange={handleInput}>
            {DAY.map((d) => {
              return <option key={d}>{d}</option>;
            })}
          </select>
        </div>
        <div>
          <button disabled={!activeBtn} onClick={onRegisterSubmitHandler}>
            회원가입
          </button>
        </div>
      </div>
    </form>
  );
}
