import axios from "axios";

const baseURL = " http://127.0.0.1:8000/api/connect4/";
const axiosInstance = axios.create({
  baseURL: baseURL,
});
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    return Promise.reject(error);
  },
);

export default axiosInstance;
