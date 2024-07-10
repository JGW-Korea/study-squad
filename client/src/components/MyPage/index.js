import React from "react";

import { Box, Typography, Divider } from "@mui/material";

import UserProfileImage from "./UserProfileImage";
import UserPrivacy from "./UserPrivacy";
import UserLoginAccount from "./UserLoginAccount";

function MyInfo() {
  const user_id = JSON.parse(localStorage.getItem("user_id"));

  return (
    <Box
      sx={{
        width: "calc(100% - 236px)",
        height: "fit-content",
        backgroundColor: "#fff",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.2)",
      }}
    >
      {/* Header */}
      <Box sx={{ height: "60px", padding: "0 30px" }}>
        <Typography sx={{ fontSize: 16, fontWeight: 500, lineHeight: "50px" }}>
          내 정보
        </Typography>
      </Box>

      <Divider />

      {/* User Profile Image */}
      <UserProfileImage user={user_id} />

      <Divider />

      {/* User Privacy */}
      <UserPrivacy user={user_id} />

      <Divider />

      {/* User Login Account */}
      <UserLoginAccount user={user_id} />
    </Box>
  );
}

export default MyInfo;
