import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
  Stack,
  Box,
  Typography,
  Divider,
  FormControl,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";

import { BsImage } from "react-icons/bs";

import { BsFillCameraFill } from "react-icons/bs";

import { useDispatch } from "react-redux";

import styled from "styled-components";

import {
  studyGroupBannerUpload,
  studyGroupCreate,
} from "../../../_actions/study/study_actions";

const StyledInput = styled.input`
  border: none;
  border-bottom: 1px solid #ccc;
  font-size: 18px;
  font-weight: 400;
  color: #333;
  line-height: 38px;
  outline: none;
  background-color: transparent;
  transition: all 0.4s ease;

  &:focus {
    border-bottom: 1px solid #666;
  }

  &::placeholder {
    color: #b8b8b8;
  }
`;

const TextAreaStyled = styled.textarea`
  width: 100%;
  height: 100%;
  border-color: rgba(0, 0, 0, 0.12);
  padding: 20px 10px;
  resize: none;
  transition: all 0.4s ease;
  color: #333;
  font-weight: 400;

  &:focus {
    outline: none;
    border: 1px solid #666;
  }

  &::placeholder {
    color: #b8b8b8;
  }
`;

const StyledBudtton = styled.button`
  display: ${(props) => props.display};
  padding: ${(props) => (props.padding ? props.padding : "10px 50px")};
  background-color: ${(props) => props.bgColor};
  color: ${(props) => props.fontColor};
  align-items: ${(props) => props.alignItems};
  border: none;
  cursor: pointer;
  font-size: 13px;
  border-radius: ${(props) =>
    props.borderRadius ? props.borderRadius : "2px"};
  box-shadow: rgba(0, 0, 0, 0.4) 0px 1px 2px;
  transition: ${(props) => props.transition};
  pointer-events: ${(props) => props.pointEvent};

  &:hover {
    ${(props) => props.hover}
  }
`;

function StudyCreate() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();

  const [studyTitle, setStudyTitle] = useState("");
  const [studyTitleMessage, setStudyTitleMessage] = useState("");
  const [isStudyTitle, setIsStudyTitle] = useState(false);

  const [studyDetail, setStudyDetail] = useState("");
  const [studyDetailMessage, setStudyDetailMessage] = useState("");
  const [isStudyDetail, setIsStudyDetail] = useState(false);

  const [limitedMember, setLimitedMember] = useState("");
  const [limitedMessage, setLimitedMessage] = useState("");
  const [isLimitedMember, setIsLimitedMember] = useState(false);

  const [imagePrivewSrc, setImagePrivewSrc] = useState("");
  const [imageInfoFile, setImageInfoFile] = useState("");
  const [imageMessage, setImageMessage] = useState("");
  const [isImage, setisImage] = useState(false);

  // 스터디 배너 미리보기 function
  const handlerImagePrivew = (event) => {
    const file = event.target.files[0];

    setImageInfoFile(event.target.files[0]);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImagePrivewSrc(reader.result);
    };

    setImageMessage("");
    setisImage(true);
  };

  const onStudyCreatedSubmitHandler = (event) => {
    event.preventDefault();

    if (!isLimitedMember) {
      setLimitedMessage("스터디 인원을 선택해주세요");
    }

    if (!isImage) {
      console.log("asd");
      setImageMessage("스터디 배너를 선택해주세요");
    }

    if (!studyTitle.length) {
      setStudyTitleMessage("스터디 이름을 입력해주세요");
    }

    if (!studyDetail.length) {
      setStudyDetailMessage("스터디 설명을 작성해주세요");
    }

    if (isStudyTitle && isStudyDetail && isLimitedMember && isImage) {
      let body = {
        bannerImageFile: imageInfoFile,
      };

      dispatch(studyGroupBannerUpload(body)).then((res) => {
        if (res.payload.BannerUpdateSuccess) {
          let body = {
            bannerPath: res.payload.url,
            title: studyTitle,
            detail: studyDetail.replaceAll("<br>", "\r\n"),
            category: params.category,
            limitedMember: limitedMember,
          };

          dispatch(studyGroupCreate(body)).then((res) => {
            if (res.payload.studyGroupCreate) {
              alert("스터디를 생성하셨습니다!! ");
              navigate("/");
            } else {
              alert(res.payload.message);
            }
          });
        }
      });
    }
  };

  const onStudyTitleCheck = () => {
    if (studyTitle.length < 5 || studyTitle.length > 15) {
      setStudyTitleMessage(
        "스터디 이름은 5글자 이상 15글자 이하로 입력해주세요"
      );
      setIsStudyTitle(false);
    } else {
      setStudyTitleMessage("");
      setIsStudyTitle(true);
    }
  };

  const onStudyDetailCheck = () => {
    if (studyDetail.length < 10 || studyDetail.length > 500) {
      setStudyDetailMessage(
        "스터디 이름은 10글자 이상 500글자 이하로 입력해주세요"
      );
      setIsStudyDetail(false);
    } else {
      setStudyDetailMessage("");
      setIsStudyDetail(true);
    }
  };

  return (
    <Stack
      alignItems={"center"}
      sx={{
        width: "100%",
        height: "100vh",
        paddingTop: "50px",
        backgroundColor: "#f5f5f7",
      }}
    >
      {/* Container */}
      <Stack
        direction={"row"}
        spacing={3}
        sx={{
          width: "1080px",
          marginTop: "16px",
          backgroundColor: "#fff",
          borderRadius: "10px",
          boxShadow: "0 0 2px rgba(0, 0, 0, 0.2)",
        }}
      >
        {/* 스터디 배너 */}
        <Stack spacing={2} p={3.5} sx={{ width: "600px", height: "600px" }}>
          <Box
            sx={{
              width: "100%",
              flex: 1,
              borderRadius: "10px",
              overflow: "hidden",
              position: "relative",
            }}
          >
            {imagePrivewSrc ? (
              <img
                src={imagePrivewSrc ? imagePrivewSrc : null}
                style={{
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                }}
                alt="스터디 배너 사진"
              />
            ) : (
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  backgroundColor: "#f5f5f7",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <BsImage
                  size={160}
                  style={{ marginBottom: "10px" }}
                  color="#ddd"
                />

                <Typography fontSize={13} color={"#a2a2a2"}>
                  배너를 선택해주세요
                </Typography>
              </Box>
            )}

            <input
              type="file"
              accept="image/*"
              id="ChangeStudyBanner"
              style={{ display: "none" }}
              onChange={handlerImagePrivew}
            />

            <StyledBudtton
              display={"flex"}
              padding={"5px 20px"}
              bgColor={"rgba(27, 117, 210, 0.4)"}
              fontColor={"#fff"}
              alignItems={"center"}
              borderRadius={"15px"}
              transition={"all 0.4s ease"}
              hover={"background-color: rgba(27, 117, 210, 1);"}
              style={{ position: "absolute", bottom: "30px", right: "30px" }}
              onClick={() =>
                document.getElementById("ChangeStudyBanner").click()
              }
            >
              <BsFillCameraFill
                size={18}
                style={{ marginBottom: "2px", marginRight: "10px" }}
              />
              <Typography>이미지 변경</Typography>
            </StyledBudtton>
          </Box>

          {imageMessage ? (
            <FormHelperText error>{imageMessage || " "}</FormHelperText>
          ) : (
            <Typography fontSize={12} fontWeight={400} color={"#666"}>
              스터디 이름과 사진은 개설 후에도 변경할 수 있어요
            </Typography>
          )}
        </Stack>

        <Stack p={3} spacing={2} sx={{ flex: 1 }}>
          {/* 스터디 이름 */}
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography fontSize={14} fontWeight={600} sx={{ mb: "10px" }}>
              스터디 이름
            </Typography>
            <StyledInput
              type="text"
              placeholder="스터디 이름 입력"
              minLength={5}
              maxLength={15}
              value={studyTitle}
              onChange={(event) => setStudyTitle(event.target.value)}
              onBlur={onStudyTitleCheck}
            />
            <FormHelperText error>{studyTitleMessage || " "}</FormHelperText>
          </Box>

          {/* 스터디 설명 */}
          <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
            <Typography fontSize={14} fontWeight={600} sx={{ mb: "10px" }}>
              스터디 설명
            </Typography>
            <TextAreaStyled
              placeholder="500자 이하로 스터디 세부 내용을 작성해주세요."
              value={studyDetail}
              onChange={(event) => setStudyDetail(event.target.value)}
              onBlur={onStudyDetailCheck}
              minLength={10}
              maxLength={500}
            />
            <FormHelperText error>{studyDetailMessage || " "}</FormHelperText>
          </Box>

          {/* 인원 제한 */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography fontSize={14} fontWeight={600}>
                스터디 인원 제한
              </Typography>

              <FormControl sx={{ m: 1, mr: 0, width: 100 }}>
                <Select
                  value={limitedMember}
                  onChange={(event) => {
                    setLimitedMember(event.target.value);
                    setIsLimitedMember(true);
                    setLimitedMessage("");
                  }}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  sx={{
                    maxHeight: "30px",
                    fontSize: "13px",
                    outline: "none",
                  }}
                >
                  <MenuItem
                    disabled
                    value=""
                    sx={{ backgroundColor: "transparent" }}
                  >
                    <Typography fontSize={13} color={"#b8b8b8"}>
                      선택 안됨
                    </Typography>
                  </MenuItem>
                  {[...Array(9)].map((_, index) => (
                    <MenuItem key={index} value={index + 2}>
                      <Typography fontSize={13}>{index + 2}</Typography>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <FormHelperText error>{limitedMessage || " "}</FormHelperText>
          </Box>

          <Divider />

          {/* 버튼 */}
          <Box
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "space-around",
            }}
          >
            <StyledBudtton onClick={() => navigate(-1)}>취소</StyledBudtton>
            <StyledBudtton
              bgColor={"#1b75d2"}
              fontColor={"#fff"}
              onClick={onStudyCreatedSubmitHandler}
            >
              확인
            </StyledBudtton>
          </Box>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default StudyCreate;
