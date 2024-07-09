import axios, { AxiosRequestConfig } from "axios";
import { baseApiUrl } from "../config/config";

const fullEndpoint = (endpoint: string): string => {
  if (endpoint.startsWith("http")) {
    return `/${endpoint}`;
  } else {
    return `${baseApiUrl}/${endpoint}`;
  }
}

const get = (endpoint: string, config?: AxiosRequestConfig) => {
  return axios.get(fullEndpoint(endpoint), {
    ...config, 
    headers: { ...config?.headers, authorization: `Bearer ${localStorage.getItem("authToken") || ""}` }
  });
}

const post = (endpoint: string, data: any, config?: AxiosRequestConfig) => {
  return axios.post(fullEndpoint(endpoint), data, config);
}

export { get, post };