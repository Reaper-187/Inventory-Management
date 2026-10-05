import axios from "axios";
import qs from "qs";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  paramsSerializer: (params) => qs.stringify(params, { arrayFormat: "repeat" }),
});
