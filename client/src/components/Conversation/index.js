import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import Axios from "axios";

import {
  Box,
  Stack,
  Typography,
  IconButton,
  Divider,
  TextField,
  InputAdornment,
  Fab,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import {
  BsPlus,
  BsEmojiSmile,
  BsSend,
  BsImage,
  BsCamera,
  BsFileEarmark,
  BsPerson,
  BsPeople,
} from "react-icons/bs";

import { PiStickerDuotone } from "react-icons/pi";

// import {
//   TextMsg,
//   TimeLine,
//   MediaMsg,
//   ReplyMsg,
//   LinkMsg,
//   DocMsg,
// } from "./MsgTypes";

import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import axios from "axios";

const Actions = [
  {
    color: "#4da5fe",
    icon: <BsImage size={24} color="#fff" />,
    y: 102,
    title: "Photo/Video",
  },
  {
    color: "#1b8cfe",
    icon: <PiStickerDuotone size={24} color="#fff" />,
    y: 172,
    title: "Stickers",
  },
  {
    color: "#0172e4",
    icon: <BsCamera size={24} color="#fff" />,
    y: 242,
    title: "Image",
  },
  {
    color: "#0159b2",
    icon: <BsFileEarmark size={24} color="#fff" />,
    y: 312,
    title: "Document",
  },
  {
    color: "#013f7f",
    icon: <BsPerson size={24} color="#fff" />,
    y: 382,
    title: "Contact",
  },
];

const StyledInput = styled(TextField)(() => ({
  "& .MuiInputBase-input": {
    paddingTop: "12px !important",
    paddingBottom: "12px !important",
  },
  "& .MuiFilledInput-root": {
    backgroundColor: "#fff",
  },
}));

const ChatInput = ({
  openPicker,
  setOpenPicker,
  setValue,
  value,
  inputRef,
  messages,
  setMessages,
  socket,
  room,
}) => {
  const [openActions, setOpenActions] = useState(false);
  const [isComposing, setIsComposing] = useState(false);

  useEffect(() => {
    if (!socket) return;

    socket.on("message", (data) => {
      setMessages([...messages, data]);
    });

    return () => {
      socket.off("message", data);
    };
  }, [socket, messages]);

  const sendMessage = async (event) => {
    if (isComposing) return;
    if (event.key === "Enter" && value) {
      const { data } = await axios.post(
        "/api/study/rooms/message/sendMessage",
        {
          content: value,
          studyId: room,
        }
      );

      setValue("");

      socket.emit("sendMessage", data, () => {
        setValue("");
      });
    }
  };

  return (
    <StyledInput
      inputRef={inputRef}
      value={value}
      onChange={(event) => {
        setValue(event.target.value);
      }}
      onCompositionStart={() => setIsComposing(true)}
      onCompositionEnd={() => setIsComposing(false)}
      onKeyDown={sendMessage}
      fullWidth
      variant="filled"
      InputProps={{
        disableUnderline: true,
        startAdornment: (
          <Stack sx={{ width: "max-content" }}>
            <Stack
              sx={{
                position: "relative",
                display: openActions ? "inline-block" : "none",
              }}
            >
              {Actions.map((el) => (
                <Tooltip placement="right" title={el.title}>
                  <Fab
                    onClick={() => {
                      setOpenActions(!openActions);
                    }}
                    sx={{
                      ":hover": {
                        backgroundColor: "#00dd5b",
                      },
                      position: "absolute",
                      top: -el.y,
                      backgroundColor: el.color,
                    }}
                  >
                    {el.icon}
                  </Fab>
                </Tooltip>
              ))}
            </Stack>

            <InputAdornment>
              <IconButton
                onClick={() => {
                  setOpenActions(!openActions);
                }}
              >
                <BsPlus size={20} />
              </IconButton>
            </InputAdornment>
          </Stack>
        ),
        endAdornment: (
          <InputAdornment>
            <IconButton
              onClick={() => {
                setOpenPicker(!openPicker);
              }}
            >
              <BsEmojiSmile size={20} />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

function linkify(text) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.replace(
    urlRegex,
    (url) => `<a href="${url}" target="_blank">${url}</a>`
  );
}

function containsUrl(text) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return urlRegex.test(text);
}

function Conversation({ socket }) {
  const [openPicker, setOpenPicker] = useState(false);

  const [studyInfo, setStudyInfo] = useState();

  const { id: room_id } = useParams();

  const location = useLocation();
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const user_id = JSON.parse(localStorage.getItem("user_id"));

  const [messages, setMessages] = useState([]);
  const [loading, setLoding] = useState(false);

  const [value, setValue] = useState("");

  const scrollRef = useRef();

  useEffect(() => {
    const scrollElement = scrollRef.current;
    scrollElement.scrollTop = scrollElement.scrollHeight;
  });

  // 스터디 채팅방 socket에 참여
  useEffect(() => {
    if (!socket || !studyInfo) return;

    const joinStudyRoom = async () => {
      await socket.emit(
        "join",
        { user: user_id.id, study: studyInfo.study_id },
        (error) => {
          if (error) {
            alert(
              `죄송하지만, 사용자 ${user_id.name} 님은 ${studyInfo.title} 회원이 아닙니다.`
            );
            navigate("/");
          }
        }
      );
    };

    joinStudyRoom();
  }, [socket, studyInfo]);

  const GetMessage = async () => {
    setLoding(true);

    const { data } = await Axios.get(
      `/api/study/rooms/message/allMessage/${room_id}`,
      {
        validateStatus: false,
      }
    );

    setMessages(data.result);
    setLoding(false);
  };

  useEffect(() => {
    if (location === null) return;

    setStudyInfo(location.state.info);
  }, [location]);

  useEffect(() => {
    GetMessage();
  }, []);

  // 버튼을 통해서 메세지 보내기
  const sendMessage = async () => {
    if (value) {
      const { data } = await axios.post(
        "/api/study/rooms/message/sendMessage",
        {
          content: value,
          studyId: room_id,
        }
      );

      setValue("");

      socket.emit("sendMessage", data, () => {
        setValue("");
      });
    }
  };

  /*
  
    기능 : input에 이모티콘 넣기
    설명
      - input 태그를 ref로 가져온다.
      - selectionStart / selectionEnd는 어느 문자 사이에 이모티콘을 넣을 것인지 결정
  
  */
  const handleEmojiClick = (emoji) => {
    const input = inputRef.current;

    if (input) {
      const selectionStart = input.selectionStart;
      const selectionEnd = input.selectionEnd;

      setValue(
        value.substring(0, selectionStart) +
          emoji +
          value.substring(selectionEnd)
      );

      input.selectionStart = input.selectionEnd = selectionStart + 1;
    }
  };

  return (
    <Stack height={"100%"} width={"auto"} sx={{ backgroundColor: "#f2f2f2" }}>
      {/* Chat Header */}
      <Box
        p={2}
        sx={{
          width: "100%",
          backgroundColor: "#fff",
          borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
        }}
      >
        <Stack
          alignItems={"center"}
          direction={"row"}
          justifyContent={"space-between"}
          sx={{ width: "100%", height: "100%" }}
        >
          <Stack
            direction={"row"}
            justifyContent={"center"}
            alignItems={"center"}
            spacing={0.5}
            sx={{ color: "#0162C4", height: "36px" }}
          >
            <Typography>그룹 채팅</Typography>
          </Stack>
        </Stack>
      </Box>

      {/* Chat Msaage */}
      <Box
        width={"100%"}
        ref={scrollRef}
        sx={{
          position: "relative",
          flexGrow: 1,
          height: "100%",
          overflowY: "scroll",

          "&::-webkit-scrollbar": {
            width: "0.5em",
          },

          "&::-webkit-scrollbar-track": {
            backgroundColor: "transparent",
          },

          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(0,0,0,.2)",
            borderRadius: "10px",
          },
        }}
      >
        {loading ? (
          <CircularProgress
            sx={{
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              right: 0,
              position: "absolute",
            }}
          />
        ) : (
          <Box p={3}>
            <Stack spacing={3}>
              {messages &&
                messages.map((el) => {
                  return (
                    <Stack
                      direction={"row"}
                      justifyContent={
                        el.senderId !== user_id.id ? "start" : "end"
                      }
                    >
                      <Box
                        p={1.5}
                        sx={{
                          backgroundColor:
                            el.senderId !== user_id.id ? "#fff" : "#0162C4",
                          borderRadius: 2,
                          width: "max-content",
                        }}
                      >
                        <Typography
                          variant="body2"
                          color={
                            el.senderId !== user_id.id ? "#424242" : "#fff"
                          }
                        >
                          {el.content}
                        </Typography>
                      </Box>
                    </Stack>
                  );
                })}
            </Stack>
          </Box>
        )}
      </Box>

      {/* Chat Footer */}
      <Box
        p={2}
        sx={{
          width: "100%",
        }}
      >
        <Stack direction={"row"} alignItems={"center"} spacing={2}>
          <Stack sx={{ width: "100%" }}>
            {/* ChatInput */}
            <Box
              sx={{
                display: openPicker ? "inline" : "none",
                zIndex: 10,
                position: "fixed",
                bottom: 240,
                left: 60,
              }}
            >
              <Picker
                data={data}
                onEmojiSelect={(emoji) => {
                  handleEmojiClick(emoji.native);
                }}
              />
            </Box>
            <ChatInput
              value={value}
              setValue={setValue}
              openPicker={openPicker}
              setOpenPicker={setOpenPicker}
              inputRef={inputRef}
              messages={messages}
              setMessages={setMessages}
              socket={socket}
              room={room_id}
            />
          </Stack>

          <Box
            sx={{
              height: 48,
              minWidth: 48,
              backgroundColor: "#0162C4",
              borderRadius: 1.5,
            }}
          >
            <Stack
              sx={{
                height: "100%",
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={sendMessage}
            >
              <IconButton>
                <BsSend size={20} color="#fff" />
              </IconButton>
            </Stack>
          </Box>
        </Stack>
      </Box>
    </Stack>
  );
}

export default Conversation;
