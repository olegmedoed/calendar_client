import { EVENT_ADD, EVENT_SET } from "../constants";

export default function EventsReduce(state = [], action) {
  switch (action.type) {
    case EVENT_ADD:
      return [...state, action.event];
    case EVENT_SET:
      return action.events;
    default:
      return [];
  }
}
