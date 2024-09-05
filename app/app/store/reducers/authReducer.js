import { LOGIN, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT_SUCCESS} from "../actions/types";
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  user: null,
  token: null,
  isLoading: false,
  isError: false,
  signedup: false,
  errorMessage: null
};

export default function store(state = initialState, action) {
  const { type, payload, token, signedup } = action;
  switch (type) {
    case LOGIN:
      return {
        ...state,
        isLoading: true,
        isError: false,
        errorMessage: null
      };
    case LOGIN_SUCCESS:
      AsyncStorage.setItem("OwitasksUser", JSON.stringify(payload));
      AsyncStorage.setItem("OwitasksToken", token);
      return {
        ...state,
        user: payload,
        token: token,
        isLoading: false,
        isError: false,
        errorMessage: null,
        signedup
      };
    case LOGIN_FAIL:
      console.log("Fail")
      AsyncStorage.removeItem("OwitasksUser");
      AsyncStorage.removeItem("OwitasksToken");
      return {
        ...state,
        user: null,
        token: null,
        isLoading: false,
        isError: true,
        errorMessage: payload
      };
    case LOGOUT_SUCCESS:
      AsyncStorage.removeItem("OwitasksUser");
      AsyncStorage.removeItem("OwitasksToken");
      return {
        ...state,
        user: null,
        token: null,
        isLoading: false,
        isError: false,
        errorMessage: null
      }
    default:
      return state;
  }
}