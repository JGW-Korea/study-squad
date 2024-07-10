import React, { useEffect, useState } from "react";

import {
  Stack,
  Box,
  Typography,
  Divider,
  IconButton,
  Tooltip,
} from "@mui/material";
import axios from "axios";

import { BsX } from "react-icons/bs";

function StudyJoinStatus() {
  const [studyJoinState, setStudyJoinState] = useState([]);

  useEffect(() => {
    axios.get("/api/study/state/other").then((res) => {
      setStudyJoinState(res.data.StudyInfo);
    });
  }, []);

  const cancelStudyMembership = (study) => {
    axios
      .delete("/api/study/state/cancel", {
        data: {
          study: study,
        },
      })
      .then((res) => {
        if (res.data.success) {
          alert(
            `${study.studyGroup.studyName} 스터디 가입 신청이 취소되었습니다.`
          );
          window.location.reload();
        }
      });
  };

  const stateDeleteBtn = (study) => {
    axios
      .delete("/api/study/state/delete", {
        data: {
          study: study,
        },
      })
      .then((res) => {
        if (res.data.success) {
          setStudyJoinState(
            studyJoinState.filter((item) => item.id !== study.id)
          );
        }
      });
  };

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
          스터디 가입 신청 현황
        </Typography>
      </Stack>

      <Divider />

      <Stack spacing={2} sx={{ padding: "16px 30px" }}>
        <Box sx={{ width: "228px", color: "#222" }}>
          <Typography fontSize={13} fontWeight={600}>
            가입 신청 현황
          </Typography>
        </Box>

        <Stack spacing={2} sx={{ width: "100%" }}>
          {studyJoinState.map((study) => (
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

              {study.state === "approve" && (
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography
                    fontSize={13}
                    color={"#20DE07"}
                    fontWeight={600}
                    sx={{ marginRight: "10px" }}
                  >
                    가입 완료
                  </Typography>

                  <Tooltip title="삭제하기">
                    <IconButton onClick={() => stateDeleteBtn(study)}>
                      <BsX />
                    </IconButton>
                  </Tooltip>
                </Box>
              )}

              {study.state === "refuse" && (
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography
                    fontSize={13}
                    color={"rgb(232, 84, 59)"}
                    fontWeight={600}
                    sx={{ marginRight: "10px" }}
                  >
                    가입 취소
                  </Typography>

                  <Tooltip title="삭제하기">
                    <IconButton onClick={() => stateDeleteBtn(study)}>
                      <BsX />
                    </IconButton>
                  </Tooltip>
                </Box>
              )}

              {/* 스터디 가입 대기 중인 상태 */}
              {study.state === "waite" && (
                <button
                  onClick={() => cancelStudyMembership(study)}
                  style={{
                    padding: "5px 10px",
                    fontSize: "12px",
                    border: "none",
                    boxShadow: "rgba(0, 0, 0, 0.4) 0px 1px 2px",
                    backgroundColor: "rgb(27, 117, 210)",
                    color: "#fff",
                    borderRadius: "2px",
                    cursor: "pointer",
                  }}
                >
                  가입 취소
                </button>
              )}
            </Stack>
          ))}
        </Stack>
      </Stack>
    </Box>
  );
}

export default StudyJoinStatus;
