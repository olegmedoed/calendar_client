import { USER_LOGIN } from "../constants";

export default function UserReducer(state = {}, action) {
  switch (action.type) {
    case USER_LOGIN:
      return action.user;
    default:
      return state;
  }
}
