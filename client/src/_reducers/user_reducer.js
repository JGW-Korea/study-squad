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
} from "../_actions/types";

export default function (state = {}, action) {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, loginSuccess: action.payload };
    case REGISTER_USER:
      return { ...state, registerSuccess: action.payload };
    case AUTH_USER:
      return { ...state, userData: action.payload };
    case FIND_USER_PASSWORD:
      return { ...state, findUserPassword: action.payload };
    case USER_PASSWORD_RESET:
      return { ...state, userPasswordReset: action.payload };
    case DELETE_USER_ACCOUNT:
      return { ...state, deleteUserAccount: action.payload };
    case PROFILE_IMAGE_UPLOAD:
      return { ...state, profileImageUpload: action.payload };
    case PROFILE_IMAGE_UPDATE:
      return { ...state, profileImageUpdate: action.payload };
    case USER_CHANGE_EMAIL:
      return { ...state, userChangeEmail: action.payload };
    case USER_CHANGE_EMAIL:
      return { ...state, userChangePassword: action.payload };
    default:
      return state;
  }
}
