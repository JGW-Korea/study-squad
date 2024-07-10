import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

import {
  Stack,
  Box,
  IconButton,
  Modal,
  Tooltip,
  Popper,
  Typography,
  Divider,
  Collapse,
  List,
} from "@mui/material";
import Conversation from "../../../components/Conversation";
import Editor from "../../../components/Editor";

import { io } from "socket.io-client";
import BottomNavigationMenu from "../../../components/BottomNavigationMenu";
import VideoCall from "../../../components/VideoCall";


import {
  BsSearch,
  BsSend,
  BsGearFill,
  BsCamera,
  BsChevronUp,
  BsChevronDown,
} from "react-icons/bs";
import Axios from "axios";
import styled from "styled-components";
import StudySettingModal from "./StudySettingModal";

// Video Chat 버튼 활성화 시킬 시
const renderVideoChat = (open, setOpen) => {
  if (!open) return null;
  return (
    <Box
      sx={{
        flex: 1,
        height: "100%",
        boxShadow: "0 0 8px rgba(0, 0, 0, 0.2)",
        borderRadius: "10px",
        overflow: "hidden",
        visibility: open ? "visible" : "hidden", // visibility를 변경합니다.
      }}
    >
      <VideoCall open={open} setOpen={setOpen} />
    </Box>
  );
};

// Chat 버튼 활성화 시킬 시
const renderChatBox = (open, socket) => {
  if (!open) return null;
  return (
    <Box
      sx={{
        width: "380px",
        height: "100%",
        boxShadow: "0 0 8px rgba(0, 0, 0, 0.2)",
        borderRadius: "10px",
        overflow: "hidden",
      }}
    >
      <Conversation socket={socket} />
    </Box>
  );
};

// Document 버튼 활성화 시킬 시 (기본 true)
const renderDocBox = (open, socket) => {
  if (!open) return null;
  return (
    <Box
      sx={{
        flex: 1,
        height: "100%",
        boxShadow: "0 0 8px rgba(0, 0, 0, 0.2)",
        borderRadius: "10px",
        overflow: "hidden",
      }}
    >
      <Editor socket={socket} />
    </Box>
  );
};

// Modal Style
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 844,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "10px",
};

const TextAreaStyled = styled.textarea`
  width: 100%;
  height: 140px;
  outline: none;
  border: none;
  background-color: #f5f5f7;
  resize: none;
  box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.2);
  padding: 20px;
  border-radius: 5px;
  font-size: 13px;
  color: #333;
  cursor: default;
`;

// Setting 버튼 활성화 시킬 시
const settingModal = (
  open,
  setOpen,
  study,
  changeNameMenuOpen,
  setChangeNameMenuOpen
) => {
  if (!open) return null;

  console.log(study);

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {/* Header */}
        <Box
          sx={{
            height: "60px",
            padding: "0 30px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: 16,
              fontWeight: 500,
              lineHeight: "50px",
              color: "#0162C4",
            }}
          >
            {study.studyName}
          </Typography>
        </Box>

        <Divider />

        {/* Study Banner Image */}
        <Stack
          direction={"row"}
          alignItems={"start"}
          spacing={2}
          sx={{ padding: "16px 30px" }}
        >
          <Box sx={{ width: "228px", color: "#222" }}>
            <Typography fontSize={13} fontWeight={600}>
              스터디 배너
            </Typography>
          </Box>

          <Box
            sx={{
              width: "calc(100% - 244px)",
              height: "300px",
              position: "relative",
              backgroundColor: "#ebebeb",
              borderRadius: "10px",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "5px",
                overflow: "hidden",
              }}
            >
              <img
                src={`http://localhost:8000/${study.studyBanner}`}
                alt="StudyBanner"
                style={{ width: "100%", height: "100%", objectFit: "fill" }}
              />
            </div>

            <input
              type="file"
              accept="image/*"
              id="ChangeStudyBanner"
              style={{ display: "none" }}
              // onChange={UpdateUserProfileImage}
            />
            <label htmlFor="ChangeStudyBanner">
              <Tooltip title="배너 수정하기" placement="left">
                <Box
                  sx={{
                    width: "30px",
                    height: "30px",
                    backgroundColor: "rgba(0, 0, 0, 0.8)",
                    borderRadius: "50%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "absolute",
                    bottom: 10,
                    right: 10,
                    cursor: "pointer",
                    color: "rgba(245,245,247, 0.6)",

                    "&:hover": {
                      backgroundColor: "rgba(27,117,210, 0.8)",
                      color: "#fff",
                    },

                    transition: "all ease 0.5s",
                  }}
                >
                  <BsCamera size={18} />
                </Box>
              </Tooltip>
            </label>
          </Box>
        </Stack>

        <Divider />

        {/* Study Information */}
        <Stack
          direction={"row"}
          alignItems={"start"}
          spacing={2}
          sx={{ padding: "16px 30px" }}
        >
          <Box sx={{ width: "228px", color: "#222" }}>
            <Typography fontSize={13} fontWeight={600}>
              스터디 설명
            </Typography>
          </Box>
          <Box sx={{ width: "calc(100% - 244px)" }}>
            {/* 스터디 정보 */}

            <TextAreaStyled readOnly={true} maxLength={500}>
              {study.studyGroupDetail}
            </TextAreaStyled>
          </Box>
        </Stack>

        <Divider />

        {/* Study Members */}
        <Stack
          direction={"row"}
          alignItems={"start"}
          spacing={2}
          sx={{ padding: "16px 30px" }}
        >
          <Box sx={{ width: "228px", color: "#222" }}>
            <Typography fontSize={13} fontWeight={600}>
              스터디 멤버
            </Typography>
          </Box>
          <Box sx={{ width: "calc(100% - 244px)" }}>
            {/* 닉네임 정보
            <Stack>
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
                >
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
            </Stack> */}
          </Box>
        </Stack>
      </Box>
    </Modal>
  );
};

function StudyRooms() {
  const [socket, setSocket] = useState();
  const ENDPOINT = "http://localhost:8000";

  const [docOpen, setDocOpen] = useState(true);
  const [chatOpen, setChatOpen] = useState(false);
  const [videoCallOpen, setVideoCallOpen] = useState(false);
  const [settingOpen, setSettingOpen] = useState(false);

  // socket 연결
  useEffect(() => {
    const s = io(ENDPOINT);
    setSocket(s);

    return () => {
      s.disconnect();
      s.off();
    };
  }, []);

  return (
    <Stack
      sx={{
        position: "relative",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        p={5}
        sx={{ width: "100%", height: "85%", mt: "30px" }}
        spacing={3}
      >
        {renderChatBox(chatOpen, socket)}

        {renderVideoChat(videoCallOpen, setVideoCallOpen)}

        {renderDocBox(docOpen, socket)}
      </Stack>

      <Stack
        alignItems={"center"}
        justifyContent={"center"}
        sx={{ width: "100%", height: "120px", position: "relative" }}
      >
        {/* 하단 토글 버튼 */}
        <BottomNavigationMenu
          docOpen={docOpen}
          setDocOpen={setDocOpen}
          chatOpen={chatOpen}
          setChatOpen={setChatOpen}
          videoCallOpen={videoCallOpen}
          setVideoCallOpen={setVideoCallOpen}
          socket={socket}
        />

        <Box
          sx={{
            position: "absolute",
            right: "2%",
          }}
        >
          <IconButton
            sx={{
              width: "40px",
              height: "40px",
              boxShadow:
                "0 0 0 1px rgba(0,0,0,.08), 0 4px 12px 1px rgba(0,0,0,.2)",
            }}
            onClick={() => setSettingOpen(!settingOpen)}
          >
            <BsGearFill size={18} />
          </IconButton>
        </Box>
      </Stack>

      {settingOpen && (
        <StudySettingModal open={settingOpen} setOpen={setSettingOpen} />
      )}

      {/* settingModal(
        settingOpen,
        setSettingOpen,
        studyInfo,
        changeNameMenuOpen,
        setChangeNameMenuOpen
      ) */}
    </Stack>
  );
}

export default StudyRooms;
