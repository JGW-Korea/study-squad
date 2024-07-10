import {
  Divider,
  Stack,
  Typography,
  Box,
  Link,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import React, { useState } from "react";

import { BsImage, BsDownload, BsThreeDotsVertical } from "react-icons/bs";
import { Message_options } from "../../data";

function TextMsg({ el }) {
  return (
    <Stack direction={"row"} justifyContent={el.incoming ? "start" : "end"}>
      <Box
        p={1.5}
        sx={{
          backgroundColor: el.incoming ? "#fff" : "#0162C4",
          borderRadius: 2,
          width: "max-content",
        }}
      >
        <Typography variant="body2" color={el.incoming ? "#424242" : "#fff"}>
          {el.message}
        </Typography>
      </Box>
      <MessageOptions />
    </Stack>
  );
}

function MessageOptions() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <BsThreeDotsVertical
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        size={14}
        style={{ cursor: "pointer" }}
      />
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <Stack spacing={1} px={1}>
          {Message_options.map((el) => (
            <MenuItem onClick={handleClick}>{el.title}</MenuItem>
          ))}
        </Stack>
      </Menu>
    </>
  );
}

function MediaMsg({ el }) {
  return (
    <Stack direction={"row"} justifyContent={el.incoming ? "start" : "end"}>
      <Box
        p={1.5}
        sx={{
          backgroundColor: el.incoming ? "#fff" : "#0162C4",
          borderRadius: 2,
          width: "max-content",
        }}
      >
        <Stack spacing={1}>
          <img
            src={el.img}
            alt={el.message}
            style={{ maxHeight: 210, borderRadius: "10px" }}
          />
          <Typography variant="body2" color={el.incoming ? "#424242" : "#fff"}>
            {el.message}
          </Typography>
        </Stack>
      </Box>
      <MessageOptions />
    </Stack>
  );
}

function DocMsg({ el }) {
  return (
    <Stack direction={"row"} justifyContent={el.incoming ? "start" : "end"}>
      <Box
        p={1.5}
        sx={{
          backgroundColor: el.incoming ? "#fff" : "#0162C4",
          borderRadius: 2,
          width: "max-content",
        }}
      >
        <Stack spacing={2}>
          <Stack
            p={2}
            direction={"row"}
            spacing={3}
            alignItems={"center"}
            sx={{ backgroundColor: "#fff", borderRadius: 1 }}
          >
            <BsImage
              size={38}
              style={{ color: el.incoming ? "#424242" : "#fff" }}
            />
            <Typography variant="caption">Abstract.png</Typography>
            <IconButton>
              <BsDownload />
            </IconButton>
          </Stack>
          <Typography variant="body2" color={el.incoming ? "#424242" : "#fff"}>
            {el.message}
          </Typography>
        </Stack>
      </Box>
      <MessageOptions />
    </Stack>
  );
}

function LinkMsg({ el }) {
  return (
    <Stack direction={"row"} justifyContent={el.incoming ? "start" : "end"}>
      <Box
        p={1.5}
        sx={{
          backgroundColor: el.incoming ? "#fff" : "#0162C4",
          borderRadius: 2,
          width: "max-content",
        }}
      >
        <Stack spacing={2}>
          <Stack
            p={2}
            spacing={3}
            alignItems={"start"}
            sx={{ backgroundColor: "#fff", borderRadius: 1 }}
          >
            <img
              src={el.preview}
              alt={el.message}
              style={{ maxHeight: 210, borderRadius: "10px" }}
            />
            <Stack spacing={2}>
              <Typography variant="subtitle2">Creating Chat App</Typography>
              <Typography
                variant="subtitle2"
                sx={{ color: "#0162C4" }}
                component={Link}
                to="//https://www.youtube.com"
              >
                www.youtube.com
              </Typography>
            </Stack>
            <Typography
              variant="body2"
              color={el.incoming ? "#424242" : "#fff"}
            >
              {el.message}
            </Typography>
          </Stack>
        </Stack>
      </Box>
      <MessageOptions />
    </Stack>
  );
}

function ReplyMsg({ el }) {
  return (
    <Stack direction={"row"} justifyContent={el.incoming ? "start" : "end"}>
      <Box
        p={1.5}
        sx={{
          backgroundColor: el.incoming ? "#fff" : "#0162C4",
          borderRadius: 2,
          width: "max-content",
        }}
      >
        <Stack spacing={2}>
          <Stack
            p={2}
            direction={"column"}
            spacing={3}
            alignItems={"center"}
            sx={{ backgroundColor: "#fff", borderRadius: 1 }}
          >
            <Typography variant="body2" color="#424242">
              {el.message}
            </Typography>
          </Stack>
          <Typography variant="body2" color={el.incoming ? "#424242" : "#fff"}>
            {el.reply}
          </Typography>
        </Stack>
      </Box>
      <MessageOptions />
    </Stack>
  );
}

function TimeLine({ el }) {
  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent={"space-between"}
    >
      <Divider width="42%" />
      <Typography variant="caption" sx={{ color: "#424242" }}>
        {el.text}
      </Typography>
      <Divider width="42%" />
    </Stack>
  );
}

export { TimeLine, TextMsg, LinkMsg, MediaMsg, DocMsg, ReplyMsg };
