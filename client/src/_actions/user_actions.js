import Axios from "axios";

import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  FIND_USER_PASSWORD,
  USER_PASSWORD_RESET,
  DELETE_USER_ACCOUNT,
  PROFILE_IMAGE_UPLOAD,
  PROFILE_IMAGE_UPDATE,
  USER_CHANGE_EMAIL,
  USER_CHANGE_PASSWORD,
} from "./types.js";

export function loginUser(dataToSubmit) {
  const request = Axios.post("/api/user/login", {
    email: dataToSubmit.email,
    password: dataToSubmit.password,
  }).then((res) => res.data);

  return {
    type: LOGIN_USER,
    payload: request,
  };
}

// 회원가입
export function registerUser(dataToSubmit) {
  const request = Axios.post("/api/user/register", {
    email: dataToSubmit.email,
    password: dataToSubmit.password,
    name: dataToSubmit.name,
    birth: dataToSubmit.birth,
  })
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
    });

  return {
    type: REGISTER_USER,
    payload: request,
  };
}

export function findUserPassword(dataToSubmit) {
  const request = Axios.post("/api/user/passwordModify/finduserpassword", {
    email: dataToSubmit.email,
    name: dataToSubmit.name,
  })
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
    });

  return {
    type: FIND_USER_PASSWORD,
    payload: request,
  };
}

export function userPasswordReset(dataToSubmit) {
  const request = Axios.post("/api/user/passwordModify/userpasswordreset", {
    email: dataToSubmit.email,
    name: dataToSubmit.name,
    password: dataToSubmit.password,
  })
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
    });

  return {
    type: USER_PASSWORD_RESET,
    payload: request,
  };
}

export function deleteUserAccount(dataToSubmit) {
  const request = Axios.delete("/api/user/deleteUserAccount", {
    data: {
      id: dataToSubmit.id,
      email: dataToSubmit.email,
      name: dataToSubmit.name,
    },
  })
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
    });

  return {
    type: DELETE_USER_ACCOUNT,
    payload: request,
  };
}

export function profileImageUpload(dataToSubmit) {
  const formData = new FormData();

  formData.append("image", dataToSubmit.userProfileImageInfo);

  const request = Axios.post("/api/user/mypage/profile/upload", formData, {
    headers: { "content-type": "multipart/form-data" },
  })
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
    });

  return {
    type: PROFILE_IMAGE_UPLOAD,
    payload: request,
  };
}

export function profileImageUpdate(dataToSubmit) {
  const request = Axios.post("/api/user/mypage/profile/update", {
    email: dataToSubmit.userEmail,
    name: dataToSubmit.userName,
    path: dataToSubmit.profileImgPath,
  })

    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
    });

  return {
    type: PROFILE_IMAGE_UPDATE,
    payload: request,
  };
}

export function userChangeEmail(dataToSubmit) {
  const request = Axios.post("/api/user/mypage/changeEmail", {
    email: dataToSubmit.email,
  })

    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
    });

  return {
    type: USER_CHANGE_EMAIL,
    payload: request,
  };
}

export function userChangePassword(dataToSubmit) {
  const request = Axios.post("/api/user/mypage/changePassword", {
    userUsePassword: dataToSubmit.userUsePassword,
    userNewPassword: dataToSubmit.userNewPassword,
  })

    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
    });

  return {
    type: USER_CHANGE_PASSWORD,
    payload: request,
  };
}

// 로그인 상태를 확인한다.
export function auth() {
  const request = Axios.get("/api/user/login/success")
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
    });

  return {
    type: AUTH_USER,
    payload: request,
  };
}
