import { Stack, Box, Typography, Button } from "@mui/material";
import React, { useState } from "react";

import { BsChevronRight } from "react-icons/bs";
import { styled } from "@mui/material/styles";

import StudyInfoModal from "../../components/Study/UserNotJoinedStuyGroups/Modal";

const StyledButton = styled(Button)(() => ({
  backgroundColor: "#f5f5f7",
  justifyContent: "start",
  borderRadius: "20px",
  border: "1px solid rgba(0, 0, 0, 0.05)",
  textTransform: "none",

  "&.MuiButton-outlined": {
    borderColor: "transparent",
  },
}));
// onClick={() => {
//   handleOpen();
//   setSelectedStudy(study);
// }}

function StudyTable({ studys }) {
  const [open, setOpen] = useState(false);
  const [selectedStudy, setSelectedStudy] = useState([]);

  const handleOpen = () => setOpen(true);

  return (
    <Stack
      p={2}
      sx={{
        height: "fit-content",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "30px 10px",
        width: "100%",
      }}
    >
      {studys.map((study) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            height: "calc((575px - 132px) / 5)",
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
              <Typography sx={{ color: "#222223", fontSize: "13px" }}>
                {study.studyName}
              </Typography>
              <Typography sx={{ color: "#6f6f71", fontSize: "12px" }}>
                {study.studyGroupDetail.length > 30
                  ? study.studyGroupDetail.substr(0, 30 - 1) + "..."
                  : study.studyGroupDetail}
              </Typography>
              <Typography sx={{ color: "#6f6f71", fontSize: "12px" }}>
                멤버 : {study.studyGroupMember} / 인원 제한 :{" "}
                {study.studyGroupLimitedMember} / {study.studyGroupCategory}
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
  );
}

export default StudyTable;
