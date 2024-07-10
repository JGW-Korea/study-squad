import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import { useDispatch } from "react-redux";

import { loginUser } from "../../_actions/user/user_actions";

import {
  Box,
  Stack,
  Typography,
  TextField,
  InputAdornment,
} from "@mui/material";
// import { styled } from "@mui/material/styles";
import styled from "styled-components";
import Auth from "../../hoc/auth";

// 컴포넌트
import Header from "../../components/Header";
import UserNotJoinedStudyGroups from "../../components/Study/UserNotJoinedStuyGroups";
import UserJoinedStudyGroups from "../../components/Study/UserJoinedStudyGroups";

import Slogan from "../../components/Slogan";
import { Quotes_Array } from "../../data/quotes";

function Home() {
  const user_id = JSON.parse(localStorage.getItem("user_id"));
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    const idx = Math.floor(Math.random() * Quotes_Array.length);
    setQuotes(Quotes_Array[idx]);
  }, []);

  return (
    <>
      {user_id ? (
        <>
          {/* 상단 명언 */}
          <Box
            sx={{
              width: "100%",
              height: "220px",
              padding: "0 24px",
              paddingTop: "50px",
            }}
          >
            <Stack
              justifyContent={"center"}
              alignItems={"center"}
              p={4}
              sx={{
                width: "1080px",
                height: "120px",
                borderRadius: "20px",
                margin: "0 auto",
                marginTop: "40px",
                backgroundColor: "#f5f5f7",
              }}
            >
              <Typography fontWeight={600} color={"#222223"}>
                {quotes.quotes}
              </Typography>
              <Typography fontSize={14} color={"#6f6f71"}>
                - {quotes.write} -
              </Typography>
            </Stack>
          </Box>

          {/* My Study 섹션 */}
          <Box
            sx={{
              width: "100%",
              height: "80px",
            }}
          >
            <Box sx={{ width: "1080px", paddingTop: "20px", margin: "0 auto" }}>
              <Typography
                fontSize={26}
                fontWeight={800}
                sx={{
                  width: "max-content",
                  color: "#1b75d2",
                  paddingBottom: "16px",
                  borderBottom: "4px solid #1b75d2",
                }}
              >
                MY STUDY
              </Typography>
            </Box>
          </Box>

          {/* 사용자가 가입한 스터디 목록 */}
          <UserJoinedStudyGroups user={user_id} />

          {/* 사용자가 가입하지 않은 스터디 목록 */}
          <UserNotJoinedStudyGroups />
        </>
      ) : (
        <Slogan />
      )}
    </>
  );
}

export default Auth(Home, null);
