import {
  STUDY_BANNER_UPLOAD,
  STUDY_GROUP_CREATE,
} from "../_actions/study/study_types";

export default function (state = {}, action) {
  switch (action.type) {
    case STUDY_BANNER_UPLOAD:
      return { ...state, studyBannerUploadSuccess: action.payload };
    case STUDY_GROUP_CREATE:
      return { ...state, studyCreateSuccess: action.payload };
    default:
      return state;
  }
}
