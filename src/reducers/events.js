import { EVENT_ADD } from "../constants";

export default function EventsReduce(state = [], action) {
  switch (action.type) {
    case EVENT_ADD:
      return [...state, action.event];
    default:
      return [];
  }
}
