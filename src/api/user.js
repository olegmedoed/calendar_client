import axios from "axios";

export function signup(data) {
  return axios
    .post("/api/users", data)
    .then(r => r.data.data)
    .catch(toErrorMessage);
}

export function addEvent(data) {
  return axios.post("/api/user/events", data).catch(toErrorMessage);
}

export function loadEvents() {
  return axios("/api/user/events")
    .then(r => r.data.data)
    .catch(toErrorMessage);
}

function toErrorMessage(e) {
  if (e.response && e.response.data.error) {
    throw new Error(e.response.data.error.message);
  } else {
    throw e;
  }
}
