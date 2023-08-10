import Axios from "axios";

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import {
  deleteUserAccount,
  profileImageUpload,
  profileImageUpdate,
  auth2,
} from "../../../_actions/user_actions";
import { useNavigate } from "react-router-dom";

function MyPage() {
  const navigation = useNavigate();

  const dispatch = useDispatch();

  const [userInfo, setUserInfo] = useState("");

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

  const onSubmitHandler = async (event) => {
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
    dispatch(auth2()).then((res) => {
      if (res.payload) {
        if (res.payload.isLogged) {
          setUserInfo(res.payload.data);
        }
      }
    });
  }, []);

  console.log(userInfo);

  return (
    <div>
      <div>계정</div>
      <div>
        <form
          style={{ display: "flex", flexDirection: "column" }}
          onSubmit={onSubmitHandler}
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
        <div>
          <span>아이디</span>
          <button>계정 이메일 변경</button>
        </div>
        <div>
          <span>비밀번호</span>
          <button>비밀번호 변경</button>
        </div>
        <form>
          <button onClick={onDeleteProfileSubmitHandler}>회원탈퇴</button>
        </form>
      </div>
    </div>
  );
}

export default MyPage;
