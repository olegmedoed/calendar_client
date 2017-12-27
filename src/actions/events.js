import * as userApi from "../api/user";

import { EVENT_ADD } from "../constants";

export function addEvent(data) {
  return async dispatch => {
    const { title, start, duration } = data;
    await userApi.addEvent({ title, start, duration });
    dispatch({
      type: EVENT_ADD,
      event: { title, start, duration }
    });
  };
}
