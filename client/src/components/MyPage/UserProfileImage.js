import React from "react";

import { Stack, Box, Typography, Tooltip } from "@mui/material";

import { BsFillPersonFill, BsCamera } from "react-icons/bs";

import { profileImageUpload } from "../../_actions/user/user_actions";

import { useDispatch } from "react-redux";

function UserProfileImage({ user }) {
  const dispath = useDispatch();

  const UpdateUserProfileImage = async (event) => {
    let body = {
      userProfileImageInfo: event.target.files[0],
    };

    dispath(profileImageUpload(body)).then((res) => {
      if (res.payload.imageUpdateSuccess) {
        let userInfo = JSON.parse(localStorage.getItem("user_id"));

        userInfo.profileImage = res.payload.url;

        localStorage.setItem("user_id", JSON.stringify(userInfo));

        window.location.reload();
      }
    });
  };

  return (
    <Stack
      direction={"row"}
      alignItems={"start"}
      spacing={2}
      sx={{ padding: "16px 30px" }}
    >
      <Box sx={{ width: "228px", color: "#222" }}>
        <Typography fontSize={13} fontWeight={600}>
          프로필 사진
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
          {user.profileImage ? (
            <img
              src={`http://localhost:8000/${user.profileImage}`}
              alt="userProfileImage"
              style={{ width: "100%", height: "100%", objectFit: "fill" }}
            />
          ) : (
            <BsFillPersonFill size={80} color="#fff" />
          )}
        </div>

        <input
          type="file"
          accept="image/*"
          id="ChangeUserProfile"
          style={{ display: "none" }}
          onChange={UpdateUserProfileImage}
        />
        <label htmlFor="ChangeUserProfile">
          <Tooltip title="프로필 수정하기" placement="left">
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
  );
}

export default UserProfileImage;
