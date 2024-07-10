import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

const initialState = {
  isLoggedIn: false,
  session: "",
  isLoading: false,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logIn(state, action) {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.session = action.payload.token;
    },
    signOut(state, action) {
      state.isLoggedIn = false;
      state.session = "";
    },
  },
});

// export Reducer

export default slice.reducer;

// export Login

export function LoginUser(formValues) {
  // formValues => { email, password }
  return async (dispatch, getState) => {
    await axios
      .post(
        "/user/login",
        { ...formValues },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((res) => {
        console.log(res.data);

        dispatch(
          slice.actions.logIn({
            isLoggedIn: true,
            session: res.data,
          })
        );
      })
      .catch((error) => console.log(error));
  };
}
