import { IconButton } from "@mui/material";
import React from "react";
import styled from "styled-components";

import {
  BsHouseFill,
  BsPencilSquare,
  BsCameraVideoFill,
  BsChatLeftTextFill,
} from "react-icons/bs";

const BottomMenu = styled.div`
  width: 500px;
  height: 60px;
  border-radius: 50px;
  background-color: #f0f0f0;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  overflow: hidden;
  background-color: #fff;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
`;

const MenuItem = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  transform: translate(${(props) => props.x}, ${(props) => props.y});
  cursor: pointer;
  overflow: hidden;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.3);
`;

function BottomNavigationMenu({
  docOpen,
  setDocOpen,
  chatOpen,
  setChatOpen,
  videoCallOpen,
  setVideoCallOpen,
  socket,
}) {
  return (
    <BottomMenu>
      {/* 뒤로가기 버튼 */}
      <MenuItem>
        <IconButton
          sx={{ width: "100%", height: "100%" }}
          onClick={() => window.location.replace("/")}
        >
          <BsHouseFill size={18} />
        </IconButton>
      </MenuItem>

      {/* 채팅 버튼 */}
      <MenuItem>
        <IconButton
          onClick={() => {
            setChatOpen(!chatOpen);
            socket.emit("leave");
          }}
          sx={[
            chatOpen
              ? {
                  backgroundColor: "#5619b8",
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: "#641dd6",
                  },
                }
              : { backgroundColor: "transparent" },
            { width: "100%", height: "100%" },
          ]}
        >
          <BsChatLeftTextFill size={18} />
        </IconButton>
      </MenuItem>

      {/* 화상채팅 버튼 */}
      <MenuItem>
        <IconButton
          onClick={() => setVideoCallOpen(true)}
          sx={[
            videoCallOpen
              ? {
                  backgroundColor: "#0056b8",
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: "#0066da",
                  },
                }
              : { backgroundColor: "transparent" },
            { width: "100%", height: "100%" },
          ]}
        >
          <BsCameraVideoFill size={18} />
        </IconButton>
      </MenuItem>

      {/* 문서 편집 버튼 */}
      <MenuItem>
        <IconButton
          onClick={() => setDocOpen(!docOpen)}
          sx={[
            docOpen
              ? {
                  backgroundColor: "#ffb009",
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: "#ffc03c",
                  },
                }
              : { backgroundColor: "transparent" },
            { width: "100%", height: "100%" },
          ]}
        >
          <BsPencilSquare size={18} />
        </IconButton>
      </MenuItem>
    </BottomMenu>
  );
}

export default BottomNavigationMenu;
