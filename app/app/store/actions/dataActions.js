import { delRequest, getRequest, postRequest, putRequest } from "../../../core/network";
import { FETCH_RECORDS, FETCH_RECORDS_SUCCESS, FETCH_RECORDS_FAIL, WAIT, WAIT_SUCCESS, WAIT_FAIL } from "./types";
import endpoints from "../../../constants/endPoints.json";


export const getTasks = (data) => async (dispatch, useState) => {
  dispatch({ type: FETCH_RECORDS });
  const token = useState().auth?.token;
  try {
    getRequest(data, undefined, token, endpoints.tasks.root)
      .then((response) => {
        const { data, status } = response;
        return dispatch({
          type: FETCH_RECORDS_SUCCESS,
          payload: data,
        });
      })
      .catch((err) => {
        console.log(err);
        return dispatch({
          type: FETCH_RECORDS_FAIL, 
          payload: err.response.data.message
        });
      });
  } catch (error) {
    dispatch({ type: FETCH_RECORDS_FAIL, payload: error.message });
  }
};

export const createTask = (data) => async (dispatch, useState) => {
  dispatch({ type: WAIT });
  const token = useState().auth?.token;
  try {
    postRequest(data, undefined, undefined, token, endpoints.tasks.root)
      .then((response) => {
        const { data, status } = response;
        return dispatch({
          type: WAIT_SUCCESS,
          payload: data.message
        });
      })
      .catch((err) => {
        console.log(err);
        return dispatch({
          type: WAIT_FAIL, 
          payload: err.response.data.message
        });
      });
  } catch (error) {
    dispatch({ type: WAIT_FAIL, payload: error.message });
  }
};

export const editTask = (data) => async (dispatch, useState) => {
  dispatch({ type: WAIT });
  const token = useState().auth?.token;
  try {
    putRequest(data, undefined, undefined, token, endpoints.tasks.root)
      .then((response) => {
        const { data, status } = response;
        return dispatch({
          type: WAIT_SUCCESS,
          payload: data.message
        });
      })
      .catch((err) => {
        console.log(err);
        return dispatch({
          type: WAIT_FAIL, 
          payload: err.response.data.message
        });
      });
  } catch (error) {
    dispatch({ type: WAIT_FAIL, payload: error.message });
  }
};

export const deleteTask = (data) => async (dispatch, useState) => {
  dispatch({ type: WAIT });
  const token = useState().auth?.token;
  try {
    delRequest(data, undefined, token, endpoints.tasks.root)
      .then((response) => {
        const { data, status } = response;
        return dispatch({
          type: WAIT_SUCCESS,
          payload: data.message
        });
      })
      .catch((err) => {
        console.log(err);
        return dispatch({
          type: WAIT_FAIL, 
          payload: err.response.data.message
        });
      });
  } catch (error) {
    dispatch({ type: WAIT_FAIL, payload: error.message });
  }
};