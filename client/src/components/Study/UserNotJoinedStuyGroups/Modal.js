import React, { useState } from "react";
import { BsXLg, BsChevronLeft } from "react-icons/bs";

import {
  Box,
  Stack,
  Typography,
  Button,
  Modal,
  Divider,
  IconButton,
} from "@mui/material";
import styled from "styled-components";
import Axios from "axios";

const style = {
  position: "relative",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "1200px",
  height: "600px",
  bgcolor: "#fff",
  boxShadow: 24,
  borderRadius: "10px",
  display: "flex",
  justifyContent: "space-between",
};

const TextAreaStyled = styled.textarea`
  width: 100%;
  height: 315px;
  border-color: rgba(0, 0, 0, 0.12);
  padding: 20px 10px;
  resize: none;
  &:focus {
    outline: none;
  }
`;

function StudyInfoModal({ info, open, setOpen }) {
  const handleClose = () => setOpen(false);

  const [joinBtn, setJoinBtn] = useState(false);

  const [joinReason, setJoinReason] = useState("");

  const onJoinBtnClick = () => {
    Axios.post("/api/study/join", {
      study: info,
      message: joinReason,
    }).then((res) => {
      if (res.data.success) {
        alert(res.data.message);
        window.location.replace("/");
      } else {
        alert(res.data.message);
      }
    });
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <img
          src={`http://localhost:8000/${info.studyBanner}`}
          alt="studybanner"
          style={{ width: "60%", borderRadius: "10px 0 0 10px" }}
        />

        <Stack
          p={4}
          spacing={3}
          direction={"column"}
          justifyContent={"center"}
          sx={{ width: "40%", position: "relative" }}
        >
          <Box>
            {joinBtn ? (
              <IconButton
                sx={{
                  position: "absolute",
                  top: "10px",
                  left: "10px",
                }}
                onClick={() => {
                  setJoinBtn(false);
                }}
              >
                <BsChevronLeft size={20} color={"#6f6f71"} />
              </IconButton>
            ) : (
              <></>
            )}

            <IconButton
              sx={{
                position: "absolute",
                top: "10px",
                right: "10px",
              }}
              onClick={() => setOpen(false)}
            >
              <BsXLg size={20} color={"#6f6f71"} />
            </IconButton>
          </Box>

          <Box>
            <Typography sx={{ color: "#222223", marginBottom: "3px" }}>
              {info.studyName}
            </Typography>
            <Stack
              direction={"row"}
              spacing={2}
              sx={{ color: "#6f6f71", fontSize: "12px" }}
            >
              <Typography fontSize={12}>
                인원 {info.studyGroupMember}
              </Typography>
              <Divider orientation="vertical" flexItem />
              <Typography fontSize={12}>
                리더 {info.studyAdminUser.name}
              </Typography>
            </Stack>
          </Box>

          <Divider />

          {joinBtn ? (
            <>
              <Box>
                <TextAreaStyled
                  placeholder="500자 이하로 가입하고 싶은 이유를 적어주세요"
                  value={joinReason}
                  onChange={(event) => {
                    setJoinReason(event.target.value);
                  }}
                  maxLength={500}
                />
              </Box>
              <Divider />
              <Box>
                <Button variant="contained" onClick={onJoinBtnClick}>
                  스터디 가입 신청하기
                </Button>
              </Box>
            </>
          ) : (
            <>
              <Box sx={{ height: "320px" }}>
                <Typography fontSize={15} color={"#6f6f71"}>
                  {info.studyGroupDetail}
                </Typography>
              </Box>

              <Divider />

              <Box>
                <Button
                  variant="contained"
                  onClick={() => {
                    setJoinBtn(true);
                  }}
                >
                  스터디 가입 신청서 작성하기
                </Button>
              </Box>
            </>
          )}
        </Stack>
      </Box>
    </Modal>
  );
}

export default StudyInfoModal;
