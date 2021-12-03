const ID_TOKEN_KEY = "id_token";
const REFRESH_TOKEN_KEY = "refresh_token";
const SECRET_TOKEN_KEY = "client_secret";
const CLIENT_ID_KEY = "client_id";

export const getToken = () => {
  return window.localStorage.getItem(ID_TOKEN_KEY);
};

export const saveToken = token => {
  window.localStorage.setItem(ID_TOKEN_KEY, token);
};

export const destroyToken = () => {
  window.localStorage.removeItem(ID_TOKEN_KEY);
};

export const getRefreshToken = () => {
  return window.localStorage.getItem(REFRESH_TOKEN_KEY);
};

export const saveRefreshToken = token => {
  window.localStorage.setItem(REFRESH_TOKEN_KEY, token);
};

export const destroyRefreshToken = () => {
  window.localStorage.removeItem(REFRESH_TOKEN_KEY);
};

export const getClientSecret = () => {
  return window.localStorage.getItem(SECRET_TOKEN_KEY);
};

export const saveClientSecret = token => {
  window.localStorage.setItem(SECRET_TOKEN_KEY, token);
};

export const destroyClientSecret = () => {
  window.localStorage.removeItem(SECRET_TOKEN_KEY);
};

export const getClientID = () => {
  return window.localStorage.getItem(CLIENT_ID_KEY);
};

export const saveClientID = token => {
  window.localStorage.setItem(CLIENT_ID_KEY, token);
};

export const destroyClientID = () => {
  window.localStorage.removeItem(CLIENT_ID_KEY);
};

export default {
  getToken,
  saveToken,
  destroyToken,
  getRefreshToken,
  saveRefreshToken,
  destroyRefreshToken,
  getClientSecret,
  saveClientSecret,
  destroyClientSecret,
  getClientID,
  saveClientID,
  destroyClientID
};
