import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import {
  deleteUserAccount,
  profileImageUpload,
  profileImageUpdate,
  auth,
  userChangeEmail,
  userChangePassword,
} from "../../../_actions/user_actions";
import { useNavigate } from "react-router-dom";

function MyPage() {
  const navigation = useNavigate();

  const dispatch = useDispatch();

  const [userInfo, setUserInfo] = useState("");

  const [changeEmail, setChangeEmail] = useState("");

  const [usePassword, setUsePassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [usePasswordMessage, setUsePasswordMessage] = useState("");
  const [newPasswordMessage, setNewPasswordMessage] = useState("");
  const [passworConfirmdMessage, setPassworConfirmdMessage] = useState("");

  const [imagePrivewSrc, setImagePrivewSrc] = useState("");
  const [imageInfoFile, setImageInfoFile] = useState("");

  const onDeleteProfileSubmitHandler = (event) => {
    event.preventDefault();

    let body = {
      id: userInfo.id,
      email: userInfo.email,
      name: userInfo.name,
    };

    dispatch(deleteUserAccount(body)).then((res) => {
      if (res.payload.deleteSuccess) {
        alert("그동안 이용해주셔서 감사합니다.");
        navigation("/");
      }
    });
  };

  const encodeFileToBase64 = (fileBlob) => {
    const reader = new FileReader();

    reader.readAsDataURL(fileBlob);

    return new Promise((resolve) => {
      reader.onload = () => {
        setImagePrivewSrc(reader.result);

        resolve();
      };
    });
  };

  const handlerImagePrivew = (event) => {
    encodeFileToBase64(event.target.files[0]);
    setImageInfoFile(event.target.files[0]);
  };

  const onProfileChangeSubmitHandler = async (event) => {
    event.preventDefault();

    let body = {
      userProfileImageInfo: imageInfoFile,
    };

    dispatch(profileImageUpload(body)).then((res) => {
      if (res.payload.imageUpdateSuccess) {
        let body = {
          userEmail: userInfo.email,
          userName: userInfo.name,
          profileImgPath: res.payload.url,
        };

        dispatch(profileImageUpdate(body)).then((res) => {
          if (res.payload.userProfileImgUpdateSuccess) {
            setUserInfo(res.payload.userInfo);
          }
        });
      } else {
        alert("프로필 변경에 실패했습니다.");
      }
    });
  };

  useEffect(() => {
    dispatch(auth()).then((res) => {
      if (res.payload) {
        if (res.payload.isLogged) {
          setUserInfo(res.payload.data);
        }
      }
    });
  }, []);

  const setEmail = (event) => {
    setChangeEmail(event.target.value);
  };

  const onEmailChangeHandler = (event) => {
    event.preventDefault();

    let body = {
      email: changeEmail,
    };

    dispatch(userChangeEmail(body)).then((res) => {
      if (res.payload.emailChangeSuccess) {
        alert("이메일이 성공적으로 변경되었습니다. 다시 로그인 하여 주십시오");
        navigation("/");
      } else {
        alert("이메일 변경에 실패했습니다. 다시 시도해 주십시오.");
      }
    });
  };

  const usePasswordHandler = (event) => {
    setUsePassword(event.target.value);
  };
  const newPasswordHandler = (event) => {
    setNewPassword(event.target.value);
  };
  const confirmNewPasswordHandler = (event) => {
    setConfirmNewPassword(event.target.value);
  };

  const onPasswordChangeHandler = (event) => {
    event.preventDefault();

    if (newPassword === confirmNewPassword) {
      setPassworConfirmdMessage("");

      let body = {
        userUsePassword: usePassword,
        userNewPassword: newPassword,
      };

      dispatch(userChangePassword(body)).then((res) => {
        console.log(res.payload);

        if (!res.payload.userChangePasswordSuccess) {
          if (res.payload.type === "PASSWORD_MIS_MATCH") {
            setUsePasswordMessage(res.payload.message);
            setNewPasswordMessage("");
            setPassworConfirmdMessage("");
          } else {
            setUsePasswordMessage("");
            setNewPasswordMessage(res.payload.message);
            setPassworConfirmdMessage("");
          }
        } else {
          alert(
            "비밀번호가 성공적으로 변경되었습니다. 다시 로그인 하여 주십시오."
          );

          navigation("/");
        }
      });
    } else {
      setUsePasswordMessage("");
      setNewPasswordMessage("");

      setPassworConfirmdMessage("비밀번호가 틀립니다. 다시 확인해주세요");
    }
  };

  return (
    <div>
      <div>계정</div>
      <div>
        <form
          style={{ display: "flex", flexDirection: "column" }}
          onSubmit={onProfileChangeSubmitHandler}
          encType="multipart/form-data"
        >
          <span>프로필 이미지</span>

          {userInfo && (
            <img
              src={
                imagePrivewSrc !== ""
                  ? imagePrivewSrc
                  : userInfo.profileImage === null
                  ? "/img/reading-book.png"
                  : `http://localhost:8000/${userInfo.profileImage}`
              }
              style={{
                width: "300px",
                height: "300px",
                border: "1px solid black",
              }}
              alt={`${userInfo.name} Profile Image`}
            />
          )}
          <input type="file" accept="image/*" onChange={handlerImagePrivew} />
          {userInfo && (
            <img
              src={
                userInfo.profileImage === null
                  ? "img/reading-book.png"
                  : `http://localhost:8000/${userInfo.profileImage}`
              }
              style={{
                width: "300px",
                height: "300px",
                border: "1px solid black",
              }}
              alt={`${userInfo.name} Profile Image`}
            />
          )}
          <button type="submit">asd</button>
        </form>
        <form onSubmit={onEmailChangeHandler}>
          <span>이메일</span>

          <div>
            <input type="email" value={changeEmail} onChange={setEmail} />
          </div>

          <button>계정 이메일 변경</button>
        </form>
        <form onSubmit={onPasswordChangeHandler}>
          <span>비밀번호</span>

          <div>
            <span>현재 비밀번호</span>
            <input
              type="password"
              value={usePassword}
              onChange={usePasswordHandler}
            />
            <span>{usePasswordMessage}</span>
          </div>

          <div>
            <span>새 비밀번호</span>
            <input
              type="password"
              value={newPassword}
              onChange={newPasswordHandler}
            />
            <span>{newPasswordMessage}</span>
          </div>
          <div>
            <span>새 비밀번호를 다시 입력하세요</span>
            <input
              type="password"
              value={confirmNewPassword}
              onChange={confirmNewPasswordHandler}
            />
            <span>{passworConfirmdMessage}</span>
          </div>

          <button>비밀번호 변경</button>
        </form>
        <form>
          <button onClick={onDeleteProfileSubmitHandler}>회원탈퇴</button>
        </form>
      </div>
    </div>
  );
}

export default MyPage;
