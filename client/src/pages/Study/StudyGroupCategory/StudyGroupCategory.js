import React from "react";
import { Link } from "react-router-dom";

import { Stack, Box, Typography } from "@mui/material";

import { STUDY_CATEGORY } from "../../../constants/StudyCategoryType/STUDY_CATEGORY";

function StudyGroupCategory() {
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
      <Box sx={{ width: "100%" }}>
        <Stack
          sx={{
            width: "570px",
            margin: "0 auto",
            marginTop: "50px",
            textAlign: "center",
          }}
        >
          <Typography
            sx={{ fontSize: "20px", color: "#444", fontWeight: "600" }}
          >
            만들고 싶은 스터디를 선택해주세요
          </Typography>

          <Stack sx={{ flexFlow: "wrap" }}>
            {STUDY_CATEGORY.map((type) => (
              <Link
                to={`/study-create/${type.url}`}
                style={{
                  color: "#222",
                  textDecoration: "none",
                }}
              >
                <Box
                  sx={{
                    width: "150px",
                    minHeight: "180px",
                    boxShadow:
                      "0 1px 2px 0 rgba(0,0,0,.08), 0 0 1px 0 rgba(0,0,0,.2)",
                    backgroundColor: "#fff",
                    margin: "60px 40px 0 0",
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {type.icon}
                  <Typography
                    fontSize={14}
                    fontWeight={500}
                    sx={{ marginTop: "5px" }}
                  >
                    {type.title}
                  </Typography>
                </Box>
              </Link>
            ))}
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
}

export default StudyGroupCategory;
