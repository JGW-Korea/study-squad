import { combineReducers } from "redux";

import user from "./user_reducer";
import study from "./study_reducer";

const rootReducer = combineReducers({
  user,
  study,
});

export default rootReducer;
