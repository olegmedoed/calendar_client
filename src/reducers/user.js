import { USER_LOGGED_IN } from "../constants";

export default function UserReducer(state = {}, action) {
  switch (action.type) {
    case USER_LOGGED_IN:
      return action.user;
    default:
      return state;
  }
}
