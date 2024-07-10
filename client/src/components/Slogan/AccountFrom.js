import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { loginUser } from "../../_actions/user/user_actions";

import { Box, Stack, Typography } from "@mui/material";

import styled from "styled-components";

import { AiOutlineMail } from "react-icons/ai";
import { SlLock } from "react-icons/sl";
import PasswordResetModal from "./PasswordResetModal";
import RegisterModal from "./RegisterModal";

const StyledLoginInput = styled.input`
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  font-size: 14px;
  background-color: transparent;
  color: rgba(0, 0, 0, 0.54);

  ::placeholder,
  &::-webkit-input-placeholder {
    color: rgba(0, 0, 0, 0.3);
  }
  &:-ms-input-placeholder {
    color: rgba(0, 0, 0, 0.3);
  }

  &::-moz-placeholder {
    color: rgba(0, 0, 0, 0.3);
  }
`;

function LoginForm({ typeText, type, value, setValue, placeholder, icon }) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <Typography fontSize={14} color={"#d1e5f9"} sx={{ marginBottom: "10px" }}>
        {typeText}
      </Typography>
      <Box
        sx={{
          width: "100%",
          height: "50px",
          backgroundColor: "#58a0ea",
          borderRadius: "5px",
          display: "flex",
          alignItems: "center",
          padding: "10px",
          color: "rgba(0, 0, 0, 0.54)",
        }}
      >
        {icon}
        <StyledLoginInput
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
      </Box>
    </Box>
  );
}

const StyledAccountButton = styled.button`
  width: 100%;
  height: 40px;
  border: none;
  border-radius: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  background-color: ${(props) => props.backgroundColor};
  color: #fff;
`;

function AccountButton({ backgroundColor, btnText, onClick, type }) {
  return (
    <StyledAccountButton
      type={type}
      backgroundColor={backgroundColor}
      onClick={onClick}
    >
      {btnText}
    </StyledAccountButton>
  );
}

function AccountFrom() {
  const navigation = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLoginSubmitHandler = (event) => {
    event.preventDefault();

    if (email === "") {
      alert("이메일을 작성해주세요!!");
    } else if (password === "") {
      alert("비밀번호를 입력해주세요!!");
    } else {
      let body = {
        email: email,
        password: password,
      };

      dispatch(loginUser(body)).then((res) => {
        if (res.payload.loginSuccess) {
          localStorage.setItem(
            "user_id",
            JSON.stringify(res.payload.data.userId)
          );
          window.location.replace("/");
        } else {
          alert(
            "이메일 또는 비밀번호를 잘못 입력했습니다.\n입력하신 내용을 다시 확인해주세요."
          );
        }
      });
    }
  };

  const [openPwdResetModal, setOpenPwdResetModal] = useState(false);
  const [openRegisterModal, setOpenRegisterModal] = useState(false);

  return (
    <Stack
      p={5}
      alignItems={"center"}
      justifyContent={"center"}
      sx={{
        width: "35%",
        height: "100%",
        backgroundColor: "#1b75d2",
      }}
    >
      <Stack
        alignItems={"center"}
        justifyContent={"center"}
        spacing={1}
        sx={{ marginBottom: "50px" }}
      >
        <Typography fontSize={25} color={"#fff"}>
          안녕하세요!
        </Typography>
        <Typography fontSize={20} color={"#d1e5f9"}>
          로그인 후 다시 스터디에 참여하세요!
        </Typography>
      </Stack>

      <form
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Stack
          alignItems={"end"}
          spacing={3}
          sx={{ width: "60%", position: "relative", marginBottom: "50px" }}
        >
          <LoginForm
            typeText={"이메일"}
            type={"email"}
            value={email}
            setValue={setEmail}
            placeholder={"이메일을 적어주세요..."}
            icon={<AiOutlineMail size={26} style={{ marginRight: "5px" }} />}
          />

          <LoginForm
            typeText={"비밀번호"}
            type={"password"}
            value={password}
            setValue={setPassword}
            placeholder={"비밀번호를 적어주세요..."}
            icon={<SlLock size={26} style={{ marginRight: "5px" }} />}
          />

          <Typography
            fontSize={13}
            sx={{
              color: "#d1e5f9",
              cursor: "pointer",
              transition: "0.2s all ease-in",
              textDecorationLine: "underline",
            }}
            onClick={() => setOpenPwdResetModal(true)}
          >
            비밀번호를 잊어버리셨나요?
          </Typography>
        </Stack>

        <Stack
          alignItems={"center"}
          spacing={3}
          sx={{ width: "60%", position: "relative" }}
        >
          <AccountButton
            type={"submit"}
            backgroundColor={"#f95f7e"}
            btnText={"로그인"}
            onClick={onLoginSubmitHandler}
          />

          <AccountButton
            type={"button"}
            backgroundColor={"#1D5D9B"}
            btnText={"회원가입"}
            onClick={() => setOpenRegisterModal(true)}
          />
        </Stack>
      </form>

      <PasswordResetModal
        open={openPwdResetModal}
        setOpen={setOpenPwdResetModal}
      />

      <RegisterModal open={openRegisterModal} setOpen={setOpenRegisterModal} />
    </Stack>
  );
}

export default AccountFrom;
