import * as authApi from "../api/auth";
import decode from "jwt-decode";

import { USER_LOGGED_IN } from "../constants";

export function login(data) {
  return async dispatch => {
    const token = await authApi.login(data);
    const { email, name } = decode(token);
    window.localStorage.user_jwt = token;
    dispatch(userLoggerIn({ email, name, token }));
  };
}

export function userLoggerIn(user) {
  return {
    type: USER_LOGGED_IN,
    user
  };
}
