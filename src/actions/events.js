import * as userApi from "../api/user";

import { EVENT_ADD, EVENT_SET, EVENT_DELETE } from "../constants";

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

export function loadEvents() {
  return async dispatch => {
    const events = await userApi.loadEvents();
    dispatch({
      type: EVENT_SET,
      events
    });
  };
}

export function removeEvent(title) {
  return async dispatch => {
    await userApi.removeEvent(title);
    dispatch({
      type: EVENT_DELETE,
      title
    });
  };
}
