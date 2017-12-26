import axios from "axios";

export function login(data) {
  return axios
    .post("/api/auth/local", data)
    .then(r => r.data.data.token)
    .catch(toErrorMessage);
}

function toErrorMessage(e) {
  if (e.response && e.response.data.error) {
    throw new Error(e.response.data.error.message);
  } else {
    throw e;
  }
}
