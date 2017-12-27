import * as authApi from "../api/auth";
import decode from "jwt-decode";

import { USER_LOGIN } from "../constants";
import { setAuthHeader } from "../utils/auth_header";

export function login(data) {
  return async dispatch => {
    const token = await authApi.login(data);
    const { email, name } = decode(token);
    window.localStorage.user_jwt = token;
    setAuthHeader(token);
    dispatch(userLoggerIn({ email, name, token }));
  };
}

export function userLoggerIn(user) {
  return {
    type: USER_LOGIN,
    user
  };
}
