import {
  Stack,
  Box,
  MenuList,
  Paper,
  MenuItem,
  Modal,
  ListItemText,
  Typography,
} from "@mui/material";

import React, { useState } from "react";
import { BsChevronRight } from "react-icons/bs";

import MyInfo from "../../../components/MyPage";
import { useDispatch } from "react-redux";

import { deleteUserAccount } from "../../../_actions/user/user_actions";
import { useNavigate } from "react-router-dom";
import StudyJoinStatus from "../../../components/StudyJoinStatues";
import MyStudyJoinStatus from "../../../components/MyStudyJoinStatus";

const menuItems = [
  { key: "info", label: "내 정보" },
  { key: "join", label: "스터디 가입 신청 현황" },
  { key: "MyStudy", label: "MY 스터디 가입 신청 인원" },
  { key: "test", label: "테스트" },
  { key: "deleteAccount", label: "회원 탈퇴" },
];

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "10px",
  p: 4,
};

function MyPage() {
  const [selectedMenu, setSelectedMenu] = useState("info");
  const [deleteAccountModal, setDeleteAccountModal] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onDeleteProfileSubmitHandler = () => {
    const user_id = JSON.parse(localStorage.getItem("user_id"));

    let body = {
      id: user_id.id,
      email: user_id.email,
      name: user_id.name,
    };

    dispatch(deleteUserAccount(body)).then((res) => {
      if (res.payload.deleteSuccess) {
        alert("그동안 이용해주셔서 감사합니다.");
        localStorage.removeItem("user_id");
        navigate("/");
      }
    });
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
      {/* 내 정보 메뉴 아이템 */}
      <Stack
        direction={"row"}
        spacing={2}
        sx={{ width: "1080px", height: "100%", padding: "16px 0" }}
      >
        <Paper
          sx={{
            width: "220px",
            height: "300px",
            borderRadius: "0",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.2)",
          }}
        >
          <MenuList sx={{ padding: "0", height: "100%" }}>
            {menuItems.map((item) => (
              <MenuItem
                key={item.key}
                onClick={() => {
                  if (item.key === "deleteAccount") {
                    setDeleteAccountModal(true);
                  } else {
                    setSelectedMenu(item.key);
                  }
                }}
                sx={{
                  height: `calc(100% / ${menuItems.length})`,
                  backgroundColor:
                    selectedMenu === item.key && item.key !== "deleteAccount"
                      ? "#f7f8f9"
                      : "",
                }}
              >
                <ListItemText primaryTypographyProps={{ fontSize: "13px" }}>
                  {item.label}
                </ListItemText>
                {selectedMenu === item.key && item.key !== "deleteAccount" ? (
                  <BsChevronRight size={12} />
                ) : null}
              </MenuItem>
            ))}
          </MenuList>
        </Paper>

        {/* 내 정보 페이지 */}
        {selectedMenu === "info" && <MyInfo />}

        {/* 스터디 가입 신청 현황 */}
        {selectedMenu === "join" && <StudyJoinStatus />}

        {/* My 스터디 가입 신청 인원 */}
        {selectedMenu === "MyStudy" && <MyStudyJoinStatus />}
      </Stack>

      {/* 회원 탈퇴 모달 창 */}
      <Modal
        open={deleteAccountModal}
        onClose={() => setDeleteAccountModal(false)}
      >
        <Box sx={style}>
          <Stack justifyContent={"center"} alignItems={"center"} spacing={2}>
            <Typography sx={{ fontSize: "18px", fontWeight: "600" }}>
              정말 탈퇴하시겠습니까?
            </Typography>
            <Typography sx={{ fontSize: "16px", textAlign: "center" }}>
              탈퇴 버튼 선택 시, <br /> 계정은 삭제되며 복구되지 않습니다.
            </Typography>

            <button
              onClick={onDeleteProfileSubmitHandler}
              style={{
                width: "100%",
                height: "40px",
                border: "none",
                backgroundColor: "#e8543b",
                borderRadius: "10px",
                color: "#fff",
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: "400",
              }}
            >
              탈퇴
            </button>
            <button
              onClick={() => setDeleteAccountModal(false)}
              style={{
                width: "100%",
                height: "40px",
                border: "none",
                backgroundColor: "transparent",
                color: "rgba(0, 0, 0, 0.8)",
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: "400",
              }}
            >
              취소
            </button>
          </Stack>
        </Box>
      </Modal>
    </Stack>
  );
}

export default MyPage;
