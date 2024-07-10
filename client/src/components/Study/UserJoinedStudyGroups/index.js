import React, { useState, useEffect } from "react";
import Axios from "axios";

import { Box, Stack, Typography } from "@mui/material";
import styled from "styled-components";

import { BsPlus } from "react-icons/bs";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

const StyledSlider = styled(Slider)`
  width: 100%;
  flex-grow: 1;

  .slick-slide > div {
    margin: 0 15px;
  }

  .slick-list {
    height: 100%;
    display: grid;
    align-items: center;
    margin: 0 -15px;
    overflow: hidden;
  }

  .slick-track {
    margin: 0;
  }

  .slick-prev {
    left: -40px;
  }
  .slick-next {
    right: -40px;
  }

  .slick-prev.slick-disabled:before,
  .slick-next.slick-disabled:before {
    opacity: 0;
    cursor: auto;
  }

  .slick-prev:before,
  .slick-next:before {
    color: #1b75d2;
  }
`;

const StyledStack = styled(Stack)(() => ({
  height: "250px",
  backgroundColor: "#fff",
  borderRadius: "10px",
  cursor: "pointer",
  overflow: "hidden",
  boxShadow: "0 0 2px rgba(0, 0, 0, 0.2)",

  "&:hover": {
    transform: "scale(1.05)",
  },
  transition: "all 0.3s ease-in",
}));

const StyledLink = styled(Link)`
  text-decoration: none;
  color: "red";
`;

function shuffle(array) {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function UserJoinedStudyGroups({ user }) {
  const [userStudyInfo, setUserStudyInfo] = useState([]);

  const settings = {
    infinite: false,
    speed: 500,
    slidesToScroll: 4,
    slidesToShow: 5,
  };

  const GetMyStudy = async () => {
    await Axios.get("/api/study/info/user/joined").then((res) => {
      if (res.data.success) {
        setUserStudyInfo(shuffle(res.data.study));
      }
    });
  };

  useEffect(() => {
    GetMyStudy();
  }, []);

  return (
    <Stack
      width={"100%"}
      height={"400px"}
      p={2}
      sx={{ backgroundColor: "#f5f5f7" }}
    >
      <Stack
        spacing={2}
        sx={{ width: "1080px", height: "100%", margin: "0 auto" }}
      >
        <Box
          sx={{
            width: "100%",
            height: "60px",
            backgroundColor: "#fff",
            borderRadius: "10px",
            boxShadow: "0 0 2px rgba(0, 0, 0, 0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#1b75d2",
          }}
        >
          <Typography sx={{ fontSize: "14px" }}>
            {user.name} 사용자님 다양한 스터디를 통해 사용자님의 능력을 더욱
            성장시켜보세요.
          </Typography>
        </Box>

        {/* 사용자가 가입한 스터디 목록 */}
        <StyledSlider {...settings}>
          <StyledLink to={"/study-create"} style={{ textDecoration: "none" }}>
            <StyledStack>
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "black",
                }}
              >
                <Box
                  sx={{
                    backgroundColor: "#f5f5f7",
                    width: "60px",
                    height: "60px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "10px",
                  }}
                >
                  <BsPlus size={40} color={"#9fa3b1"} />
                </Box>
                <Typography style={{ textDecoration: "none" }}>
                  만들기
                </Typography>
              </Box>
            </StyledStack>
          </StyledLink>

          {userStudyInfo.map((study) => (
            <StyledLink
              to={`/study/${study.studyGroup.studyGroupId} `}
              state={{
                info: study,
              }}
            >
              <StyledStack key={study.studyGroup.studyGroupId}>
                <img
                  src={`http://localhost:8000/${study.studyGroup.studyBanner}`}
                  alt="studybanner"
                  style={{ width: "100%", height: "70%" }}
                />
                <Box p={1} sx={{ width: "100%", height: "30%" }}>
                  <Typography sx={{ fontSize: "14px", color: "#222223" }}>
                    {study.studyName}
                  </Typography>
                  <Typography sx={{ fontSize: "12px", color: "#6f6f71" }}>
                    멤버 {study.studyGroup.studyGroupMember}
                  </Typography>
                </Box>
              </StyledStack>
            </StyledLink>
          ))}
        </StyledSlider>
      </Stack>
    </Stack>
  );
}

export default UserJoinedStudyGroups;
