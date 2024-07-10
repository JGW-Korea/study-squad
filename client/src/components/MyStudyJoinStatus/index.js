import React, { useEffect, useState } from "react";

import { Stack, Box, Typography, Divider } from "@mui/material";
import axios from "axios";

import { BsChevronDown, BsChevronUp, BsFillPersonFill } from "react-icons/bs";

function MyStudyJoinStatus() {
  const [studyJoinState, setStudyJoinState] = useState([]);
  const [checkInfo, setCheckInfo] = useState({});

  const onJoinStateBtn = (info, api) => {
    axios
      .put(`/api/study/state/my-study/${api}`, {
        info: info,
      })
      .then((res) => {
        if (res.data.refuseSuccess) {
          setStudyJoinState(
            studyJoinState.filter((item) => item.id !== info.id)
          );
        }
      });
  };

  useEffect(() => {
    axios.get("/api/study/state/my-study/join").then((res) => {
      setStudyJoinState(res.data.StudyInfo);
    });
  }, []);

  return (
    <Box
      sx={{
        width: "calc(100% - 236px)",
        height: "fit-content",
        backgroundColor: "#fff",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.2)",
        maxHeight: "100%",
        overflowY: "scroll",

        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      {/* Header */}
      <Stack
        justifyContent={"center"}
        sx={{ height: "60px", padding: "0 30px" }}
      >
        <Typography sx={{ fontSize: 16, fontWeight: 500, lineHeight: "50px" }}>
          MY 스터디 가입 신청 인원
        </Typography>
      </Stack>

      <Divider />

      <Stack spacing={2} sx={{ padding: "16px 30px" }}>
        <Box sx={{ width: "228px", color: "#222" }}>
          <Typography fontSize={13} fontWeight={600}>
            가입 신청 인원
          </Typography>
        </Box>

        <Stack spacing={2} sx={{ width: "100%" }}>
          {studyJoinState.map((study) => {
            const SignUpDate = new Date(study.createdAt)
              .toLocaleString("ko-KR", {
                timeZone: "Asia/Seoul",
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })
              .replace(/\. /g, ".")
              .slice(2);

            const userBirth = new Date(study.user.birth)
              .toLocaleString("ko-KR", {
                timeZone: "Asia/Seoul",
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })
              .replace(/\. /g, ".")
              .slice(2, -1);

            return (
              <Stack
                spacing={1.5}
                direction={"column"}
                sx={{ width: "100%", alignItems: "center" }}
              >
                <Stack
                  direction={"row"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  sx={{ width: "100%", height: "80px" }}
                >
                  <Box
                    sx={{
                      width: "200px",
                      padding: "10px 0",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src={`http://localhost:8000/${study.studyGroup.studyBanner}`}
                      alt="Study Banner"
                      style={{
                        width: "60px",
                        height: "60px",
                        marginRight: "10px",
                        borderRadius: "5px  ",
                      }}
                    />

                    <Typography fontSize={13} color={"#333"}>
                      {study.studyGroup.studyName}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Typography fontSize={13} color={"#bbb"} mr={1}>
                      {SignUpDate} 신청
                    </Typography>
                    <Box
                      onClick={() =>
                        setCheckInfo({
                          ...checkInfo,
                          [study.studyId]: !checkInfo[study.studyId],
                        })
                      }
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                      }}
                    >
                      <Typography fontSize={13} color={"#333"} mr={1}>
                        정보 확인
                      </Typography>
                      {checkInfo[study.studyId] ? (
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
                    </Box>
                  </Box>
                </Stack>

                {checkInfo[study.studyId] ? (
                  <Stack
                    direction={"row"}
                    justifyContent={"space-between"}
                    p={2}
                    sx={{
                      width: "100%",
                      backgroundColor: "#f5f5f7",
                      borderRadius: "5px",
                      boxShadow: "inset 0 0 4px rgba(0, 0, 0, 0.2)",
                    }}
                  >
                    <Stack direction={"row"} spacing={2}>
                      <Box
                        sx={{
                          width: "150px",
                          height: "200px",
                          borderRadius: "10px",
                          overflow: "hidden",
                          backgroundColor: "#ebebeb",
                        }}
                      >
                        {study.user.profileImage ? (
                          <img
                            src={`http://localhost:8000/${study.user.profileImage}`}
                            alt="userProfile"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                        ) : (
                          <Box
                            width={"100%"}
                            height={"100%"}
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <BsFillPersonFill size={80} color="#fff" />
                          </Box>
                        )}
                      </Box>
                      <Box>
                        <Typography fontSize={13} color={"#333"}>
                          닉네임 : {study.user.name}
                        </Typography>
                        <Typography fontSize={13} color={"#333"}>
                          생일 : {userBirth}
                        </Typography>
                        <Box
                          sx={{
                            maxWidth: "400px",
                            wordBreak: "break-word",
                          }}
                        >
                          <Typography fontSize={13} color={"#333"} mb={1}>
                            신청서 내용
                          </Typography>
                          <Typography fontSize={13} color={"#333"}>
                            {study.message}
                          </Typography>
                        </Box>
                      </Box>
                    </Stack>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "end",
                      }}
                    >
                      <button
                        onClick={() => onJoinStateBtn(study, "approve")}
                        style={{
                          padding: "5px 15px",
                          marginRight: "5px",
                          border: "none",
                          borderRadius: "2px",
                          fontSize: "13px",
                          backgroundColor: "rgb(27, 117, 210)",
                          color: "#fff",
                          boxShadow: "rgba(0, 0, 0, 0.4) 0px 1px 2px",
                          cursor: "pointer",
                        }}
                      >
                        승인
                      </button>
                      <button
                        onClick={() => onJoinStateBtn(study, "refuse")}
                        style={{
                          padding: "5px 15px",
                          border: "none",
                          borderRadius: "2px",
                          fontSize: "13px",
                          boxShadow: "rgba(0, 0, 0, 0.4) 0px 1px 2px",
                          cursor: "pointer",
                        }}
                      >
                        거절
                      </button>
                    </Box>
                  </Stack>
                ) : null}
              </Stack>
            );
          })}
        </Stack>
      </Stack>
    </Box>
  );
}

export default MyStudyJoinStatus;
