import {combineReducers} from "redux";

import tweets from "./userReducer";
import user from "./userReducer";

export default combineReducers({
    tweets,
    user,
})
