import * as userApi from "../api/user";

export function signup(data) {
  return async () => {
    return userApi.signup(data);
  };
}
