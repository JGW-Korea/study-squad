import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  FIND_USER_PASSWORD,
  USER_PASSWORD_RESET,
  DELETE_USER_ACCOUNT,
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
    default:
      return state;
  }
}
