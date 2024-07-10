import React, { useState } from "react";

import {
  Stack,
  Box,
  Typography,
  Modal,
  Divider,
  ListSubheader,
  Chip,
  TextField,
  FormHelperText,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  InputAdornment,
} from "@mui/material";

import CenterFocusWeakOutlinedIcon from "@mui/icons-material/CenterFocusWeakOutlined";

import Axios from "axios";

import List from "@mui/material/List";

import { BsXLg, BsPerson, BsFillPersonFill } from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";
import { GoLock } from "react-icons/go";

import { useDispatch } from "react-redux";

import {
  registerUser,
  profileImageUpload,
} from "../../_actions/user/user_actions";

import { YEAR } from "../../constants/Register/YEAR";
import { MONTH } from "../../constants/Register/MONTH";
import { DAY } from "../../constants/Register/DAY";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 650,
  bgcolor: "#fff",
  boxShadow: 24,
  borderRadius: "10px",
  p: 2,
  outline: "none",
};

function RegisterModal({ open, setOpen }) {
  const dispatch = useDispatch();

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

  const [imagePrivewSrc, setImagePrivewSrc] = useState("");
  const [imageInfoFile, setImageInfoFile] = useState("");

  const activeBtn = isEmail && isPassword && isNmae && isBirth;

  const handleInput = (event) => {
    const { name, value } = event.target;
    setUserInput({ ...userInput, [name]: value });
  };

  const encodeFileToBase64 = (fileBlob) => {
    const reader = new FileReader();

    reader.readAsDataURL(fileBlob);

    return new Promise((resolve) => {
      reader.onload = () => {
        setImagePrivewSrc(reader.result);

        resolve();
      };
    });
  };

  const handlerImagePrivew = (event) => {
    encodeFileToBase64(event.target.files[0]);
    setImageInfoFile(event.target.files[0]);
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
          setEmailMessage("");
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
      setPasswordMessage("");
      setIsPassword(true);
    }
  };

  const onNameCheck = () => {
    if (name.length < 5 || name.length > 15) {
      setNameMessage("닉네임은 5글자 이상 15글자 이하로 입력해주세요");
      setIsName(false);
    } else {
      setNameMessage("");
      setIsName(true);
    }
  };

  const onRegisterSubmitHandler = (event) => {
    event.preventDefault();

    let body = {
      userProfileImageInfo: imageInfoFile,
    };

    dispatch(profileImageUpload(body)).then((res) => {
      if (res.payload.imageUpdateSuccess) {
        let body = {
          email: email,
          password: password,
          name: name,
          birth: `${year}-${month}-${day}`,
          image: res.payload.url,
        };

        dispatch(registerUser(body)).then((res) => {
          if (res.payload.registerSuccess) {
            window.location.reload("/");
          }
        });
      } else {
        let body = {
          email: email,
          password: password,
          name: name,
          birth: `${year}-${month}-${day}`,
        };

        dispatch(registerUser(body)).then((res) => {
          if (res.payload.registerSuccess) {
            window.location.reload("/");
          }
        });
      }
    });
  };

  return (
    <Modal
      open={open}
      onClose={() => {
        setNameMessage("");
        setEmailMessage("");
        setPasswordMessage("");
        setImagePrivewSrc("");
        setUserInput("");
        setOpen(false);
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
            <Typography>회원가입</Typography>
            <BsXLg
              style={{ cursor: "pointer" }}
              onClick={() => {
                setNameMessage("");
                setEmailMessage("");
                setPasswordMessage("");
                setImagePrivewSrc("");
                setOpen(false);
              }}
            />
          </ListSubheader>
        }
      >
        <Divider sx={{ margin: "20px 0" }} />

        <form style={{ width: "100%" }}>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            {/* 프로필 선택 */}
            <Box
              sx={{
                width: "45%",
                height: "300px",
                borderRadius: "10px",
                overflow: "hidden",
                position: "relative",
              }}
            >
              {imagePrivewSrc !== "" ? (
                <img
                  src={imagePrivewSrc}
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                  alt={`Profile Image`}
                />
              ) : (
                <Box
                  width={"100%"}
                  height={"100%"}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#ebebeb",
                  }}
                >
                  <BsFillPersonFill size={120} color="#fff" />
                </Box>
              )}

              <Stack
                sx={{
                  position: "absolute",
                  bottom: 10,
                  right: 10,
                }}
              >
                <input
                  type="file"
                  accept="image/*"
                  id="ChangeUserProfile"
                  style={{ display: "none" }}
                  onChange={handlerImagePrivew}
                />
                <label htmlFor="ChangeUserProfile">
                  <Chip
                    icon={<CenterFocusWeakOutlinedIcon fontSize="small" />}
                    color="info"
                    label={"이미지 변경"}
                    clickable
                    sx={{
                      cursor: "pointer",
                      zIndex: 10,
                      backgroundColor: "rgba(2, 136, 209, 0.6)",
                    }}
                  />
                </label>
              </Stack>
            </Box>

            {/* 회원가입 폼 */}
            <Stack spacing={2} sx={{ width: "50%" }}>
              {/* 이름 */}
              <div>
                <TextField
                  error={nameMessage}
                  label="이름"
                  type="text"
                  size="small"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <BsPerson />
                      </InputAdornment>
                    ),
                  }}
                  name="name"
                  onChange={handleInput}
                  onBlur={onNameCheck}
                />
                <FormHelperText error>{nameMessage || " "}</FormHelperText>
              </div>

              {/* 이메일 */}
              <div>
                <TextField
                  error={emailMessage}
                  label="이메일"
                  type="email"
                  size="small"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AiOutlineMail />
                      </InputAdornment>
                    ),
                  }}
                  name="email"
                  onChange={handleInput}
                  onBlur={onEmailCheck}
                />
                <FormHelperText error>{emailMessage || " "}</FormHelperText>
              </div>

              {/* 비밀번호 */}
              <div>
                <TextField
                  error={passwordMessage}
                  label="비밀번호"
                  type="password"
                  size="small"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <GoLock />
                      </InputAdornment>
                    ),
                  }}
                  name="password"
                  onChange={handleInput}
                  onBlur={onPasswordCheck}
                />
                <FormHelperText error>{passwordMessage || " "}</FormHelperText>
              </div>

              {/* 생년월일 */}
              <div>
                <Stack direction={"row"} justifyContent={"space-between"}>
                  <FormControl size="small" sx={{ width: "140px" }}>
                    <InputLabel id="demo-select-small-label">년도</InputLabel>
                    <Select
                      labelId="demo-select-small-label"
                      id="demo-select-small"
                      value={year}
                      label="Year"
                      name="year"
                      onChange={handleInput}
                    >
                      {YEAR.map((y) => (
                        <MenuItem key={y} value={y}>
                          {y}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <FormControl size="small" sx={{ width: "70px" }}>
                    <InputLabel id="demo-select-small-label">월</InputLabel>
                    <Select
                      labelId="demo-select-small-label"
                      id="demo-select-small"
                      value={month}
                      label="Month"
                      name="month"
                      onChange={handleInput}
                    >
                      {MONTH.map((m) => (
                        <MenuItem key={m} value={m}>
                          {m}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <FormControl size="small" sx={{ width: "80px" }}>
                    <InputLabel id="demo-select-small-label">일</InputLabel>
                    <Select
                      labelId="demo-select-small-label"
                      id="demo-select-small"
                      value={day}
                      label="Day"
                      name="day"
                      onChange={handleInput}
                    >
                      {DAY.map((d) => (
                        <MenuItem key={d} value={d}>
                          {d}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Stack>
                <FormHelperText error> </FormHelperText>
              </div>
              <button
                type="button"
                onClick={onRegisterSubmitHandler}
                style={{
                  height: "40px",
                  border: "none",
                  cursor: "pointer",
                  borderRadius: "4px",
                  backgroundColor: "#1b75d2",
                  color: "#fff",
                }}
              >
                회원가입
              </button>
            </Stack>
          </Stack>
        </form>
      </List>
    </Modal>
  );
}

export default RegisterModal;
