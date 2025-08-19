import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8084/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
}