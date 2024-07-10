import React, { useState, useEffect } from "react";
import { Box, Stack, Typography, Button } from "@mui/material";
import { styled } from "@mui/material/styles";

import { BsChevronRight } from "react-icons/bs";

import StudyInfoModal from "./Modal";

import Axios from "axios";
import { Link } from "react-router-dom";

function UserNotJoinedStudyGroups() {
  const [studyInfo, setStudyInfo] = useState([]);
  const [selectedStudy, setSelectedStudy] = useState([]);

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

  const findAllStudyInfo = async () => {
    await Axios.get("/api/study/info/user/not-joined").then((res) => {
      if (res.data.success) {
        setStudyInfo(shuffle(res.data.study));
      }
    });
  };

  useEffect(() => {
    findAllStudyInfo();
  }, []);

  const StyledButton = styled(Button)(() => ({
    backgroundColor: "#fff",
    justifyContent: "start",
    borderRadius: "20px",

    textTransform: "none",

    "&.MuiButton-outlined": {
      borderColor: "transparent",
    },
    "&:hover": {
      borderColor: "#a3a3a3",
      backgroundColor: "#fff",
    },
  }));

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  return (
    <Stack
      alignItems={"center"}
      sx={{
        width: "100%",
        backgroundColor: "#eeeef0",
        padding: "60px 0",
        minHeight: "calc(100vh - 700px)",
        maxHeight: "700px",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          width: "1080px",
          height: "30px",
          top: "10px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography color={"#222223"}>이런 스터디는 어때요?</Typography>

        <Link
          to="/discover"
          style={{
            color: "#6f6f71",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <Typography fontSize={13}>모두보기</Typography>
          <BsChevronRight size={13} style={{ marginBottom: "1px" }} />
        </Link>
      </Box>

      <Stack
        sx={{
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "30px 80px",
        }}
      >
        {studyInfo &&
          studyInfo.slice(0, 10).map((study) => (
            <Box
              sx={{
                display: "flex",
                width: "500px",
                height: "100px",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={() => {
                handleOpen();
                setSelectedStudy(study);
              }}
            >
              <img
                style={{
                  objectFit: "cover",
                  height: "80px",
                  width: "80px",
                  borderRadius: "10px",
                  marginRight: "15px",
                }}
                src={`http://localhost:8000/${study.studyBanner}`}
                alt="StudyBanner"
              />

              <Stack spacing={0.5}>
                <Box>
                  <Typography sx={{ color: "#222223", fontSize: "15px" }}>
                    {study.studyName}
                  </Typography>
                  <Typography sx={{ color: "#6f6f71", fontSize: "13px" }}>
                    {study.studyGroupDetail.length > 30
                      ? study.studyGroupDetail.substr(0, 30 - 1) + "..."
                      : study.studyGroupDetail}
                  </Typography>
                </Box>

                <div style={{ width: "fit-content" }}>
                  <StyledButton size="medium" variant="outlined">
                    <Typography
                      sx={{
                        color: "#222223",
                        fontSize: "12px",
                        marginRight: "5px",
                      }}
                    >
                      {study.studyName}
                    </Typography>
                    <Typography
                      sx={{
                        color: "#6f6f71",
                        fontSize: "12px",
                        marginRight: "5px",
                      }}
                    >
                      스터디 더보기
                    </Typography>
                    <BsChevronRight
                      color="#6f6f71"
                      size={12}
                      style={{ marginBottom: "1px" }}
                    />
                  </StyledButton>
                </div>
              </Stack>
            </Box>
          ))}

        {open && (
          <StudyInfoModal info={selectedStudy} open={open} setOpen={setOpen} />
        )}
      </Stack>
    </Stack>
  );
}

export default UserNotJoinedStudyGroups;
