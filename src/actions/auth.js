import * as authApi from "../api/auth";
import decode from "jwt-decode";

import { USER_LOGIN, USER_LOGOUT } from "../constants";
import { setAuthHeader } from "../utils/auth_header";

export function login(data) {
  return async dispatch => {
    const token = await authApi.login(data);
    const { email, name } = decode(token);
    window.localStorage.user_jwt = token;
    setAuthHeader(token);
    dispatch(userLoggedIn({ email, name, token }));
  };
}

export function logout() {
  return async dispatch => {
    window.localStorage.removeItem("user_jwt");
    setAuthHeader();
    dispatch({ type: USER_LOGOUT });
  };
}

export function userLoggedIn(user) {
  return {
    type: USER_LOGIN,
    user
  };
}
