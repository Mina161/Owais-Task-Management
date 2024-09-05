import axios from "axios";

const baseURL = "https://owitasks-api.vercel.app/api";

const postRequest = async (body, query, params, token, endPoint) => {
  return await axios.post(
    `${baseURL}/${endPoint}${params ? params : ""}`,
    body,
    {
      params: query,
      headers: {
        "Accept": "json",
        "owitasks-access-token": token
      },
      responseType : query?.responseType
    },
  );
};

const getRequest = async (query, params, token, endPoint) => {
  return await axios.get(`${baseURL}/${endPoint}${params ? params : ""}`, {
    params: query,
    headers: {
      "Accept": "json",
      "owitasks-access-token": token
    },
    responseType : query?.responseType
  });
};

const delRequest = async (query, params, token, endPoint) => {
  return await axios.delete(`${baseURL}/${endPoint}${params ? params : ""}`, {
    params: query,
    headers: {
      "Accept": "json",
      "owitasks-access-token": token
    },
    responseType : query?.responseType
  });
};

const putRequest = async (body, query, params, token, endPoint) => {
  return await axios.put(
    `${baseURL}/${endPoint}${params ? params : ""}`,
    body,
    {
      params: query,
      headers: {
        "Accept": "json",
        "owitasks-access-token": token
      },
    }
  );
};

export { postRequest, getRequest, delRequest, putRequest };
