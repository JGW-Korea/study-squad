import React from "react";
import { Box, Typography } from "@mui/material";

function SloganImg() {
  return (
    <Box sx={{ width: "65%", height: "100%", position: "relative" }}>
      <img
        src="/img/sloganImg.png"
        alt="Slogan Img"
        style={{ width: "100%", height: "100%", objectFit: "none" }}
      />

      <Box
        sx={{
          position: "absolute",
          top: "65%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "100%",
          textAlign: "center",
        }}
      >
        <Typography fontSize={25} color={"#1b75d2"}>
          더 많은 학습을 위해 효율적인 스터디 공간을 찾아보세요.
        </Typography>
      </Box>
    </Box>
  );
}

export default SloganImg;
