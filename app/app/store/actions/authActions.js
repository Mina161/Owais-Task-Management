import { postRequest } from "../../../core/network";
import { LOGIN, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, LOGOUT_SUCCESS } from "./types";
import AsyncStorage from '@react-native-async-storage/async-storage';
import endpoints from "../../../constants/endPoints.json";
import { schedulePushNotification } from "../../components/Notifications";

export const loadUser = () => async (dispatch) => {
  dispatch({ type: LOGIN });
  let user = await AsyncStorage.getItem("OwitasksUser");
  let token = await AsyncStorage.getItem("OwitasksToken");
  if (user) {
    user = JSON.parse(user);
    return dispatch({
      type: LOGIN_SUCCESS,
      payload: user,
      token: token
    });
  } else {
    return dispatch({
      type: LOGIN_FAIL,
    });
  }
};

export const signUp = (data) => async (dispatch) => {
  dispatch({ type: LOGIN });
  try {
    postRequest(data, undefined, undefined, undefined, endpoints.auth.signup)
      .then((response) => {
        const { data, status } = response;
        if(status === 201) {
          schedulePushNotification({ title: data.message })
        }
        return dispatch({
          type: LOGIN_SUCCESS,
          payload: data.payload,
          token: data.token
        });
      })
      .catch((err) => {
        console.log(err);
        return dispatch({
          type: LOGIN_FAIL,
        });
      });
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error.message });
  }
};

export const logIn = (data) => async (dispatch) => {
  dispatch({ type: LOGIN });
  try {
    postRequest(data, undefined, undefined, undefined, endpoints.auth.login)
      .then((response) => {
        const { data, status } = response;
        if(status === 200) {
          schedulePushNotification({ title: data.message })
        }
        return dispatch({
          type: LOGIN_SUCCESS,
          payload: data.payload,
          token: data.token
        });
      })
      .catch((err) => {
        console.log(err);
        return dispatch({
          type: LOGIN_FAIL,
        });
      });
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error.message });
  }
};

export const logout = () => async (dispatch) => {
  return dispatch({ type: LOGOUT_SUCCESS });
};