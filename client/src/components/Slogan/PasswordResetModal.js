import React, { useState } from "react";

import {
  Stack,
  Box,
  Typography,
  Modal,
  Divider,
  ListSubheader,
  TextField,
} from "@mui/material";

import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import Collapse from "@mui/material/Collapse";

import { BsXLg, BsChevronDown, BsChevronUp, BsChatLeft } from "react-icons/bs";
import { SlLock } from "react-icons/sl";

import { useDispatch } from "react-redux";

import {
  findUserPassword,
  userPasswordReset,
} from "../../_actions/user/user_actions";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  bgcolor: "#fff",
  boxShadow: 24,
  borderRadius: "10px",
  p: 2,
  outline: "none",
};

function PasswordResetModal({ open, setOpen }) {
  const dispatch = useDispatch();

  const [resetListOpen, setResetListOpen] = useState(false);

  // 비밀번호를 변경하고자 하는 이름과 이메일 입력
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [nameErrorMsg, setNameErrorMsg] = useState("");
  const [emailErrorMsg, setEmailErrorMsg] = useState("");

  // 새로운 비밀번호와 비밀번호 일치하는지 확인
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassowrd, setConfirmPassword] = useState("");

  const [newPwdErrorMsg, setNewPwdErrorMsg] = useState("");
  const [confirmPwdErrorMsg, setConfirmPwdErrorMsg] = useState("");

  const [auth, setAuth] = useState(false);
  const [changeUserId, setChangeUserId] = useState([]);

  // 새로운 비밀번호 정규화
  const onPasswordCheck = (password) => {
    const passwordRegExp =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;

    if (!passwordRegExp.test(password)) {
      return false;
    } else {
      return true;
    }
  };

  // 두 비밀번호 input 값 비교
  const onPasswordConfirmCheck = (newPwd, confirmPwd) => {
    if (newPwd === confirmPwd) {
      return true;
    } else {
      return false;
    }
  };

  // 비밀번호 변경
  const onPasswordResetBtnHandler = (event) => {
    event.preventDefault();

    if (newPassword === "" || confirmPassowrd === "") {
      setNewPwdErrorMsg("비밀번호 입력란을 모두 작성해주세요.");
      setConfirmPwdErrorMsg("비밀번호 입력란을 모두 작성해주세요.");
    }

    const pwdCheck = onPasswordCheck(newPassword);

    if (pwdCheck) {
      setNewPwdErrorMsg("");
    } else {
      setNewPwdErrorMsg(
        "숫자, 영문자, 특수문자 조합으로 8자리 이상 입력해주세요."
      );
    }

    const confirmPwdCheck = onPasswordConfirmCheck(
      newPassword,
      confirmPassowrd
    );

    if (pwdCheck && !confirmPwdCheck) {
      setNewPwdErrorMsg("비밀번호가 틀립니다. 다시 확인해주세요.");
      setConfirmPwdErrorMsg("비밀번호가 틀립니다. 다시 확인해주세요.");
    }

    if (pwdCheck && confirmPwdCheck) {
      let body = {
        email: changeUserId.email,
        name: changeUserId.name,
        password: newPassword,
      };

      setNewPwdErrorMsg("");
      setConfirmPwdErrorMsg("");

      dispatch(userPasswordReset(body)).then((res) => {
        if (res.payload.userPasswordResetSuccess) {
          window.location.reload("/");
        }
      });
    }
  };

  // 해당 아이디 존재하는지 확인
  const onFindPasswordSubmitHandler = (event) => {
    event.preventDefault();

    let body = {
      email: email,
      name: name,
    };

    setChangeUserId(body);

    if (body.name === "" && body.email === "") {
      setNameErrorMsg("이름을 적어주세요.");
      setEmailErrorMsg("이메일을 적어주세요.");
    } else if (body.name === "") {
      setNameErrorMsg("이름을 적어주세요.");
      setEmailErrorMsg("");
    } else if (body.email === "") {
      setNameErrorMsg("");
      setEmailErrorMsg("이메일을 적어주세요.");
    } else {
      dispatch(findUserPassword(body)).then((res) => {
        if (res.payload.findUserEmail) {
          setNameErrorMsg("");
          setEmailErrorMsg("");
          setAuth(true);
        } else {
          setNameErrorMsg("입력하신 이름과 일치하는 이메일이 없습니다.");
          setEmailErrorMsg("입력하신 이메일은 존재하지 않습니다.");
        }
      });
    }
  };

  return (
    <Modal
      open={open}
      onClose={() => {
        setName("");
        setEmail("");
        setNewPassword("");
        setConfirmPassword("");
        setOpen(false);
        setAuth(false);
      }}
    >
      <List
        sx={style}
        component={"nav"}
        subheader={
          <ListSubheader
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              color: "#1b75d2",
              fontSize: "18px",
            }}
          >
            <Typography>비밀번호 재설정</Typography>
            <BsXLg
              style={{ cursor: "pointer" }}
              onClick={() => {
                setName("");
                setEmail("");
                setNewPassword("");
                setConfirmPassword("");
                setAuth(false);
                setOpen(false);
              }}
            />
          </ListSubheader>
        }
      >
        <Divider sx={{ margin: "20px 0" }} />

        <ListItemButton
          onClick={() => {
            setResetListOpen(!resetListOpen);
            setName("");
            setEmail("");
            setNewPassword("");
            setConfirmPassword("");
            setAuth(false);
          }}
        >
          <ListItemIcon>
            <SlLock size={20} />
          </ListItemIcon>
          <ListItemText
            primary="비밀번호 재설정"
            sx={{ color: "rgba(0, 0, 0, 0.54)" }}
          />
          {resetListOpen ? <BsChevronUp /> : <BsChevronDown />}
        </ListItemButton>
        <Collapse in={resetListOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding sx={{ p: 4 }}>
            <form>
              {auth ? (
                <>
                  <Box sx={{ width: "100%", marginBottom: "20px" }}>
                    <img
                      src="https://i.pinimg.com/736x/76/38/69/763869a33c8ac9e99a59500992c11127.jpg"
                      style={{
                        width: " 100%",
                        height: "200px",
                        objectFit: "contain",
                      }}
                    />
                    <Box width={"100%"} sx={{ textAlign: "center" }}>
                      <Typography fontSize={16}>새로운 비밀번호</Typography>
                      <Typography
                        fontSize={14}
                        sx={{ color: "rgba(0, 0, 0, 0.54)" }}
                      >
                        {name} 사용자님 새로운 비밀번호를 입력해주세요.
                      </Typography>
                    </Box>
                  </Box>
                  <Stack spacing={4}>
                    <TextField
                      error={newPwdErrorMsg ? true : false}
                      label="새로운 비밀번호"
                      type="password"
                      size="small"
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      sx={{
                        marginBottom: "25px",
                      }}
                      value={newPassword}
                      onChange={(event) => setNewPassword(event.target.value)}
                      helperText={newPwdErrorMsg}
                    />

                    <TextField
                      error={confirmPwdErrorMsg ? true : false}
                      label="새로운 비밀번호 확인"
                      type="password"
                      size="small"
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      value={confirmPassowrd}
                      onChange={(event) =>
                        setConfirmPassword(event.target.value)
                      }
                      helperText={confirmPwdErrorMsg}
                    />

                    <Box
                      sx={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <button
                        type="button"
                        style={{
                          width: "48%",
                          height: "40px",
                          border: "none",
                          backgroundColor: "#f95f7e",
                          color: "#fff",
                          borderRadius: "4px",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          setAuth(false);
                          setNewPassword("");
                          setConfirmPassword("");
                        }}
                      >
                        뒤로가기
                      </button>
                      <button
                        style={{
                          width: "48%",
                          height: "40px",
                          border: "none",
                          backgroundColor: "#1b75d2",
                          color: "#fff",
                          borderRadius: "4px",
                          cursor: "pointer",
                        }}
                        onClick={onPasswordResetBtnHandler}
                      >
                        비밀번호 재설정
                      </button>
                    </Box>
                  </Stack>
                </>
              ) : (
                <>
                  <Box sx={{ width: "100%", marginBottom: "20px" }}>
                    <img
                      src="https://i.pinimg.com/736x/76/38/69/763869a33c8ac9e99a59500992c11127.jpg"
                      style={{
                        width: " 100%",
                        height: "200px",
                        objectFit: "contain",
                      }}
                    />
                    <Box width={"100%"} sx={{ textAlign: "center" }}>
                      <Typography fontSize={16}>
                        비밀번호를 잊으셨나요?
                      </Typography>
                      <Typography
                        fontSize={14}
                        sx={{ color: "rgba(0, 0, 0, 0.54)" }}
                      >
                        이메일과 이름을 입력하시면 암호를 재설정 할 수 있도록
                        <br />
                        도와드리겠습니다.
                      </Typography>
                    </Box>
                  </Box>
                  <Stack spacing={4}>
                    <TextField
                      error={nameErrorMsg ? true : false}
                      label="이름"
                      type="text"
                      size="small"
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      sx={{
                        marginBottom: "25px",
                      }}
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      helperText={nameErrorMsg}
                    />

                    <TextField
                      error={emailErrorMsg ? true : false}
                      label="이메일"
                      type="email"
                      size="small"
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      helperText={emailErrorMsg}
                    />
                    <button
                      style={{
                        height: "40px",
                        border: "none",
                        backgroundColor: "#1b75d2",
                        color: "#fff",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                      onClick={onFindPasswordSubmitHandler}
                    >
                      다음으로
                    </button>
                  </Stack>
                </>
              )}
            </form>
          </List>
        </Collapse>
      </List>
    </Modal>
  );
}

export default PasswordResetModal;
