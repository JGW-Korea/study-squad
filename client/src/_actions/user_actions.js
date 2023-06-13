import Axios from "axios";

import { LOGIN_USER, REGISTER_USER, AUTH_USER } from "./types.js";

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

export function auth() {
  const request = Axios.get("/api/user/loginCheck").then((res) => res.data);

  return {
    type: AUTH_USER,
    payload: request,
  };
}
