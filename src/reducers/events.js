import { EVENT_ADD, EVENT_SET, EVENT_DELETE } from "../constants";

export default function EventsReduce(state = [], action) {
  switch (action.type) {
    case EVENT_ADD:
      return [...state, action.event];
    case EVENT_SET:
      return action.events;
    case EVENT_DELETE:
      return state.filter(e => e.title !== action.title);
    default:
      return [];
  }
}
