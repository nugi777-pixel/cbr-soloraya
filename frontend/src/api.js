import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4100",
  headers: {
    "Content-Type": "application/json",
  },
});

// AUTO LOGOUT JIKA TOKEN EXPIRED / INVALID
api.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401 || err.response?.status === 403) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

export default api;
