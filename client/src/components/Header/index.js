import React, { useState } from "react";
import Axios from "axios";

import { Box, Stack, Typography, Menu, MenuItem } from "@mui/material";
import {
  BsFillPersonFill,
  BsFillCaretDownFill,
  BsFillCaretUpFill,
} from "react-icons/bs";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Header({ user }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [dropDown, setDropDown] = useState(false);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setDropDown(true);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setDropDown(false);
    setAnchorEl(null);
  };

  const onLogoutSubmitHandler = (event) => {
    event.preventDefault();

    Axios.post("/api/user/logout").then((res) => {
      if (res.data.logoutSuccess) {
        localStorage.removeItem("user_id");
        window.location.replace("/");
      }
    });
  };

  return (
    <Stack
      justifyContent={"center"}
      alignItems={"center"}
      sx={{
        width: "100%",
        height: "50px",
        backgroundColor: "#fff",
        position: "fixed",
        top: 0,
        boxShadow: "0 2px 2px rgba(0, 0, 0, 0.2)",
        zIndex: 1,
      }}
    >
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        sx={{ width: "1080px", height: "100%" }}
      >
        <Stack
          justifyContent={"center"}
          sx={{
            width: "100px",
            height: "100%",
          }}
        >
          <Box
            onClick={() => window.location.replace("/")}
            sx={{
              width: "80px",
              height: "30px",
              border: "2px solid #1b75d2",
              borderRadius: "15px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <Typography
              color={"#1b75d2"}
              fontSize={14}
              sx={{ letterSpacing: "2px", fontWeight: "bold" }}
            >
              STUDY
            </Typography>
          </Box>
        </Stack>
        <Stack
          alignItems={"end"}
          justifyContent={"center"}
          sx={{ width: "100px", height: "100%" }}
        >
          <Box
            aria-controls={open ? "long-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            sx={{
              width: "50px",
              height: "30px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
              cursor: "pointer",
            }}
            onClick={handleClick}
          >
            <Box
              sx={{
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                border: "1px solid #e3e3e3",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#ebebeb",
                overflow: "hidden",
              }}
            >
              {user.profileImage ? (
                <img
                  src={`http://localhost:8000/${user.profileImage}`}
                  alt="user profile"
                  style={{ width: "100%", height: "100%" }}
                />
              ) : (
                <BsFillPersonFill size={20} color="#fff" />
              )}
            </Box>
            <Box sx={{ color: "#bec0c7", fontSize: "10px" }}>
              {dropDown ? <BsFillCaretUpFill /> : <BsFillCaretDownFill />}
            </Box>
          </Box>

          <Menu
            id="long-menu"
            MenuListProps={{ "aria-labelledby": "long-button" }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{ style: { width: "160px" } }}
          >
            <Link
              to={`/user/mypage/${user.name}`}
              state={{ data: user }}
              style={{ textDecorationLine: "none", color: "#252525" }}
            >
              <MenuItem>내 정보</MenuItem>
            </Link>
            <MenuItem onClick={onLogoutSubmitHandler}>로그아웃</MenuItem>
          </Menu>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default Header;
