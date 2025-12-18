import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api", // change after backend deploy
});

// Automatically attach JWT token
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default API;
