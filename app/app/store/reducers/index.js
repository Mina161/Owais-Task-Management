import { combineReducers } from "redux";
import authReducer from "./authReducer";
import waitingReducer from "./waitingReducer";
import recordsReducer from "./recordsReducer";

export default combineReducers({
    auth: authReducer,
    wait: waitingReducer,
    records: recordsReducer
});