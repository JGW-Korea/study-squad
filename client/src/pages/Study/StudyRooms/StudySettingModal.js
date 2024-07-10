import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// mui 라이브러리 Component
import {
  Stack,
  Box,
  IconButton,
  Modal,
  Tooltip,
  Typography,
  Divider,
} from "@mui/material";

// react icons
import {
  BsCamera,
  BsPencil,
  BsFillPersonCheckFill,
  BsFillPersonXFill,
  BsFillPersonFill,
} from "react-icons/bs";
import Axios from "axios";
import styled from "styled-components";

// textarea Style
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
  cursor: ${(props) => (props.cursorText ? "text" : "default")};
`;

// 수정 취소 Btn Style
const BtnStyled = styled.button`
  border: none;
  cursor: pointer;
  font-size: 13px;
  padding: 5px 15px;
  border-radius: 2px;
  background-color: ${(props) => props.bgColor};
  color: ${(props) => props.color};
  box-shadow: rgba(0, 0, 0, 0.4) 0px 1px 2px;
`;

// Modal Style
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 844,
  maxHeight: "720px",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "5px",
  overflowY: "auto",

  "::-webkit-scrollbar": {
    width: "8px" /* 스크롤바의 너비 */,
    padding: "5px",
  },

  "::-webkit-scrollbar-thumb": {
    background: "#c3c3c3" /* 스크롤바의 색상 */,
    borderRadius: "10px",
  },

  "::-webkit-scrollbar-thumb:hover": {
    background: "#a2a2a2" /* 스크롤바의 색상 */,
  },

  "::-webkit-scrollbar-track": {
    background: "rgba(204, 204, 204, .3)" /*스크롤바 뒷 배경 색상*/,
  },
};

function StudySettingModal({ open, setOpen }) {
  const user_id = JSON.parse(localStorage.getItem("user_id"));

  const [studyInfo, setStudyInfo] = useState([]);
  const { id } = useParams();

  const [detailValue, setDetailValue] = useState("");

  const [changeStudyDetail, setChangeStudyDetail] = useState(false);

  const StudyInfo = async () => {
    await Axios.get(`/api/study/info/study/${id}`).then((res) => {
      if (res.data.success) {
        setDetailValue(res.data.info.studyGroupDetail);
        setStudyInfo(res.data.info);
      }
    });
  };

  // 스터디 배너 미리보기
  const handlerImagePrivew = async (event) => {
    const file = event.target.files[0];

    const formData = new FormData();

    formData.append("image", file);

    await Axios.put(`/api/study/info/update/${id}/banner`, formData, {
      headers: { "content-type": "multipart/form-data" },
    }).then((res) => {
      if (res.data.success) window.location.reload();
    });
  };

  // 스터디 설명 변경
  const handleDetailUpdateBtn = async () => {
    if (detailValue === studyInfo.studyGroupDetail) return null;

    await Axios.put("/api/study/info/update/detail", {
      studyId: studyInfo.studyGroupId,
      detail: detailValue,
    }).then((res) => {
      if (res.data.success) window.location.reload();
    });
  };

  // 스터디 멤버 삭제
  const handleRemoveMember = async (user, type) => {
    await Axios.delete("/api/study/info/update/member/delete", {
      data: {
        studyId: id,
        userId: user,
      },
    }).then((res) => {
      if (res.data.success && type === "admin") window.location.reload();
      else {
        alert("스터디를 탈퇴하셨습니다.");
        window.location.replace("/");
      }
    });
  };

  // 스터디 운영자 변경
  const handleChangeStudyAdmin = async (user) => {
    await Axios.put("/api/study/info/update/admin", {
      studyId: studyInfo.studyGroupId,
      userId: user,
    }).then((res) => {
      if (res.data.success) window.location.reload();
    });
  };

  // 해당 스터디 정보 가져오기
  useEffect(() => {
    StudyInfo();
  }, []);

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
            {studyInfo.studyName}
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
                src={`http://localhost:8000/${studyInfo.studyBanner}`}
                alt="StudyBanner"
                style={{ width: "100%", height: "100%", objectFit: "fill" }}
              />
            </div>

            {user_id.id === studyInfo.studyAdmin && (
              <>
                <input
                  type="file"
                  accept="image/*"
                  id="ChangeStudyBanner"
                  style={{ display: "none" }}
                  onChange={handlerImagePrivew}
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
              </>
            )}
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
          <Box sx={{ width: "calc(100% - 244px)", position: "relative" }}>
            {/* 스터디 정보 */}
            <TextAreaStyled
              readOnly={!changeStudyDetail}
              maxLength={500}
              value={detailValue}
              onChange={(event) => setDetailValue(event.target.value)}
              cursorText={changeStudyDetail}
            />

            {user_id.id === studyInfo.studyAdmin &&
              (changeStudyDetail ? (
                <Stack
                  direction={"row"}
                  spacing={1}
                  sx={{
                    position: "absolute",
                    bottom: 15,
                    right: 15,
                  }}
                >
                  <BtnStyled
                    bgColor={"rgb(27, 117, 210)"}
                    color={"#fff"}
                    onClick={handleDetailUpdateBtn}
                  >
                    수정
                  </BtnStyled>
                  <BtnStyled onClick={() => setChangeStudyDetail(false)}>
                    취소
                  </BtnStyled>
                </Stack>
              ) : (
                <Tooltip title={"글 수정하기"} arrow placement="left">
                  <Box
                    sx={{
                      width: "30px",
                      height: "30px",
                      boxShadow: "0 0 4px rgba(0, 0, 0, 0.3)",
                      borderRadius: "50%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      position: "absolute",
                      bottom: 15,
                      right: 15,
                      cursor: "pointer",
                      color: "rgba(0, 0, 0, 0.7)",

                      "&:hover": {
                        backgroundColor: "rgba(27,117,210, 0.8)",
                        color: "#fff",
                      },

                      transition: "all ease 0.5s",
                    }}
                    onClick={() => setChangeStudyDetail(true)}
                  >
                    <BsPencil size={18} />
                  </Box>
                </Tooltip>
              ))}
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

          {/* Study Members Info */}
          <Stack spacing={3} sx={{ width: "calc(100% - 244px)" }}>
            {studyInfo.studyMembers &&
              studyInfo.studyMembers.map((member) => {
                const date = new Date(member.createdAt);
                const formattedDate = new Intl.DateTimeFormat("ko-KR")
                  .format(date)
                  .replace(/\. /g, "-")
                  .replace(/\.$/, "");

                return (
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                      bgcolor: "#f5f5f7",
                      borderRadius: "5px",
                      p: 2,
                    }}
                  >
                    <Stack
                      direction={"row"}
                      spacing={2}
                      sx={{ height: "80px" }}
                    >
                      <Box
                        sx={{
                          width: "80px",
                          height: "80px",
                          overflow: "hidden",
                          borderRadius: "5px",
                          border: "1px solid #e3e3e3",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          backgroundColor: "#ebebeb",
                        }}
                      >
                        {member.user.profileImage ? (
                          <img
                            src={`http://localhost:8000/${studyInfo.studyBanner}`}
                            alt="StudyBanner"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "fill",
                            }}
                          />
                        ) : (
                          <BsFillPersonFill size={48} color="#fff" />
                        )}
                      </Box>
                      <Box
                        sx={{
                          color: "#333",
                          fontWeight: "400",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "end",
                        }}
                      >
                        <Typography fontSize={13}>
                          {member.user.name} (
                          {member.user.id === studyInfo.studyAdmin
                            ? "운영자"
                            : "일반회원"}
                          )
                        </Typography>
                        <Typography fontSize={13}>
                          가입 날짜 : {formattedDate}
                        </Typography>
                      </Box>
                    </Stack>

                    {user_id.id === studyInfo.studyAdmin
                      ? member.user.id !== studyInfo.studyAdmin && (
                          // 운영자 변경 및 멤버 삭제 기능 코드
                          <Stack
                            direction={"row"}
                            spacing={3}
                            sx={{
                              width: "120px",
                              height: "80px",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Tooltip
                              title={"운영자 변경"}
                              placement="bottom"
                              arrow
                            >
                              <IconButton
                                sx={{ boxShadow: "0 0 4px rgba(0, 0, 0, 0.3)" }}
                                onClick={() =>
                                  handleChangeStudyAdmin(member.userId)
                                }
                              >
                                <BsFillPersonCheckFill />
                              </IconButton>
                            </Tooltip>

                            <Tooltip
                              title={"멤버 삭제"}
                              placement="bottom"
                              arrow
                            >
                              <IconButton
                                sx={{ boxShadow: "0 0 4px rgba(0, 0, 0, 0.3)" }}
                                onClick={() =>
                                  handleRemoveMember(member.userId, "admin")
                                }
                              >
                                <BsFillPersonXFill />
                              </IconButton>
                            </Tooltip>
                          </Stack>
                        )
                      : user_id.id === member.user.id && (
                          // 스터디 탈퇴 기능 코드
                          <Stack
                            direction={"row"}
                            sx={{
                              height: "80px",
                              alignItems: "center",
                              justifyContent: "end",
                            }}
                          >
                            <Tooltip
                              title={"스터디 탈퇴"}
                              placement="bottom"
                              arrow
                            >
                              <IconButton
                                sx={{ boxShadow: "0 0 4px rgba(0, 0, 0, 0.3)" }}
                                onClick={() =>
                                  handleRemoveMember(member.userId, "member")
                                }
                              >
                                <BsFillPersonXFill />
                              </IconButton>
                            </Tooltip>
                          </Stack>
                        )}
                  </Box>
                );
              })}
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
}

export default StudySettingModal;
