import React, { useState } from "react";

import {
  Stack,
  Box,
  MenuItem,
  List,
  Collapse,
  Typography,
  FormHelperText,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";

import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { userChangePassword } from "../../_actions/user/user_actions";

function UserLoginAccount({ user }) {
  const navigation = useNavigate();
  const dispatch = useDispatch();

  // 이메일 변경 state
  const [changeEmailMenuOpen, setChangeEmailMenuOpen] = useState(false);
  const [updateEmail, setUpdateEmail] = useState("");
  const [emailMessage, setEmailMessage] = useState("");

  // 비밀번호 변경 state
  const [changePasswordMenuOpen, setChangePasswordMenuOpen] = useState(false);

  const [usePassword, setUsePassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [passwordMessage, setPasswordMessage] = useState("");

  const [isPassword, setIsPassword] = useState(false);

  // 이메일 정규화
  const onEmailCheck = () => {
    const emailRegExp =
      /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/;

    if (!emailRegExp.test(updateEmail)) {
      setEmailMessage("이메일의 형식이 올바르지 않습니다.");
    } else {
      Axios.post("/api/user/idCheck", {
        email: updateEmail,
      }).then((res) => {
        if (!res.data.duplicate) {
          setEmailMessage("");
        } else {
          setEmailMessage("중복된 이메일 입니다.");
        }
      });
    }
  };

  // 이메일 변경 함수
  const onNameChangeHandler = () => {
    if (!updateEmail) setEmailMessage("이메일을 작성해주세요");
    if (!updateEmail || emailMessage) return;

    Axios.post("/api/user/mypage/change/email", {
      email: updateEmail,
    }).then((res) => {
      if (res.data.emailChangeSuccess) {
        alert("이메일이 성공적으로 변경되었습니다. 다시 로그인 하여 주십시오");
        localStorage.removeItem("user_id");
        navigation("/");
      }
    });
  };

  // 비밀번호 정규화
  const onPasswordCheck = (password) => {
    const passwordRegExp =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;

    if (!passwordRegExp.test(password)) {
      setPasswordMessage(
        "숫자, 영문자, 특수문자 조합으로 8자리 이상 입력해주세요."
      );
      setIsPassword(false);
    } else {
      setPasswordMessage("");
      setIsPassword(true);
    }
  };

  // 비밀번호 변경 함수
  const onPasswordChangeHandler = () => {
    if (!usePassword || !newPassword || !confirmNewPassword) {
      setPasswordMessage("입력란을 작성해주세요");
      return;
    }
    if (!isPassword) {
      setPasswordMessage(
        "숫자, 영문자, 특수문자 조합으로 8자리 이상 입력해주세요."
      );
      return;
    }

    if (newPassword === confirmNewPassword) {
      setPasswordMessage("");

      let body = {
        userUsePassword: usePassword,
        userNewPassword: newPassword,
      };

      dispatch(userChangePassword(body)).then((res) => {
        if (!res.payload.userChangePasswordSuccess) {
          if (res.payload.type === "PASSWORD_MIS_MATCH") {
            setPasswordMessage(res.payload.message);
          } else {
            setPasswordMessage(res.payload.message);
          }
        } else {
          alert(
            "비밀번호가 성공적으로 변경되었습니다. 다시 로그인 하여 주십시오."
          );
          localStorage.removeItem("user_id");
          navigation("/");
        }
      });
    } else {
      setPasswordMessage(
        "변경하실 비밀번호가 서로 다릅니다. 다시 확인해주세요"
      );
    }
  };

  return (
    <Stack
      direction={"row"}
      alignItems={"start"}
      spacing={2}
      sx={{ padding: "16px 30px" }}
    >
      <Box sx={{ width: "228px", color: "#222" }}>
        <Typography fontSize={13} fontWeight={600}>
          로그인 계정
        </Typography>
      </Box>

      <Box sx={{ width: "calc(100% - 244px)" }}>
        {/* 이메일 변경 */}
        <Stack>
          <Box
            sx={{ display: "flex", minHeight: "44px", alignItems: "center" }}
          >
            <Typography fontSize={13} color={"#333"} sx={{ width: "100px" }}>
              이메일
            </Typography>
            <Typography fontSize={13} color={"#333"} sx={{ flex: 1 }}>
              {user.email}
            </Typography>

            <Box
              sx={{
                width: "150px",
                display: "flex",
                justifyContent: "end",
              }}
            >
              <div
                style={{
                  width: "40px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
                onClick={() => setChangeEmailMenuOpen(!changeEmailMenuOpen)}
              >
                <Typography
                  fontSize={13}
                  color={"#333"}
                  sx={{ marginRight: "5px" }}
                >
                  변경
                </Typography>
                {changeEmailMenuOpen ? (
                  <BsChevronUp
                    size={10}
                    style={{ color: "#333", marginBottom: "1px" }}
                  />
                ) : (
                  <BsChevronDown
                    size={10}
                    style={{ color: "#333", marginBottom: "1px" }}
                  />
                )}
              </div>
            </Box>
          </Box>

          <Collapse in={changeEmailMenuOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <Box
                sx={{
                  display: "flex",
                  minHeight: "44px",
                  alignItems: "center",
                }}
              >
                <Typography
                  fontSize={13}
                  color={"#333"}
                  sx={{ width: "100px" }}
                ></Typography>

                <input
                  type="email"
                  placeholder="새로운 이메일을 입력해주세요"
                  style={{
                    flex: 1,
                    border: "none",
                    borderBottom: "1px solid rgba(0, 0, 0, 0.3)",
                    outline: "none",
                    fontSize: "13px",
                    color: "#333",
                  }}
                  onChange={(event) => setUpdateEmail(event.target.value)}
                  onBlur={onEmailCheck}
                />

                <Box
                  sx={{
                    width: "150px",
                    display: "flex",
                    justifyContent: "end",
                  }}
                >
                  <Stack
                    direction={"row"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    spacing={1}
                  >
                    <button
                      onClick={onNameChangeHandler}
                      style={{
                        border: "none",
                        cursor: "pointer",
                        fontSize: "13px",
                        padding: "5px 15px",
                        borderRadius: "2px",
                        backgroundColor: "#1b75d2",
                        color: "#fff",
                        boxShadow: "0 1px 2px rgba(0, 0, 0, 0.4)",
                      }}
                    >
                      수정
                    </button>
                    <button
                      onClick={() => setChangeEmailMenuOpen(false)}
                      style={{
                        border: "none",
                        cursor: "pointer",
                        fontSize: "13px",
                        padding: "5px 15px",
                        borderRadius: "2px",
                        boxShadow: "0 1px 2px rgba(0, 0, 0, 0.4)",
                      }}
                    >
                      취소
                    </button>
                  </Stack>
                </Box>
              </Box>

              {emailMessage ? (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Box sx={{ width: "100px" }}></Box>
                  <FormHelperText error sx={{ flex: 1 }}>
                    {emailMessage || " "}
                  </FormHelperText>
                </Box>
              ) : null}
            </List>
          </Collapse>
        </Stack>

        {/* 비밀번호 변경 */}
        <Stack>
          <Box
            sx={{ display: "flex", minHeight: "44px", alignItems: "center" }}
          >
            <Typography fontSize={13} color={"#333"} sx={{ width: "100px" }}>
              비밀번호
            </Typography>
            <Box flex={1}></Box>

            <Box
              sx={{
                width: "150px",
                display: "flex",
                justifyContent: "end",
              }}
            >
              <div
                style={{
                  width: "40px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
                onClick={() =>
                  setChangePasswordMenuOpen(!changePasswordMenuOpen)
                }
              >
                <Typography
                  fontSize={13}
                  color={"#333"}
                  sx={{ marginRight: "5px" }}
                >
                  변경
                </Typography>
                {changePasswordMenuOpen ? (
                  <BsChevronUp
                    size={10}
                    style={{ color: "#333", marginBottom: "1px" }}
                  />
                ) : (
                  <BsChevronDown
                    size={10}
                    style={{ color: "#333", marginBottom: "1px" }}
                  />
                )}
              </div>
            </Box>
          </Box>

          <Collapse in={changePasswordMenuOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {/* 현재 비밀번호 입력 */}
              <Box
                sx={{
                  display: "flex",
                  minHeight: "44px",
                  alignItems: "center",
                }}
              >
                <Typography
                  fontSize={13}
                  color={"#333"}
                  sx={{ width: "100px" }}
                ></Typography>

                <input
                  type="password"
                  placeholder="지금 사용 중이신 비밀번호를 입력해주세요"
                  style={{
                    flex: 1,
                    border: "none",
                    borderBottom: "1px solid rgba(0, 0, 0, 0.3)",
                    outline: "none",
                    fontSize: "13px",
                    color: "#333",
                  }}
                  onChange={(event) => setUsePassword(event.target.value)}
                  onBlur={() => onPasswordCheck(usePassword)}
                />

                <Box width={"150px"}></Box>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  minHeight: "44px",
                  alignItems: "center",
                }}
              >
                <Typography
                  fontSize={13}
                  color={"#333"}
                  sx={{ width: "100px" }}
                ></Typography>

                <input
                  type="email"
                  placeholder="새 비밀번호를 입력해주세요"
                  style={{
                    flex: 1,
                    border: "none",
                    borderBottom: "1px solid rgba(0, 0, 0, 0.3)",
                    outline: "none",
                    fontSize: "13px",
                    color: "#333",
                  }}
                  onChange={(event) => setNewPassword(event.target.value)}
                  onBlur={() => onPasswordCheck(newPassword)}
                />

                <Box width={"150px"}></Box>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  minHeight: "44px",
                  alignItems: "center",
                }}
              >
                <Typography
                  fontSize={13}
                  color={"#333"}
                  sx={{ width: "100px" }}
                ></Typography>

                <input
                  type="email"
                  placeholder="새 비밀번호를 다시 한번 입력해주세요"
                  style={{
                    flex: 1,
                    border: "none",
                    borderBottom: "1px solid rgba(0, 0, 0, 0.3)",
                    outline: "none",
                    fontSize: "13px",
                    color: "#333",
                  }}
                  onChange={(event) =>
                    setConfirmNewPassword(event.target.value)
                  }
                  onBlur={() => onPasswordCheck(confirmNewPassword)}
                />

                <Box
                  sx={{
                    width: "150px",
                    display: "flex",
                    justifyContent: "end",
                  }}
                >
                  <Stack
                    direction={"row"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    spacing={1}
                  >
                    <button
                      onClick={onPasswordChangeHandler}
                      style={{
                        border: "none",
                        cursor: "pointer",
                        fontSize: "13px",
                        padding: "5px 15px",
                        borderRadius: "2px",
                        backgroundColor: "#1b75d2",
                        color: "#fff",
                        boxShadow: "0 1px 2px rgba(0, 0, 0, 0.4)",
                      }}
                    >
                      수정
                    </button>
                    <button
                      onClick={() => setChangePasswordMenuOpen(false)}
                      style={{
                        border: "none",
                        cursor: "pointer",
                        fontSize: "13px",
                        padding: "5px 15px",
                        borderRadius: "2px",
                        boxShadow: "0 1px 2px rgba(0, 0, 0, 0.4)",
                      }}
                    >
                      취소
                    </button>
                  </Stack>
                </Box>
              </Box>

              {passwordMessage ? (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Box sx={{ width: "100px" }}></Box>
                  <FormHelperText error sx={{ flex: 1 }}>
                    {passwordMessage || " "}
                  </FormHelperText>
                </Box>
              ) : null}
            </List>
          </Collapse>
        </Stack>
      </Box>
    </Stack>
  );
}

export default UserLoginAccount;
