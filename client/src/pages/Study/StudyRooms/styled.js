import styled from "styled-components";

export const ChatContainer = styled.div`
  position: relative;
  height: 100vh;
  width: 450px;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
`;

export const ChatTopBottom = styled.div`
  height: 100px;
  width: 100%;
  background-color: #f8faff;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25);
  padding: 10px;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`;

export const ChatHeaderStudyTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  span {
    margin: 3.5px 0px 0px 5px;
  }
`;

export const ChatHeaderIcons = styled.div`
  display: flex;
  align-items: center;
`;
export const IconButton = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 5px;
`;

export const Divider = styled.div`
  width: 1px;
  height: 40px;
  background-color: #eaeaea;
  margin: 0 10px 0 10px;
`;

export const TextInput = styled.div`
  position: relative;
  display: flex;
  height: 45px;
  width: 85%;
  border-radius: 5px;
  overflow: hidden;
  background-color: #e8f0ff;

  align-items: center;
  justify-content: space-evenly;

  textarea {
    width: 70%;
    height: 100%;
    resize: none;
    border: none;
    padding-top: 12px;
    padding-bottom: 12px;
    background-color: transparent;
    outline: none;
  }
`;

export const TextInputIcons = styled.div`
  width: 35px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 50%;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
    transition: all 0.5s ease-out;
  }
`;

export const MsgSendBtn = styled.button`
  width: 48px;
  height: 48px;
  background-color: #508af7;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  cursor: pointer;
`;

export const EmojiModal = styled.div`
  z-index: 100;
  position: fixed;
  bottom: 85.16px;
  left: 98px;
  display: ${(props) => (props.modal ? "inline" : "none")};
`;

export const MsgBox = styled.div`
  width: 100%;
  flex-grow: 1;
  padding: 10px;
  height: 100%;
  overflow-y: scroll;
  background-color: #f0f4fa;

  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;
`;

export const ActionIcons = styled.div`
  position: absolute;
  top: ${(props) => (props.y ? -props.y + "px" : "none")};
  background-color: ${(props) => props.color};
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.9);

  &:hover {
    background-color: #72cd48;
    transition: all 0.2s linear;
  }
`;
