import React, { useState } from "react";
import Axios from "axios";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [birth, setBirth] = useState("");
  const [gender, setGender] = useState("");

  const onEmailHandler = (event) => {
    setEmail(event.target.value);
  };
  const onPasswordHandler = (event) => {
    setPassword(event.target.value);
  };
  const onNameHandler = (event) => {
    setName(event.target.value);
  };
  const onBirthHandler = (event) => {
    setBirth(event.target.value);
  };
  const onGenderHandler = (event) => {
    setGender(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    Axios.post("/api/user/register", {
      createEmail: email,
      createPassword: password,
      createName: name,
      createBirth: birth,
      createGender: gender,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form onSubmit={onSubmit}>
      <header>회원가입</header>
      <div>
        <div>
          <span>이메일</span>
          <input
            type="email"
            value={email}
            onChange={onEmailHandler}
            placeholder={"이메일"}
          />
        </div>
        <div>
          <span>비밀번호</span>
          <input
            type="password"
            value={password}
            onChange={onPasswordHandler}
            placeholder={"비밀번호"}
          />
        </div>
        <div>
          <span>이름</span>
          <input
            type="text"
            value={name}
            onChange={onNameHandler}
            placeholder={"이름"}
          />
        </div>
        <div>
          <span>생년월일</span>
          <input
            type="text"
            value={birth}
            onChange={onBirthHandler}
            placeholder={"생년월일"}
          />
        </div>
        <div>
          <span>성별</span>
          <input
            type="text"
            value={gender}
            onChange={onGenderHandler}
            placeholder={"성별"}
          />
        </div>
        <div>
          <button>회원가입</button>
        </div>
      </div>
    </form>
  );
}

export default Register;
