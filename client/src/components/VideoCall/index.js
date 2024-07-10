import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { VIDEO_APP_ID, VIDEO_SERVER_SECRET } from '/client/.env';

import { Stack, Box, Typography } from "@mui/material";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import styled from "styled-components";

const StyledDiv = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  .dIzgYQV4CBbzZxzJbwbS {
    background-color: transparent;
    position: absolute;
    top: 0;
    z-index: 10;
  }

  //border-radius: 15px;
  .w3VJl6HJCSer0AjeKhvd {
    background: rgba(0, 0, 0, 0.2);
    height: 30px;
    padding: 0 10px;
    border-radius: 15px;
  }

  .w3VJl6HJCSer0AjeKhvd span {
    margin-top: 3px;
  }

  .BYpXSnOHfrC2td4QRijO {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .sCsSbKP9yxvw4LQAeaTz {
    background: transparent;
  }

  .QAHxuJxRZWb3P_cbR8QA {
    padding: 0;
    flex: none;
    height: 100%;
  }

  .lRNsiz_pTf7YmA5QMh4z {
    background-color: transparent;
    border-radius: 0;
  }

  .qiKszVnhEXQGhWJ0gGcL {
    background: transparent;
  }

  .pVo6XoSfywa4eLk9ef2S {
    background: transparent;
    object-fit: cover;
  }

  .ji5jASszKFf2CGCmbxEh {
    position: absolute;
    bottom: 10px;
    background: transparent;
  }

  .vjwEXnTmP6jAK8LlvWL_ {
    justify-content: unset;
  }

  .vjwEXnTmP6jAK8LlvWL_ > div {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-size: 30px 30px;
    background-color: rgba(0, 0, 0, 0.2);
    transition: all 0.5s ease;
    z-index: 10;
  }

  .vjwEXnTmP6jAK8LlvWL_ > div:hover {
    background-color: #0162c4;
  }

  .vjwEXnTmP6jAK8LlvWL_ .QeMJj1LEulq1ApqLHxuM {
    width: 60px;
    background-color: #e8543b;
  }
  .vjwEXnTmP6jAK8LlvWL_ .QeMJj1LEulq1ApqLHxuM:hover {
    background-color: #ff5d42;
  }

  .fQDXeFNZ1QEJGgfJP7J1 {
    align-items: center;
  }

  .fQDXeFNZ1QEJGgfJP7J1 .pVo6XoSfywa4eLk9ef2S {
    background: transparent;
    border-radius: 0;
  }

  .Xfk1RtGH65gHx0iQ5uPA {
    background-color: transparent;
  }

  .Xfk1RtGH65gHx0iQ5uPA .GBqD5akUB0siCNWbAPQr,
  .fQDXeFNZ1QEJGgfJP7J1 .Xfk1RtGH65gHx0iQ5uPA .GBqD5akUB0siCNWbAPQr {
    background-color: #f2f2f2;
  }

  .aANESlopF7uInJZu857q {
    height: 100%;
  }

  .Xfk1RtGH65gHx0iQ5uPA .GBqD5akUB0siCNWbAPQr,
  .aANESlopF7uInJZu857q .GBqD5akUB0siCNWbAPQr {
    border-radius: 0;
  }

  .yZuGKtil1LUofPm3MP8R {
    position: absolute;
    height: 80%;
    width: 124px;
    right: 10px;
    margin: 0;
    z-index: 1;
  }

  .yZuGKtil1LUofPm3MP8R > div {
    min-height: 30px;
    background-color: transparent;
    background: #bbb;
  }

  .Xfk1RtGH65gHx0iQ5uPA .GBqD5akUB0siCNWbAPQr > div {
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
    background-color: rgba(255, 255, 255, 0.8);
  }

  .Xfk1RtGH65gHx0iQ5uPA .R5UUhzsZdRHH4U5V6kon {
    height: 30px;
  }

  .yZuGKtil1LUofPm3MP8R .Xfk1RtGH65gHx0iQ5uPA {
    border-radius: 14px;
    overflow: hidden;
  }

  .Xfk1RtGH65gHx0iQ5uPA .z1WvYJgksHY23EwdFNB5 {
    border-radius: 0 0 10px 10px;
  }

  .yZuGKtil1LUofPm3MP8R .z1WvYJgksHY23EwdFNB5 {
    border-radius: 12px;
  }

  .yZuGKtil1LUofPm3MP8R .Xfk1RtGH65gHx0iQ5uPA .GBqD5akUB0siCNWbAPQr {
    background-color: #bbb;
  }

  .yZuGKtil1LUofPm3MP8R .Xfk1RtGH65gHx0iQ5uPA .GBqD5akUB0siCNWbAPQr > div {
    width: 60px;
    height: 60px;
    line-height: 0;
    text-align: unset;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 28px;
  }

  .yZuGKtil1LUofPm3MP8R ._lsMxWcmJ586WoIFahdx,
  .yZuGKtil1LUofPm3MP8R .pVo6XoSfywa4eLk9ef2S {
    background-color: #fff;
  }

  .wOY0avC1HM4C4NcDpBHF {
    z-index: 10;
  }

  .epwXRW .yZuGKtil1LUofPm3MP8R > div,
  .gfVAru .yZuGKtil1LUofPm3MP8R > div {
    background-color: #bbb;
  }

  .yZuGKtil1LUofPm3MP8R video {
    background: transparent;
  }

  .wmwiFRvt18zj3meD5NOf .ecHsgwLx2_C2nnLn_n_N {
    justify-content: space-evenly;
    margin-bottom: 10px;
  }

  .wmwiFRvt18zj3meD5NOf .MiLXxQuRUH4z5D2Ng3w2 {
    width: 50px;
    height: 50px;
    font-size: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 0;
    text-align: unset;
    background: #fff;
    border-color: rgba(0, 0, 0, 0.1);
  }
`;

function VideoCall({ open, setOpen }) {
  const { id } = useParams();
  const user_id = JSON.parse(localStorage.getItem("user_id"));

  const ref = useRef();

  const meeting = async (element) => {
    const appId = VIDEO_APP_ID;
    const serverSecret = VIDEO_SERVER_SECRET;
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appId,
      serverSecret,
      id,
      Date.now().toString(),
      user_id.name
    );

    const zp = ZegoUIKitPrebuilt.create(kitToken);

    zp.joinRoom({
      container: element,
      showPreJoinView: false,
      turnOnMicrophoneWhenJoining: true,
      turnOnCameraWhenJoining: true,
      showMyCameraToggleButton: true,
      showMyMicrophoneToggleButton: true,
      showAudioVideoSettingsButton: true,
      showScreenSharingButton: true,
      showTextChat: false,
      showUserList: false,
      showRoomDetailsButton: false,
      maxUsers: 50,
      layout: "Sidebar",
      showLayoutButton: false,
      lowerLeftNotification: {
        showUserJoinAndLeave: false,
      },
      scenario: {
        mode: "GroupCall",
        config: {
          role: "Host",
        },
      },
      showLeavingView: false,
      showRoomTimer: true,

      onLeaveRoom: () => setOpen(false),
    });
  };

  useEffect(() => {
    if (ref.current) {
      meeting(ref.current);
    }
  }, []);

  useEffect(() => {
    const element = document.querySelector(".QAHxuJxRZWb3P_cbR8QA");

    if (element) element.style.paddingTop = "0px";
  }, []);

  return (
    <Stack sx={{ height: "100%" }}>
      <Box
        p={2}
        sx={{ width: "100%", borderBottom: "1px solid rgba(0, 0, 0, 0.1)" }}
      >
        <Stack
          alignItems={"center"}
          direction={"row"}
          justifyContent={"space-between"}
          sx={{ width: "100%", height: "36px" }}
        >
          <Stack
            direction={"row"}
            justifyContent={"center"}
            alignItems={"center"}
            spacing={0.5}
            sx={{ color: "#0162C4" }}
          >
            <Typography>화상 전화</Typography>
          </Stack>
        </Stack>
      </Box>

      <StyledDiv ref={ref}></StyledDiv>
    </Stack>
  );
}

export default VideoCall;
