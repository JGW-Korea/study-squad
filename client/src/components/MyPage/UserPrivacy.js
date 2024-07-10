import React, { useState } from "react";

import { YEAR } from "../../constants/Register/YEAR";
import { MONTH } from "../../constants/Register/MONTH";
import { DAY } from "../../constants/Register/DAY";

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
import axios from "axios";

function UserPrivacy({ user }) {
  const [changeNameMenuOpen, setChangeNameMenuOpen] = useState(false);
  const [changeBirthMenuOpen, setChangeBirthMenuOpen] = useState(false);

  const [updataName, setUpdateName] = useState("");
  const [nameMessage, setNameMessage] = useState("");
  const [birthMessage, setBirthMessage] = useState("");

  const [userInput, setUserInput] = useState({
    year: "",
    month: "",
    day: "",
  });

  const { year, month, day } = userInput;

  const handleInput = (event) => {
    const { name, value } = event.target;
    setUserInput({ ...userInput, [name]: value });
  };

  const onNameCheck = () => {
    if (updataName.length < 5 || updataName.length > 15) {
      setNameMessage("닉네임은 5글자 이상 15글자 이하로 입력해주세요");
    } else {
      setNameMessage("");
    }
  };

  const onNameChangeHandler = () => {
    if (!updataName) setNameMessage("닉네임을 작성해주세요");
    if (!updataName || nameMessage) return;

    axios
      .post("/api/user/mypage/change/name", {
        name: updataName,
      })
      .then((res) => {
        if (res.data.nameChangeSucess) {
          let userInfo = JSON.parse(localStorage.getItem("user_id"));

          userInfo.name = res.data.name;

          localStorage.setItem("user_id", JSON.stringify(userInfo));

          window.location.reload();
        }
      })
      .catch((err) => alert("닉네임 변경에 실패했습니다."));
  };

  const onBirthChangeHandler = () => {
    if (!year || !month || !day)
      setBirthMessage("생년월일을 입력란을 모두 채워주세요");

    setBirthMessage("");
    axios
      .post("/api/user/mypage/change/birth", {
        birth: `${year}-${month}-${day}`,
      })
      .then((res) => {
        if (res.data.birthChangeSucess) {
          let userInfo = JSON.parse(localStorage.getItem("user_id"));

          userInfo.birth = res.data.birth;

          localStorage.setItem("user_id", JSON.stringify(userInfo));

          window.location.reload();
        }
      })
      .catch((err) => alert("생년월일 변경에 실패했습니다."));
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
          사용자 정보
        </Typography>
      </Box>
      <Box sx={{ width: "calc(100% - 244px)" }}>
        {/* 닉네임 정보 */}
        <Stack>
          <Box
            sx={{ display: "flex", minHeight: "44px", alignItems: "center" }}
          >
            <Typography fontSize={13} color={"#333"} sx={{ width: "100px" }}>
              닉네임
            </Typography>
            <Typography fontSize={13} color={"#333"} sx={{ flex: 1 }}>
              {user.name}
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
                onClick={() => setChangeNameMenuOpen(!changeNameMenuOpen)}
              >
                <Typography
                  fontSize={13}
                  color={"#333"}
                  sx={{ marginRight: "5px" }}
                >
                  변경
                </Typography>
                {changeNameMenuOpen ? (
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

          <Collapse in={changeNameMenuOpen} timeout="auto" unmountOnExit>
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
                  type="text"
                  placeholder="새로운 닉네임을 입력해주세요"
                  style={{
                    flex: 1,
                    border: "none",
                    borderBottom: "1px solid rgba(0, 0, 0, 0.3)",
                    outline: "none",
                    fontSize: "13px",
                    color: "#333",
                  }}
                  onChange={(event) => setUpdateName(event.target.value)}
                  onBlur={onNameCheck}
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
                      onClick={() => setChangeNameMenuOpen(false)}
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

              {nameMessage ? (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Box sx={{ width: "100px" }}></Box>
                  <FormHelperText error sx={{ flex: 1 }}>
                    {nameMessage || " "}
                  </FormHelperText>
                </Box>
              ) : null}
            </List>
          </Collapse>
        </Stack>

        {/* 생일 정보 */}
        <Stack>
          <Box
            sx={{ display: "flex", minHeight: "44px", alignItems: "center" }}
          >
            <Typography fontSize={13} color={"#333"} sx={{ width: "100px" }}>
              생일
            </Typography>
            <Typography fontSize={13} color={"#333"} sx={{ flex: 1 }}>
              {`${new Date(user.birth).getFullYear()}년 ${
                new Date(user.birth).getMonth() + 1
              }월 ${new Date(user.birth).getDate()}일`}
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
                onClick={() => setChangeBirthMenuOpen(!changeBirthMenuOpen)}
              >
                <Typography
                  fontSize={13}
                  color={"#333"}
                  sx={{ marginRight: "5px" }}
                >
                  변경
                </Typography>
                {changeBirthMenuOpen ? (
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

          <Collapse in={changeBirthMenuOpen} timeout="auto" unmountOnExit>
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

                <Stack
                  direction={"row"}
                  justifyContent={"space-between"}
                  sx={{ flex: 1 }}
                >
                  <FormControl size="small" sx={{ width: "125px" }}>
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
                      onClick={() => onBirthChangeHandler(false)}
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
                      onClick={() => setChangeBirthMenuOpen(false)}
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

              {birthMessage ? (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Box sx={{ width: "100px" }}></Box>
                  <FormHelperText error sx={{ flex: 1 }}>
                    {birthMessage || " "}
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

export default UserPrivacy;
