import Axios from "axios";

import {
  STUDY_BANNER_UPLOAD,
  STUDY_GROUP_CREATE,
  GET_STUDY_INFO,
} from "./study_types.js";

// 스터디 그룹 배너 이미지 업로드
export function studyGroupBannerUpload(dataToSubmit) {
  const formData = new FormData();

  formData.append("banner", dataToSubmit.bannerImageFile);

  const request = Axios.post("/api/study/create/banner-upload", formData, {
    headers: { "content-type": "multipart/form-data" },
  })
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
    });

  return {
    type: STUDY_BANNER_UPLOAD,
    payload: request,
  };
}

export function studyGroupCreate(dataToSubmit) {
  const request = Axios.post("/api/study/create", {
    bannerPath: dataToSubmit.bannerPath,
    category: dataToSubmit.category,
    limitedMember: dataToSubmit.limitedMember,
    title: dataToSubmit.title,
    detail: dataToSubmit.detail,
  })

    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
    });

  return {
    type: STUDY_GROUP_CREATE,
    payload: request,
  };
  // Axios.get("/api/study/create", {
  //   bannerPath: dataToSubmit.bannerPath,
  //   category: dataToSubmit.category,
  //   disclosure: dataToSubmit.disclosure,
  //   title: dataToSubmit.title,
  // })
  //   .then((res) => res.data)
  //   .catch((err) => {
  //     console.log(err);
  //   });

  // return {
  //   type: STUDY_GROUP_CREATE,
  //   payload: request,
  // };
}

export const GetStudyInfo = async () => {
  const request = await Axios.get("/api/study/getStudyInfo")
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
    });

  return {
    type: GET_STUDY_INFO,
    payload: request,
  };
};

// export function GetStudyInfo() {

// }
